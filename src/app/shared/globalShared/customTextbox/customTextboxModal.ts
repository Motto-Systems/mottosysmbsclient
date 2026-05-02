import { INPUT_TYPES, TEXTBOX_VIEW_TYPE } from "../../utility/constant";

export class TextBoxInputs {
    inputValue: any;
    placeholder: string = "Text";
    mode: string = "MNG";
    isRequired: boolean = true;
    isMandatory: boolean = true;
    maxLength: number = 8000;
    minLength: number = 1;
    inputType: INPUT_TYPES = "all";
    beforeDecimal: number = 10;
    afterDecimal: number = 5;
    onPaste: boolean = true;
    uom: string = "";
    rows: number = 2;
    type: TEXTBOX_VIEW_TYPE = "TextBox";
    isDisabled: boolean = false;
    isShowUomSpan: boolean = false;
    isLoginID: boolean = false;
    allowZero: boolean = true;
    specialChar: string = "";
    isPasswordValidationCheck:boolean = true;
    minValue?: number;
    maxValue?: number;
    limitFrom?: number;
    limitTo?: number;

    constructor(placeholder: string = "", maxLength: number = 8000, isMandatory: boolean = true,
        isRequired: boolean = true, inputType: INPUT_TYPES = "all", type: TEXTBOX_VIEW_TYPE = "TextBox", rows: number = 2,
        isShowUomSpan: boolean = false, minLength: number = 1, allowZero: boolean = true, isPasswordValidationCheck : boolean = true
        , minValue?: number, maxValue?: number, limitFrom?: number, limitTo?: number) {
        this.placeholder = placeholder;
        this.maxLength = maxLength;
        this.isRequired = isRequired;
        this.isMandatory = isMandatory;
        this.inputType = inputType;
        this.isShowUomSpan = isShowUomSpan;
        this.type = type;
        this.rows = rows;
        this.minLength = minLength;
        this.allowZero = allowZero;
        this.isPasswordValidationCheck = isPasswordValidationCheck;
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.limitFrom = limitFrom;
        this.limitTo = limitTo;
    }
}


export class TextBoxServiceUrls {
    public static GeneratePassword = "UserOperation/GeneratePassword";

}