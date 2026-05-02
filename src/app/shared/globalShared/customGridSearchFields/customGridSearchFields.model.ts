import { FormControl } from "@angular/forms";
import { StateCodes } from "../../utility/constant";
import { ICustomDropdownNCheckListData } from "../customCheckList/customChecklistModel";
import { DropdownDetails } from "../customDropdown/customDropdownModel";
import { MatTableDataSource } from "@angular/material/table";

export class CustomSearchFieldsInfo {
    stateDropdown: DropdownDetails = new DropdownDetails("Select State", true, true, "", "MNG", false, false);

    stateList: Array<ICustomDropdownNCheckListData> = [
        { itemID: "ACTIVE", item: "Active", itemCode: "ACTIVE", isSelected: true },
        { itemID: "OBSOLETE", item: "Obsolete", itemCode: "OBSOLETE", isSelected: false },
        { itemID: "All", item: "Show All", itemCode: "All", isSelected: false },
    ];

    currentState = StateCodes.ACTIVE;
    searchControl = new FormControl();
}

export class GetSrchDataBO {
    dataSource: MatTableDataSource<any> = new MatTableDataSource();
    filterKeys: string[] = [];
}

export class TableFilter {
    searchText: string = "";
    selectedState: string = "";
}

export const GridFilterKeys = {
    state: "state",
}