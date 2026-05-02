export class CustomFieldMessages {
  // public static removeMessage="Details removed successfully";

  public static successMessage = "Details saved successfully";
  public static confirmMessage = "Action confirmed successfully";
  public static confirmMsg = "Confirmed successfully";
  public static changeStatusValid = "From status and to status should not be the same, please proceed with another one.";
  public static requestNotGenerated = "Request not initiated. Please check once.";
  public static discardedSuccess = "Request discarded successfully";
  public static discardConfirmation = "Are you sure you want to discard this request?";
  public static requestEditMode = "Selected request is in edit mode, Please check and proceed with another one.";
  public static selectedOptionNotApplicable = "Selected action is not applicable for this request.";
  public static addDuplicate = "Duplicate checklist are not allowed";
  public static unAssignSuccess = "Unassigned successfully";
  public static invalidUser = "Invalid user details";
  public static readonly actionItemNotFound = "Action item not found";


  //#region test box
  public static valueMessage = "Please provide";
  public static numericMessage = "Please enter only numbers in";
  public static decimal = "Please enter only";
  public static validAlphabets = "Please enter only alphabets in";
  public static minLength = "Please enter at least";
  public static validEmail = "Please enter valid";
  public static valueGreaterThanzero = "Please enter value greater than '0' for "
  public static dotDecimal = "Please give valid value in ";
  public static advanceSearchValidation = "Please select at least one search filter";
  public static noChanges = "No changes detected. Please make an update to proceed further";


  //#endregion

  //#region date time picker
  public static dateFromAndTo = "Date from should be greater than date to";
  public static date = "Please select";

  //#endregion

  //#region drop down
  public static multiDropdownvalue = "Please select at least one option for ";
  public static singleDdwn = "Please select ";

  //#endregion

  //#region radio Buttons
  public static radioBtnValidationMsg = "Please select ";
  public static message = "Please enter ";

  //#endregion

  //#region  LookUp
  public static selectedCodeExists = "Selected code is already exists, please proceed with another one";

  public static commentMessage = "Please enter comment";
  //#endregion

  public static commonMsg = "Selected option is not applicable for this request";
  public static commonRevMsg = "Selected option is under revision process..."
  public static newVersionProg = "New version is in progress; cannot proceed with new one.";

  public static bothFacUserSyncAccess = "User sync process is pending; please contact administrator";

  public static appNotAccess = "User sync process is pending; please contact administrator";
  public static facilitySyncAccess = "Facility sync process is pending; please contact administrator";

  public static atleastOne = "Please select at least one ";
  public static slctAll = "Please select all ";
  public static onlyOneItem = "Please select only one ";
  public static clonedSuccess = "Check List Cloned Successfully"

  public static checkListOptionFiledSuccess = "The checklist option has been successfully";
  public static checkListAddedSuccess = "The checklist has been added successfully";
  public static checkListDiscardSuccess = "The checklist has been discarded successfully";
  public static missedCheckListJustification = "Please select the option for #serialnumber and do not allow to proceed";
  public static checkListOptionFiledError = "Please select atleast one checklist option";

  public static selectedOptionNotAutharaised = "You are not authorized to select this action request.";
  public static discardItems = "Item(s) discarded successfully.";
  public static unAssignConfirmation = "Do you wish to unassign selected";

}


export type DATE_FORMAT_TYPE = "dateFormat" | "dateTimeFormat" | "timeFormat";

export type DATE_TYPES = "date" | "dateTime" | "range" | "time" | "sysdatetime";

export type OPERATION_TYPE = "VIEW" | "MNG";

export type VALUE_TYPE = "currency" | "date" | "";

export type TEXTBOX_VIEW_TYPE = "TextBox" | "TextArea";

export type INPUT_TYPES = "all" | "alphaNumeric" | "numeric" | "decimal" | "alphabets" | "email" | "password" | "text";

export type SEARCH_SESSIONBO = "DESIGNATIONS" | "USERS" | "UNITS" | "DEPARTMENTS" | "ROLES" | "TIMEZONE" | "BLOCKS";

export type PAGE_MODE =
  "Search" |
  "Manage" |
  "View" |
  "Clone" |
  ""

export type STORAGE_KEY =
  "MSPL_CONTEXT"
  | "FME_MODULES"

export enum MODE_TYPE {
  MANAGE = "MNG",
  VIEW = "VIEW",
  USERS = "USERS",
  ROLES = "ROLES",
  ASSIGN = "ASSIGN",
  UNASSIGN = "UN-ASSIGN",
  SEARCH = "SEARCH",
  LANDING = "LANDING"
}

//module codes while opening confirm modalpopup
export class ModuleCodes {
  public static workflow = "WKF";
  public static labelDesign = "LABEL_DESIGN";
  public static labelGeneration = "LABEL_GEN";
  public static printRequest = "PRINT_REQ";
}

export class SearchPageTooltip {
  public static advSearchDepartments = "Department Code/Department Name";
  public static advSearchDesignations = "Designation Code/Designation Title";
  public static advSearchBlocks = "Block Code/Block Name";
  public static advSearchRoles = "Role Code/Role Name";
  public static advSearchUnits = "Unit Code / Unit Name";
  public static advSearchUsers = "Login ID / Employee ID";
}

//common responsecode
export class MessageResponseCode {
  public static success = "SUCCESS";
  public static ok = "OK";
}

//common purpose
export class StatusListPurpose {
  public static getStatusList = "getStatusList";
}

export const CommonResponseCode = {
  success: "SUCCESS",
  ok: "OK",
}

//Add buttons
export class ButtonType {
  public static add = "Add";
  public static update = "Update";
  public static submit = "Submit";
  public static change = "Change";
  public static save = "Save";
  public static clear = "Clear";
  public static assign = "Assign";
  public static go = "Go";
  public static unAssign = "Un Assign";
  public static search = "Search";
  public static searchAll = "Search All";
  public static close = "Close";
  public static filter = "Filter";
  public static goToUsersMapping = "Go To Users Mapping";
  public static goToUsersMapped = "Go To Users Mapped";
  public static changeEffectiveDate = "Change Effective Date";
  public static menuTitle = "Menu Title";
  public static checkPoint = "Check Point";
  public static changeOption = "Change Option";
  public static discard = "Discard";
  public static confirm = "Confirm";
  public static generateSerialNumbers = "Generate Serial Numbers";
  public static remove = "Remove";
  public static cancel = "Cancel";
  public static clone = "Clone";
  public static goToMaterialsMapping = "Go To #display# Mapping";
  public static goToMaterialsMapped = "Go To #display# Mapped";
  public static manageStatus = "Manage Status";
  public static manageActions = "Manage Actions";
  public static changePassword = "Change Password";
  public static reset = "Reset";
  public static apply = "Apply";
  public static receive = "Receive";
  public static submitConsumption = "Submit Consumption";
  public static autoConsumption = "Auto Consumption";
  public static yes = "Yes";
  public static export = "Export";
  public static upload = "Upload";
  public static viewDoc = "View Document";
  public static getDetails = "Get Details";
  public static proceed = "Proceed";
  public static deduct = "Deduct";
}

//status list for change-status modal-popup
export class StateCode {
  public static discard = "DISC"; //statuscode
  public static revision = 'REVISION';
  public static delete = "Discarded";
  public static active = "ACTIVE";
  public static inActive = "In Active";
  public static obsolete = "OBSOLETE";
}

//SEARCH fields
export enum SearchSession {
  PAGEIDX = "PAGE_IDX",
  SESSION = "SESSION",
}
//search types
export class SearchTypes {
  public static search = "search";
  public static searchAll = "searchAll";
}
//close search modalpopup
export class CloseModal {
  public static blockSearch = "block-search";
  public static deptSearch = "dept-search";
  public static desgSearch = "desg-search";
  public static roleSearch = "role-search";
  public static unitsSearch = "units-search";
  public static userSearch = "user-search";
}

//user Module change designation/dept/unit
export class OperationCode {
  public static add = "ADD"
}

export class ComponentTypes {
  public static MultipleSubItems = "MultipleSubItems";
  public static Multiple = 'Multiple';
}

export class ValueType {
  public static Negative = "Negative";
  public static Both = "Both";
  public static Positive = "Positive";
}


export const GLOBAL_CONSTANTS = {
  EMPTY: "",
  NO_CONDITION: "NO_CONDITION",
  ADV_SRCH: "ADV_SRCH",
  NOT_ACCESSIBLE: "N/A",
  WORKFLOW: "WORKFLOW",
  NO_ACT_WKF: "NO_ACT_WKF",
  FORMS_ID: "formsId",
  MODULE_CODE: "moduleCode",
  MASTERS: "MASTERS",
  SRCH_FORM_ID: "srchFormId",
};

export const FIELD_VALIDATE = {
  VALIDATE: "validate",
  LOOKUP_VAL: "validateLookUp",
  FILTERS: "filters",
  MENUTITLE_VAL: "validateMenuTitle",
  VALIDATE_FIELDS: "validateFields",
  VALIDATE_SPECIFIC_FIELD: "validateSpecificField",
  TABLE: "table",
  ADV_CHIP_LIST: "advChipList",
  FILTERFIELDVALIDATE: "filterFieldValidate",
  VALIDATE_STATUS: "validateStatus",
  VALIDATE_OUTWARD: "validateOutward",
  VALIDATE_ASSIGN: "validateAssign",
  VALIDATE_OTHERFIELDS: "validateOtherFields",
  VALIDATE_REMARKS: "validateRemarks",
};

export const CHECKBOX_SELECTION = {
  SINGLE: "SINGLE",
  ALL: "ALL"
};

export const STATUS_CODES = {
  OBSE: "OBSE",
  INPROG: "INPROG",
  ACT: "ACT",
  INACT: "INACT",
  DISC: "DISC",

  //Dispatch
  BLOCK: "BLOCK",
  EXPIRED: "EXPIRED"
}


export const FormCodes = {
  newPrintReq: "NEW_PRINT_REQ",
  newLabelDesign: "NEW_LABEL_DESIGN",
  rePrintReq: "RE_PRINT_REQ",
  labelscan: "LABEL_SCAN",
  labelscanner: "LABEL_SCANNER"
}

export const ActionType = {
  SINGLE: "Single",
  MULTIPLE: "Multiple",
  COLUMN: "Column"
}

export const ActionCode = {
  NEW: "NEW",
  EDIT: "EDIT",
  DELETE: "DELETE",
  ASSIGN: "ASSIGN",
  UNASSIGN: "UNASSIGN",
  OTHER: "OTHER",
}

export class IconNames {
  static edit = "edit";
  static close = "close";
  static add = "add";
  static save = 'save';
  static eye = 'eye';
  static confirm = 'check';
  static go = 'arrow-right';
}

export const ExecuteRulesConst = {
  //ruleType
  Validation: "Validation",
  Process: "Process",

  //eventType
  Button: "Button",

  //ComponentType
  Single: "Single",
  Multiple: "Multiple",
}

export const SessionVars = {
  MODULE_CODE: "moduleCode",
}

export const GridConsts = {
  select: "select",
}

export const StateCodes = {
  ACTIVE: "ACTIVE",
  REJECT: "REJECT",
  OBSOLETE: "OBSOLETE",
  COMPLETE: "COMPLETE",
  INACTIVE: "INACTIVE",
  All: "All",
  OPEN: "OPEN",
  
  //---
  DEFAULT: "DEFAULT",
  
}

export const IndentTypes = {
  COMMERCIAL: "COMM",
  REPACKING: "REPACK",
  EXTRA: "EXT"
}

export const CollectionCodes = {
  DEPT_CAT_MAPPING: "DEPT_CAT_MAPPING",
  MAT_FRACTION_CONFIG: "MAT_FRACTION_CONFIG",
  INDENT_RETURN_POOL: "INDENT_RETURN_POOL",
  BATCH_SOURCE_CONFIG: "BATCH_SOURCE_CONFIG",
  DISPATCH_CONFIG: "DISPATCH_CONFIG",
}

//----purposeCode
export const DynamicServicePurposeCodes = {
  GetDynamicData: "GetDynamicData",
  GetModuleFormData: "GetModuleFormData",
  BasicDataStream: "NextBasicDataStream",
  AfterFormSubmission: "AfterFormSubmission",
  NextGridDataStream: "NextGridDataStream",
  CheckWorkflow: "CheckWorkflow",
  GetFormSubmissionsByBasicInfo: "GetFormSubmissionsByBasicInfo",
  GetReqDynamicData: "GetReqDynamicData",
}

export const CommonPurposeCodes = {
  GetModuleGridColumns: "GetModuleGridColumns",
  GetBasicDetails: "GetBasicDetails",
  ValidateLogin: "QRCSValidateLogin"
}

export const SessionItemConstants = {
  moduleCode: "moduleCode",
  formsId: "formsId",
}

export const RouterItemConstants = {
  bid: "bid",
  id: "id",
  formID: "formID"
}

export const CommonConstants = {
  application: "Application",
  module: "Module",
  remarks: "Remarks",
  component: "Component",
  sno: "S. No.",
  effectiveFrom: "Effective From",
  effectiveTo: "Effective To",
  status: "Status",
  requestCode: "Request Code",
  referenceNum: "Reference Number",
  plant: "Plant",
  createdOnFrom: "Created On From",
  createdOnTo: "Created On To",
  performedBy: "Performed By",
  performedOn: "Performed On",
  nameOfTheMaterial: "Name of the Material",
  materialCode: "Material Code",
  createdBy: "Created By",
  createdOn: "Created On",
  printedOn: "Printed On",
  printedBy: "Printed By",
  dateFrom: "Date From",
  dateTo: "Date To",
  grossWeight: "Gross Weight",
  tareWeight: "Tare Weight",
  netWeight: "Net Weight",
  packNumber: "Pack Number",
  MaterialNameCode: "Material Name/Code",
  BatchNumber: "Batch Number",
  fromStatus: "From Status",
  toStatus: "To Status",
  department: "Department",
  location: "Location",
  generatedOn: "Generated On",
  generatedBy: "Generated By",
  material: "Material",
  unit: "Unit",
  actionHistory: " Action History",
  currentHistory: " Current History",
  category: " Category",
  assignedBy: " Assigned By",

}

export const SECTION_CODE = {
  SPECIMEN_LABEL_UPLOAD: "SPECIMEN_LABEL_UPLOAD",
  LABEL_LOGO_UPLOAD: "LABEL_LOGO_UPLOAD"
}

export const CATEGORY_CODE = {
  LABEL_SIZE: "LABEL_SIZE",
  STATIC_FIELDS: "STATIC_FIELDS",
  SCAN_EVENTS: "SCAN_EVENTS",
  MATERIAL_CATEGORY: "MAT_CAT",
}

export const ITEM_CODE = {
  QR_FIELD: "QR_FIELD",
  TEXT_FIELD: "TEXT_FIELD",
  HEADER_FIELD: "HEADER_FIELD",
  LINE: "LINE",
  FORMAT_NUM: "FORMAT_NUM",
  VERSION_NUM: "VERSION_NUM",
  EFF_DATE: "EFF_DATE",
  IS_MANAGE: "IS_MANAGE",
  LABEL_CODE: "LABEL_CODE",
  CUSTOM_FIELD: "CUSTOM_FIELD",
  LOGO: "LOGO",
  SYMBOL: "SYMBOL",
}

export const faLabelIcons = {
  faiconpuzzlepieceregular: "fa-icon-puzzle-piece-regular",
  faiconmemocirclecheckregular: "fa-icon-memo-circle-check-regular",
  faiconmemoregular: "fa-icon-memo-regular",
  faiconblockmaticon: "fa-icon-block-mat-icon",
  faiconcubelight: "fa-icon-cube-light",
  faiconprintlight: "fa-icon-print-light",
  faiconboxtapedregular: "fa-icon-box-taped-regular",
  faiconstarregular: "fa-icon-star-regular",
  faiconbullhornregular: "fa-icon-bullhorn-regular",
}

//------------------MOCK API URLs
export const MockApiServiceUrls = {
  GetLabelGenerationEvents: "Lookup/GetLabelGenerationEvents",
  GetLabelReconciliationEvents: "LabelReconciliation/GetLabelReconciliationDetails",
  GetMenuListByAppCode: "Workflow/GetMenuListByAppCode",

}

export const QRScanActivity = {
  PACK_SELECTION: "PACK_SELECTION",
  RECEIVE_MATERIAL: "RECEIVE_MATERIAL",
  CONSUMED: "WIP_CONSUMPTION",
  RETURN_BACK: "INDENT_RETURN",
  QR_AUTH: "QR_AUTH",
  PRINT_SUCCESS: "PRINT_SUCCESS",
  PRINT_FAIL: "PRINT_FAIL",
  CUSTOM_LABEL_UPDATE: "CUSTOM_LABEL_UPDATE"
}

export const StatusCodes = {
  ACTIVE: "ACT",
  INACTIVE: "INACT",
  OBSOLETE: "OBSE",
  IN_PROGRESS: "INPROG",
  APPROVED: "APP"
}

export const PrintJobMessages: Record<string, string> = {
  "": "Initializing print job...",
  "SET_JOB": "Preparing print job...",
  "WRITE_JOB": "Sending data to printer...",
  "PRINTING": "Printing in progress...",
  "PRINTING,RETAINED": "Printing... (job retained)",
  "COMPLETE,RETAINED": "Print execution... (job retained)",
  "DELETING,PRINTING,PRINTED,DELETED": "Finalizing print job...",
  "DELETING,PRINTING,PRINTED,DELETED,RETAINED": "Finalizing print job... (job retained)",
  "RETAINED": "Job retained in printer memory",
  "COMPLETED": "Print job completed successfully",
  "DELETING": "Cancelling print job...",
  "DELETED": "Print job deleted",
  "PRINTED": "Print job finished",
  "ERROR": "An error occurred while printing",
  "CANCELED": "Print job canceled",
  "UNKNOWN": "Processing..."
}

export type CachedDataKey = ''
  | 'LabelAdditionalFields'
  | 'LabelPrint/GetLabelGenerationHistory'
  | 'LabelPrint/GetLabelPrintHistory'
  | 'LabelPrint/GetLabelScanHistory'
  | 'LabelDetails/GetLabelMetaDataByLabelId'
  | 'LabelPrint/GetLabelPrintHistory'
  | 'GetWorkflowLevelsDetailsByWorkflowId'
  | 'GetRequestBasicInfoNew'
  | 'GetRoutingDetailsByLevelAction'
  | 'GetComponentsByForm'

export type ComponentCode =
  'SpecimenLabelDesignXYComponent'
  | 'NewLabelDesignComponent'
  | 'NewLabelGenerationComponent'
  | 'NewPrintRequestComponent'
