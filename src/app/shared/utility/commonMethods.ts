import { DatePipe } from "@angular/common";
import { DATE_FORMAT_TYPE, MODE_TYPE, SEARCH_SESSIONBO } from "./constant";
import { environment } from "../../../environments/environment";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialogConfig } from "@angular/material/dialog";
import { ActionBO, GridActions } from "../globalShared/appGrid/appGrid.model";
import { ICustomDropdownNCheckListData } from "../globalShared/customCheckList/customChecklistModel";
import { GridPageActions } from "./gridPageActions";

interface UploadRequestBO {
    moduleCode: string;
    moduleReferenceID: string;
    section: string;
    referenceCode: string;
    dmsID: number;
    showSpecificSectionDocs: boolean;
    appCode: string;
    referenceActID: string;
    basicInfoID: number;
    excludeSectionFilter: boolean;
    isAllowSingle: boolean;
}
import { GridColumnBO, LabelBO, PopupWidth } from "./commonModel";
import { dateParserFormatter } from "./dateParserFormatter";


export class CommonMethods {
    //date format started here
    static displayDateTimeFormat() {
        return environment.dateTimeFormat;
    }
    static DBDateTimeFormat() {
        return "yyyy-MM-dd HH:mm";
    }
    static displayDateFormat() {
        return environment.dateFormat;

    }
    //date format ended here

    public static allowNumber(evt: any, specialChara: string, length?: number) {
        evt = (evt) ? evt : window.event;
        var val = evt.target.value;
        var totalLen = val.length; // 1245.120

        var charCode = (evt.which) ? evt.which : evt.keyCode;

        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            if (CommonMethods.hasValue(specialChara) && evt.key == specialChara && (this.hasValue(length) || totalLen < Number(length)))
                return true;
            return false;
        }
        return true;
    }


    public static hasValue(val: any, checkFalse: boolean = false) {
        if (val === false && checkFalse === true)
            return true;

        var hasValue: boolean = true;
        if (val == "" || val == null || val == undefined || val == "null" || val == "undefined")
            hasValue = false;
        else if (`${val}`.trim() == "")
            hasValue = false;

        return hasValue;
    }

    public static sanitizeCssClass(label: string | null | undefined): string {
        if (!CommonMethods.hasValue(label)) return '';
        return String(label)
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')   // Replace spaces & special characters with "-"
            .replace(/^-+|-+$/g, '')       // Trim leading/trailing hyphens
            .trim();
    }

    public static getNestedProperty(obj: any, path: string): any {
        const value = path.split('.').reduce((acc, part) => acc && acc[part], obj);

        if (value && value.item) {
            return value.item;
        }

        return value;
    }

    public static getParentProperty(path: string): any {
        const value = path.split('.');

        if (value && value.length > 0) {
            return value[0];
        }
        else
            return path;
    }


    public static formatString(str: string, arr: Array<string>): string {
        arr.forEach((itm, idx) => {
            str = str.replace('{' + idx.toString() + '}', itm);
        });
        return str;
    }

    public static formatValueString(val: string | number, isZeroConsiderable: boolean = true) {

        if (isZeroConsiderable && CommonMethods.hasValueWithZero(val)) {
            return val;
        }

        if (!CommonMethods.hasValue(val, isZeroConsiderable))
            return "N / A";
        return val;
    }

    public static transformDate(val: any, formatType: DATE_FORMAT_TYPE) {
        if (!CommonMethods.hasValue(val))
            return '';

        const datePipe = new DatePipe('en-US');
        const dateValue = this.tranformIntoISODate(val);
        return datePipe.transform(dateValue, environment[formatType]);
    }

    public static tranformIntoISODate(val: any) {
        if (!CommonMethods.hasValue(val))
            return '';

        return typeof val === 'string' ? new Date(val.endsWith('Z') ? val : `${val}Z`) : val;
    }

    public static hasValueWithZero(val: any) {
        let isValEmpty: boolean = true;
        if ((val == null) || (val === '') || (val == undefined) || (val == "null") || (val == 'undefined'))
            isValEmpty = false;
        else if (`${val}`.trim() == "")
            isValEmpty = false;

        return isValEmpty;
    }
    public static encryptPassword(val: string) {
        return window.btoa(val);
    }

    public static allowDecimalLength: number = 11; // (10, 3)

    public static allowDecimalLength15: number = 16; // (15, 5)

    public static allowDecimal(evt: any, defVal: number = this.allowDecimalLength, afterDeci: number = 5, beforeDeci: number = 7, specCharacter: string = '') {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        var val = evt.target.value;
        var totalLen = val.length; // 1245.120

        if (specCharacter == '-' && charCode == 45 && evt.target.selectionStart == 0)
            return true;
        if (val.indexOf('.') === -1 && totalLen > beforeDeci - 1 && charCode != 46)
            return false;

        if (specCharacter && ((!CommonMethods.hasValue(val) || (val.indexOf(specCharacter) == -1)) && (specCharacter == evt.key && evt.target.selectionStart == 0)))
            return true;

        if (charCode == 46 && evt.target.selectionStart == 0)
            return false;

        if (totalLen < defVal) {
            if (charCode == 46)  // Allow Only 1 '.'
                return val.indexOf('.') === -1;
            else if (charCode > 31 && (charCode < 48 || charCode > 57))
                return false;
            else {
                if (evt.srcElement.id != "" && afterDeci > 1) {
                    var curPosi = evt.target.selectionStart;
                    var dotIndex = val.indexOf('.');
                    if (dotIndex != -1) {
                        var dotPo = dotIndex + 1;

                        if (curPosi == dotIndex) {
                            var dotBefore = val.substring(0, dotPo);
                            if (dotBefore.length > beforeDeci)
                                return false;
                        }

                        // if ((dotPo >= (beforeDeci + 1))&& (curPosi < dotIndex))
                        //     return false;

                        var dotAfter = val.substring(dotPo, totalLen)

                        if (curPosi > dotIndex && dotAfter.length > (afterDeci - 1))
                            return false;
                    }
                }
            }
        }
        else
            return false;

        return true;
    }

    static validation(arr: Array<any>, type: string = "MNG") {
        let errMsg: string = ""

        if (type == "MNG") {
            for (var i = 0; i < arr.length; i++) {
                if (!CommonMethods.hasValue(arr[i].nativeElement)) {
                    errMsg = arr[i].validation();
                    if (CommonMethods.hasValue(errMsg))
                        break;
                }
            }
        }
        else if (type == "SEARCH") {
            var count: number = -1;
            for (var i = 0; i < arr.length; i++) {
                if (!CommonMethods.hasValue(arr[i].nativeElement) && CommonMethods.hasValue(arr[i].validation("SEARCH")))
                    count++;
                if (count == arr.length - 1) {
                    errMsg = "Please select at least one search criteria";
                    break;
                }
            }
        }
        return errMsg;
    }

    static hasFieldValue(arr: Array<any>) {
        let hasValue: boolean = false;

        for (var i = 0; i < arr.length; i++) {
            if (!CommonMethods.hasValue(arr[i].nativeElement) && arr[i].fieldControlBO?.mandatoryFlag == "MandatoryDuringSave" || CommonMethods.hasFormData(arr[i].formData)) {
                let errMsg = arr[i].validation();
                if (!CommonMethods.hasValue(errMsg)) {
                    hasValue = true;
                    break;
                }
            }
        }

        return hasValue;
    }

    static hasFormData(data: any): boolean {
        if (!CommonMethods.hasValue(data)) return false;

        if (Array.isArray(data)) {
            return data.some(CommonMethods.hasFormData);
        }

        if (typeof data === 'object') {
            return Object.values(data).some(CommonMethods.hasFormData);
        }

        return true;
    }

    static isObjectValue(value: any) {
        if (!CommonMethods.hasValue(value))
            return false;

        try {
            let obj = JSON.parse(value);
            return typeof obj === 'object' && obj !== null;
        }
        catch (error) {
            return typeof value === 'object' && value !== null;;
        }
    }

    static getObjectValueID(value: any) {
        if (!CommonMethods.hasValue(value))
            return null;
        try {
            if (CommonMethods.hasValue(value.itemID))
                return value.itemID;
            else if (CommonMethods.hasValue(value.valueActualID))
                return value.valueActualID;
            else if (CommonMethods.hasValue(value.valueID))
                return value.valueID;
            return null;
        }
        catch (error) {
            return null;
        }
    }

    public static setViewMode(arr: Array<any>, mode: string = MODE_TYPE.VIEW) {
        for (let i = 0; i < arr.length; i++) {

            if (arr[i].disableBtnMode)
                arr[i].disableBtnMode = mode;
            else if (CommonMethods.hasValue(arr[i].componentType) && arr[i].componentType == "LOOKUP")
                arr[i].disableBtn = (mode == MODE_TYPE.VIEW);
            else if (CommonMethods.hasValue(arr[i].operationType))
                arr[i].operationType = mode;
            else if (CommonMethods.hasValue(arr[i].input))
                arr[i].input.mode = mode;
            else if (this.hasValue(arr[i].dropdownDetails))
                arr[i].dropdownDetails.viewType = mode;
            else if (this.hasValue(arr[i].mode))
                arr[i].mode = mode;

        }
    }


    public static BuildUpload(moduleCode: string, encModuleRefID: string, section: string, refNumber: string = "", dmsID: number = 0, showSpecificSectionDocs: boolean = false, appCode = "", encReferenceActID: string = "", basicInfoID?: number, excludeSectionFilter: boolean = false, isAllowSingle: boolean = false) {
        let bo = <UploadRequestBO>{};
        bo.moduleCode = moduleCode;
        bo.moduleReferenceID = encModuleRefID;
        bo.section = section;
        bo.referenceCode = refNumber;
        bo.dmsID = dmsID;
        bo.showSpecificSectionDocs = showSpecificSectionDocs;
        bo.appCode = appCode;
        bo.referenceActID = encReferenceActID;
        bo.basicInfoID = basicInfoID ?? 0;
        bo.excludeSectionFilter = excludeSectionFilter;
        bo.isAllowSingle = isAllowSingle;
        return bo;
    }

    public static bindMaterialGridData(val: any) {
        return new MatTableDataSource(val);
    }

    public static increaseSNo(list: Array<any>) {
        list.forEach((item, index) => {
            const sno = (index + 1).toString().padStart(2, '0');
            list[index].sno = sno;
        })
        return list;
    }

    public static clear(arr: Array<any>) {
        for (let i = 0; i < arr.length; i++) {
            arr[i].clear();
        }
    }

    public static GetMaterialGridData(val: any) {
        return val.data;
    }

    public static validationRule: MatDialogConfig<any> = {
        panelClass: "validation-rule",
        disableClose: true,
        autoFocus: false,
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '500ms',
    }

    public static modalPopupWidth(width: PopupWidth): MatDialogConfig<any> {
        return {
            panelClass: [`popupwidth${width}`, "dialog-scale-anim"],
            disableClose: true,
            autoFocus: false,
            enterAnimationDuration: '250ms',
            exitAnimationDuration: '200ms',
            hasBackdrop: true,
            // backdropClass: 'dialog-backdrop-fade'
        }
    }

    static noConditionForActions(actions: Array<ActionBO>) {
        var entityActions: Array<ActionBO> = [];

        actions.forEach((action) => {
            entityActions.push(action);
        })
        return entityActions;
    }

    // to add chip list to searchResult in advance Search

    public static prepareSearchChipInfo(arr: Array<any>, advSrchValue: string) {
        let searchFilterValues: any = [];

        if (CommonMethods.hasValue(advSrchValue))
            searchFilterValues.push({ code: "ADV_SRCH", name: "Search Text: " + advSrchValue });

        for (let i = 0; i < arr.length; i++) {
            if (arr[i].input && CommonMethods.hasValue(arr[i].inputValue))
                searchFilterValues.push({ code: arr[i].input.placeholder, name: arr[i].input.placeholder + ": " + arr[i].inputValue });
            else if (arr[i].dropdownDetails && CommonMethods.hasValue(arr[i].selectedValues))
                searchFilterValues.push({ code: arr[i].dropdownDetails.labelText, name: arr[i].dropdownDetails.labelText + ": " + arr[i].getSelectedValues() });
            else if (arr[i].input && CommonMethods.hasValue(arr[i].dateValue))
                searchFilterValues.push({ code: arr[i].input.placeholder, name: arr[i].input.placeholder + ": " + arr[i].formattedDate });
            else if (arr[i].info && CommonMethods.hasValue(arr[i].selectedId))
                searchFilterValues.push({ code: arr[i].info.lookupTitle, name: arr[i].info.lookupTitle + ": " + arr[i].selectedText });
            else if (arr[i].info && CommonMethods.hasValue(arr[i].dateValue))
                searchFilterValues.push({ code: arr[i].info.placeholder, name: arr[i].info.placeholder + ": " + arr[i].dateValue });
        }

        // for (let i = 0; i < arr.length; i++) {
        //     if (arr[i].validate.toArray()[0].input && CommonMethods.hasValue(arr[i].validate.toArray()[0].inputValue))
        //         searchFilterValues.push({ code: arr[i].validate.toArray()[0].input.placeholder, name: arr[i].validate.toArray()[0].input.placeholder + ": " + arr[i].validate.toArray()[0].inputValue });
        //     else if (arr[i].validate.toArray()[0].dropdownDetails && CommonMethods.hasValue(arr[i].validate.toArray()[0].selectedValues))
        //         searchFilterValues.push({ code: arr[i].validate.toArray()[0].dropdownDetails.labelText, name: arr[i].validate.toArray()[0].dropdownDetails.labelText + ": " + arr[i].validate.toArray()[0].getSelectedValues() });
        //     else if (arr[i].validate.toArray()[0].input && CommonMethods.hasValue(arr[i].validate.toArray()[0].dateValue))
        //         searchFilterValues.push({ code: arr[i].validate.toArray()[0].input.placeholder, name: arr[i].validate.toArray()[0].input.placeholder + ": " + arr[i].validate.toArray()[0].formattedDate });
        //     //to get name of mspl data
        //     else if (arr[i].validate.toArray()[0].info && CommonMethods.hasValue(arr[i].validate.toArray()[0].selectedId)) {
        //         let code = arr[i].validate.toArray()[0].info.placeholder ? arr[i].validate.toArray()[0].info.placeholder : arr[i].validate.toArray()[0].info.lookupTitle
        //         searchFilterValues.push({ code: code, name: code + ": " + arr[i].validate.toArray()[0].selectedText });
        //     }
        //     else if (arr[i].validate.toArray()[0].info && CommonMethods.hasValue(arr[i].validate.toArray()[0].selectedId))
        //         searchFilterValues.push({ code: arr[i].validate.toArray()[0].info.placeholder, name: arr[i].validate.toArray()[0].info.placeholder + ": " + arr[i].validate.toArray()[0].selectedText });
        // }

        return searchFilterValues;
    }

    //To Remove the value from advance search
    public static clearChipListOption(code: any, arr: Array<any>) {
        if (CommonMethods.hasValue(code)) {
            for (let i = 0; i < arr.length; i++) {


                if (CommonMethods.hasValue(arr[i].info)) {
                    let info = arr[i].info
                    let placeholder = CommonMethods.hasValue(info?.placeholder) ? info.placeholder : (info.displayField ? info.displayField : info.lookupTitle)
                    if (code == placeholder)
                        arr[i].clear();
                }
                if (CommonMethods.hasValue(arr[i].inputValue)) {
                    let placeholder = arr[i].input.placeholder
                    if (code == placeholder)
                        arr[i].clear();
                }
                if (CommonMethods.hasValue(arr[i].dateValue)) {
                    let placeholder = arr[i].appLabelForDate.placeholder
                    if (code == placeholder)
                        arr[i].clear();
                }
                if (CommonMethods.hasValue(arr[i].selectedValues)) {
                    let placeholder = arr[i].labelData.placeholder
                    if (code == placeholder)
                        arr[i].clear();
                }


                // if (CommonMethods.hasValue(arr[i].validate.toArray()[0].info)) {
                //     let info = arr[i].validate.toArray()[0].info
                //     let placeholder = CommonMethods.hasValue(info?.placeholder) ? info.placeholder : (info.displayField ? info.displayField : info.lookupTitle)
                //     if (code == placeholder)
                //         arr[i].clear();
                // }

                // if (CommonMethods.hasValue(arr[i].validate.toArray()[0].inputValue)) {
                //     if (code == arr[i]?.input?.placeholder || code == arr[i].validate.toArray()[0].input.placeholder)
                //         arr[i].clear();
                // }
                // if (CommonMethods.hasValue(arr[i].validate.toArray()[0].dateValue)) {
                //     let placeholder = arr[i].validate.toArray()[0].appLabelForDate.placeholder
                //     if (code == placeholder)
                //         arr[i].clear();
                // }
                // if (CommonMethods.hasValue(arr[i].validate.toArray()[0].selectedValues)) {
                //     let placeholder = arr[i].validate.toArray()[0].labelData.placeholder
                //     if (code == placeholder)
                //         arr[i].clear();
                // }

                // if (CommonMethods.hasValue(arr[i].inputValue)) {
                //     if (code == arr[i].input.placeholder)
                //         arr[i].clear();
                // }
                // if (CommonMethods.hasValue(arr[i].dateValue)) {
                //     if (code == arr[i].input.placeholder)
                //         arr[i].clear();
                // }
                // if (CommonMethods.hasValue(arr[i].selectedValues)) {
                //     if (code == arr[i].dropdownDetails.labelText)
                //         arr[i].clear();
                // }
            }
        }
    }

    public static PrepareDataSourceWithActions(dataSource: any, actions: Array<ActionBO>, callback: (data: any, action: GridActions | string, actionData?: any) => any, canIncreaseSNo: boolean = false, showExpProcIcon: boolean = true) {
        if (canIncreaseSNo)
            dataSource = CommonMethods.increaseSNo(dataSource);

        if (dataSource && dataSource.length > 0) {
            dataSource.forEach((item: any) => {
                let newAction = [...actions];
                if (Array.isArray(item.exceptions)) {

                    item.exceptions.forEach((exception: any) => {
                        let action: ActionBO = new ActionBO("Exception", "circle-exclamation", "Exception (" + exception.exceptionType + ")", exception);
                        newAction.push(action);
                        let search: GridPageActions = new GridPageActions();
                        search.basicInfo = { action: newAction, onActionClick: (data, action, actionData) => callback(data, action, actionData) };
                        item.exceptions = search.appendActions(item.exceptions.map((x: any) => CommonMethods.convertJsonString(x)), "NO_CONDITION");
                    });

                    if (item.exceptions.length > 0 && showExpProcIcon)
                        newAction.push(new ActionBO("Process", "play-circle", "Process", ""));
                }

                let searchAction: GridPageActions = new GridPageActions();
                searchAction.basicInfo = { action: newAction, onActionClick: (data, action, actionData) => callback(data, action, actionData) };
                item = searchAction.appendActions([item], "NO_CONDITION");
            });
        }

        var gridData = CommonMethods.bindMaterialGridData(dataSource);
        return gridData;
    }

    public static convertJsonString(data: any, isNewFormat: boolean = false) {
        if (CommonMethods.hasValue(data) && typeof data == "string") {
            var convertData = isNewFormat
                ? data.replace(/ISODate\((\\?"|\\u0022|")([^"\\]+)(\\?"|\\u0022|")\)/g, '$2')
                : data.replace(/ISODate\((\\?"|\\u0022|")([^"\\]+)(\\?"|\\u0022|")\)/g, '"$2"');
            convertData = convertData.replace(/NumberDecimal\(\"(.*?)\"\)/g, '"$1"');
            return JSON.parse(convertData.replace(/ObjectId\(\"(.*?)\"\)/g, '"$1"'));
        }
        return data;
    }

    public static convertJSONStringLowerCase(data: any, isNewFormat: boolean = false) {
        if (CommonMethods.hasValue(data) && typeof data === "string") {
            let convertData = isNewFormat
                ? data.replace(/ISODate\((\\?"|\\u0022|")([^"\\]+)(\\?"|\\u0022|")\)/g, '$2')
                : data.replace(/ISODate\((\\?"|\\u0022|")([^"\\]+)(\\?"|\\u0022|")\)/g, '"$2"');

            convertData = convertData.replace(/NumberDecimal\(\"(.*?)\"\)/g, '"$1"');
            convertData = convertData.replace(/ObjectId\(\"(.*?)\"\)/g, '"$1"');

            const parsed = JSON.parse(convertData);

            // Recursively convert keys to camelCase
            function toCamelCase(obj: any): any {
                if (Array.isArray(obj)) {
                    return obj.map(toCamelCase);
                } else if (obj && typeof obj === "object") {
                    return Object.keys(obj).reduce((acc, key) => {
                        const newKey = key.charAt(0).toLowerCase() + key.slice(1);
                        acc[newKey] = toCamelCase(obj[key]);
                        return acc;
                    }, {} as any);
                }
                return obj;
            }

            return toCamelCase(parsed);
        }
        return data;
    }

    public static executeDynamicCode(code: string, formData: any): boolean {
        // Create a function with `code` as the body and execute it with the provided formData
        const codeFunction = new Function('formData', `
            with (formData) {
                return ${code};
            }
        `);
        return codeFunction(formData);
    }

    public static formatDropdowndata(data: any) {
        data.forEach((a: any) => {
            a['itemID'] = a['valueID']
            a['item'] = a['itemTitle']
            a['itemCode'] = a['itemCode']
        });
        return data;
    }

    // TO get sum of total values in the grid
    public static getTotalValue(arr: Array<any>, fieldName: string = ''): number {
        return arr.reduce((acc: any, item: any) => acc + Number(item[fieldName] || 0), 0);
    }

    public static getObjbyID(list: Array<any>, id: string) {
        const obj = list.find((item: any) => item.itemID == id);
        return obj;
    }


    public static buildGridColumn(column: GridColumnBO, isShowAction: boolean = false): any {
        return {
            columnDef: column.columnDef,
            header: column.label,
            cell: (element: any) => `${element[column.columnDef] ?? ''}`,
            isShow: true,
            isShowIcon: column.isShowIcon,
            isShowActions: isShowAction,
            width: column.width,
            cssClass: column.cssClass || ''
        };
    }

    public static prepareGridColumns(list: GridColumnBO[], isShowActions: boolean = false): any[] {
        return list.map((column: GridColumnBO) => CommonMethods.buildGridColumn(column, isShowActions));
    }

    static hasSearchFieldValue(arr: Array<any>) {
        let hasValue: boolean = false;

        for (var i = 0; i < arr?.length; i++) {
            if (!CommonMethods.hasValue(arr[i]?.nativeElement)) {
                let errMsg = arr[i].validation();
                if (!CommonMethods.hasValue(errMsg)) {
                    hasValue = true;
                    break;
                }
            }
        }

        return hasValue;
    }

    public static dynamicLabelBinding(data: any, fieldsList: LabelBO[], isClear: boolean = false) {
        for (const labelItem of fieldsList) {
            const { labelKey, label } = labelItem;

            if (!(labelKey in data))
                continue;

            const resultVal = data[labelKey] ?? "";
            const formattedVal = isClear ? resultVal : CommonMethods.getFormattedVal(labelItem, resultVal, labelItem.dateType);

            label.inputValue = formattedVal;
        }
    }

    private static getFormattedVal(labelItem: LabelBO, val: any, type: string) {
        return labelItem.isDate ? dateParserFormatter.formatDate(val, type) : String(val);
    }

    public static isDateTimeRegex(value: any): boolean {
        if (!CommonMethods.hasValue(value)) return false;

        const isoDateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z)?$/;
        return isoDateTimeRegex.test(value) && !isNaN(Date.parse(value));
    }

}

export class SearchBoSessions {

    public static checkSessionVal(key: SEARCH_SESSIONBO): boolean {
        return CommonMethods.hasValue(this.getSessionData(key))
    }

    public static getSessionData(key: SEARCH_SESSIONBO) {
        return JSON.parse(String(sessionStorage.getItem(key)));
    }

    public static setSessionData(key: SEARCH_SESSIONBO, val: any) {
        sessionStorage.setItem(key, JSON.stringify(val));
    }

    public static clearSessionBO(key: SEARCH_SESSIONBO) {
        sessionStorage.removeItem(key);
    }

    public GetRulesFromEventHandlers(rules: Array<any>, eventHandlers: Array<any>, ruleType: string, eventCode: string) {
        let eventRules: Array<any> = [];
        let event = eventHandlers.filter(x => x.eventCode == eventCode);

        if (event && event.length > 0) {
            let items = rules.filter(x => x.ruleType == ruleType && x.controlID == event[0].id);
            if (items.length > 0) {
                items.forEach((x: any) => {
                    let rule: any// = new Rule();
                    rule.className = x.className;
                    rule.ruleCode = x.ruleCode;
                    rule.ruleFields = x.ruleProperties;
                    eventRules.push(rule);
                })
            }
        }
        return eventRules;
    }
}
