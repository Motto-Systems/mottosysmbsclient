import { ICustomDropdownNCheckListData } from "../globalShared/customCheckList/customChecklistModel";
import { DropdownDetails } from "../globalShared/customDropdown/customDropdownModel";
import { GLOBAL_CONSTANTS } from "../utility/constant";

export class UserSwitchUnitInfo {
    switchUnitDept: DropdownDetails = new DropdownDetails("Switch Unit / Dept", true, true, "", "MNG", false, false);
    switchUnitDeptList: Array<ICustomDropdownNCheckListData> = [];
    userDepartmentAccessID: string = GLOBAL_CONSTANTS.EMPTY;
    
}

export const SwitchUnitPlaceHolders = {
    userSwitchUnit: "User Switch Unit / Dept",
    validate: "validate",
}

export const SwitchUnitAPIPurpose = {
    GetUserAccessDepartmentList: "GetUserAccessDepartmentList",
    SwitchUserDepartment: "SwitchUserDepartment",

}

export class getDeptListBO {
    userID: string = GLOBAL_CONSTANTS.EMPTY;
    unitID: string = GLOBAL_CONSTANTS.EMPTY;
    departmentID: string = GLOBAL_CONSTANTS.EMPTY;
}

export class switchUserDepartmentBO {
    userDepartmentAccessID: string = GLOBAL_CONSTANTS.EMPTY;
    loginID: string = GLOBAL_CONSTANTS.EMPTY;
}

export const SwitchButtons = {
    switch: "Switch",
}

export const CustomRespCodes = {
    SUCCESS: "SUCCESS",
}

export const SwitchUnitDeptAlerts ={
    SwitchUnitDept:"Switched successfully"
}
