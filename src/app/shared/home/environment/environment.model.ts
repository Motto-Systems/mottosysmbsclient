import { FormInfoBO } from "../../../core/context/contextModel";

export interface IGetMenuBO {
    moduleTitle: string;
    groupTitle: string;
    iconName: string;
    moduleCode: string;
    routerNavigation: string;
    moduleID: string;
    moduleGroup: string;
}

export class ModuleSubModule {
    moduleID: string = ""
    moduleTitle: string = ""
    moduleCode: string = ""
    routerNavigation: string = ""
    formsInfo: FormInfoBO[] = [];
    expanded: boolean = false;
    cssClass: string = "";
    moduleGroup: string = "";
}

export class GetMenuBOList extends Array<IGetMenuBO> { }

export class Application {
    applicationName: string = "";
    applicationCode: string = "";
    applicationUrl: string = "";
    imagePath: string = "";
}

export class SectionBO {
    code: string = "";
    label: string = "";
    icon: string = "";
    constructor(code: string = "", label: string = "", icon: string = "") {
        this.code = code;
        this.label = label;
        this.icon = icon;
    }
}

export enum MenuGroupCode {
    ToDo = "todo",
    Masters = "masters",
    Transactions = "transactions",
    Logs = "logs"
}
