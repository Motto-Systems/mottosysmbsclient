import { environment } from "../../../environments/environment";

export class loginCredentials {
    LoginID: string = "";
    Password: string = "";
    RemoveExistingLog: boolean = true;
    key: string = "";
    IsCommonLogin: boolean = false;
    appCode: string = environment.appCode;
}

export class LoginServiceUrls
{
    public static validateLogin = "Login/ValidateLogin";
}

export class PageUrls {
    static login = "/login";
    static userLanding = "switch";
    static logout = "logout";
    static dyncManagePage = "/root/dynamic/manage";
    static dyncViewPage = "/root/dynamic/view";
    static homePage ="/root/home";
    static dyncSearchPage = "/root/dynamic/search";
    static dyncConfigPage = "/root/dynamic/config";

}

export class LoginMesages {
    public static loginID = "Please enter login ID";
    public static password = "Please enter password";
}