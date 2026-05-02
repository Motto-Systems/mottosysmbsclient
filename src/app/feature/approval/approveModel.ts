import { ICustomDropdownNCheckListData } from "../../shared/globalShared/customCheckList/customChecklistModel";
import { DropdownDetails } from "../../shared/globalShared/customDropdown/customDropdownModel";
import { AppLabel } from "../../shared/globalShared/customLabel/customLabelModal";
import { TextBoxInputs } from "../../shared/globalShared/customTextbox/customTextboxModal";
import { ApprovalInfo, CommonLabelInfo, GridColumnBO } from "../../shared/utility/commonModel";
import { GLOBAL_CONSTANTS } from "../../shared/utility/constant";

// Stub for removed sharedFeatures dependency
class ModeList {
    viewormng: Array<ICustomDropdownNCheckListData> = [];
}

// Stub for removed labelDesign dependency
const labelConstants: Record<string, string> = {};

export class ApprovalFieldInfo {
    modeDropdown: DropdownDetails = new DropdownDetails("Mode", true, true, "", "MNG", false, false);
    levelsDropdown: DropdownDetails = new DropdownDetails("Levels", true, true, "", "MNG", false, false);
    action: DropdownDetails = new DropdownDetails(ApprovalInfo.action, true, true, GLOBAL_CONSTANTS.EMPTY, "MNG", false, false);
    users: DropdownDetails = new DropdownDetails(ApprovalInfo.user, true, true, GLOBAL_CONSTANTS.EMPTY, "MNG", false, false);
    confirm: DropdownDetails = new DropdownDetails(GLOBAL_CONSTANTS.EMPTY, true, true, GLOBAL_CONSTANTS.EMPTY, "MNG", false, false);
    remarks: TextBoxInputs = new TextBoxInputs(CommonLabelInfo.remarks, 500, true, true, "all", "TextArea", 4, false, 5, true);
    actionList: Array<ICustomDropdownNCheckListData> = [];
    statusList: Array<ICustomDropdownNCheckListData> = [];
    levelsDropdownList: Array<ICustomDropdownNCheckListData> = [];
    modeDropdownList: Array<ICustomDropdownNCheckListData> = new ModeList().viewormng;
    workflow: AppLabel = new AppLabel("Workflow");
    requestCode: AppLabel = new AppLabel("Request Code");
    statusInfo: AppLabel = new AppLabel("Status");
    userID: number = 0;

    toggleView: any = [
        {
            "itemID": "Action Confirmation",
            "itemCode": "ACON",
            "item": "Action Confirmation"
        },
        {
            "itemID": "Action History",
            "itemCode": "AH",
            "item": "Action History"
        },
        {
            "itemID": "Workflow",
            "itemCode": "WKF",
            "item": "Workflow"
        },
        // {
        //     "itemID": "Module Mapping",
        //     "itemCode": "MM",
        //     "item": "Module Mapping"
        // }

    ]
    viewId: string = "Action Confirmation";
    selectedLevel: string = GLOBAL_CONSTANTS.EMPTY;
    selectedMode: string = GLOBAL_CONSTANTS.EMPTY;
    searchText: string = GLOBAL_CONSTANTS.EMPTY;

    constructor() {
        this.confirm.hideSelect = false;
    }
}

export class ApprovalProcessBO {
    basicInfoId: number = 0;
    moduleCode: string = "";
    requestId: number = 0;
    levelID: number = 0;
    levelNo: number = 0;
    workflowID: number = 0;
    formID: number = 0;
    remarks: string = "";
    actionID: number = 0;
    requestCode: string = "";
}

export const ApprovalConstants = {
    CAN: "CAN",
    APP: "APP",
    SINGLE_USER: "SINGLEUSER",
    ERROR: "ERROR",
    WORKFLOW: "Workflow",
    ACTION_HISTORY: "Action History",
    CONFIRM: "Confirm",
    ADD: "Add",
    HEADER: "Send To User",
    MODULE_MAPPING: "Module Mapping"
}

export const AlertMSG = {
    SINGLE_USR: "Request can be sent to a single user only",
    Modify_User: "Request can be sent to a single user only.\r\n Do you wish to change the user?",
    Existing_User: "Selected user is already exist",
    AT_LEAST_ONE_USR: "Select one user to confirm",
    No_USER_SINGLE: "Users are not assigned to this workflow",
    No_USER_SELECT: "Please select user to proceed further",
}
export const ApprovalNotifications = {
    ERROR_MSG: "Basic info ID is required"
}

export const ActionHistoryHeaders = {
    sNo: "S. No.",
    department: "Department",
    designation: "Designation",
    unit: "Unit",
    confirmedBy: "Confirmed By",
    appLevel: "App Level",
    remarks: "Remarks",
    action: "Action",
    confirmedON: "Confirmed On",
    resultantStatus: "Resultant Status",
}

export const AppLabelConstants = {
    ...labelConstants,
    userName: " User Name",
    departmentName: "Department Name",
    unitName: "Unit Name",
    designationName: "Designation Name",
}
export class workFlowUsersList {
    userID: string = GLOBAL_CONSTANTS.EMPTY;
    roleID: string = GLOBAL_CONSTANTS.EMPTY
    userName: string = GLOBAL_CONSTANTS.EMPTY
    empCode: string = GLOBAL_CONSTANTS.EMPTY
    designation: string = GLOBAL_CONSTANTS.EMPTY
    roleName: string = GLOBAL_CONSTANTS.EMPTY
    roleCode: string = GLOBAL_CONSTANTS.EMPTY
    designationName: string = GLOBAL_CONSTANTS.EMPTY
    designationID: string = GLOBAL_CONSTANTS.EMPTY
    unitName: string = GLOBAL_CONSTANTS.EMPTY
    unitID: string = GLOBAL_CONSTANTS.EMPTY
    departmentID: string = GLOBAL_CONSTANTS.EMPTY
    departmentName: string = GLOBAL_CONSTANTS.EMPTY
    departmentActualID: string = GLOBAL_CONSTANTS.EMPTY
    unitActualID: string = GLOBAL_CONSTANTS.EMPTY
    userActulID: string = GLOBAL_CONSTANTS.EMPTY
}

export const WorkFlowUsersGridColumnsInfo = [
    new GridColumnBO('userName', AppLabelConstants.userName, 'grid-col-25'),
    new GridColumnBO('departmentName', AppLabelConstants.departmentName, 'grid-col-25'),
    new GridColumnBO('unitName', AppLabelConstants.unitName, 'grid-col-25'),
    new GridColumnBO('designationName', AppLabelConstants.designationName, 'grid-col-25'),
];

export class WorkflowRoutingBO {
    routingLevelID: number = 0;
    workflowAssignmentId: number = 0;
    departmentID: number = 0;
    unitID: number = 0;
}

export class ApprovalUserInfoBO {
    userID: number = 0;
    userName: string = "";
    departmentID: number = 0;
    departmentName: string = "";
    unitID: number = 0;
    unitName: string = "";
}
export class ApprovalActionBO {
    action: string = "";
    actionCode: string = "";
    actionID: number = 0;
    status: string = "";
    statusCode: string = "";
    statusID: number = 0;
    levelActionID: number = 0;
    unitSpecific: string = "";
    departmentSpecific: string = "";
    specificDepartmentType: string = "";
    departmentBasedDepartmentID: number = 0;
    workflowBasedLevelID: number = 0;
    routingLevelID: number = 0;
    routingLevelNo: number = 0;
    escalationType: string = "";
}

export class ConfirmReqBO {
    actionCode: string = "";
    action: string = "";
    status: string = "";
    basicInfoId: number = 0;
    statusCode: string = "";
    moduleCode: string = "";
    userID: number = 0;
    requestId: number = 0;
    actionID: number = 0; // keeping as per your JSON, but maybe you meant "actionID"?
    levelID: number = 0;
    levelNo: number = 0;
    workflowID: number = 0;
    statusID: number = 0;
    routingLevelID: number = 0;
    routingLevelNum: number = 0;
    departmentSpecific: string = "";
    unitSpecific: string = "";
    departmentBasedDepartmentID: number = 0;
    workflowBasedLevelID: number = 0;
    specificDepartmentType: string = "";
    isFinalLavel: boolean = false;
    remarks: string = "";
    escalationType: string = "";
    levelAccessCondition: string = "";
}