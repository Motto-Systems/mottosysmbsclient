import { Injectable, inject } from '@angular/core';
import { MasterService } from './master.service';
import { AlertService } from './alert.service';
import { AppContextService } from '../context/appContext.service';
import { ConfirmationService } from './confirmationService';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { ComponentCode, GLOBAL_CONSTANTS, MODE_TYPE } from '../../shared/utility/constant';
import { ICustomDropdownNCheckListData } from '../../shared/globalShared/customCheckList/customChecklistModel';
import { GetComponentsBO, ItemKey } from '../../shared/utility/commonModel';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomLoaderService } from './customLoaderService';
import { CommonReqPurposeCode, CommonReqServiceUrls } from '../../shared/utility/commonServiceUrls';
import { CommonMethods } from '../../shared/utility/commonMethods';
import { environment } from '../../../environments/environment';
import { DataStoreService } from './dataStore.service';
import { ComponentStoreService } from './componentStore.service';

@Injectable()

export class TransactionService {

    formID: number = 0;
    moduleCode: string = "";
    btnDisabled: boolean = false;

    requestID: number = 0;
    basicInfoID: number = 0;
    isManage: boolean = false;
    actionCode: string = "";
    routeMode: MODE_TYPE = MODE_TYPE.MANAGE;

    subscription$: Subscription = new Subscription();

    _service = inject(MasterService);
    _alert = inject(AlertService);
    _context = inject(AppContextService);
    _confirm = inject(ConfirmationService);
    _dialog = inject(MatDialog);
    _route = inject(Router);
    _actRoute = inject(ActivatedRoute);
    _loader = inject(CustomLoaderService);
    _dataStore = inject(DataStoreService);
    _componentStore = inject(ComponentStoreService);

    constructor() {
        this.moduleCode = sessionStorage.getItem(GLOBAL_CONSTANTS.MODULE_CODE) ?? GLOBAL_CONSTANTS.EMPTY;
        this.formID = Number(sessionStorage.getItem(GLOBAL_CONSTANTS.FORMS_ID)) ?? 0;
        this.routeMode = this._actRoute.snapshot.data['mode'] ?? MODE_TYPE.MANAGE;
    }

    getItemValueFromCustomList<T, U>(list: ICustomDropdownNCheckListData[], compareKey: keyof ICustomDropdownNCheckListData, compareValue: U, returnKey: keyof ICustomDropdownNCheckListData): T {
        return (list.find((e: ICustomDropdownNCheckListData) => e[compareKey] === compareValue)?.[returnKey] as T);
    }

    get unitID() {
        return this._context.appContext.userDetails.unitID;
    }

    getApplicationsData() {
        this._service.getApiService(CommonReqServiceUrls.GetDataSourceApplications, [''], CommonReqPurposeCode.GetDataSourceApplications);
    }

    getModulesDataByAppCode(appCode: string) {
        if (CommonMethods.hasValue(appCode))
            this._service.getApiService(CommonReqServiceUrls.GetDataSourceModulesByAppCode, [appCode], CommonReqPurposeCode.GetDataSourceModulesByAppCode);
    }

    setRequestID(id: number) {
        this.requestID = id > 0 ? id : this.requestID;
        this._context.pageHeaderInfo.confirmBO.requestId = this.requestID;
    }

    getRequestBasicInfo(basicInfoID: number = 0) {
        this.basicInfoID = basicInfoID > 0 ? basicInfoID : this.basicInfoID;
        if (this.basicInfoID > 0) {
            this._service.getApiService(CommonReqServiceUrls.GetRequestBasicInfoNew, [String(this.basicInfoID)], CommonReqPurposeCode.GetRequestBasicInfoNew);
        }
    }

    getComponentsByForm() {
        const payload = new GetComponentsBO();
        payload.formID = this.formID;
        payload.moduleMappingID = this._context.pageHeaderInfo.workflowMappingID;
        payload.levelID = this._context.pageHeaderInfo.levelID;

        if (this.formID > 0)
            this._service.postApiService(CommonReqServiceUrls.GetComponentsByForm, payload, CommonReqPurposeCode.GetComponentsByForm, [], environment.workFlowApiUrl);
    }

    handleGetComponentsByForm(result: any) {
        this._componentStore.setComponentList(result ?? []);
    }

    getModeInfoByComponent(componentCode: ComponentCode, routeMode: MODE_TYPE): Observable<boolean> {
        return this._componentStore.getModeInfoByComponentCode(componentCode, routeMode);
    }

    clearComponentStore() {
        this._componentStore.setComponentList([]);
    }
}
