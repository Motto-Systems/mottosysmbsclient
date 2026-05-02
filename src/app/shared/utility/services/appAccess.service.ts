import { computed, inject, Injectable, signal } from "@angular/core";
import { AppRequestInfoBO, LoginRespBO } from "../commonModel";
import { CookieService } from "ngx-cookie-service";
import { ActivatedRoute } from '@angular/router';
import { CommonMethods } from "../commonMethods";
import { loginCredentials, LoginServiceUrls } from "../../login/login.model";
import { environment } from "../../../../environments/environment";
import { CommonPurposeCodes, CustomFieldMessages } from "../constant";
import { TransactionService } from "../../../core/services/commonTransaction.service";
import { AppContext } from "../../../core/context/contextModel";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })

export class AppAccessService extends TransactionService {

    accessReqBO: AppRequestInfoBO = new AppRequestInfoBO();
    userToken = signal<string>("");

    isValidToken = computed(() => CommonMethods.hasValue(this.userToken()));

    loginResp$: Subject<LoginRespBO> = new Subject<LoginRespBO>();
    _cookieService = inject(CookieService);
    _actRouter = inject(ActivatedRoute);

    constructor() {
        super();
        this.handleLoginResponse();
        this.getRouteParameters();
    }

    getRouteParameters() {
        this._actRouter.queryParams.subscribe(param => {
            this.accessReqBO = JSON.parse(param['appReqBO'] || JSON.stringify(new AppRequestInfoBO()));
        });
    }

    handleLoginResponse() {
        this._service.subject$.subscribe((resp: any) => {
            if (resp.purpose === CommonPurposeCodes.ValidateLogin) {
                this._loader.hide();
                this.setAppContext(resp.result);
                this.userToken.set(this._context.appContext.msplToken);
                this.loginResp$.next(new LoginRespBO(this.isValidToken()));
            }
        })
    }

    loginProcess() {
        if (this.isValidMsplToken()) {
            this.userToken.set(this._context.appContext.msplToken);
            this.loginResp$.next(new LoginRespBO(this.isValidMsplToken()));
            return;
        }

        const tokenKey = this.validateAndGetToken();
        if (!tokenKey) {
            return;
        }

        this._loader.show("Validating User...");

        this.performLogin(tokenKey);
    }

    private isValidMsplToken(): boolean {
        return CommonMethods.hasValue(this._context.appContext.msplToken);
    }

    private validateAndGetToken(): string | null {
        const tokenName = environment.usrMngUrlMode;
        const token = this._cookieService.get(tokenName);

        if (!CommonMethods.hasValue(token)) {
            this._alert.error(CustomFieldMessages.invalidUser);
            return null;
        }

        return token;
    }

    private performLogin(tokenKey: string) {
        const loginBo: loginCredentials = new loginCredentials();
        loginBo.key = tokenKey;
        loginBo.IsCommonLogin = true;

        this._service.postApiService(LoginServiceUrls.validateLogin, loginBo, CommonPurposeCodes.ValidateLogin, [], environment.usmApiUrl);
    }

    setAppContext(result: any) {
        this._context.appContext = new AppContext();
        this._context.appContext.userDetails = result;
        this._context.appContext.msplToken = result.token;
        this._context.appContext.logKey = result.userLogKey;

        this._context.setSession();

    }


}
