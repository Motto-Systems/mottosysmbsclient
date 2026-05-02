import { TextBoxInputs } from "../../shared/globalShared/customTextbox/customTextboxModal";
import { DropdownDetails } from "../../shared/globalShared/customDropdown/customDropdownModel";
import { CustomCheckListDetails, ICustomDropdownNCheckListData } from "../../shared/globalShared/customCheckList/customChecklistModel";
import { DateInputs } from "../../shared/globalShared/customDateTimePicker/customDateTimePickerModal";
import { GridColumnBO } from "../../shared/utility/commonModel";
import { ActionBO } from "../../shared/globalShared/appGrid/appGrid.model";
import { MODE_TYPE } from "../../shared/utility/constant";

/* ---------- Constants ---------- */

export const sampleConstants = {
    fullName:       "Full Name",
    email:          "Email Address",
    remarks:        "Remarks",
    department:     "Department",
    role:           "Role",
    employee:       "Employee (Lookup)",
    joiningDate:    "Joining Date",
    modalRemarks:   "Modal Remarks",
};

/* ---------- Grid Columns ---------- */

export const SampleGridColumnsInfo: GridColumnBO[] = [
    new GridColumnBO('sNo',       'S.No',       'grid-col-10'),
    new GridColumnBO('fullName',  'Full Name',  'grid-col-30'),
    new GridColumnBO('email',     'Email',      'grid-col-30'),
    new GridColumnBO('department','Department', 'grid-col-30'),
];

export const SampleGridActions: ActionBO[] = [
    new ActionBO('VIEW',   'eye',          'View',   null, 'icon-btn-primary'),
    new ActionBO('EDIT',   'pen-to-square','Edit',   null, 'icon-btn-warning'),
    new ActionBO('DELETE', 'trash',        'Delete', null, 'icon-btn-danger'),
];

/* ---------- Fields Configuration ---------- */

export class SampleFieldsInfo {

    // Textbox – single line (required)
    fullName: TextBoxInputs = new TextBoxInputs(
        sampleConstants.fullName, 100, true, true, "all", "TextBox"
    );

    // Textbox – email, optional
    email: TextBoxInputs = new TextBoxInputs(
        sampleConstants.email, 200, false, true, "all", "TextBox"
    );

    // Textarea – multi-line
    remarks: TextBoxInputs = new TextBoxInputs(
        sampleConstants.remarks, 500, false, false, "all", "TextArea"
    );

    // Single-select Dropdown
    department: DropdownDetails = new DropdownDetails(
        sampleConstants.department, true, true, "", MODE_TYPE.MANAGE, false, false
    );

    // Multi-select Dropdown
    role: DropdownDetails = new DropdownDetails(
        sampleConstants.role, true, true, "", MODE_TYPE.MANAGE, false, false
    );

    // Checklist
    skills: CustomCheckListDetails = new CustomCheckListDetails(
        "Skills", false, false, "", false, false
    );

    // Date picker
    joiningDate: DateInputs = new DateInputs(
        sampleConstants.joiningDate, true, undefined, undefined, "date", "dateFormat"
    );

    // Modal textarea
    modalRemarks: TextBoxInputs = new TextBoxInputs(
        sampleConstants.modalRemarks, 500, false, false, "all", "TextArea"
    );

    /* Lists */
    departmentList: ICustomDropdownNCheckListData[] = [];
    roleList:       ICustomDropdownNCheckListData[] = [];
    skillList:      ICustomDropdownNCheckListData[] = [];

    constructor() {
        this.remarks.rows = 4;
        this.modalRemarks.rows = 3;
        this.role.isMultiple = true;

        this.departmentList = [
            { itemCode: "HR",  itemID: 1, item: "Human Resources",        isSelected: false },
            { itemCode: "IT",  itemID: 2, item: "Information Technology", isSelected: false },
            { itemCode: "FIN", itemID: 3, item: "Finance",                isSelected: false },
            { itemCode: "OPS", itemID: 4, item: "Operations",             isSelected: false },
        ];

        this.roleList = [
            { itemCode: "DEV", itemID: 1, item: "Developer",        isSelected: false },
            { itemCode: "QA",  itemID: 2, item: "QA Engineer",       isSelected: false },
            { itemCode: "BA",  itemID: 3, item: "Business Analyst",  isSelected: false },
            { itemCode: "MGR", itemID: 4, item: "Manager",           isSelected: false },
        ];

        this.skillList = [
            { itemCode: "ANGULAR", itemID: 1, item: "Angular",    isSelected: false },
            { itemCode: "REACT",   itemID: 2, item: "React",       isSelected: false },
            { itemCode: "NODE",    itemID: 3, item: "Node.js",     isSelected: false },
            { itemCode: "DOTNET",  itemID: 4, item: ".NET / C#",   isSelected: false },
            { itemCode: "SQL",     itemID: 5, item: "SQL",         isSelected: false },
        ];
    }
}

/* ---------- Business Object ---------- */

export interface LookupSelectEvent {
    action: string;
    text:   string;
    val:    ICustomDropdownNCheckListData | null;
}

export interface DropdownChangeEvent {
    value: number | number[];
    obj:   ICustomDropdownNCheckListData[];
}

export class SampleBO {
    fullName:       string                          = "";
    email:          string                          = "";
    remarks:        string                          = "";
    departmentId:   number                          = 0;
    roleIds:        number[]                        = [];
    skillIds:       ICustomDropdownNCheckListData[] = [];
    employee:       ICustomDropdownNCheckListData | null = null;
    joiningDate:    Date | null                     = null;
    modalRemarks:   string                          = "";
}
