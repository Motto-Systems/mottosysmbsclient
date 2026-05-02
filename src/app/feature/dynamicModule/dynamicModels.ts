import { SingleStringID } from "../../shared/utility/commonModel";

// Stub for removed sharedFeatures dependency
type RuleProperties = any;

export class ComponentBaseInfo {
    componentTitle: string = "";
    componentID: string = "";
    formControls: Array<any> = [];
    jsonObject: any;
    formData: any = {};
}

export class ComponentInfo extends ComponentBaseInfo {
    width: number = 100;
    componentType: string = "Single";
    gridWidth: number = 100;
    gridActions: any//BaseOption = new BaseOption();
    gridColumns: any//BaseOption = new BaseOption();
    extendedGridColumns: any;//BaseOption = new BaseOption();
    header: any = [];
    property: string = "";
    componentDataType: string = "";
    extraColumns: any = [];
    dataSource: any;
    childComponent: ComponentBaseInfo = new ComponentBaseInfo();
    nodeTitle: string = "";
    layoutType: any;


    apiBaseUrl: string = "";
    apiUrl: string = "";
    inputParameters: Array<any> = [];
    outputParameters: Array<any> = [];
    openComponent: boolean = true;
}

export class FormMetaData {
    formID: string = "";
    formTitle: string = "";
    formCode: string = "";
    formType: string = "";
    approvalType: string = "";
    moduleTitle: string = "";
    cssClass: string = "";
}

export class FormInfo extends FormMetaData {
    tabDetails: Array<FormTabBO> = [];
    rules: Array<FormRules> = [];
    fieldCoditions: Array<ShowHideConditions> = [];
}

export class FormRules {
    id: string = "";
    eventType: string = "";
    componentID: string = "";
    componentTitle: string = "";
    controlID: string = "";
    controlName: string = "";
    ruleGroup: string = "";
    ruleCode: string = "";
    className: string = "";
    ruleType: string = "";
    ruleTitle: string = "";
    ruleFileName: string = "";
    ruleOrder: number = 1;
    ruleProperties: Array<RuleProperties> = [];
    componentType: string = "";
}

export class FormTabBO {
    tabId: string = "";
    tabTitle: string = "";
    componentList: Array<ComponentInfo> = [];
    containerList: Array<FormContainersBO> = [];
}

export class FormContainersBO {
    containerID: string = "";
    containerName: string = "";
    collapseApplicable: string = "";
    width: number = 100;
    cssClass: string = "";
    componentList: Array<ComponentInfo> = [];
    stepperList: Array<FormStepperBO> = [];
    openComponent: boolean = true;
    mainComponentCss: boolean = false;
}

export class FormStepperBO {
    stepperID: string = "";
    stepperName: string = "";
    cssClass: string = "";
    componentList: Array<ComponentInfo> = [];
}

export class EventInfo {
    eventType: string = "";
    eventName: string = "";
    eventData: any;
    fieldData: any// = new FieldControlBO();
    formData: any;
}

export class FormSubmissionBO {
    formData: any;
    submissionID?: string;
    basicInfoID?: string;
    moduleCode: string = "";
    componentID: string = "";
    componentType: string = "";
    property: string = "";
    componentDataType: string = "";
    childReferenceID: string = "";
    formMetaDataInfo: FormMetaData = new FormMetaData();
    processRules: Array<RulesMethod> = [];
}

export class RulesMethod {
    ruleCode: string = "";
    className: string = "";
    ruleFields: Array<RuleProperties> = [];
}

export class SearchDynamicModuleBO {
    moduleCode: string = "";
    pageIndex: number = 0;
    genericFilter: Array<SearchFieldFilterBO> = [];
    advanceFilter: Array<SearchFieldFilterBO> = [];
    gridColumns: GridFields[] = [];
    formData: any = {};
}

export class SearchFieldFilterBO {
    fieldName: string = "";
    expression: string = "";
    value: any;
    propertyName: string = "";
    nodeWithProperty: string = ""
}

export class FilterFieldBO {
    label: string = "";
    propertyName: string = "";
    nodeWithProperty: string = ""
}

export class ModuleAdvanceSearchBO {
    lhsVariable: string = "";
    expression: string = "";
    rhsVariable: string = "";
    nodeWithProperty: string = "";
}

export class ActionItemsBO {
    actionName: string = "";
    formID: string = "";
    condition: string = "";
    iconName: string = "";
    applicableStates: Array<string> = [];
}

export class DiscardFormSubmissionDTO {
    submissionID: string = "";
    moduleCode: string = "";
}

export class SubItemBO {
    submissionID: string = "";
    itemData: string = "";
    nodeTitle: string = "";
    basicInfoID?: string;
    moduleCode: string = "";
    validationRules: Array<RulesMethod> = [];
}

export class GridFields {
    propertyName: string = "";
    nodeWithProperty: string = "";
    constructor(property: string, node: string) {
        this.propertyName = property;
        this.nodeWithProperty = node;
    }
}

export class ShowHideConditions {
    conditionStrings: string = "";
    field: Fields = new Fields();
    isShow: string = "";
}

export class Condition {
    andConditions: Array<AndCondition> = [];
}

export class AndCondition {
    field: string = "";
    operator: string = "";
    value: string = "";
    valueType: string = "";
}

export class Fields {
    item: string = "";
    itemCode: string = "";
    itemID: string = "";
    itemType: string = "";
}

export class ShowHideConditionBO {
  conditionStrings: string = "";
  isShow: string = "Yes";
  itemCode: string = "";
}


export class FormRevisionBO {
    sourceID: string = "";
    remarks: string = "";
    moduleCode: string = "";
}

export class FormProcessRuleBO {
    rules: Rule[] = []
    basicInfoID?: string
    componentID: string = ""
    formData: any = {};
    submissionID: string = ""
    execOperationID: string = ""
    additionalReferenceID: string = ""
    moduleCode: string = ""
    componentType: string = ""
}

export class Rule {
    ruleCode: string = ""
    className: string = ""
    actionCode: string = ""
    ruleFields: RuleField[] = []
}

export class RuleField {
    fieldCode: string = ""
    isMandatory: string = ""
    property: string = ""
    valueFrom: string = ""
    nodeWithProperty?: string = ""
}

export class ConfirmDTO {
    basicInfoID: string = ""
    actionID: string = ""
    remarks: string = ""
    usersInfo: UsersInfo[] = []
    rules: Array<RulesMethod> = [];
}

export class UsersInfo {
    targetUnitID: string = ""
    targetDeptID: string = ""
    targetUserID: string = ""
}


export const ActionHistoryHeaders = {
    sNo: "S. No.",
    department: "Department",
    unit: "Unit",
    confirmedBy: "ConfirmedBy",
    appLevel: "AppLevel",
    remarks: "Remarks",
    action: "Action"
}

export class ComponentCapability {
    componentID: string = "";
    mode: string = "";
}

export class WorkFlowData {
    workflowMappingID: string = "";
    levelID: string = "";
}

export class MappingUnAssignBO {
    idList: SingleStringID[] = [];
    collectionCode: string = "";
    comments: string = "";
}

export class GetDynamicDataBO {
    moduleCode: string = "";
    requiredPath: string[] = [];
    excludedPath: string[] = [];
    id: string = "";
    collectionCode: string = "";
    isMultiple: boolean = true;
    filters: FilterBO[] = [];
    pageIndex?: number
}
export class FilterBO {
    key: string = "";
    value: string = "";
    operator?: string = "";
}


export const ModalPopupAPIResponse = {
    StartExecuteProcessRules: "StartExecuteProcessRules",
}