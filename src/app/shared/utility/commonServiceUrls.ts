export class CommonServiceUrls {
    public static getMenuList = "Workflow/GetMenuListByAppCode?appCode={0}";
   // public static getMenuList = "Workflow/GetMenuListByAppCode";
    public static toDOListCount = "CommonMethods/GetTodoListFormsCount";//"Common/TodoListFormsCount?appCode={0}";
    public static getRequestBasicInfoByFormID = "CommonMethods/GetRequestBasicInfoByForm?formId={0}";
    // public static getToDoListItemsById = "Common/GetToDoListItemsByFormID?formID={0}&appCode={1}";
    public static actionHistoryGrid = "ApprovalProcess/ActionHistoryGrid?basicInfoID={0}";
    public static getChangeStatusHistory = "ChangeStatus/GetChangeStatusHistory";
    public static getLookupData = "lookup/GetLookupData?dataSourceID={0}&searchText={1}";
    public static validateRule = "RulesExecution/ValidateRule";
    public static getLookupInfo = "Lookup/GetLookupInfo";
    public static GetAddedItems = "CheckList/GetAddedItems?checkListID={0}";
    public static CloneCheckList = "CheckList/CloneCheckList?checkListID={0}&moduleCode={1}&checkListTitle={2}";
    public static GetHeaderData = "CheckList/GetHeaderData?checkListID={0}";
    public static getFormsByModule = "Form/GetFormsByModule?appCode={0}";
    public static getActionHistoryWithReq = "ApprovalProcess/GetRequestBasicInfo?basicInfoID={0}";
    public static getLookupInfoByLookUpCode = "Lookup/GetLookupInfo?lookupCode={0}";
    public static getRevisonHistoryDetails = "FormRevision/GetRevisonHistoryDetails?submissionID={0}&moduleCode={1}";
    public static getApplication = "Login/GetLoginApplications?loginID={0}";
    public static GetAllModules = "Module/GetAllModules?appCode={0}";

    public static GetLookupConfiguration = "LookUp/GetLookupConfiguration?lookUpCode={0}&formCode={1}";
    public static ExecuteCustomLookup = "LookUp/ExecuteCustomLookup";
    
    public static CheckAndSetCurrentUser = "RequestBase/CheckAndSetCurrentUser?basicInfoID={0}";
    public static DeleteCurrentUser = "RequestBase/DeleteCurrentUser?basicInfoID={0}";

    //-----------------
    public static getUserMasterItems = "UserMasters/GetUserMasterItems?formCode={0}";
    public static getModulesByAppCode = "UserMasters/GetModulesByAppCode?appCode={0}";
    public static getCurrentDateTime = "Common/GetCurrentDateTime";
    //--
    public static getModuleGridColumns = "SearchConfiguration/GetModuleGridColumns?moduleCode={0}&appCode={1}";
}

//-------------------------------------------------------------------------------------------------

export const CommonReqServiceUrls = {
    GetApplications: "Login/GetApplications",
    GetModulesByAppCode: "UserMasters/GetModulesByAppCode?appCode={0}",
    GetAllFunctionalOptionsByModuleCode: "Common/GetAllFunctionalOptionsByModuleCode?moduleID={0}",
    GetUploadDocumentListControlsByFormID: "Form/GetUploadDocumentListControlsByFormID?formID={0}",
    GetComponentsByFormID: "Form/GetComponentsByFormID?formID={0}",
    GetCategoryItemsByCatCode: "CommonMethods/GetCategoryItemsByCatCode?catCode={0}",
    GetRequestBasicInfoNew: "CommonMethods/GetRequestBasicInfo?basicinfoId={0}",
    GetRevisionHistoryDetails: "CommonMethods/GetRevisionHistoryDetails?basicInfoID={0}&moduleCode={1}",
    GetActiveUnits: "Common/GetActiveUnits",
    GetActUnitMappedDepartments: "Facility/GetActUnitMappedDepartments?unitID={0}",
    GetUnitSpecificBatchNumbers: "Inventory/GetUnitSpecificBatchNumbers",
    GetAllInventoryMasterAreas: "QRCS/GetInventoryMasterAreas",
    GetCatItemsByCode: "Common/GetSyncCatItemsByCode?categoryCode={0}",
    GetMaterialsByCategoryID: "Material/GetMaterialsByCategoryID?categoryID={0}",
    GetMaterialBatchesByUnit: "Inventory/GetMaterialBatchesByUnit?materialID={0}",
    GetWipBatchesByUnit: "Inventory/GetWipBatchesByUnit",

    //-----WORKFLOW
    GetComponentsByForm: "Workflow/GetComponentsByForm",
    GetWorkflowDetailsByForm: "Workflow/GetWorkflowDetailsByForm?formID={0}",

    GetDataSourceApplications: "DataSource/GetDataSourceApplications",
    GetDataSourceModulesByAppCode: "DataSource/GetDataSourceModulesByAppCode?appCode={0}",
}

export const CommonReqPurposeCode = {
    GetMenuListByAppCode: "Workflow/GetMenuListByAppCode",

    GetApplications: "Login/GetApplications",
    GetModulesByAppCode: "UserMasters/GetModulesByAppCode",
    GetAllFunctionalOptionsByModuleCode: "Common/GetAllFunctionalOptionsByModuleCode",
    GetUploadDocumentListControlsByFormID: "Form/GetUploadDocumentListControlsByFormID",
    GetComponentsByFormID: "Form/GetComponentsByFormID",
    GetCategoryItemsByCatCode: "CommonMethods/GetCategoryItemsByCatCode",
    GetRequestBasicInfoNew: "CommonMethods/GetRequestBasicInfoNew",
    GetRevisionHistoryDetails: "CommonMethods/GetRevisionHistoryDetails",
    GetActiveUnits: "Common/GetActiveUnits",
    GetActUnitMappedDepartments: "Facility/GetActUnitMappedDepartments?unitID={0}",
    GetUnitSpecificBatchNumbers: "Inventory/GetUnitSpecificBatchNumbers",
    GetAllInventoryMasterAreas: "QRCS/GetInventoryMasterAreas",
    GetMaterialsByCategoryID: "Material/GetMaterialsByCategoryID",
    GetMaterialBatchesByUnit: "Inventory/GetMaterialBatchesByUnit",
    GetWipBatchesByUnit : "Inventory/GetWipBatchesByUnit",

    //-----WORKFLOW
    GetComponentsByForm: "Workflow/GetComponentsByForm",
    GetWorkflowDetailsByForm: "Workflow/GetWorkflowDetailsByForm",

    GetDataSourceApplications: "DataSource/GetDataSourceApplications",
    GetDataSourceModulesByAppCode: "DataSource/GetDataSourceModulesByAppCode",
}
