import { Component, ElementRef, Input, OnDestroy, SimpleChanges, ViewChild } from "@angular/core";
import { AlertService } from "../../../core/services/alert.service";
import { CommonMethods } from "../../utility/commonMethods";
import { MasterService } from "../../../core/services/master.service";
import { ManageRemarksBO, RemarkMessages, RemarksServiceUrls } from "./customRemarksModal";
import { Subscription } from "rxjs";
import { AppContextService } from "../../../core/context/appContext.service";
import { dateParserFormatter } from "../../utility/dateParserFormatter";

@Component({
    selector: 'app-remarks',
    templateUrl: './customRemarks.html',
    standalone: false
})
export class CustomRemarkComponent implements OnDestroy {

  @ViewChild('remarksAccordion') remarksAccordion!: ElementRef;
  @Input() formData: any = {};
  @Input() propertyName: string = "";
  @Input() submissionID: string = "";
  @Input() mode: string = "MNG";
  @Input() fieldControlBO: any// = new FieldControlBO();
  @Input() parentProperty: string = "";
  @Input() moduleCode: string = "";


  remarksHistory: any = [];
  remarksObj: ManageRemarksBO = new ManageRemarksBO();
  remarksID: string = "";

  subscription$: Subscription = new Subscription();

  constructor(private _alert: AlertService, private _service: MasterService, private _context: AppContextService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["formData"]) {
      if (CommonMethods.hasValue(this.parentProperty) && CommonMethods.hasValue(this.formData[this.parentProperty]) && CommonMethods.hasValue(this.formData[this.parentProperty][this.propertyName]))
        this.remarksHistory = this.formData[this.parentProperty][this.propertyName];
      else if (CommonMethods.hasValue(this.formData[this.propertyName]))
        this.remarksHistory = this.formData[this.propertyName];
    }
  }

  ngAfterViewInit() {
    this.subscription$ = this._service.subject$.subscribe(resp => {
      if (resp.purpose == "manageRemarks_" + this.propertyName) {
        if (resp.result.resultFlag == "SUCCESS") {
          this.remarksHistory = resp.result.remarks;
          this.remarksObj = new ManageRemarksBO();
          this.remarksID = "";
        }
      }
    });
  }

  addRemark() {
    if (!CommonMethods.hasValue(this.remarksObj.remarks))
      return this._alert.warning("Please provide remarks")

    this.remarksObj.submissionID = this.submissionID;
    this.remarksObj.propertyName = this.propertyName;
    this.remarksObj.remarksID = this.remarksID;
    this.remarksObj.type = !CommonMethods.hasValue(this.remarksID) ? "ADD" : "UPD";
    this.remarksObj.moduleCode = this.moduleCode;
    this.remarksObj.parentNode = this.parentProperty;

    this._service.postApiService(RemarksServiceUrls.manageRemarks, this.remarksObj, "manageRemarks_" + this.propertyName, []);
  }

  getDateValue(value: any) {
    if (CommonMethods.hasValue(value))
      return dateParserFormatter.formatDate(value, "datetime");
    return "";
  }

  editRemark(data: any) {
    this.remarksID = data._id;
    this.remarksObj.remarks = data.remarks;
  }

  invalidRemark(data: any) {

    if (this.remarksID == data._id)
      return this._alert.warning("Item is updated mode, not allow to discard");
    else if (this.fieldControlBO.allowToDiscard == "AddedUser" && data.addedBy.userActualID != this._context.appContext.userDetails.userActualID)
      return this._alert.warning(RemarkMessages.commentedUser);

    let obj: ManageRemarksBO = new ManageRemarksBO();
    obj.submissionID = this.submissionID;
    obj.propertyName = this.propertyName;
    obj.remarksID = data._id;
    obj.type = "DEL";
    obj.moduleCode = this.moduleCode;
    obj.parentNode = this.parentProperty;

    this._service.postApiService(RemarksServiceUrls.manageRemarks, obj, "manageRemarks_" + this.propertyName, []);
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
