
import { HelpersModule } from "../globalShared/globalShared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { AlertService } from "../../core/services/alert.service";
import { Component, OnDestroy, QueryList, ViewChildren } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { MasterService } from "../../core/services/master.service";
import { AppContextService } from "../../core/context/appContext.service";
import { CommonMethods } from "../utility/commonMethods";
import { SwitchUnitServiceUrls } from "./switchUnitServiceUrls";
import { CustomFieldMessages } from "../utility/constant";
import { AppContext, UserDetails } from "../../core/context/contextModel";
import { environment } from "../../../environments/environment";
import { Router } from "@angular/router";
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomRespCodes, getDeptListBO, SwitchButtons, SwitchUnitAPIPurpose, SwitchUnitDeptAlerts, SwitchUnitPlaceHolders, switchUserDepartmentBO, UserSwitchUnitInfo } from "./switchUnit.model";

@Component({
    selector: 'switch-unit',
    templateUrl: './switchUnit.html',
    standalone: true,

    imports: [HelpersModule, FlexLayoutModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
    providers: [AlertService]
})

export class SwitchUnitComponent implements OnDestroy {
    title: string = SwitchUnitPlaceHolders.userSwitchUnit;
    switchUserInfo: UserSwitchUnitInfo = new UserSwitchUnitInfo();
    switchResultObj: any;
    subscription$: Subscription = new Subscription();
    appCode: string = environment.appCode;
    switchButton: any = SwitchButtons;

    @ViewChildren(SwitchUnitPlaceHolders.validate) validate: QueryList<any> = new QueryList();

    constructor(public dialogRef: MatDialogRef<SwitchUnitComponent>, private _router: Router,
        private _alert: AlertService, private _service: MasterService, private _context: AppContextService) { }

    ngAfterViewInit() {

        this.subscription$ = this._service.subject$.subscribe(resp => {
            this.doAfterViewInit(resp);
        });

        this.initialLoad();
    }

    initialLoad() {
        this.getUnitDeptList();
    }

    doAfterViewInit(resp: any) {

        switch (resp.purpose) {
            case SwitchUnitAPIPurpose.GetUserAccessDepartmentList:
                this.bindUnitDeptList(resp);
                break;

            case SwitchUnitAPIPurpose.SwitchUserDepartment:
                if (resp.result.returnValue == CustomRespCodes.SUCCESS) {
                    this._alert.success(SwitchUnitDeptAlerts.SwitchUnitDept);
                    this.setContext(resp.result);
                    this.switchResultObj = resp.result;
                    this.cancel();
                    window.location.reload();
                } else {
                    this._alert.showDBMessage(resp.result.returnValue);
                }
                break;

            default:
                break;
        }
    }

    bindUnitDeptList(resp: any) {
        this.switchUserInfo.switchUnitDeptList = resp?.result;
    }

    getUnitDeptList() {
        let obj = new getDeptListBO();
        obj.departmentID = this._context.appContext.userDetails.deptID;
        obj.unitID = this._context.appContext.userDetails.unitID;
        obj.userID = this._context.appContext.userDetails.userID;

        this._service.postApiService(SwitchUnitServiceUrls.GetUserAccessDepartmentList, obj, SwitchUnitAPIPurpose.GetUserAccessDepartmentList,[],environment.usmApiUrl)
    }

    switchUserUnit() {
        let errMsg = CommonMethods.validation(this.validate.toArray())
        if (CommonMethods.hasValue(errMsg))
            return this._alert.warning(errMsg);

        let obj = new switchUserDepartmentBO();
        obj.loginID = this._context.appContext.userDetails.userLogKey;
        obj.userDepartmentAccessID = this.switchUserInfo.userDepartmentAccessID;

        this._service.postApiService(SwitchUnitServiceUrls.SwitchUserDepartment, obj, SwitchUnitAPIPurpose.SwitchUserDepartment,[],environment.usmApiUrl)

    }

    //Set data
    setContext(result: any) {
        this._context.appContext = new AppContext();
        let details = new UserDetails();
        details.userLogKey = result.userLogKey;
        this._context.appContext.userDetails = details;
        this._context.setTokenToCookies();

        details.userName = result.userName;
        details.lastLogin = result.lastLogin;
        details.designationName = result.designationName;
        details.loginID = result.loginID;
        details.unitName = result.unitName;
        details.deptName = result.deptName;
        details.deptCode = result.deptCode;
        details.deptCode = result.deptCode;
        details.userLogKey = result.userLogKey;
        details.unitID = result.unitID;
        details.deptID = result.deptID;
        details.userID = result.userID;
        details.primaryDeptName = result.primaryDeptName;
        details.primaryUnitName = result.primaryUnitName;
        this._context.appContext.msplToken = result.token;
        this._context.appContext.userDetails = details;
        this._context.appContext.logKey = result.userLogKey;
        this._context.setSession();

        this._router.navigateByUrl("/root/home");
    }

    cancel() {
        this.dialogRef.close(this.switchResultObj);
    }

    ngOnDestroy() {
        this.subscription$.unsubscribe();
    }

}