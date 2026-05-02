export class ActionMessages {

    public static GetMessageByCode(code: string, extMessage: string = "") {
        const errorMessages: { [key: string]: string; } = {
            'IDLE_TIMEOUT': "You're being timed out due to inactivity. Please login again",
            'DUP': 'Request details modified by another user. Please re-initiate Request again',
            'TIMESTAMP_MISMATCH': 'Request details modified by another user. Please re-initiate Request again',
            'DUP_DESIGNATION_ENTRY': 'Designation name already exists, please check and proceed further',
            'INVALID_LOGIN_ID': 'Login id already exists, please check and proceed further',
            'DUP_PLANT_ENTRY': 'Plant name is already exist, please check and proceed further',
            'DUP_DEPARTMENT_CODE': 'Department code already exists, please check and proceed further',
            'DUP_BLOCK_NAME': 'Block name already exists, please check and proceed further',
            'DUP_UNIT_CODE': 'Unit Code already exists, please check and proceed further',
            'DUP_DEPARTMENT_NAME': 'Department name already exist, please check and proceed further',
            'DUP_LOGIN_ID': 'LoginID already exists, please check and proceed further',
            'DUP_UNIT_NAME': 'Unit Name already exists, please check and proceed further',
            'DUP_DEPARTMENT': 'Department  already exist, please check and proceed further',
            'DUP_ROLE_ENTRY': 'Role already exist, please check and proceed further',
            'DUP_BLOCK': 'Block already exist, please check and proceed further',
            'DUP_ORGANIZATION': 'Organization already exist, please check and proceed further',
            'DUP_DEPT_ENTRY': 'Department is already assigned, please check and proceed further',
            'INV_VERSION': 'Another version is under process, cannot initiate new version',
            'STATE_UNDER_REVISION': 'The selected option is under revision process',
            'DUP_DESIGNATION_NAME': 'Designation name already exists, please check and proceed further',
            'DUP_DESIGNATION_CODE': 'Designation code already exists, please check and proceed further',
            'DUP_ROLE_NAME': 'Role name already exists, please check and proceed further',
            'DUP_ROLE_CODE': 'Role code already exists, please check and proceed further',
            'DUP_BLOCK_CODE': 'Block code already exists, please check and proceed further',
            'DUP_ORGANIZATION_NAME': 'Organization name already exists, please check and proceed further',
            'DUP_ORGANIZATION_CODE': 'Organization code already exists, please check and proceed further',
            'INVALID_MODULE_CODE': 'Module code is invalid',
        }
        return errorMessages[code];
    }
}

export class CommonMessages {
    static saveSuccess = "Data saved successfully";
    static discardSuccess = "Data discarded successfully";
    static discardConfirmation = "Do you wish to discard?";
    static confirmMessage = "Do you wish to confirm ?";
    static removeSuccess = "Item removed successfully";
    static unAssignedSuccess = "Un-Assigned successfully";
    static noChanges = "No modifications have been detected. Kindly make the necessary changes to proceed";
    static printSuccess = "Print completed successfully";
    static fromToStatusMismatch = "From status and to status cannot be same";
    static cantChangeObsoleteStatus = "Once set to obsolete, the status cannot be changed to active or inactive.";
    static alreadyAdded = "Field already exists in the list. Please choose another one.";
    static noPermission = 'User Do not have permission/capability to perform the Action';
}