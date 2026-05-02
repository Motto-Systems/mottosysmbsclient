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
            moduleID: 3,
            moduleTitle: "Create Master Schedules",
            moduleCode: "MASTER_SCHEDULE",
            routerNavigation: "/root/masterSchedules",
            cssClass: "fa-icon-calendar-light",
            moduleGroup: "MASTERS",
            formsInfo: [
                {
                    formsID: 5,
                    formsTitle: "Create New Master Schedule",
                    formsCode: "CREATE_MASTER_SCHEDULE",
                    formRoute: "/root/masterSchedules/create",
                    formType: "MAIN_FORM",
                    approvalType: "WORKFLOW",
                    capability: "MANAGE"
                },
                {
                    formsID: 6,
                    formsTitle: "List of Master Schedule",
                    formsCode: "LIST_MASTER_SCHEDULE",
                    formRoute: "/root/masterSchedules/list",
                    formType: "SUB_FORM",
                    approvalType: "CAPABILITY",
                    capability: "MANAGE"
                },
                
            ]
        },

        {
            moduleID: 4,
            moduleTitle: "Equipment",
            moduleCode: "EQUIPMENT",
            routerNavigation: "/root/equipment",
            cssClass: "fa-icon-cube-light",
            moduleGroup: "MASTERS",
            formsInfo: [
                {
                    formsID: 7,
                    formsTitle: "List of Equipment",
                    formsCode: "LIST_EQUIPMENT",
                    formRoute: "/root/equipment/list",
                    formType: "SUB_FORM",
                    approvalType: "CAPABILITY",
                    capability: "MANAGE"
                }
            ]
        },

        {
            moduleID: 5,
            moduleTitle: "Instrument",
            moduleCode: "INSTRUMENT",
            routerNavigation: "/root/instrument",
            cssClass: "fa-icon-gauge-min-regular-full",
            moduleGroup: "MASTERS",
            formsInfo: [
                {
                    formsID: 8,
                    formsTitle: "List of Instrument",
                    formsCode: "LIST_INSTRUMENT",
                    formRoute: "/root/instrument/list",
                    formType: "SUB_FORM",
                    approvalType: "CAPABILITY",
                    capability: "MANAGE"
                }
            ]
        },

        {
            moduleID: 6,
            moduleTitle: "Utilities",
            moduleCode: "UTILITIES",
            routerNavigation: "/root/utilities",
            cssClass: "fa-icon-washing-machine-light",
            moduleGroup: "MASTERS",
            formsInfo: [
                {
                    formsID: 9,
                    formsTitle: "List of Utilities",
                    formsCode: "LIST_UTILITIES",
                    formRoute: "/root/utilities/list",
                    formType: "SUB_FORM",
                    approvalType: "CAPABILITY",
                    capability: "MANAGE"
                }
            ]
        },

        {
            moduleID: 7,
            moduleTitle: "Area / Rooms",
            moduleCode: "AREA_ROOMS",
            routerNavigation: "/root/areaRooms",
            cssClass: "fa-icon-building-solid-full",
            moduleGroup: "MASTERS",
            formsInfo: [
                {
                    formsID: 10,
                    formsTitle: "List of Areas/Rooms",
                    formsCode: "LIST_AREA_ROOMS",
                    formRoute: "/root/areaRooms/list",
                    formType: "SUB_FORM",
                    approvalType: "CAPABILITY",
                    capability: "MANAGE"
                }
            ]
        },

        {
            moduleID: 8,
            moduleTitle: "Critical Spares",
            moduleCode: "CRITICAL_SPARES",
            routerNavigation: "/root/criticalSpares",
            cssClass: "fa-icon-box-taped-light",
            moduleGroup: "MASTERS",
            formsInfo: [
                {
                    formsID: 11,
                    formsTitle: "List of Spares/Parts",
                    formsCode: "LIST_CRITICAL_SPARES",
                    formRoute: "/root/criticalSpares/list",
                    formType: "SUB_FORM",
                    approvalType: "CAPABILITY",
                    capability: "MANAGE"
                }
            ]
        },
        {
            moduleID: 9,
            moduleTitle: "Registration",
            moduleCode: "REGISTRATION",
            routerNavigation: "/root/registration",
            cssClass: "fa-icon-user-plus-light",
            moduleGroup: "MASTERS",
            formsInfo: [
                {
                    formsID: 12,
                    formsTitle: "New Registration",
                    formsCode: "NEW_REGISTRATION",
                    formRoute: "/root/registration/create",
                    formType: "MAIN_FORM",
                    approvalType: "WORKFLOW",
                    capability: "MANAGE"
                },
                {
                    formsID: 13,
                    formsTitle: "All Registrations",
                    formsCode: "LIST_REGISTRATION",
                    formRoute: "/root/registration/list",
                    formType: "SUB_FORM",
                    approvalType: "CAPABILITY",
                    capability: "MANAGE"
                }
            ]
        },

        {
            moduleID: 10,
            moduleTitle: "Assign Location",
            moduleCode: "ASSIGN_LOCATION",
            routerNavigation: "/root/assignLocation",
            cssClass: "fa-icon-location-crosshairs-light",
            moduleGroup: "MASTERS",
            formsInfo: [
                {
                    formsID: 14,
                    formsTitle: "Assign Location",
                    formsCode: "ASSIGN_LOCATION",
                    formRoute: "/root/assignLocation/assign",
                    formType: "MAIN_FORM",
                    approvalType: "WORKFLOW",
                    capability: "MANAGE"
                },
                {
                    formsID: 15,
                    formsTitle: "Visual Inspection",
                    formsCode: "VISUAL_INSPECTION",
                    formRoute: "/root/assignLocation/inspection",
                    formType: "SUB_FORM",
                    approvalType: "CAPABILITY",
                    capability: "MANAGE"
                },
                {
                    formsID: 16,
                    formsTitle: "Change Location",
                    formsCode: "CHANGE_LOCATION",
                    formRoute: "/root/assignLocation/change",
                    formType: "SUB_FORM",
                    approvalType: "CAPABILITY",
                    capability: "MANAGE"
                }
            ]
        },

        {
            moduleID: 11,
            moduleTitle: "Assign Master Schedules",
            moduleCode: "ASSIGN_MASTER_SCHEDULE",
            routerNavigation: "/root/masterScheduleAssign",
            cssClass: "fa-icon-calendar-check-light",
            moduleGroup: "MASTERS",
            formsInfo: [
                {
                    formsID: 17,
                    formsTitle: "Assign Schedule",
                    formsCode: "ASSIGN_SCHEDULE",
                    formRoute: "/root/masterScheduleAssign/assign",
                    formType: "MAIN_FORM",
                    approvalType: "WORKFLOW",
                    capability: "MANAGE"
                },
                {
                    formsID: 18,
                    formsTitle: "Unassign/Reassign",
                    formsCode: "UNASSIGN_REASSIGN",
                    formRoute: "/root/masterScheduleAssign/manage",
                    formType: "SUB_FORM",
                    approvalType: "CAPABILITY",
                    capability: "MANAGE"
                }
            ]
        },

        {
            moduleID: 12,
            moduleTitle: "Master Lists",
            moduleCode: "MASTER_LISTS",
            routerNavigation: "/root/masterLists",
            cssClass: "fa-icon-table-light",
            moduleGroup: "MASTERS",
            formsInfo: [
                {
                    formsID: 19,
                    formsTitle: "Search Master List Item",
                    formsCode: "SEARCH_MASTER_LIST",
                    formRoute: "/root/masterLists/search",
                    formType: "SUB_FORM",
                    approvalType: "CAPABILITY",
                    capability: "MANAGE"
                }
            ]
        },
        {
            moduleID: 13,
            moduleTitle: "Scheduled PM",
            moduleCode: "SCHEDULED_PM",
            routerNavigation: "/root/scheduledPM",
            cssClass: "fa-icon-calendar-check-light",
            moduleGroup: "Transactions",
            formsInfo: [
                {
                    formsID: 20,
                    formsTitle: "Scheduled PM Tasks",
                    formsCode: "SCHEDULED_PM_TASKS",
                    formRoute: "/root/scheduledPM/tasks",
                    formType: "SUB_FORM",
                    approvalType: "CAPABILITY",
                    capability: "MANAGE"
                }
            ]
        },

        {
            moduleID: 14,
            moduleTitle: "Unscheduled",
            moduleCode: "UNSCHEDULED_TASK",
            routerNavigation: "/root/unscheduled",
            cssClass: "fa-icon-calendar-exclamation-light",
            moduleGroup: "Transactions",
            formsInfo: [
                {
                    formsID: 21,
                    formsTitle: "Create Unscheduled Task",
                    formsCode: "CREATE_UNSCHEDULED_TASK",
                    formRoute: "/root/unscheduled/create",
                    formType: "MAIN_FORM",
                    approvalType: "WORKFLOW",
                    capability: "MANAGE"
                }
            ]
        },

        {
            moduleID: 15,
            moduleTitle: "Allocation",
            moduleCode: "TASK_ALLOCATION",
            routerNavigation: "/root/taskAllocation",
            cssClass: "fa-icon-user-check-regular",
            moduleGroup: "Transactions",
            formsInfo: [
                {
                    formsID: 22,
                    formsTitle: "Task Allocation",
                    formsCode: "TASK_ALLOCATION",
                    formRoute: "/root/taskAllocation/list",
                    formType: "SUB_FORM",
                    approvalType: "CAPABILITY",
                    capability: "MANAGE"
                }
            ]
        },
        {
            moduleID: 16,
            moduleTitle: "Scheduled Tasks",
            moduleCode: "SCHEDULED_TASKS",
            routerNavigation: "/root/scheduledTasks",
            cssClass: "fa-icon-clock-nine-solid-full",
            moduleGroup: "Transactions",
            formsInfo: [
                {
                    formsID: 23,
                    formsTitle: "List of Scheduled Cal. Tasks",
                    formsCode: "LIST_SCHEDULED_CAL_TASKS",
                    formRoute: "/root/scheduledTasks/list",
                    formType: "SUB_FORM",
                    approvalType: "CAPABILITY",
                    capability: "MANAGE"
                }
            ]
        },

        {
            moduleID: 17,
            moduleTitle: "Unscheduled",
            moduleCode: "UNSCHEDULED_TASK",
            routerNavigation: "/root/unscheduledTasks",
            cssClass: "fa-icon-calendar-exclamation-light",
            moduleGroup: "Transactions",
            formsInfo: [
                {
                    formsID: 24,
                    formsTitle: "Create Unscheduled Task",
                    formsCode: "CREATE_UNSCHEDULED_TASK",
                    formRoute: "/root/unscheduledTasks/create",
                    formType: "MAIN_FORM",
                    approvalType: "WORKFLOW",
                    capability: "MANAGE"
                }
            ]
        },

        {
            moduleID: 18,
            moduleTitle: "Allocation",
            moduleCode: "TASK_ALLOCATION",
            routerNavigation: "/root/taskAllocation",
            cssClass: "fa-icon-user-check-regular",
            moduleGroup: "Transactions",
            formsInfo: [
                {
                    formsID: 25,
                    formsTitle: "Task Allocation",
                    formsCode: "TASK_ALLOCATION",
                    formRoute: "/root/taskAllocation/list",
                    formType: "SUB_FORM",
                    approvalType: "CAPABILITY",
                    capability: "MANAGE"
                }
            ]
        },
        {
            moduleID: 19,
            moduleTitle: "Orders",
            moduleCode: "BREAKDOWN_ORDERS",
            routerNavigation: "/root/orders",
            cssClass: "fa-icon-screwdriver-wrench-solid-full",
            moduleGroup: "Transactions",
            formsInfo: [
                {
                    formsID: 26,
                    formsTitle: "Create Breakdown Order",
                    formsCode: "CREATE_BREAKDOWN_ORDER",
                    formRoute: "/root/orders/create",
                    formType: "MAIN_FORM",
                    approvalType: "WORKFLOW",
                    capability: "MANAGE"
                }
            ]
        },

        {
            moduleID: 20,
            moduleTitle: "Lists",
            moduleCode: "BREAKDOWN_LISTS",
            routerNavigation: "/root/orders/list",
            cssClass: "fa-icon-clipboard-list-solid-full",
            moduleGroup: "Transactions",
            formsInfo: [
                {
                    formsID: 27,
                    formsTitle: "List of Breakdown Tasks",
                    formsCode: "LIST_BREAKDOWN_TASKS",
                    formRoute: "/root/orders/tasks",
                    formType: "SUB_FORM",
                    approvalType: "CAPABILITY",
                    capability: "MANAGE"
                }
            ]
        },

        {
            moduleID: 21,
            moduleTitle: "Job Orders",
            moduleCode: "JOB_ORDERS",
            routerNavigation: "/root/jobOrders",
            cssClass: "fa-icon-file-pen-light",
            moduleGroup: "Transactions",
            formsInfo: [
                {
                    formsID: 28,
                    formsTitle: "Create New Job Order",
                    formsCode: "CREATE_JOB_ORDER",
                    formRoute: "/root/jobOrders/create",
                    formType: "MAIN_FORM",
                    approvalType: "WORKFLOW",
                    capability: "MANAGE"
                },
                {
                    formsID: 29,
                    formsTitle: "List of Job Orders",
                    formsCode: "LIST_JOB_ORDERS",
                    formRoute: "/root/jobOrders/list",
                    formType: "SUB_FORM",
                    approvalType: "CAPABILITY",
                    capability: "MANAGE"
                }
            ]
        },

        {
            moduleID: 22,
            moduleTitle: "Permit",
            moduleCode: "WORK_PERMIT",
            routerNavigation: "/root/workPermits",
            cssClass: "fa-icon-shield-check-light",
            moduleGroup: "Transactions",
            formsInfo: [
                {
                    formsID: 30,
                    formsTitle: "Create Permit",
                    formsCode: "CREATE_PERMIT",
                    formRoute: "/root/workPermits/create",
                    formType: "MAIN_FORM",
                    approvalType: "WORKFLOW",
                    capability: "MANAGE"
                },
                {
                    formsID: 31,
                    formsTitle: "List of Work Permits",
                    formsCode: "LIST_WORK_PERMITS",
                    formRoute: "/root/workPermits/list",
                    formType: "SUB_FORM",
                    approvalType: "CAPABILITY",
                    capability: "MANAGE"
                }
            ]
        },

        {
            moduleID: 23,
            moduleTitle: "General",
            moduleCode: "GENERAL_TASKS",
            routerNavigation: "/root/general",
            cssClass: "fa-icon-rectangle-vertical-history-light",
            moduleGroup: "Transactions",
            formsInfo: [
                {
                    formsID: 32,
                    formsTitle: "Periodic Review",
                    formsCode: "PERIODIC_REVIEW",
                    formRoute: "/root/general/review",
                    formType: "SUB_FORM",
                    approvalType: "CAPABILITY",
                    capability: "MANAGE"
                },
                {
                    formsID: 33,
                    formsTitle: "Interunit Transfers",
                    formsCode: "INTERUNIT_TRANSFERS",
                    formRoute: "/root/general/transfers",
                    formType: "SUB_FORM",
                    approvalType: "CAPABILITY",
                    capability: "MANAGE"
                },
                {
                    formsID: 34,
                    formsTitle: "Prepone/Postpone",
                    formsCode: "PREPONE_POSTPONE",
                    formRoute: "/root/general/scheduleChange",
                    formType: "SUB_FORM",
                    approvalType: "CAPABILITY",
                    capability: "MANAGE"
                }
            ]
        },

        // Dummy Module 1: Sample Master
        {
            moduleID: 1234,
            moduleTitle: "Sample Master",
            moduleCode: "SMP_MASTER",
            routerNavigation: "/root/sampleMaster",
            cssClass: "fa-icon-flask-light",
            moduleGroup: "MASTERS",
            formsInfo: [
                {
                    formsID: 3861,
                    formsTitle: "List of Sample Masters",
                    formsCode: "LIST_SMP_MASTER",
                    formRoute: "/root/sampleMaster/listSmpMaster",
                    formType: "SUB_FORM",
                    approvalType: "CAPABILITY",
                    orderNum: null,
                    mongoFormID: null,
                    isModuleFrom: null,
                    capability: "LIST_SMP_MASTER",
                    moduleCode: "SMP_MASTER"
                },
                {
                    formsID: 3860,
                    formsTitle: "Create New Sample Master",
                    formsCode: "CRT_SMP_MASTER",
                    formRoute: "/root/sampleMaster/crtSampleMstr",
                    formType: "MAIN_FORM",
                    approvalType: "WORKFLOW",
                    orderNum: null,
                    mongoFormID: null,
                    isModuleFrom: null,
                    capability: "MANAGE",
                    moduleCode: "SMP_MASTER"
                }
            ]
        },

        // Dummy Module 2: Test Configuration
        {
            moduleID: 2001,
            moduleTitle: "Test Configuration",
            moduleCode: "TEST_CONFIG",
            routerNavigation: "/root/testConfig",
            cssClass: "fa-icon-vial-light",
            moduleGroup: "MASTERS",
            formsInfo: [
                {
                    formsID: 4001,
                    formsTitle: "List of Test Configurations",
                    formsCode: "LIST_TEST_CONFIG",
                    formRoute: "/root/testConfig/list",
                    formType: "SUB_FORM",
                    approvalType: "CAPABILITY",
                    orderNum: null,
                    mongoFormID: null,
                    isModuleFrom: null,
                    capability: "LIST_TEST_CONFIG",
                    moduleCode: "TEST_CONFIG"
                },
                {
                    formsID: 4002,
                    formsTitle: "Create New Test Configuration",
                    formsCode: "CRT_TEST_CONFIG",
                    formRoute: "/root/testConfig/create",
                    formType: "MAIN_FORM",
                    approvalType: "WORKFLOW",
                    orderNum: null,
                    mongoFormID: null,
                    isModuleFrom: null,
                    capability: "MANAGE",
                    moduleCode: "TEST_CONFIG"
                },
                {
                    formsID: 4003,
                    formsTitle: "Test Parameters Setup",
                    formsCode: "TEST_PARAMS",
                    formRoute: "/root/testConfig/params",
                    formType: "SUB_FORM",
                    approvalType: "CAPABILITY",
                    orderNum: null,
                    mongoFormID: null,
                    isModuleFrom: null,
                    capability: "MANAGE",
                    moduleCode: "TEST_CONFIG"
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
