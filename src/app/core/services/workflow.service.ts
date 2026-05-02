import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CommonReqServiceUrls, CommonReqPurposeCode } from '../../shared/utility/commonServiceUrls';
import { TransactionService } from './commonTransaction.service';
import { GLOBAL_CONSTANTS, MODE_TYPE } from '../../shared/utility/constant';
import { PageUrls } from '../../shared/login/login.model';
import { ViewHistoryBO } from '../context/contextModel';

@Injectable()

export class WorkflowService extends TransactionService {

    constructor() {
        super();
    }

    getBasicDetails() {
        this.subscription$.add(this._actRoute.queryParams.subscribe(params => {
            this.requestID = Number(params['id'] || this.requestID);
            this.basicInfoID = Number(params['bid'] || this.basicInfoID);
            this.formID = Number(params["formID"] || this.formID);
        }));
    }

    getRoutingData(backUrl: string = ""): void {
        this.isManage = (this.routeMode === MODE_TYPE.MANAGE);
        this._context.pageHeaderInfo.pageMode = this.routeMode;
        this._context.preparePageHeaderInfo(backUrl);
        this.handleShowConfirmBtn();
    }

    getWorkFlowInfo(): void {
        if (!this.requestID && !this.basicInfoID && this.formID) {
            this._service.getApiService(CommonReqServiceUrls.GetWorkflowDetailsByForm, [String(this.formID)], CommonReqPurposeCode.GetWorkflowDetailsByForm, environment.workFlowApiUrl);
        }
        else {
            this.getRequestBasicInfo(this.basicInfoID);
        }
    }

    handleWorkflowDetails(result: any) {
        if (result && result?.workflowID <= 0) {
            this._confirm.confirm("Please configure the workflow to proceed further", 'Confirmation', 'Ok', '').subscribe(x => {
                this._route.navigateByUrl(PageUrls.homePage);
            });
        }

        this.clearComponentStore();
    }

    setPageHeader(result: any) {
        this._context.pageHeaderInfo.status = result.status;
        this._context.pageHeaderInfo.refNo = result.requestCode;
        this._context.pageHeaderInfo.viewHistory = result.actionHistoryData ?? new ViewHistoryBO();
        this._context.pageHeaderInfo.viewHistoryVisible = (this.basicInfoID > 0);
        this.preparePageHeaderInfo(result);

        this.getComponentsByForm();
    }

    preparePageHeaderInfo(result: any) {
        this._context.pageHeaderInfo.confirmBO.basicInfoId = this._context.pageHeaderInfo.basicInfoId = result.basicInfoId;
        this._context.pageHeaderInfo.confirmBO.workflowID = this._context.pageHeaderInfo.workflowID = result.workflowID;
        this._context.pageHeaderInfo.confirmBO.levelID = this._context.pageHeaderInfo.levelID = result.levelID ?? 0;
        this._context.pageHeaderInfo.confirmBO.requestCode = result.requestCode;

        this._context.pageHeaderInfo.workflowMappingID = result.workflowAssignmentID ?? 0;
        this._context.pageHeaderInfo.confirmBO.requestId = this.requestID;
        this._context.pageHeaderInfo.confirmBO.moduleCode = result.moduleCode;
        this._context.pageHeaderInfo.confirmBO.formID = result.formId ?? 0;
        this._context.pageHeaderInfo.confirmBO.levelNo = result.levelNo ?? 0;
    }

    handleShowConfirmBtn() {
        this._context.pageHeaderInfo.showConfirm = (this.isManage && this.isApprovalWKType);
    }

    get isApprovalWKType(): boolean {
        return (this._context.getFormDataByKey(this.formID, 'formsID', 'approvalType') === GLOBAL_CONSTANTS.WORKFLOW);
    }
}
