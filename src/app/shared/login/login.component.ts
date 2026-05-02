import { Component, OnDestroy } from "@angular/core";
import { HelpersModule } from "../globalShared/globalShared.module";
import { Router } from "@angular/router";
import { AppContextService } from "../../core/context/appContext.service";
import { MasterService } from "../../core/services/master.service";
import { LoginMesages, LoginServiceUrls, loginCredentials } from "./login.model";
import { CommonMethods } from "../utility/commonMethods";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { AlertService } from "../../core/services/alert.service";
import { CookieService } from "ngx-cookie-service";
import { UserLogoutService } from "./logout.service";

import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { AppContext, UserDetails } from "../../core/context/contextModel";
import { Subscription } from "rxjs";
import { environment } from "../../../environments/environment";
import { NavigateUrls } from "../utility/navigateUrls";

@Component({
    selector: 'login',
    templateUrl: './login.html',
    standalone: true,
    imports: [HelpersModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
    providers: [AlertService, UserLogoutService]

})

export class LoginComponent implements OnDestroy {
    isProd: boolean = environment.production;
    loginForm: FormGroup;
    btnDisabled: boolean = false;
    userToken: string = "";
    appName: string = environment.appCode;

    subscription$: Subscription = new Subscription();

    constructor(private _router: Router, private _context: AppContextService,
        private _loginService: MasterService, private _fb: FormBuilder,
        private _alert: AlertService, private _cookieService: CookieService,
        private _logout: UserLogoutService) {
        this.loginForm = this._fb.group({
            userName: ['', [Validators.required]],
            password: ['', [Validators.required]]
        })
    }

    ngAfterViewInit() {
        //this._appContextService.clearSession();
        localStorage.clear();

        this.subscription$ = this._loginService.subject$.subscribe((resp: any) => {
            if (resp.purpose == "login") {
                this.btnDisabled = false;
                if (resp.result.returnValue == "SUCCESS") {
                    this.setContext(resp.result);
                }
                else
                    this._alert.warning(resp.result.returnValue);
            }
        });


        if (this.isProd && !environment.isScanApp)
            this.login();
        else if (environment.isScanApp)
            this._router.navigateByUrl(NavigateUrls.scanAuth);
    }

    setContext(result: any) {
        this._context.appContext = new AppContext();
        let details = new UserDetails();
        details.userLogKey = result.userLogKey;
        this._context.appContext.userDetails = details;
        details.userName = result.userName;
        details.lastLogin = result.lastLogin;
        details.designationName = result.designationName;
        details.loginID = result.loginID;
        details.unitName = result.unitName;
        details.deptName = result.deptName;
        details.deptCode = result.deptCode;
        details.deptCode = result.deptCode;
        details.userLogKey = result.userLogKey;
        details.unitActualID = result.unitActualID;
        details.userActualID = result.userActualID;
        details.deptID = result.deptID;
        details.unitID = result.unitID;
        details.userID = result.userID;
        details.primaryDeptName = result.primaryDeptName;
        details.primaryUnitName = result.primaryUnitName;
        details.organizationID = result.organizationID;
        this._context.appContext.msplToken = result.token;
        this._context.appContext.userDetails = details;
        this._context.appContext.logKey = result.userLogKey;

        this._context.setSession();
        this._router.navigateByUrl("/root/home");

    }

    login() {

        sessionStorage.setItem("BACK_URLS", JSON.stringify([]));

        let loginBo: loginCredentials = new loginCredentials();

        if (!this.isProd) {
            var msg = this.validateControls();

            if (CommonMethods.hasValue(msg))
                return this._alert.warning(msg);

            this.btnDisabled = true;

            loginBo.LoginID = this.loginForm.controls['userName'].value;
            // loginBo.Password = this.loginForm.controls.password.value;
            loginBo.Password = CommonMethods.encryptPassword(this.loginForm.controls['password'].value);
            loginBo.appCode = environment.appCode;
        }
        else {

            var tokenName = environment.usrMngUrlMode;
            this.userToken = this._cookieService.get(tokenName);

            if (!CommonMethods.hasValue(this.userToken))
                this._logout.logOut();

            loginBo.key = this.userToken;
        }
        this._loginService.postApiService(LoginServiceUrls.validateLogin, loginBo, "login", [], environment.usmApiUrl);
    }

    validateControls() {
        if (!CommonMethods.hasValue(this.loginForm.controls['userName'].value))
            return LoginMesages.loginID;
        else if (!CommonMethods.hasValue(this.loginForm.controls['password'].value))
            return LoginMesages.password;
        return '';
    }

    ngOnDestroy(): void {
        this.subscription$.unsubscribe();
    }
}