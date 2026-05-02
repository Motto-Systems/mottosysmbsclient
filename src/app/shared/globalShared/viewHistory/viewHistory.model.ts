import { GridColumnBO, LabelBO, TemplateActionBO } from "../../utility/commonModel";
import { CommonConstants, faLabelIcons } from "../../utility/constant";
import { ICustomDropdownNCheckListData } from "../customCheckList/customChecklistModel";
import { DropdownDetails } from "../customDropdown/customDropdownModel";

export const uiTitles = {
  ReqName: "Request",
  Action_History: "Action History",
  Current_History: "Current History"
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
  user: "User",
  workflowtemplate: "Workflow Template",
  approvalLevel: "Approval Level",
  revisonRemarks: "Revision Remarks"
}

export class ActionHistoryDataWithReq {
  requestBasicInfoBaseBO: RequestBasicInfoBaseBo = new RequestBasicInfoBaseBo();
  actionHistoryData: ActionHistoryData = new ActionHistoryData();
}

export class RequestBasicInfoBaseBo {
  requestcode: string = ""
  status: string = ""
  createdBy: string = ""
  createdOn: string = ""
  workflowtemplate: string = ""
  approvalLevel: string = ""
  maxLevels: string = ""
  requestState: string = ""
}

export class ActionHistoryData {
  actionHistory: ActionHistory[] = [];
}

export class ActionHistory {
  actionHistoryID: string = ""
  action: string = ""
  confirmedBy: ConfirmedBy = new ConfirmedBy();
  department: string = ""
  unit: string = ""
  resultantStatus: string = ""
  confirmedON: string = ""
  appLevelID: string = ""
  appLevel: string = ""
  remarks: string = ""
  isFinalFlag: string = ""
}

export class ConfirmedBy {
  item: string = ""
  itemCode: string = ""
  itemID: string = ""
}

export class HistoryDetailsBo {
  historyOptionsFields: DropdownDetails = new DropdownDetails("Select", true, true, "", "MNG", false, false);

  labelList: LabelBO[] = [
    new LabelBO('requestcode', CommonConstants.requestCode),
    new LabelBO('status', CommonConstants.status),
    new LabelBO('createdBy', CommonConstants.createdBy),
    new LabelBO('createdOn', CommonConstants.createdOn, true, 'datetime'),
    new LabelBO('workflowtemplate', ActionHistoryHeaders.workflowtemplate),
    new LabelBO('approvalLevel', ActionHistoryHeaders.approvalLevel),
  ];

  historyOptionsList: Array<ICustomDropdownNCheckListData> = [
    { itemID: "ACTION_HISTORY", itemCode: "ACTION_HISTORY", item: "Action History", isSelected: false },
    { itemID: "REVISION_HISTORY", itemCode: "REVISION_HISTORY", item: "Revision History", isSelected: false }
    // { itemID: "MODULE_MAPPING", itemCode: "MODULE_MAPPING", item: "Module Mapping", isSelected: false }
  ];
}

export const ActionHistoryLabels = {
  multiUsers: "Assigned to Multi Users",
}

export const ActionHistoryGridColumnsInfo = [
  new GridColumnBO('sno', ActionHistoryHeaders.sNo, 'grid-col-10'),
  new GridColumnBO('appLevel', ActionHistoryHeaders.appLevel, 'grid-col-15'),
  new GridColumnBO('confirmedOn', ActionHistoryHeaders.confirmedON, 'grid-col-20'),
  new GridColumnBO('confirmedBy', ActionHistoryHeaders.confirmedBy, 'grid-col-20'),
  new GridColumnBO('action', ActionHistoryHeaders.action, 'grid-col-20'),
  new GridColumnBO('resultantStatus', ActionHistoryHeaders.resultantStatus, 'grid-col-15'),
];

export const ActionHistoryExtendedGridColumnsInfo = [
  new GridColumnBO('unit', ActionHistoryHeaders.sNo),
  new GridColumnBO('department', ActionHistoryHeaders.appLevel),
  new GridColumnBO('designation', ActionHistoryHeaders.confirmedON),
  new GridColumnBO('remarks', ActionHistoryHeaders.confirmedBy),
];

export const CurrentActionHistoryGridColumnsInfo = [
  new GridColumnBO('sno', ActionHistoryHeaders.sNo, 'grid-col-10'),
  new GridColumnBO('unit', ActionHistoryHeaders.unit, 'grid-col-30'),
  new GridColumnBO('department', ActionHistoryHeaders.department, 'grid-col-30'),
  new GridColumnBO('user', ActionHistoryHeaders.user, 'grid-col-30'),
];

export const RevisionHistoryGridColumnsInfo = [
  new GridColumnBO('referenceNumber', CommonConstants.referenceNum),
  new GridColumnBO('effectiveFrom', CommonConstants.effectiveFrom),
  new GridColumnBO('effectiveTo', CommonConstants.effectiveTo),
  new GridColumnBO('performedBy', CommonConstants.performedBy),
  new GridColumnBO('performedOn', CommonConstants.performedOn),
  new GridColumnBO('confirmedBy', ActionHistoryHeaders.confirmedBy),
];

export const RevisionHistoryGridExtraColumnsInfo = [
  new GridColumnBO('revisonRemarks', ActionHistoryHeaders.revisonRemarks)
];

export const TEMP_ACTIONS = {
  ACTION_HISTORY: "ACTION_HISTORY",
  CURRENT_HISTORY: "CURRENT_HISTORY",
}

export const ActionHistoryTemplateActions: TemplateActionBO[] = [
  new TemplateActionBO(uiTitles.Action_History, CommonConstants.actionHistory, faLabelIcons.faiconbullhornregular, TEMP_ACTIONS.ACTION_HISTORY),
  new TemplateActionBO(uiTitles.Current_History, CommonConstants.currentHistory, faLabelIcons.faiconpuzzlepieceregular, TEMP_ACTIONS.CURRENT_HISTORY),
];