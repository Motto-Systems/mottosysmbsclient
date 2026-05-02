import { Component, Input, OnDestroy, QueryList, ViewChildren } from "@angular/core";
import { AlertMSG, ApprovalActionBO, ApprovalConstants, ApprovalFieldInfo, ApprovalProcessBO, ApprovalUserInfoBO, ConfirmReqBO, WorkflowRoutingBO, WorkFlowUsersGridColumnsInfo } from "../approveModel";
import { MatDialogRef } from "@angular/material/dialog";
import { CommonMethods } from "../../../shared/utility/commonMethods";
import { ApprovalProcessServiceUrls } from "../approvalServiceUrls";
import { CustomFieldMessages, FIELD_VALIDATE, GLOBAL_CONSTANTS, MessageResponseCode } from "../../../shared/utility/constant";
import { ApprovalPurpose } from "../approvalPurpose";
import { NavigateUrls } from "../../../shared/utility/navigateUrls";
import { environment } from "../../../../environments/environment";
import { GridPageActions } from "../../../shared/utility/gridPageActions";
import { ActionBO } from "../../../shared/globalShared/appGrid/appGrid.model";
import { ACTION_GET, Actions } from "../../../shared/utility/actions";
import { ICustomDropdownNCheckListData } from "../../../shared/globalShared/customCheckList/customChecklistModel";
import { PurposeHandler } from "../../../shared/utility/commonModel";
import { TransactionService } from "../../../core/services/commonTransaction.service";
import { MatTableDataSource } from "@angular/material/table";
import { CommonReqPurposeCode } from "../../../shared/utility/commonServiceUrls";
import { ActionHistoryExtendedGridColumnsInfo, ActionHistoryGridColumnsInfo } from "../../../shared/globalShared/viewHistory/viewHistory.model";

@Component({
    selector: 'app-approval',
    templateUrl: './approval.html',
    standalone: false
})

export class ApprovalComponent extends TransactionService implements OnDestroy {
    @ViewChildren(FIELD_VALIDATE.VALIDATE) validate: QueryList<any> = new QueryList<any>();

    @Input() approvalProcessObj: ApprovalProcessBO = new ApprovalProcessBO();
    @Input() workflowMappingID: number = 0;

    approvalFieldInfo: ApprovalFieldInfo = new ApprovalFieldInfo();
    headerData: any[] = [];
    extendedData: any[] = [];
    userHeaderData: any[] = [];
    dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
    userDataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
    todoUsersList: ApprovalUserInfoBO[] = [];
    actions: Array<ActionBO> = [
        Actions.GetActionByCode(ACTION_GET.DELETE)
    ]
    actionList: ICustomDropdownNCheckListData[] = [];
    usersList: ICustomDropdownNCheckListData[] = [];
    uiTitles = ApprovalConstants;

    approvalActionList: ApprovalActionBO[] = [];
    approvalAction: ApprovalActionBO = new ApprovalActionBO();
    approvalUserList: ApprovalUserInfoBO[] = [];
    nextLevelUserID: number = 0;

    private purposeHandlers: Record<string, PurposeHandler> = {
        [ApprovalPurpose.GetWorkflowActionsByLevel]: (result: any) => this.handleWorkflowActionsByLevel(result),
        [ApprovalPurpose.GetRoutingDetailsByLevelAction]: (result: any) => this.handleRoutingDetailsByLevelAction(result),
        [ApprovalPurpose.ConfirmRequest]: (result: any) => this.handleConfirmRequest(result),
        [CommonReqPurposeCode.GetRequestBasicInfoNew]: (result: any) => this.handleRequestBasicInfo(result),
    }

    private actionHandler: Record<string, PurposeHandler> = {
        [ACTION_GET.DELETE]: (data: any) => this.removeUser(data),
    }

    constructor(private _dialogRef: MatDialogRef<ApprovalComponent>) {
        super();
    }

    ngAfterViewInit() {
        this.subscription$ = this._service.subject$.subscribe(resp => {
            this.btnDisabled = false;
            this.doAfterViewInit(resp);
        })

        this.initialLoad();
    }

    initialLoad() {
        this.getWorkflowActionsByLevel();
        this.userHeaderData = CommonMethods.prepareGridColumns(WorkFlowUsersGridColumnsInfo, true);
        this.headerData = CommonMethods.prepareGridColumns(ActionHistoryGridColumnsInfo);
        this.extendedData = CommonMethods.prepareGridColumns(ActionHistoryExtendedGridColumnsInfo);
    }

    doAfterViewInit(resp: any) {
        const handler = this.purposeHandlers[resp.purpose];
        if (handler) {
            handler(resp.result);
        }
    }

    handleWorkflowActionsByLevel(result: any) {
        this.approvalFieldInfo.workflow.placeholder += result.levelInfo ? ` (${result.levelInfo})` : '';
        this.approvalFieldInfo.workflow.inputValue = result.workflowTitle;
        this.approvalFieldInfo.requestCode.inputValue = this.approvalProcessObj.requestCode;
        this.approvalActionList = result.actions ?? [];
        this.actionList = this.getActionDropdownList;
    }

    handleRoutingDetailsByLevelAction(result: any) {
        const users = result?.users ?? [];
        if (users.length <= 0)
            return this._alert.warning(AlertMSG.No_USER_SINGLE);

        this.approvalUserList = users;
        this.usersList = this.getUserDropdownList;

        this._dataStore.setStoreData('GetRoutingDetailsByLevelAction', result);
    }

    handleRequestBasicInfo(result: any) {
        this.dataSource = CommonMethods.bindMaterialGridData(CommonMethods.increaseSNo(result?.actionHistory ?? []));
        this._dataStore.setStoreData('GetRequestBasicInfoNew', JSON.parse(JSON.stringify(result?.actionHistory ?? [])));
    }

    handleConfirmRequest(result: any) {
        if (result.resultFlag == MessageResponseCode.success) {
            this._alert.success(CustomFieldMessages.confirmMsg);
            this.closeDialog();
            this._route.navigateByUrl(NavigateUrls.home);
        }
        else
            this._alert.warning(result.resultFlag);
    }

    getWorkflowActionsByLevel() {
        if (this.approvalProcessObj.levelID > 0)
            this._service.getApiService(ApprovalProcessServiceUrls.GetWorkflowActionsByLevel, [String(this.approvalProcessObj.levelID)], ApprovalPurpose.GetWorkflowActionsByLevel, environment.workFlowApiUrl);
    }

    getRoutingDetailsByLevelAction() {
        if (!this._dataStore.hasStoreData('GetRoutingDetailsByLevelAction')) {
            const payload = new WorkflowRoutingBO();
            payload.routingLevelID = this.approvalAction.routingLevelID;
            payload.workflowAssignmentId = this.workflowMappingID;

            this._service.postApiService(ApprovalProcessServiceUrls.GetRoutingDetailsByLevelAction, payload, ApprovalPurpose.GetRoutingDetailsByLevelAction, [], environment.workFlowApiUrl);
        }
        else {
            this.handleRoutingDetailsByLevelAction(this._dataStore.getStoredData('GetRoutingDetailsByLevelAction'));
        }
    }

    changeAction(actionID: number) {
        this.usersList = this.approvalUserList = [];
        this.approvalProcessObj.actionID = actionID;
        this.approvalAction = this.approvalActionList.find((x: ApprovalActionBO) => x.actionID === actionID) ?? new ApprovalActionBO();
        this.approvalFieldInfo.statusInfo.inputValue = this.approvalAction.status;

        if (this.approvalAction.routingLevelID > 0 && this.approvalAction.escalationType === ApprovalConstants.SINGLE_USER) {
            this.getRoutingDetailsByLevelAction();
        }
    }

    get getUserDropdownList(): ICustomDropdownNCheckListData[] {
        return this.approvalUserList.map(x => ({
            itemID: x.userID,
            itemCode: x.userName,
            item: x.userName,
            isSelected: false
        }));
    }

    get getActionDropdownList(): ICustomDropdownNCheckListData[] {
        return this.approvalActionList.map(x => ({
            itemID: x.actionID,
            itemCode: x.actionCode,
            item: x.action,
            isSelected: false
        }));
    }

    toggleChange(val: string) {
        this.approvalFieldInfo.viewId = val;
        if (this.approvalFieldInfo.viewId !== ApprovalConstants.ACTION_HISTORY) {
            return;
        }

        if (this._dataStore.hasStoreData('GetRequestBasicInfoNew'))
            this.handleRequestBasicInfo(this._dataStore.getStoredData('GetRequestBasicInfoNew'));
        else
            this.getRequestBasicInfo(this.approvalProcessObj.basicInfoId);
    }

    addUser() {
        if (this.approvalFieldInfo.userID <= 0)
            return this._alert.warning(AlertMSG.No_USER_SELECT);

        if (this.todoUsersList.some(x => x.userID === this.approvalFieldInfo.userID))
            return this._alert.warning(AlertMSG.Existing_User);

        if (this.todoUsersList.some(x => x.userID !== this.approvalFieldInfo.userID)) {
            this._confirm.confirm(AlertMSG.Modify_User).subscribe(resp => {
                if (!resp) {
                    this.approvalFieldInfo.userID = 0;
                    return;
                }
                this.setAddedUser();
            })
            return;
        }

        this.setAddedUser();
    }

    setAddedUser() {
        this.nextLevelUserID = this.approvalFieldInfo.userID;
        const usersData = this.approvalUserList.filter(x => x.userID == this.nextLevelUserID);
        this.todoUsersList = usersData;
        this.prepareDataSource();
        this.approvalFieldInfo.userID = 0;
    }

    prepareDataSource() {
        let searchAction: GridPageActions = new GridPageActions();
        searchAction.basicInfo = { action: this.actions, onActionClick: (data, action) => this.getActionClickData(data, action) };
        this.userDataSource = CommonMethods.bindMaterialGridData(searchAction.appendActions(this.todoUsersList, GLOBAL_CONSTANTS.NO_CONDITION));
    }

    getActionClickData(data: any, action: string) {
        const handler = this.actionHandler[action];
        if (handler) {
            handler(data);
        }
    }

    removeUser(data: any) {
        this.todoUsersList = [];
        this.prepareDataSource();
    }

    confirm() {
        let errMsg = CommonMethods.validation(this.validate.toArray());
        const { actionCode, escalationType } = this.approvalAction;

        if (this.isUserSelectValidation(actionCode, escalationType) && this.approvalAction.routingLevelID > 0)
            return this._alert.warning(AlertMSG.AT_LEAST_ONE_USR);

        if (CommonMethods.hasValue(errMsg) && actionCode !== ApprovalConstants.APP)
            return this._alert.warning(errMsg);

        this.btnDisabled = true;

        this.confirmRequest();
    }

    confirmRequest() {
        const payload = new ConfirmReqBO();
        Object.assign(payload, this.approvalAction);
        Object.assign(payload, this.approvalProcessObj);

        payload.userID = this.nextLevelUserID;
        payload.routingLevelNum = this.approvalAction.routingLevelNo;
        payload.routingLevelID = this.approvalAction.routingLevelID;

        this._service.postApiService(ApprovalProcessServiceUrls.ConfirmRequest, payload, ApprovalPurpose.ConfirmRequest, [], environment.baseUrl);
    }

    isUserSelectValidation(actionCode: string, escalationType: string): boolean {
        return ((actionCode === ApprovalConstants.CAN || actionCode === ApprovalConstants.APP) && escalationType === ApprovalConstants.SINGLE_USER && this.todoUsersList.length <= 0);
    }

    closeDialog() {
        this._dialogRef.close();
        this.approvalProcessObj.actionID = 0;
        this.approvalProcessObj.remarks = "";
        this._dataStore.clearStoreByKey('GetWorkflowLevelsDetailsByWorkflowId');
        this._dataStore.clearStoreByKey('GetRequestBasicInfoNew');
        this._dataStore.clearStoreByKey('GetRoutingDetailsByLevelAction');
    }

    ngOnDestroy() {
        this.subscription$.unsubscribe();
    }
}
