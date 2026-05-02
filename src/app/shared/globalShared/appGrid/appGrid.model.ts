import { DropdownDetails } from "../customDropdown/customDropdownModel";
import { ICustomDropdownNCheckListData } from "../customCheckList/customChecklistModel";

export interface TableLayoutConfig<T> {
    columnID?: number;
    header: string;
    columnDef: keyof T;
    width?: string;
    sNo: number;
    isShow: boolean;
    cell: any;
}
export class TableLayout {
    parameterID: number = 0;
    header: string = "";
    columnDef: string = "";
    width?: string = "";
    sNo: number = 0;
    isShow: boolean = false;
    cell: any;
    columnName?: string;
    isShowActions: boolean = true;
}

export interface IResultBO {
    purpose: string;
    result: any;
    value?: any;
}

export class TableHeaderInfo {
    parameterID: number = 0;
    headerName: string = "";
    columnName: string = "";
    sNo: number = 0;
    isShow: boolean = false;
    typeOfColumn: TYPE_OF_COLUMNS = "HEADER";
    inputType: string = "";
    isConvertField: string = "";
}

export class DisplayIconBO {
    value: string = "";
    icon: any = "";
    className: string = "";
    tooltip: string = "";

    constructor(icon: string = "", tooltip: string = "", value: string = "", className: string = "") {
        this.icon = icon;
        this.tooltip = tooltip;
        this.value = value;
        this.className = className;
    }
}

export type TYPE_OF_COLUMNS = "HEADER" | "EXPAND" | "FILTER";

export class TableHeaderInfoList extends Array<TableHeaderInfo> { }

export interface AppTableActionsBO {
    action: Array<ActionBO>;
    onActionClick?: (data: any, action: GridActions | string, actionData?: any) => any;
}
export class AppTableActionsBOList extends Array<AppTableActionsBO> { }

export class ActionBO {
    action: string = "";
    icon: any = "bars";
    toolTip: string = "";
    faIconName?: string = "";
    actionData?: any;
    className?: string = "";

    constructor(action: string = "", icon: string = "", toolTip: string = "", actionData: any = null, className?: string) {
        this.action = action;
        this.icon = icon;
        this.toolTip = toolTip;
        this.actionData = actionData;
        this.className = className;
    }
}
export class CheckBoxDisableBO {
    constructor(public property: string = "", public values: Array<string> = []) {
        this.property = property;
        this.values = values;
    }
}

export type GridActions =
    "CHANGE_STATUS" | "VIEW" | "NEW_VER" | "ASSIGN" | "EDIT" | "EDIT_INS"
    | "DELETE" | "MNG_OCC" | "CONSUME" | "ADD_INV" | "INVALIDATE"
    | "MNG_MED_IDX"
    | "MNG_PACK" | 'MIGRATEROLE'

export class DropDownStatesInput {
    stateDropdown: DropdownDetails = new DropdownDetails("Select State", true, true, "", "MNG", false, false);
    currentState = "ACTIVE";
}

export class DropdownStates {
    stateList: Array<ICustomDropdownNCheckListData> = [
        { itemID: "ACTIVE", item: "Active", itemCode: "ACTIVE", isSelected: true },
        { itemID: "OBSOLETE", item: "Obsolete", itemCode: "OBSOLETE", isSelected: false },
        { itemID: "All", item: "Show All", itemCode: "All", isSelected: false },
    ]
}
