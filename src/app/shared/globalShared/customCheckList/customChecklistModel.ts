export class CustomCheckListDetails {

  operationType: string = "MNG";          // View Type
  checklistHeading: string = 'Custom Check boxes';  // Checklist title
  description: string = "";                         // Other filed Textarea property
  isShowTextBox: boolean = false;                   // To show/hide the other field Textarea.
  otherFiledTitle: string = "Description";          // Other texp field label text
  isMandatory: boolean = true;                      // For showing manadaoty symbol
  isSelectAllSelected: boolean = false;             // For checking the select all checkbox
  isShowSelectAllOption: boolean = false;           // To show/hide select all check box 

  isSingleCheckBox: boolean = false;                // For showing only single check box
  singleCheckBoxTile: string = "Test checkbox";     // Label Title for single check box 

  labelPosition: 'before' | 'after' = 'after';    // Position of checkbox
  otherTextLength: number = 250;
  considerActiveItems: boolean = false;
  isPlantApp: boolean = false;
  plantID: number = 0;

  constructor(checklistHeading: string = "", isMandatory: boolean = true, isSingleCheckBox: boolean = false, singleCheckBoxTile: string = "",
    considerActiveItems: boolean = false, isPlantApp: boolean = false) {
    this.checklistHeading = checklistHeading;
    this.isMandatory = isMandatory;
    this.isSingleCheckBox = isSingleCheckBox;
    this.singleCheckBoxTile = singleCheckBoxTile;
    this.isPlantApp = isPlantApp;
    this.considerActiveItems = considerActiveItems;
  }
}

export class ICustomDropdownNCheckListData {
  id?: number;
  itemID?: any;

  itemCode: string = "";
  item: string = "";
  isSelected: boolean = false;
  isDisabled?: boolean;
  isSystemCode?: boolean;
  statusCode?: string;
  otherText?: string;
  categoryCode?: string;
  selectedValue?: string;
  isActive?: boolean = false;
  plantID?: number;
  itemOrder?: number;
  dbColumnName?: string;
  actualID?: string;
  displayData?: string = "";
  orderNo?: number = 0;
  isChanged?: boolean = false;
  itemActualID?: number = 0;
  extraID?: any;
}
