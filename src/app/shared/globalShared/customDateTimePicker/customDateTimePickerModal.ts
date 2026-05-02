import { DATE_FORMAT_TYPE, DATE_TYPES } from "../../utility/constant";

export class DateInputs {
    isMandatory: boolean = true;
    dateType: DATE_TYPES = "date";
    formatType: DATE_FORMAT_TYPE = "dateTimeFormat";
    mode: string = "MNG";
    placeholder: string = "Date";
    maxDate?: Date;
    minDate?: Date;
    valueType: string = "";

    constructor(placeholder: string = "", isMandatory: boolean = true, maxDate?: Date, minDate?: Date, dateType: DATE_TYPES = "date", formatType: DATE_FORMAT_TYPE = "dateFormat",valueType: string ="") {
        this.placeholder = placeholder;
        this.isMandatory = isMandatory;
        this.dateType = dateType;
        this.maxDate = maxDate;
        this.minDate = minDate;
        this.formatType = formatType || this.formatType;
        this.valueType=valueType;

    }
}

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MMM-YYYY',
  },
  display: {
    dateInput: 'DD-MMM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};