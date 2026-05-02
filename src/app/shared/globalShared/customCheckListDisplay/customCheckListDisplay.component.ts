import { Component, Input, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { MasterService } from '../../../core/services/master.service';
import { Subscription } from 'rxjs';
import { CustomCheckListDisplayServiceUrls } from './customCheckListDisplayServiceUrls';
import { Actions, AddCheckListBO, AddCheckPointsList, APIResponseCode, ChecklistConstants, ChecklistExecBaseInfo, ChecklistFilterItems, CheckListHeaders, ChecklistListBO, CheckListMessages, CheckListPurpose, checkPointsExecution, CheckPointsListBO, CheckPointsListData, DisCardOrGoCheckList, LevelCodes, LevelList } from './customCheckListDisplayModel';
import { ICustomDropdownNCheckListData } from '../customCheckList/customChecklistModel';
import { CommonMethods } from '../../utility/commonMethods';
import { DropdownDetails } from '../customDropdown/customDropdownModel';
import { CustomFieldMessages, GLOBAL_CONSTANTS } from '../../utility/constant';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from '../../../app.material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HelpersModule } from '../globalShared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppHttpService } from '../../../core/services/http.service';
import { environment } from '../../../../environments/environment';
import { TextBoxInputs } from '../customTextbox/customTextboxModal';
import { AlertService } from '../../../core/services/alert.service';
import { cloneDeep } from 'lodash';
import { GridPageActions } from '../../utility/gridPageActions';
import { ConfirmationService } from '../../../core/services/confirmationService';
import { MatDialogRef } from '@angular/material/dialog';
import { ACTION_GET } from '../../utility/actions';

@Component({
  selector: 'app-checklist-display',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AppMaterialModule,
    FlexLayoutModule,
    HelpersModule,
    FontAwesomeModule,
    // AppModalPopupComponent
  ],
  providers: [
    MasterService,
    AppHttpService
  ],
  templateUrl: './customCheckListDisplay.html'
})
export class CustomCheckListDisplayComponent implements OnDestroy {
  @ViewChildren("validate") validate: QueryList<any> = new QueryList<any>();
  @ViewChildren("validateCheckList") validateCheckList: QueryList<any> = new QueryList<any>();
  @Input() isModalPopup: boolean = true;
  @Input() checkListControlID: string = "";
  @Input() unitID: string = "";
  @Input() formID: string = "";
  @Input() mode: string = "MNG";
  @Input() propertyName: string = "";
  @Input() requestID: string = "";
  @Input() checkListDisaplyTitle: string = "";
  @Input() checkListMode: string = "";
  @Input() moduleCode: string = "";
  @Input() itemReferenceID: string = "";
  @Input() parentProperty: string = "";
  @Input() checklistFilter: Array<any> = [];
  @Input() formData: any = {};

  subscription$: Subscription = new Subscription();
  checkPointsExecution: checkPointsExecution = new checkPointsExecution();
  checkPointsListBO: CheckPointsListBO = new CheckPointsListBO();
  isShowCheckList: boolean = false;
  addCheckPointsList: AddCheckPointsList = new AddCheckPointsList();
  checklistListBO: ChecklistListBO = new ChecklistListBO();
  checklistList: Array<ICustomDropdownNCheckListData> = [];
  ChecklistGridData: any;
  headerData: any = [];
  extraHeaderData: any = [];
  dataSource: any;
  actions = new Actions().actions;
  addCheckListBO: AddCheckListBO = new AddCheckListBO();
  checkPointsExecutionID: string = "";
  selectedOptionStatus: string = "";
  gridValue: string = "";
  checklistValue: string = "";
  isShowOptionSection: boolean = false;
  levelsList: any = LevelList;
  levelCodes: any = LevelCodes;
  isFromBackBtn: boolean = false;
  // selectedLevel: any;

  constructor(public activeModal: MatDialogRef<CustomCheckListDisplayComponent>, private _masterService: MasterService,
    private _alert: AlertService, private _confirm: ConfirmationService
  ) {

  }

  ngAfterViewInit() {
    this.subscription$ = this._masterService.subject$.subscribe(resp => {
      this.doAfterViewInit(resp);
    });

    this.checkPointsListBO.checkListControlID = this.checkListControlID;
    this.checkPointsListBO.formID = this.formID;
    this.checkPointsListBO.unitID = this.unitID;

    this.callGetCheckListDetails();
    this.prepareGridHeaders();

    if (this.mode == "VIEW") {
      setTimeout(() => {
        CommonMethods.setViewMode(this.validateCheckList.toArray(), "VIEW");
      }, 400);
    }
  }

  doAfterViewInit(resp: any) {
    switch (resp.purpose) {
      case CheckListPurpose.getCheckPointsExecutionData:
        this.checkPointsExecution = resp.result;

        if (CommonMethods.hasValue(this.checkPointsExecution.checkPointsLists)) {
          this.checkPointsExecution?.checkPointsLists.forEach((x: any) => {
            if (CommonMethods.hasValue(x.checkListOptions)) {
              x.checkListOptionsList = x.checkListOptions.map((item: any) => {
                return {
                  item: item.value,
                  itemCode: item.value,
                  itemID: item.value
                } as ICustomDropdownNCheckListData;
              });
            } else {
              x.checkListOptionsList = [];
            }

            let fieldInputType: any = "TextBox";
            let fieldName: string = "";
            if (CommonMethods.hasValue(this.checkPointsExecution?.addtionalOptions)) {
              const getOptionType = this.checkPointsExecution?.addtionalOptions.find(x => x.optionType == 'ADDITIONAL NOTES');
              if (CommonMethods.hasValue(getOptionType)) {
                fieldInputType = getOptionType?.itemCode == 'Remarks' ? 'TextArea' : 'TextBox';
                fieldName = getOptionType?.item || '';
              }
            }

            x.checkListOptionField = new DropdownDetails("Select", true, true, GLOBAL_CONSTANTS.EMPTY, "MNG", false, false);
            x.justificationField = new TextBoxInputs(fieldName, 250, true, true, 'all', fieldInputType);
          })
        }

        setTimeout(() => {
          if (this.selectedOptionStatus == ACTION_GET.OBSOLETE || this.mode == "VIEW")
            CommonMethods.setViewMode(this.validate.toArray(), "VIEW");
        });

        break

      case CheckListPurpose.manageChecklistResults:
        if (resp.result.responseCode == APIResponseCode.SUCCESS || resp.result.responseCode == APIResponseCode.OK) {
          this._alert.success(CustomFieldMessages.checkListOptionFiledSuccess);
          this.backToCheckListData();
        }
        else
          this._alert.showDBMessage(resp.result.responseCode, resp.result.resultTypeCode);
        break

      case CheckListPurpose.getChecklist:
        this.prepareOutputDataSource(resp.result);
        this.gridValue = ChecklistConstants.AUTOSAVE_CHECKLIST_TYPE;
        this.ChecklistGridData = resp.result;
        this.callGetCheckListsByControlID();
        break;

      case CheckListPurpose.getCheckListsByControlID:
        this.checklistList = resp.result;

        if (this.mode == "MNG" && this.checkListMode == ChecklistConstants.MULTIPLE && CommonMethods.hasValue(this.checklistList) && this.checklistList.length == 1 &&
          (!CommonMethods.hasValue(this.dataSource) || !CommonMethods.hasValue(this.dataSource.data) || this.dataSource.data.length == 0)) {
          this.checklistValue = ChecklistConstants.AUTOSAVE_CHECKLIST_TYPE;
          this.defaultSave();
        }

        //What if it's already saved and the data source has only one record (163 -> 171)?
       

        if (this.dataSource?.data?.length == 1) {
          if (!this.isShowOptionSection) {
            this.isShowOptionSection = true;
            this.checklistValue = '';
            // const getData = this.dataSource?.data?.find((x: any) => x.state === ACTION_GET.ACTIVE);
            // if (CommonMethods.hasValue(getData))
            //   this.openOptionSection(getData);
          }

          if (this.isShowOptionSection && !this.isFromBackBtn && this.checklistList?.length == 1 && this.dataSource.data[0].state != ACTION_GET.OBSOLETE) {
            this.openOptionSection(this.dataSource?.data[0]);
          }
        }

        break

      case CheckListPurpose.manageChecklist:
        if (resp.result.responseCode == APIResponseCode.SUCCESS || resp.result.responseCode == APIResponseCode.OK) {
          this._alert.success(CustomFieldMessages.checkListAddedSuccess);

          if (this.checkListMode == ChecklistConstants.MULTIPLE && CommonMethods.hasValue(this.checklistList) && this.checklistList.length == 1)
            this.isShowOptionSection = true;

          this.callGetCheckListDetails();
        }
        else
          //this._alert.showDBMessage(resp.result.responseCode, resp.result.resultTypeCode);
          this._alert.warning(CustomFieldMessages.addDuplicate);
        break;

      case CheckListPurpose.discardChecklistResults:
        if (resp.result.responseCode == APIResponseCode.SUCCESS || resp.result.responseCode == APIResponseCode.OK) {
          this._alert.success(CustomFieldMessages.checkListDiscardSuccess);
          this.callGetCheckListDetails();
        }
        else
          this._alert.showDBMessage(resp.result.responseCode, resp.result.resultTypeCode);
        break;

      default:
        break;
    }
  }

  prepareGridHeaders() {
    this.headerData = [];
    this.headerData.push({ "columnDef": 'sno', "header": CheckListHeaders.SNo, cell: (element: any) => `${element.sno}`, isShow: true, isShowActions: true, width: 'maxWidth-25per' });
    this.headerData.push({ "columnDef": 'checkListTitle', "header": CheckListHeaders.CheckListTitle, cell: (element: any) => `${element.checkListTitle}`, isShow: true, isShowActions: true });
    this.headerData.push({ "columnDef": 'createdBy', "header": CheckListHeaders.AddedBy, cell: (element: any) => `${element.createdBy}`, isShow: true, isShowActions: true });
    this.headerData.push({ "columnDef": 'createdOn', "header": CheckListHeaders.AddedOn, cell: (element: any) => `${element.createdOn}`, isShow: true, isShowActions: true });
    this.headerData.push({ "columnDef": 'status', "header": CheckListHeaders.Status, cell: (element: any) => `${element.status}`, isShow: true, isShowActions: true });


    this.extraHeaderData = [];
    // this.extraHeaderData.push({ "columnDef": '_id', "header": CheckListHeaders.ReferenceNo, cell: (element: any) => `${element._id}`, isShow: true, width: 'maxWidth-45per' });
    this.extraHeaderData.push({ "columnDef": 'discardedBy', "header": CheckListHeaders.discardedBy, cell: (element: any) => `${element.discardedBy}`, isShow: true, width: 'maxWidth-45per' });
    this.extraHeaderData.push({ "columnDef": 'discardedOn', "header": CheckListHeaders.discardedOn, cell: (element: any) => `${element.discardedOn}`, isShow: true, width: 'maxWidth-45per' });

  }

  prepareOutputDataSource(gridData: any) {
    let searchAction: GridPageActions = new GridPageActions();
    let inputActiuons = this.actions;
    if (this.mode == "VIEW") {
      inputActiuons = this.actions.filter((item: any) => item.action != "Discard");
    }
    searchAction.basicInfo = {
      action: inputActiuons,
      onActionClick: (data, action) => this.getActionClick(data, action)
    };

    gridData = searchAction.appendActions(gridData, "NO_CONDITION");

    this.dataSource = CommonMethods.bindMaterialGridData(CommonMethods.increaseSNo(gridData));
  }

  getActionClick(data: any, action: string) {

    if (action == "Discard") {
      if (data.state == ACTION_GET.OBSOLETE || data.state == ACTION_GET.ACTIVE)
        return this._alert.warning(CustomFieldMessages.selectedOptionNotApplicable);

      this._confirm.confirm(CheckListMessages.discardConfirmation.replace('#item', data.checkListTitle)).subscribe((resp: boolean) => {
        if (resp) {
          this.isShowOptionSection = false;
          this.checklistValue = '';
          let disCardCheckList = new DisCardOrGoCheckList();
          disCardCheckList.checkPointsExecutionID = data._id;
          disCardCheckList.requestID = this.requestID;
          disCardCheckList.property = this.propertyName;
          disCardCheckList.moduleCode = this.moduleCode;
          disCardCheckList.itemReferenceID = this.itemReferenceID;
          disCardCheckList.parentProperty = this.parentProperty;

          this._masterService.postApiService(CustomCheckListDisplayServiceUrls.discardChecklistResults, disCardCheckList, CheckListPurpose.discardChecklistResults, []);
        }
      });
    }
    else if (action == "Go") {
      if(data.state === ACTION_GET.OBSOLETE){
        return this._alert.warning(CustomFieldMessages.commonMsg);
      }
      CommonMethods.setViewMode(this.validate.toArray(), "MNG");
      this.openOptionSection(data);
    }
  }

  openOptionSection(data: any) {
    this.isShowCheckList = true;
    this.selectedOptionStatus = "";
    this.callCheckPointsExecutionData(data);
  }

  defaultSave() {
    if (this.gridValue == ChecklistConstants.AUTOSAVE_CHECKLIST_TYPE && this.checklistValue == ChecklistConstants.AUTOSAVE_CHECKLIST_TYPE && this.checkListMode == ChecklistConstants.MULTIPLE && CommonMethods.hasValue(this.checklistList) && this.checklistList.length == 1) {
      const hasGridData = CommonMethods.hasValue(this.ChecklistGridData);
      const checkStatus = hasGridData && this.ChecklistGridData.every((x: any) => x.state === ACTION_GET.OBSOLETE || x.state === ACTION_GET.ACTIVE);

      if (checkStatus || !hasGridData) {
        this.addCheckList('default');
      }
    }
  }

  saveCheckList() {

    const selectedMissedCheckPoints = this.checkPointsExecution?.checkPointsLists.filter((x: any) => {
      return !CommonMethods.hasValue(x?.result) && CommonMethods.hasValue(x?.justification);
    });

    if (CommonMethods.hasValue(selectedMissedCheckPoints)) {
      let selectedCheckPointsSN = selectedMissedCheckPoints.map(item => ' ' + item.snum)?.toString() || '';
      this._alert.warning(CustomFieldMessages.missedCheckListJustification.replace("#serialnumber", selectedCheckPointsSN));

      return;
    }

    const selectedCheckPoints = this.checkPointsExecution?.checkPointsLists.filter((x: any) => CommonMethods.hasValue(x?.result));

    if (CommonMethods.hasValue(selectedCheckPoints)) {
      let checkPointsListData = new CheckPointsListData();
      let checkPointsList = cloneDeep(this.checkPointsExecution);

      checkPointsListData.checkPointsExecutionID = this.checkPointsExecutionID;
      checkPointsListData.requestID = this.requestID;
      checkPointsListData.property = this.propertyName
      checkPointsListData.moduleCode = this.moduleCode;
      checkPointsListData.itemReferenceID = this.itemReferenceID;
      checkPointsListData.parentProperty = this.parentProperty;

      checkPointsList.checkPointsLists = checkPointsList?.checkPointsLists.map((x: any) => {
        x.isCorrect = x.correctOption?.some((option: any) => option.value === x.result) ? "YES" : "NO";

        delete x.checkListOptionField;
        delete x.justificationField;
        delete x.checkListOptionsList;

        return x;
      });

      checkPointsListData.checkPointsExecution = checkPointsList;

      this._masterService.postApiService(CustomCheckListDisplayServiceUrls.manageChecklistResults, checkPointsListData, CheckListPurpose.manageChecklistResults, []);
    } else {
      this._alert.warning(CustomFieldMessages.checkListOptionFiledError);
    }
  }

  callGetCheckListsByControlID() {
    this.checkPointsListBO.checklistFilters = [];

    if (this.checklistFilter.length > 0) {
      this.checklistFilter.forEach(element => {
        let item: ChecklistFilterItems = new ChecklistFilterItems();

        item.property = element.fieldProperty;
        item.value = CommonMethods.isObjectValue(this.formData[element.fieldProperty]) ? this.formData[element.fieldProperty].displayData : this.formData[element.fieldProperty];

        if (!CommonMethods.hasValue(item.value))
          item.value = "";

        this.checkPointsListBO.checklistFilters.push(item);
      })
    }

    this._masterService.postApiService(CustomCheckListDisplayServiceUrls.getCheckListsByControlID, this.checkPointsListBO, CheckListPurpose.getCheckListsByControlID, [], environment.usmApiUrl);
  }

  callGetCheckListDetails() {

    if (CommonMethods.hasValue(this.requestID)) {
      let obj: ChecklistExecBaseInfo = new ChecklistExecBaseInfo();

      obj.moduleCode = this.moduleCode;
      obj.requestID = this.requestID;
      obj.property = this.propertyName;
      obj.itemReferenceID = this.itemReferenceID;
      obj.parentProperty = this.parentProperty;

      this._masterService.postApiService(CustomCheckListDisplayServiceUrls.getCheckListDetails, obj, CheckListPurpose.getChecklist);
    }
  }

  callCheckPointsExecutionData(data: any) {
    let disCardCheckList = new DisCardOrGoCheckList();
    disCardCheckList.checkPointsExecutionID = data._id;
    disCardCheckList.requestID = this.requestID;
    disCardCheckList.property = this.propertyName;
    disCardCheckList.moduleCode = this.moduleCode;
    disCardCheckList.itemReferenceID = this.itemReferenceID;
    disCardCheckList.parentProperty = this.parentProperty;

    this.checkPointsExecutionID = data._id;
    this.selectedOptionStatus = data.state;

    this._masterService.postApiService(CustomCheckListDisplayServiceUrls.getChecklist, disCardCheckList, CheckListPurpose.getCheckPointsExecutionData, []);
  }

  backToCheckListData() {
    this.isShowCheckList = false;
    this.checklistValue = '';
    this.isFromBackBtn = true;
    this.callGetCheckListDetails();
  }

  addCheckList(type: string) {
    let errMsg = CommonMethods.validation(this.validateCheckList.toArray())
    if (CommonMethods.hasValue(errMsg))
      return this._alert.warning(errMsg);

    if (type == "default" && this.checklistList?.length == 1) {
      this.checklistListBO.checkList = this.checklistList[0].itemID || '';
    }

    this.addCheckListBO.checkListID = this.checklistListBO.checkList;
    this.addCheckListBO.property = this.propertyName;
    this.addCheckListBO.requestID = this.requestID;
    this.addCheckListBO.moduleCode = this.moduleCode;
    this.addCheckListBO.itemReferenceID = this.itemReferenceID;
    this.addCheckListBO.parentProperty = this.parentProperty;

    this._masterService.postApiService(CustomCheckListDisplayServiceUrls.manageChecklist, this.addCheckListBO, CheckListPurpose.manageChecklist, []);
  }

  close() {
    this.activeModal.close();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
