import { ActionBO } from "../globalShared/appGrid/appGrid.model";

export class Actions {

    public static GetActionByCode(code: ACTION_GET) {
        const action: { [key: string]: ActionBO } = {
            'EDIT': { action: "EDIT", icon: "edit", toolTip: "Edit" },
            'DELETE': { action: "DELETE", icon: "trash", toolTip: "Discard" },
            'VIEW': { action: "VIEW", icon: "eye", toolTip: "View" },
            'CHANGE_STATUS': { action: "CHANGE_STATUS", icon: "right-left", toolTip: "Change Status" },
            'NEW_VER': { action: "NEW_VER", icon: "arrows-split-up-and-left", toolTip: "Revision" },
            'MANAGE': { action: "MANAGE", icon: "bars", toolTip: "Manage" },
            'UNIT_MAPPING': { action: "UNIT_MAPPING", icon: "edit", toolTip: "Unit Mapping" },
            'REVISION': { action: "REVISION", icon: "pen", toolTip: "Revisoin" },
            'CLONE': { action: "CLONE", icon: "edit", toolTip: "Clone" },
            'OBSOLETE': { action: "OBSOLETE", icon: "trash", toolTip: "Obsolete" },
            'RESET': { action: "RESET", icon: "edit", toolTip: "Reset" },
            'DOWNLOAD': { action: "DOWNLOAD", icon: "download", toolTip: "Download" },
            'MNG_EFFECTIVE_DATE': { action: "MNG_EFFECTIVE_DATE", icon: "pen", toolTip: "Manage Effective Date" },
            'PRINT': { action: "PRINT", icon: "print", toolTip: "Print" },
            'PRINT_REQ': { action: "PRINT_REQ", icon: "print", toolTip: "Print Request" },
            'RE_PRINT_REQ': { action: "RE_PRINT_REQ", icon: "print", toolTip: "Re-Print Request" },

        }
        return action[code];
    }
}

export enum ACTION_GET {
    EDIT = "EDIT",
    DELETE = "DELETE",
    VIEW = "VIEW",
    CHANGE_STATUS = "CHANGE_STATUS",
    NEW_VER = "NEW_VER",
    MANAGE = "MANAGE",
    UNIT_MAPPING = "UNIT_MAPPING",
    REVISION = "REVISION",
    CLONE = "CLONE",
    DISCARD = "DISCARD",
    OBSOLETE = "OBSOLETE",
    ACTIVE = "ACTIVE",
    OPEN = "OPEN",
    RESET = "RESET",
    DOWNLOAD = "DOWNLOAD",
    MNG_EFFECTIVE_DATE = "MNG_EFFECTIVE_DATE",
    PRINT = "PRINT",
    PRINT_REQ = "PRINT_REQ",
    RE_PRINT_REQ = "RE_PRINT_REQ"

}
