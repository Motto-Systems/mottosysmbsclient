// import { LabelDesignPurposeCodes } from "../../feature/labelDesign/labelDesignServiceUrls";

// export const MockResponse = {
//     [LabelDesignPurposeCodes.GetLabelGenerationEvents]: [
//         { itemID: 'SBTN', item: 'Save Button', itemCode: "SBTN", isSelected: false },
//         { itemID: 'CBTN', item: 'Confirm Button', itemCode: "CBTN", isSelected: false },
//         { itemID: 'ADP_BTN', item: 'Add Packs Button', itemCode: "ADP_BTN", isSelected: false }
//     ],


// }



export const MockResponse: Record<string, any> = {
    "GetLabelGenerationEvents": [
        { itemID: 'SBTN', item: 'Save Button', itemCode: "SBTN", isSelected: false },
        { itemID: 'CBTN', item: 'Confirm Button', itemCode: "CBTN", isSelected: false },
        { itemID: 'ADP_BTN', item: 'Add Packs Button', itemCode: "ADP_BTN", isSelected: false }
    ],
 
    "Workflow/GetMenuListByAppCode": [
        {
            moduleID: 1,
            moduleTitle: "User Masters",
            moduleCode: "USR_MASTER",
            routerNavigation: "/root/userMasters",
            cssClass: "fa-icon-user-gear-light",
            moduleGroup: "MASTERS",
            formsInfo: [
                {
                    formsID: 1,
                    formsTitle: "Create New User Masters",
                    formsCode: "CREATE_USER_MASTER",
                    formRoute: "/root/userMasters/create",
                    formType: "MAIN_FORM",
                    approvalType: "WORKFLOW",
                    capability: "MANAGE"
                },
                {
                    formsID: 2,
                    formsTitle: "List of User Masters",
                    formsCode: "LIST_USER_MASTER",
                    formRoute: "/root/userMasters/list",
                    formType: "SUB_FORM",
                    approvalType: "CAPABILITY",
                    capability: "MANAGE"
                }
            ]
        },
 
        {
            moduleID: 2,
            moduleTitle: "Systems Masters",
            moduleCode: "SYS_MASTER",
            routerNavigation: "/root/systemMasters",
            cssClass: "fa-icon-layer-group-light",
            moduleGroup: "MASTERS",
            formsInfo: [
                {
                    formsID: 3,
                    formsTitle: "Create New System Master",
                    formsCode: "CREATE_SYSTEM_MASTER",
                    formRoute: "/root/systemMasters/create",
                    formType: "MAIN_FORM",
                    approvalType: "WORKFLOW",
                    capability: "MANAGE"
                },
                {
                    formsID: 4,
                    formsTitle: "List Of System Masters",
                    formsCode: "LIST_SYSTEM_MASTER",
                    formRoute: "/root/userMasters/list",
                    formType: "SUB_FORM",
                    approvalType: "CAPABILITY",
                    capability: "MANAGE"
                }
            ]
        },
        {
            moduleID: 18,
            moduleTitle: "Sample Module",
            moduleCode: "TASK_ALLOCATION",
            routerNavigation: "/root/taskAllocation",
            cssClass: "fa-icon-user-check-regular",
            moduleGroup: "Transactions",
            formsInfo: [
                {
                    formsID: 25,
                    formsTitle: "Sample Form",
                    formsCode: "TASK_ALLOCATION",
                    formRoute: "/root/taskAllocation/list",
                    formType: "SUB_FORM",
                    approvalType: "CAPABILITY",
                    capability: "MANAGE"
                }
            ]
        }
        
 
    ],

 "UserMasters/List": {
  result: [
    { userId: "USR001", userName: "Admin User", department: "IT", role: "Administrator", status: "Active" },
    { userId: "USR002", userName: "John Smith", department: "Production", role: "Operator", status: "In Progress" },
    { userId: "USR003", userName: "David Lee", department: "Quality", role: "Inspector", status: "For Approval" },
    { userId: "USR004", userName: "Shivam", department: "Dev", role: "Developer", status: "Inactive" },
    { userId: "USR005", userName: "Prathmesh", department: "Dev", role: "Developer", status: "In Progress" }
 
  ],
  totalRecords: 5
},
 
"UserMasters/GetCategories": {
  result: [
    { itemID: 1, itemCode: "IT", item: "IT", isActive: true, isSelected: false },
    { itemID: 2, itemCode: "PROD", item: "Production", isActive: true, isSelected: false },
    { itemID: 3, itemCode: "QA", item: "Quality", isActive: true, isSelected: false }
  ]
},

}
