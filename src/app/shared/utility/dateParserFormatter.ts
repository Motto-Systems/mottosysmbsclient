import { DatePipe } from "@angular/common";
import { CommonMethods } from "./commonMethods";
import { AppContext } from "../../core/context/contextModel";


export class dateParserFormatter {
    datePipe = new DatePipe("en-US");
    format(date: Date): string {
        let stringDate: string = "";
        stringDate = String(this.datePipe.transform(date, CommonMethods.displayDateFormat()));
        return stringDate;
    }

    public static formatDate(value: any, formatType: string, dateCol: any = 'meetingDate', type: string = "Local") {
        var datePipe = new DatePipe("en-US");

        if (!CommonMethods.hasValue(value))
            return value;

        if (type != "Not Consider") {
            var convertObj = new ConvertDateTime();
            value = convertObj.transform(value, type, dateCol);
        }

        if (formatType == "dateFormat") {
            var date: Date = new Date(value.year, value.month - 1, value.day);
            value = datePipe.transform(date, CommonMethods.displayDateFormat());
        }
        else if (formatType == "DBFormat" && CommonMethods.hasValue(value))
            value = datePipe.transform(value, CommonMethods.DBDateTimeFormat());
        else if (formatType == "removeAfterTDate") {
            if (value == null || value == '1900-01-01T00:00:00')
                return null;

            var firstIndex = value.indexOf('T');
            value = value.substring(0, firstIndex)
            value = datePipe.transform(value, CommonMethods.displayDateFormat());
        }
        else if (formatType == "arrayDateFormat") {
            for (let i = 0; i < value.length; i++) {
                if (value[i][dateCol] != null) {

                    // var firstIndex: any = value[i][dateCol].indexOf('T');

                    // if (firstIndex > -1) {
                    if (formatType == "arrayDateFormat")
                        //value[i][dateCol] = datePipe.transform(value[i][dateCol].substring(0, firstIndex), CommonMethods.displayDateFormat());
                        value[i][dateCol] = datePipe.transform(value[i][dateCol], CommonMethods.displayDateFormat());
                    //}
                }
            }
        }
        else if (formatType == "arrayDateTimeFormat") {
            for (let i = 0; i < value.length; i++) {
                if (formatType == "arrayDateTimeFormat")
                    value[i][dateCol] = datePipe.transform(value[i][dateCol], CommonMethods.displayDateTimeFormat());
            }
        }
        else if (formatType == "datetime" && CommonMethods.hasValue(value))
            value = datePipe.transform(value, CommonMethods.displayDateTimeFormat());
        else if (formatType == "date" && value != null && value != undefined)
            value = datePipe.transform(value, CommonMethods.displayDateFormat());
        else if (formatType == "default" && CommonMethods.hasValue(value))
            value = new Date(value);
        else if (formatType == 'filterTwiceCol') {
            for (let index = 0; index < dateCol.length; index++) {
                for (let i = 0; i < value.length; i++) {
                    value[i][dateCol[index]] = datePipe.transform(value[i][dateCol[index]], CommonMethods.displayDateTimeFormat());
                }
            }
        }
        else if (formatType == 'filterTwiceDateCol') {
            for (let index = 0; index < dateCol.length; index++) {
                for (let i = 0; i < value.length; i++) {
                    value[i][dateCol[index]] = datePipe.transform(value[i][dateCol[index]], CommonMethods.displayDateFormat());
                }
            }
        }
        else if (formatType == 'multipleColumnDateTime') {
            for (let index = 0; index < dateCol.length; index++) {

                for (let i = 0; i < value.length; i++) {
                    value[i][dateCol[index]] = datePipe.transform(value[i][dateCol[index]], CommonMethods.displayDateTimeFormat());
                }
            }
        }
        else if (formatType == 'exportFilterTwiceDateCol') {
            for (let index = 0; index < dateCol.length; index++) {
                for (let i = 0; i < value.length; i++) {
                    value[i][dateCol[index]] = datePipe.transform(value[i][dateCol[index]], CommonMethods.displayDateFormat());
                }
            }
        }
        else if (formatType == "audit") {
            var dateType = /(\d{4})([\/-])(\d{1,2})\2(\d{1,2})/;

            value.forEach((item: any) => {
                if (dateType.test(item.oldData))
                    item.oldData = dateParserFormatter.formatDate(item.oldData, item.oldData.length === 10 ? 'date' : 'datetime')
                if (dateType.test(item.newData))
                    item.newData = dateParserFormatter.formatDate(item.newData, item.newData.length === 10 ? 'date' : 'datetime')
            })
        }
        return value;
    }

    public static getConvertedDateTime(value: Date, type: string = "Local") {
        var convertObj = new ConvertDateTime();
        if (CommonMethods.hasValue(value))
            return convertObj.transformSingle(value, type);

        return value;
    }
}

//appcontext
export class ConvertDateTime {

    context: AppContext = JSON.parse(String(sessionStorage.getItem("MSPL_CONTEXT")));

    transform(values: Date | object[], type: string, keys?: string[]) {
        if (!CommonMethods.hasValue(values))
            return null;

        if (!Array.isArray(values))
            return this.getValue(values as Date, type);

        return this.setGridValue(values, type, keys);
    }

    transformSingle(value: Date, type: string) {
        if (!CommonMethods.hasValue(value))
            return undefined;

        return this.getValue(value, type);
    }

    private setGridValue(data: any[], type: string, dateCols: any) {
        if (!CommonMethods.hasValue(data) || data.length === 0) return data;
        if (!CommonMethods.hasValue(dateCols)) return data;

        const columns = Array.isArray(dateCols) ? dateCols : [dateCols];

        for (const item of data) {
            for (const col of columns) {
                if (CommonMethods.hasValue(item[col])) {
                    item[col] = this.getValue(item[col], type);
                }
            }
        }

        return data;
    }

    private getValue(value: Date, type?: string) {
        if (!CommonMethods.hasValue(value)) return value;

        if (value.toLocaleString().includes('Z')) return value;

        let timeZoneValue: number = 0;

        const userTimeZone = this.context?.userDetails?.utcTimeZone ?? null;

        if (CommonMethods.hasValue(userTimeZone))
            timeZoneValue = Number(userTimeZone);
        else
            timeZoneValue = new Date().getTimezoneOffset() * -1;

        if (type === 'UTC') timeZoneValue *= -1;

        return new Date(new Date(value).setMinutes(new Date(value).getMinutes() + timeZoneValue));
    }
}