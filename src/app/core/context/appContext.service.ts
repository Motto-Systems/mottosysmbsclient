import { Injectable } from "@angular/core";
import { AllModulesBOList, AppContext, FormInfoBO, PageHeaderInfo } from "./contextModel";
import { GLOBAL_CONSTANTS, MODE_TYPE, PAGE_MODE, STORAGE_KEY } from "../../shared/utility/constant";
import { CookieService } from "ngx-cookie-service";
import { environment } from "../../../environments/environment";
import { Subject } from "rxjs";
import { PageUrls } from "../../shared/login/login.model";

@Injectable()

export class AppContextService {
    appContext: AppContext = new AppContext();
    pageHeaderInfo: PageHeaderInfo = new PageHeaderInfo();
    contextKey: STORAGE_KEY = 'MSPL_CONTEXT';
    currentGroup: string = "ToDo";
    public iSShowDynamicTabsSkeleton: Subject<any> = new Subject();

    moduleList$: Subject<any> = new Subject(); //Storing module and page titles; to show them in static pages.
    moduleList: any = [];

    constructor(private _cookieService: CookieService) {
        if (sessionStorage.getItem(this.contextKey))
            this.appContext = this.getCustomSessionStorage<AppContext>(this.contextKey);
    }
    public setCustomSessionStorage<T>(key: STORAGE_KEY, val: T) {
        sessionStorage.setItem(key, JSON.stringify(val));
    }

    public getCustomSessionStorage<T>(key: STORAGE_KEY): T {
        var data: T;
        if (sessionStorage.getItem(key))
            data = JSON.parse(sessionStorage.getItem(key) || "");
        else
            data = {} as T
        return data;
    }

    public removeCustomSessionStorage(key: STORAGE_KEY) {
        sessionStorage.removeItem(key);
    }

    getAllModulesList(key: STORAGE_KEY = "FME_MODULES"): AllModulesBOList {
        return this.getCustomSessionStorage<AllModulesBOList>(key);
    }

    setAllModulesList(list: AllModulesBOList) {
        return this.setCustomSessionStorage<AllModulesBOList>("FME_MODULES", list);
    }


    getModuleName(moduleCode: string, mode: PAGE_MODE, extensionCode: string = "") {
        let pageTitle: string;
        let moduleList = this.getAllModulesList();

        pageTitle = mode + ' ' + moduleList.filter((x: any) => x.moduleCode == moduleCode)[0].module;

        return pageTitle;
    }

    setTokenToCookies() {
        this._cookieService.set(environment.usrMngUrlMode, this.appContext.userDetails.userLogKey, 10000, '/', environment.usrSetDomain, false, "Lax");
    }

    getTokenCookie(tokenName: string) {
        return this._cookieService.get(tokenName);
    }

    setSession() {
        this.setCustomSessionStorage<AppContext>(this.contextKey, this.appContext);
    }

    setModuleList(list: any) {
        this.moduleList$.next(list);
        this.moduleList = list;
        this.preparePageHeaderInfo();
    }

    preparePageHeaderInfo(backUrl: string = PageUrls.homePage) {
        const moduleCode = sessionStorage.getItem("moduleCode") ?? '';
        const formsID = sessionStorage.getItem("formsId") ?? '';
        this.setPageHeaderData(moduleCode, formsID, backUrl);
    }

    setPageHeaderData(moduleCode: string, formID: string, backUrl: string) {
        const moduleData: any = this.appContext.moduleList.find((x: any) => x.moduleCode === moduleCode);
        const formTitle = moduleData?.formsInfo?.find((x: any) => x.formsID == formID)?.formsTitle
        if (moduleData) {
            this.pageHeaderInfo.moduleTitle = moduleData.moduleTitle;
            this.pageHeaderInfo.pageTitle = this.pageHeaderInfo.pageMode === MODE_TYPE.MANAGE ? formTitle : `View ${moduleData.moduleTitle}`;
        }
        this.pageHeaderInfo.backUrl = this.pageHeaderInfo.pageMode === MODE_TYPE.MANAGE ? PageUrls.homePage : backUrl;
    }

    getFormDataByKey<T, U>(itemValue: U, compareKey: keyof FormInfoBO, returnKey: keyof FormInfoBO = 'formsID'): T {
        return this.appContext.formsList.find(f => f[compareKey] === itemValue)?.[returnKey] as T;
    }

    getFormDataByModuleCodeFormID<T>(moduleCode: string, formID: number, key: keyof FormInfoBO = 'formsID'): T {
        return this.appContext.formsList.find(f => f.moduleCode === moduleCode && f.formsID === formID)?.[key] as T;
    }

    getModuleNameByCode(code: string = ""): string {
        const moduleCode = (code || sessionStorage.getItem(GLOBAL_CONSTANTS.MODULE_CODE)) ?? '';
        return this.appContext.moduleList.find(m => m.moduleCode === moduleCode)?.moduleTitle as string;
    }

    getCapabilityModeByFormValue<T>(value: T, compareKey: keyof FormInfoBO): string {
        debugger;
        const capability = this.appContext.formsList.find(f => f[compareKey] === value)?.capability ?? "VIEW";
        return (capability.toUpperCase() === "MANAGE" ? MODE_TYPE.MANAGE : MODE_TYPE.VIEW);
    }

    hasFormAccessCapability(value: any, compareKey: keyof FormInfoBO): boolean {
        const hasForm =  this.appContext.formsList.find(f => f[compareKey] === value);
        return !!hasForm;
    }

    clearPageHeaderInfo() {
        this.pageHeaderInfo = new PageHeaderInfo();
    }

    clearSession() {
        sessionStorage.clear();
        this.appContext = new AppContext();
    }

    ShowDynamicTabsSkeleton(val: any) {
        this.iSShowDynamicTabsSkeleton.next(val);
    }
}
