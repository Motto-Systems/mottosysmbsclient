import { TextBoxInputs } from "../../shared/globalShared/customTextbox/customTextboxModal";
import { DropdownDetails } from "../../shared/globalShared/customDropdown/customDropdownModel";
import { ICustomDropdownNCheckListData } from "../../shared/globalShared/customCheckList/customChecklistModel";
import { MODE_TYPE } from "../../shared/utility/constant";
 
/* ---------- Constants ---------- */
 
export const userMasterConstants = {
  itemName: "Item Title / Name",
  category: "Category",
  departmentCode: "Department Code",
  description: "Description / Remarks"
};
 
 
/* ---------- Fields Configuration ---------- */
 
export class UserMasterFieldsInfo {
 
  itemName: TextBoxInputs = new TextBoxInputs( userMasterConstants.itemName, 100, true, true, "all", "TextBox");
  departmentCode: TextBoxInputs = new TextBoxInputs( userMasterConstants.departmentCode, 20, true, true, "alphaNumeric", "TextBox");
  description: TextBoxInputs = new TextBoxInputs( userMasterConstants.description, 500, false, true, "all", "TextArea");
  category: DropdownDetails = new DropdownDetails( userMasterConstants.category, true, true, "", MODE_TYPE.MANAGE, false, false);
 
  constructor() {
    this.description.rows = 4;   // ✅ This makes textarea 4 lines
  }
  /* Dropdown Lists */
  categoryList: ICustomDropdownNCheckListData[] = [];
 
}
 
/* ---------- Business Object ---------- */
export class UserMasterBO {
 
  itemName: string = "";
  categoryId: number = 0;
  departmentCode: string = "";
  description: string = "";
 
}