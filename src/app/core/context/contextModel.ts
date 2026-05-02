import { ApprovalProcessBO } from "../../feature/approval/approveModel";
import { FormRules } from "../../feature/dynamicModule/dynamicModels";
import { ModuleSubModule } from "../../shared/home/environment/environment.model";
import { MODE_TYPE } from "../../shared/utility/constant";

export class AppContext {
    msplToken: string = "";
    logKey: string = "";
    userDetails: UserDetails = new UserDetails();
    capabilities: CapabilitiesBOList = new CapabilitiesBOList();
    moduleList: ModuleSubModule[] = [];
    formsList: FormInfoBO[] = [];
}


export interface ICapabilitiesBO {
    moduleCode: string;
    capabilityCode: string;
}
export class CapabilitiesBOList extends Array<ICapabilitiesBO> { }

export class UserDetails {
    userName: string = "";
    lastLogin: string = "";
    designationName: string = "";
    shortName: string = "";
    unitName: string = "";
    deptName: string = "";
    deptCode: string = "";
    userLogKey: string = "";
    utcTimeZone: string = "";
    loginID: string = "";
    unitActualID: string = "";
    userActualID: string = "";
    deptID: string = "";
    organizationID: string = "";
    userID: string = "";
    unitID: string = "";
    primaryDeptName: string = "";
    primaryUnitName: string = ""
}

export class PageHeaderInfo {
    pageTitle: string = "";
    status: string = "";
    refNo: string = "";
    backUrl: string = "";
    viewHistory: ViewHistoryBO = new ViewHistoryBO();;
    viewHistoryVisible: boolean = false;
    isShowDoc: boolean = false;
    changeHistory: any;
    confirmBO: ApprovalProcessBO = new ApprovalProcessBO()
    showConfirm: boolean = false;
    // appBo: AppBO = new AppBO();
    // mode: string = MODE_TYPE.MANAGE;
    isShowRpt: boolean = false;
    moduleCode: string = "";
    encModuleRefID: string = "";
    extensionCode: string = "";
    encExtensionRefID: string = "";
    section: string = "";
    showSpecificDocs: boolean = false;
    showPageHeader: boolean = true;
    basicInfoId: number = 0;
    workflowID: number = 0;
    confirmationRules: Array<FormRules> = [];
    moduleTitle: string = ""
    workflowMappingID: number = 0;
    referenceID: string = "";
    levelNo: number = 0;
    viewExceptionVisible: boolean = false;
    submissionID: string = "";
    pageMode: string = MODE_TYPE.MANAGE;
    levelID: number = 0;

    constructor(pageTitle: string = "", backUrl: string = "",
        viewHistoryVisible: boolean = false, viewHistory: ViewHistoryBO = new ViewHistoryBO(),
        status: string = "", refNo: string = "") {

        this.pageTitle = pageTitle;
        this.status = status;
        this.refNo = refNo;
        this.backUrl = backUrl;
        this.viewHistoryVisible = viewHistoryVisible;
        this.viewHistory = viewHistory;
    }
}

export class IBackUrlsBO {
    url: string = "";
}
export class BackUrlsBOList extends Array<IBackUrlsBO> { }

export class ViewHistoryBO {
    // extensionCode: string = "";
    // moduleCode?: string = "";
    // encActualID: string = "";
    // sectionCode: string = "";
    // showStatusHistory: boolean = false;
    // showActionHistory?: boolean = true;
    // showExtensionName: boolean = false;
    // showReopenHistory: boolean = false;
    basicInfoID: string = "";
    showStatusHistory: boolean = false;
    requestID = "";
    purpose = "";
}

export class ActionHistory {
    basicInfoID: string = "";
}

export class ChangeStatusHistory {
    requestID: string = "";
    purpose: string = "";
}

export class AllModulesBO {
    moduleCode: string = "";
    module: string = "";
    navigationPath: string = "";
    formsInfo: FormInfoBO[] = [];
    moduleList: any[] = [];
}

export class FormInfoBO {
    formsID: number = 0;
    formsTitle: string = "";
    formsCode: string = "";
    formRoute: string = "";
    formType: string = "";
    aliasTitle: string = "";
    approvalType: string = "";
    moduleID: number = 0;
    moduleCode: string = "";
    orderNum: number = 0;
    displayMenu: string = "";
    capability: string = "";
}

export class AllModulesBOList extends Array<AllModulesBO> { }