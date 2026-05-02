import { GLOBAL_CONSTANTS, IconNames } from "../../utility/constant";
import { ActionBO } from "../appGrid/appGrid.model";
import { DropdownDetails } from "../customDropdown/customDropdownModel";

export const CheckListPurpose = {
  getCheckPointsExecutionData: "GetCheckPointsExecutionData",
  manageChecklistResults: "ManageChecklistResults",
  manageChecklist: "ManageChecklist",
  getCheckListsByControlID: "GetCheckListsByControlID",
  getChecklist: "getChecklist",
  discardChecklistResults: "discardChecklistResults"
}

export class CheckPointsListBO {
  checkListControlID: string = "";
  unitID: string = "";
  formID: string = "";
  checklistFilters: Array<ChecklistFilterItems> = [];
}

export class ChecklistFilterItems {
  property: string = "";
  value: string = "";
}

export class ChecklistExecBaseInfo {
  requestID: string = "";
  property: string = "";
  moduleCode: string = "";
  itemReferenceID: string = "";
  parentProperty: string = "";
}

export class AddCheckListBO extends ChecklistExecBaseInfo {
  checkListID: string = "";
}

export class CheckPointsListData extends ChecklistExecBaseInfo {
  checkPointsExecutionID: string = "";
  checkPointsExecution = new checkPointsExecution();
}

export class checkPointsExecution {
  checkListID: string = "";
  checkListTitle: string = "";
  addtionalOptions: Array<DropDownListItems> = [];
  checkPointsLists: Array<checkPointsLists> = [];
}

export const LevelCodes = {
  yesLevel: "YES",
  noLevel: "NO",
  sasLevel: "SAT",
}

export const LevelList = [
  { label: "YES", code: LevelCodes.yesLevel },
  { label: "NO", code: LevelCodes.noLevel },
  { label: "SATISFIED", code: LevelCodes.sasLevel },
];


export class checkPointsLists {
  checkPointsID: string = "";
  title: string = "";
  snum: string = "";
  orderNum: number = 0;
  checkPointType: string = "";
  checkListOptions: Array<any> = [];
  parentID: string = "";
  correctOption: Array<any> = []
  result: string = "";
  justification: string = "";
  isCorrect: string = "";
  signature: string = "";
  checkListOptionField: any;
  justificationField: any;
  checkListOptionsList: Array<any> = [];
}

export class AddCheckPointsList {
  addCheckListOptionField = new DropdownDetails("Checklists", true, true, GLOBAL_CONSTANTS.EMPTY, "MNG", false, false);
}

export class ChecklistListBO {
  checkList: string = "";
}

export const CheckListHeaders = {
  SNo: "S.No.",
  CheckListTitle: "Checklist Title",
  AddedBy: "Added By",
  AddedOn: "Added On",
  Action: "Action",
  Status: "Status",
  ReferenceNo: "Reference No",
  discardedBy: "Discarded By",
  discardedOn: "Discarded On"
}

export class Actions {
  actions: Array<ActionBO> = [
    { action: "Go", toolTip: "Go", icon: IconNames.go, actionData: "" },
    { action: "Discard", toolTip: "Discard", icon: IconNames.close, actionData: "" }
  ];
}

export class ManageList {
  requestID: string = "";
  checkListID: string = "";
  property: string = "";
}

export class DisCardOrGoCheckList extends ChecklistExecBaseInfo {
  checkPointsExecutionID: string = "";
}

export const APIResponseCode = {
  SUCCESS: "SUCCESS",
  OK: "OK"
}

export const ChecklistConstants = {
  CHECKLIST_MODE: "checklist",
  MULTIPLE: "Multiple",
  AUTOSAVE_CHECKLIST_TYPE: "checklist",
  AUTOSAVE_GRID_TYPE: 'gird'
}

export class CheckListMessages {
  static discardConfirmation = "Are you sure you want to discard #item item? This action cannot be undone."
}

export class DropDownListItems {
  item: string = "";
  itemCode: string = "";
  itemID: string = "";
  displayItemName: string = "";
  optionType: string = "";
}
