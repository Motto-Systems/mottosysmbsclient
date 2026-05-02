import { GridColumnBO } from "../../utility/commonModel";
import { CommonConstants } from "../../utility/constant";

export interface IToDoCountBO {
    formId: number;
    formTitle: string;
    formCount: number;
    moduleCode: string;
}
export class IToDoCountBOList extends Array<IToDoCountBO> { }

export class TodoItems {
    formID: number = 0;
    moduleCode: string = "";
    items: any;
    conditionalData: any;
}

export class ExtraDataListBO {
    dbColumn: string = "";
    friendlyColumn: string = "";
    dataType: string = "";
    moduleId: number = 0;
}

export class ExtraDataListBOList extends Array<ExtraDataListBO> { }

export class GetUserApplicationsToAccessBO {
    item: string = "";
    imgPath: string = "";
    appUrl: string = "";
    itemCode: string = "";
    appTitle: string = "";
    isSyncDone: boolean = false;
    facilitySyncDone: boolean = false;
    isSyncApp: boolean = false;
    isOpenNewWindow: boolean = false;
}

export class GetUserApplicationsToAccessBOList extends Array<GetUserApplicationsToAccessBO> { }

export const TodoListGridColumnsInfo = [
    new GridColumnBO('sno', CommonConstants.sno, 'grid-col-10'),
    new GridColumnBO('requestCode', CommonConstants.requestCode, 'grid-col-35'),
    new GridColumnBO('referenceNumber', CommonConstants.referenceNum, 'grid-col-35'),
    new GridColumnBO('status', CommonConstants.status, 'grid-col-20'),
];

export const TodoListGridExtraColumnsInfo = [
    new GridColumnBO('createdBy', CommonConstants.createdBy),
    new GridColumnBO('createdOn', CommonConstants.createdOn),
];
