import { AppLabel } from "../globalShared/customLabel/customLabelModal";
import { CachedDataKey, GLOBAL_CONSTANTS } from "./constant";
import { ShowHideConditionBO } from "../../feature/dynamicModule/dynamicModels";
import { ICustomDropdownNCheckListData } from "../../shared/globalShared/customCheckList/customChecklistModel";
import { TextBoxInputs } from "../../shared/globalShared/customTextbox/customTextboxModal";

export class CommonLabelInfo {
    public static remarks = "Remarks";
    public static requestCode = "Request Code";
    public static referenceNo = "Reference Number";
    public static createFrom = "Created From";
    public static createTo = "Created To";
    public static status = "Status";
    public static sNo = "S.No";
    public static changedBy = "Changed By";
    public static changedOn = "Changed On";
    public static effectiveFrom = "Effective From";
    public static effectiveTo = "Effective To";
}

export class ApprovalInfo {
    public static action = "Action";
    public static user = "User";
    public static actionOn = "Action On";
}
export class UnitLabelInfo {
    //Unit/Location Module
    public static unitName = "Name of the Unit"
    public static unitCode = "Unit Code";
    public static location = "Location";
    public static area = "Area / City";
    public static address = "Address";
    //Grid label
    public static unitTitle = "Unit Name";//used for change user
}
export class UserLabelInfo {
    //User Module
    public static userName = "Name of the User";
    public static loginID = "Login ID";
    public static employeeID = "Employee ID";
    public static designation = "Designation";
    public static dateOfJoin = "Date of Join";
    public static gender = "Gender";
    public static surName = "Surname / Family Name";
    public static department = "Department";
    public static unit = "Unit";
    public static contactNumber = "Contact Number";
    public static emailID = "Email ID";
    public static password = "Password";

    //user grid
    public static userTitle = "User Name";
    public static effectiveFrom = "Effective From";
    public static effectiveTo = "Effective To";
    public static revisedDesignation = "Revised Designation";
    public static modifiedOn = "Modified On";
    public static assignedBy = "Assigned By";
    public static unAssignedBy = "UnAssigned By";

    //change Designation
    public static selectUser = "Select User";
    public static selectNewDesignation = "Select New Designation";
    public static selectNewDepartment = "Select New Department";
    public static addRemoveDepartmentAccess = "Add/Remove Department Access";
    public static addRemoveUnitAccess = "Add/Remove Unit Access";
    public static selectNewUnit = "Select New Unit";
    public static currentDesignation = "Current Designation";
    public static currentDepartment = "Current Department(s)";
    public static currentUnit = "Current Units(s)"
}

//block module
export class BlockLabelInfo {
    public static blockName = "Name of the Block/Area";
    public static blockCode = "Block/Area Code";
}

//Department Module
export class DepartmentInfo {
    public static departmentName = "Name of the Department";
    public static departmentTitle = "Department Name"
    public static departmentCode = "Department Code";

}

//Designation Module
export class DesignationInfo {
    public static designationName = "Designation / Title Name";
    public static designationCode = "Designation Code";
}

//Roles Module
export class RolesInfo {
    public static roleProcess = "Select Role Process Group";
    public static roleName = "Title / Name of the Role";
    public static roleCode = "Role Code";
    public static roleProcessGroup = "Role Process Group";
}

//TimeZone Module
export class TimeZoneInfo {
    public static description = "Description";
    public static offset = "Offset";
    public static offsetValue = "OffsetValue";
}

export class FacilityLabelInfo {
    public static organizationName = "Organization Name";
    public static organizationCode = "Organization Code";
    public static businessType = "Business Type";
    public static organizationDropdown = "Select Organization";
    public static unitCheckList = "Select Unit/Locations";
    public static unitDropdown = "Select Unit/Location";
    public static departmentCheckList = "Select Departments";
    public static departmentDropdown = "Select Department";
    public static blockCheckList = "Select Blocks/Area";

    //prepare headers
    public static block = "Block/Area";
    public static assignedOn = "Assigned On";
}

//change Status component
export class ChangeStatusLabelInfo {
    public static fromStatus = "From Status";
    public static toStatus = "To Status";
    public static performedBy = "Performed By";
    public static performedOn = "Performed On";
}

//Dynamic module
export class DynamicLabelInfo {
    public static test = "test";
}

//viewHistoryBO

// Revision history object

export class RevisionHeadersBo {
    public static referenceNumber = "Reference Number"
    public static effectiveFrom = "Effective From"
    public static effectiveTo = "Effective To"
    public static performedBy = "Performed By"
    public static performedOn = "Performed On"
    public static revisonRemarks = "Revison Remarks"
    public static confirmedBy = "Confirmed By"
}

export class ResultCodes {
    static Success = "SUCCESS";
    static ok = "OK";
}

export class SingleStringID {
    id: string = "";

    constructor(_id: string) {
        this.id = _id;
    }
}


export class ExceptionResult {
    exceptionCode: string = "";
    allowSaveData: boolean = true;

    constructor(exceptionCode?: string, allowSaveData?: boolean) {
        this.exceptionCode = exceptionCode ?? "";
        this.allowSaveData = allowSaveData ?? true;
    }
}

export class DropDownBO {
    itemID: string = GLOBAL_CONSTANTS.EMPTY;
    itemCode: string = GLOBAL_CONSTANTS.EMPTY;
    item: string = GLOBAL_CONSTANTS.EMPTY;
    isActive: boolean = false;
    systemCode: string = GLOBAL_CONSTANTS.EMPTY;
    displayData: string = GLOBAL_CONSTANTS.EMPTY;

    constructor(item: string = "", itemCode: string = "", itemID: string = "") {
        this.item = item;
        this.itemCode = itemCode;
        this.itemID = itemID;
        this.displayData = this.item;
    }
}

export class GridColumnBO {
    constructor(public columnDef: string, public label: string, public width: string = "", public isShowIcon: boolean = false, public cssClass: string = "") {
        this.columnDef = columnDef;
        this.label = label;
        this.width = width;
        this.isShowIcon = isShowIcon;
        this.cssClass = cssClass;
    }
}

export class RequestBasicInfoBO {
    basicInfoID: string = GLOBAL_CONSTANTS.EMPTY;
    submissionID: string = GLOBAL_CONSTANTS.EMPTY;
    childReferenceID: string = GLOBAL_CONSTANTS.EMPTY;
    moduleCode: string = GLOBAL_CONSTANTS.EMPTY;
}

export class SingleStrIDBO {
    id: string = GLOBAL_CONSTANTS.EMPTY;
}

export class CachedDataBO {
    isChanged: boolean = false;
    hasData: boolean = false;
    result: any;
}

export class TemplateActionBO {
    actionName: string = GLOBAL_CONSTANTS.EMPTY;
    tooltip: string = GLOBAL_CONSTANTS.EMPTY;
    icon: string = GLOBAL_CONSTANTS.EMPTY;
    actionCode: string = GLOBAL_CONSTANTS.EMPTY;
    constructor(actionName: string = GLOBAL_CONSTANTS.EMPTY, tooltip: string = GLOBAL_CONSTANTS.EMPTY, icon: string = GLOBAL_CONSTANTS.EMPTY, actionCode: string = GLOBAL_CONSTANTS.EMPTY) {
        this.actionName = actionName;
        this.tooltip = tooltip;
        this.icon = icon;
        this.actionCode = actionCode;
    }
}

export class LabelBO {
    labelKey: string = GLOBAL_CONSTANTS.EMPTY;
    label: AppLabel = new AppLabel();
    isDate: boolean = false;
    dateType: string = 'date'; // 'date' or 'datetime':
    hide: boolean = false;

    constructor(labelKey: string = "", placeholder: string = "", isDate: boolean = false, dateType: string = 'date', hide: boolean = false) {
        this.labelKey = labelKey;
        this.label = new AppLabel(placeholder);
        this.isDate = isDate;
        this.dateType = dateType;
        this.hide = hide;
    }
}

export class LabelPreViewBO {
    headerTitle: string = GLOBAL_CONSTANTS.EMPTY;
    preViewFields: PreViewValueBO[] = [];
    companyName: string = GLOBAL_CONSTANTS.EMPTY;
    companyAddress: string = GLOBAL_CONSTANTS.EMPTY;
    imgPath: string = GLOBAL_CONSTANTS.EMPTY;
}

export class PreViewValueBO {
    fieldName: string = GLOBAL_CONSTANTS.EMPTY;
    fieldValue: string = GLOBAL_CONSTANTS.EMPTY;
    fieldWidth: string = GLOBAL_CONSTANTS.EMPTY;
    fieldNameWidth: number = 0;
    constructor(fieldName: string = "", fieldValue: string = "", fieldWidth: string = "", fieldNameWidth: number = 0) {
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
        this.fieldWidth = fieldWidth;
        this.fieldNameWidth = fieldNameWidth;
    }
}

export interface QRCodeOptions {
    width?: number;
    margin?: number;
    colorDark?: string;
    colorLight?: string;
    errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
    type?: 'image/png' | 'image/jpeg' | 'image/webp';
}

export interface QRCodeData {
    labelId?: string;
    timestamp?: string;
    fields?: { [key: string]: any };
    company?: {
        name?: string;
        address?: string;
    };
    [key: string]: any; // Allow additional properties
}

export class DataStoreBO {
    hasData: boolean = false;
    dataInfo: any;
}

export class PrintStatusBO {
    constructor(public ticket: string = "", public status: string = "", public state: string = "") {
        this.ticket = ticket;
        this.status = status;
        this.state = state;
    }
}

export class AppRequestInfoBO {
    appCode: string = "";
    moduleCode: string = "";
    moduleName: string = "";
    requestCode: string = "";
    requestID: string = "";
    event: string = "";
    activity: string = "";
    type: string = "";
    itemReferenceIDs: number[] = [];
    itemReferenceID: string = "";
    apiUrl: string = "";
    customFieldList: any[] = [];
}

export class GenerateLabelBO {
    labelTypeCode: string = "";
    requestCode: string = "";
    requestID: string = "";
    labelCode: string = "";
    labelID: number = 0;
    childReferenceID: string = "";
    batchNumber: string = "";
    constructor(data?: Partial<GenerateLabelBO>) {
        Object.assign(this, data);
    }
}

export class SignalRNotifyBO {
    type: string = "";
    payload: any;

    constructor(type: string = "", payload: any = null) {
        this.type = type;
        this.payload = payload;
    }
}

export class LoginRespBO {
    loginInprogress: boolean = false;
    isValidUser: boolean = false;
    constructor(isValidUser: boolean = false, loginInprogress: boolean = false) {
        this.isValidUser = isValidUser;
        this.loginInprogress = loginInprogress;
    }
}

export class SearchChipBO {
    key: string = GLOBAL_CONSTANTS.EMPTY;
    label: string = GLOBAL_CONSTANTS.EMPTY;
    value: any = GLOBAL_CONSTANTS.EMPTY;
    displayData: string = GLOBAL_CONSTANTS.EMPTY;
    constructor(key: string = GLOBAL_CONSTANTS.EMPTY, label: string = GLOBAL_CONSTANTS.EMPTY, value: any = GLOBAL_CONSTANTS.EMPTY, displayData: string = GLOBAL_CONSTANTS.EMPTY) {
        this.key = key;
        this.label = label;
        this.value = value;
        this.displayData = displayData;
    }
}

export class PagerBO {
    pageIndex: number = 0;
    pageSize: number = 10;
    advanceSearch: string = "";
}

export class SharedDataBO {
    key: CachedDataKey = '';
    data: any;
}

export type ItemKey = 'itemID' | 'itemCode' | 'item';

export type SearchParamKey = 'SEARCH' | 'SEARCH_ALL' | 'PAGE_IDX';

export type PopupWidth = '20' | '25' | '50' | '75' | '100';

export type PurposeHandler = (resp: any) => void;

//-----New Workflow Changes BO
export class ComponentModelBO {
    componentID: number = 0;
    componentTitle: string = '';
    componentCode: string = '';
    mode: string = "";
}

export class GetComponentsBO {
    formID: number = 0;
    moduleMappingID: number = 0;
    levelID: number = 0;
}

export class JSPrintFileBO {
    pdfBlob: Blob = new Blob();
    height: number = 0;
    width: number = 0;
}

export class FieldControlBO {
    label: string = "";
    primaryLabel: string = "";
    propertyName: string = "";
    componentType: string = "";
    noOfRows?: number;
    minLength?: number;
    maxLength?: number;
    moduleCode: string = ""
    fieldWidth: number = 100;
    theme: string = "";
    items: Array<ICustomDropdownNCheckListData> = [];
    options: Array<ICustomDropdownNCheckListData> = [];
    icon: any = "save";
    actionEvent: string = "";
    componentID: string = "";
    fieldOrder?: number;
    id?: string;
    gridColumns: BaseOption = new BaseOption();
    extendedGridColumns: BaseOption = new BaseOption();
    gridComponents: BaseOption = new BaseOption();
    gridEvents: BaseOption = new BaseOption();
    sourceType: string = "";
    dataSourceID: string = "";
    separateBy: string = "";
    dataSourceFields: BaseOption = new BaseOption();
    dataSourceData: any = [];
    rightPanelDataSourceFields: BaseOption = new BaseOption();
    rightPanelDataSourceData: any = [];
    rightPanelDataSourceID: string = ""
    rightPanelitems: Array<ICustomDropdownNCheckListData> = [];
    customLogics: BaseOption = new BaseOption();
    fieldValue?: string;
    autoGeneratePasswordApplicable: string = "No";
    visibility: string = "";
    lookupCode: string = "";
    customControl: string = "";
    isShow: boolean = true;
    checkListDisplayType: string = "";
    checkListMode: string = "";
    isShowStatesDropDown: string = "";

    //Date & Time Field BO'S
    dateValueType: string = "";
    //heading
    headingTitle: string = "";

    rightPanelSeparateBy: string = "";
    dataRevisionModeFlag: string = "";
    mandatoryFlag: string = "";
    numberValueType?: string;
    numberFieldType?: string;
    limitRangeFromValue?: number;
    limitRangeToValue?: number;
    numberMinValue?: number;
    numberMaxValue?: number;
    defaultValue?: string;
    tooltip: string = "";
    columnsList: Array<ICustomDropdownNCheckListData> = [];
    actionEventList: Array<ICustomDropdownNCheckListData> = [];
    formulaDependentFields: Array<FormulaDependentFields> = [];
    formula: string = "";
    calcFormula: string = "";
    inputCode: string = "";
    valueRoundOffDigits?: number;
    apiUrl: string = "";
    apiDependencyFieldList: Array<DependentParameterFieldBO> = [];
    eventConfigurationList: Array<EventConfigurationBO> = [];
    clientValidations: Array<ClientValidationsBO> = [];

    integrationPropertyCode: string = "";
    validationRules: Array<any> = [];
    processRules: Array<any> = [];

    //precision & Scale
    precisionValue?: number;
    scaleValue?: number;

    //dropdown
    optionsSource: string = "";
    optionListAPIUrl: string = "";

    lookupDisplayField: string = "";
    rightPanelLookupDisplayField: string = "";
    timeStampApplicable: string = "";
    allowSameUser: string = "";
    displayFieldTitle: string = "";
    fieldConfigurationOverride: string = "";
    customFields: Array<CustomFieldConfigBO> = [];
    numberOfColumns?: number;
    numberOfRows?: number;
    columnIndex?: number;
    rowIndex?: number;
    controlID: string = "";
    tableControls: Array<FieldControlBO> = [];
    headerData: Array<tableHeaderFields> = [];
    inputParameters: Array<DependentParameterFieldBO> = [];
    routeCode: string = "";
    outputParameters: Array<OutputParameterBO> = [];
    actions: Array<GridActionData> = [];
    showHideCondition: ShowHideConditionBO = new ShowHideConditionBO();

    formattedField1: string = "";
    formattedField2: string = "";
    fieldFormatter: string = "";

    allowToDiscard: string = "";
    uploadSection: string = "";
    uploadType: string = "";

    isShowHistory: string = "";
    historyGridColumns: BaseOption = new BaseOption();
    historyExtendedGridColumns: BaseOption = new BaseOption();
    formCode: string = "";
    rebindAfterSave : string = "";
    resetOnSave : string = "";
    allowMultiSelection: string = "";
}
export class BaseOption {
    description: string = "";
    options: Array<BaseItem> = [];
}

export class BaseOptionBO {
    description: string = "";
    Options: Array<BaseItem> = [];
}

export class BaseItem {
    itemID: string = "";
    itemCode: string = "";
    item: string = "";
}

export class FieldBoxInfo {
    txtBoxFeildInfo: TextBoxInputs = new TextBoxInputs("Field Title", 20, true, true, "all", "TextBox", 0, false, 3, false)
}

export class ClientValidationsBO {
    validationExpression: string = "";
    validationMessage: string = "";
}

export class EventConfigurationBO {
    eventName: string = "changeEvent";
    apiBaseUrl: string = "";
    eventApiUrl: string = "";
    inputParameters: Array<DependentParameterFieldBO> = [];
    outputParameters: Array<OutputParameterBO> = [];
}

export class OutputParameterBO {
    propertyName: string = "";
    fieldName: string = "";
}

export class FormulaDependentFields {
    id: string = "";
    propertyName: string = "";
    label: string = "";
    inputCode: string = "";
    inputValue: any;
}

export class DependentParameterFieldBO {
    parameterName: string = "";
    propertyName: string = "";
    value?: string = "";
    isMandatory: boolean = true;

    constructor(parameterName: string = "", value: string = "", isMandatory: boolean = false) {
        this.parameterName = parameterName;
        this.value = value;
        this.isMandatory = isMandatory;
    }
}

export class CustomFieldConfigBO {
    fieldTitle: string = "";
    type: string = "";
    propertyName: string = "";
    minLength?: number;
    maxLength?: number;
    parentFieldID?: string = "";
    indexID: number = 0;
    mandatoryFlag: string = "MandatoryDuringSave";
    optionList: Array<ICustomDropdownNCheckListData> = [];
}


export class tableHeaderFields {
    headerName?: string;
    headerIndex?: number
}

export class RouteInputsDTO {
    parameterName: string = "";
    value: any;
}

export class APIRouteInputDTO {
    inputParameters: Array<RouteInputsDTO> = [];
    routeCode: string = "";
}

export class GridActionData {
    gridActionID: any;
    actionType: string = ""
    actionName: string = ""
    actionCode: string = ""
    css: string = ""
    orderNo: number = 0;
    formCode: string = "";
}

export class ModalPopupBasicData {
    basicInfoID: string = "";
    requestID: string = "";
    purpose: string = "";
    itemReferenceID: string = "";
    formModuleCode: string = "";
    moduleCode: string = "";
    mode: string = "MNG";
    formCode: string = "";
    batchID: string = "";
    locationID: string = "";
    count: number = 0;
}

export class LookupFilterBO {
    propertyName: string = "";
    propertyValue: string = "";
    isMandatory: boolean = false;

    constructor(propertyName: string = "", propertyValue: string = "", isMandatory: boolean = false) {
        this.propertyName = propertyName;
        this.propertyValue = propertyValue;
        this.isMandatory = isMandatory;
    }
}

export class FieldChangeBO {
    propertyName: string = "";
    clearDependentFields: boolean = true;

    constructor(propertyName: string, clearDependentFields: boolean = true) {
        this.propertyName = propertyName;
        this.clearDependentFields = clearDependentFields;
    }
}