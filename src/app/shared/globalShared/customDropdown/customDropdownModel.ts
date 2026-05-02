import { OPERATION_TYPE } from "../../utility/constant";


export class DropdownDetails {
  isMultiple: boolean = false;             // To activate multiple selection
  hideSelect: boolean = true;             // To Display Select selection
  labelText: string = "Custom Dropdown";   // Dropdown field label text
  isDisabled: boolean = false;             // For disabling the dropdown field
  isShowSelectAll: boolean = false;        // For displaying select all checkbox
  viewType: OPERATION_TYPE = "MNG";     // For managing the view type
  isMandatory: boolean = true;             // For showing mandatory symbol
  isAllSelected: boolean = false;          // To select and deselect all checkboxes at once.
  isValueID: boolean = true;              // To bind Id / code.
  moduleCode: string = "";
  considerActiveItems: boolean = true;
  considerPlantwiseItems: boolean = false;
  plantID: number = 0;
  isSearch:boolean=true;
  canBind:boolean = true;
  alwaysBind:boolean = false

  constructor(labelText: string = "", isMandatory: boolean = true, isValueID: boolean = true, _moduleCode: string = "",
    viewType: OPERATION_TYPE = "MNG", considerActiveItems: boolean = true, considerPlantwiseItems: boolean = false, canBind: boolean = false, alwaysBind: boolean = false) {
    this.labelText = labelText;
    this.isMandatory = isMandatory;
    this.isValueID = isValueID;
    this.moduleCode = _moduleCode;
    this.viewType = viewType;
    this.considerActiveItems = considerActiveItems;
    this.considerPlantwiseItems = considerPlantwiseItems;
    this.canBind = canBind;
    this.alwaysBind = alwaysBind;
  }
}
