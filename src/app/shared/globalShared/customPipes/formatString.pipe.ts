import { Pipe, PipeTransform } from '@angular/core';
import { CommonMethods } from '../../utility/commonMethods';

@Pipe({
    name: 'formatString',
    standalone: false
})
export class FormatStringPipe implements PipeTransform {

  transform(row: any, item: any): string | number {
    const value = this.getValueByPath(row, item.columnDef);
    let isZeroConsiderable = CommonMethods.hasValue(item.isZeroConsiderable) ? true : false;

    if (CommonMethods.isObjectValue(value)) {
      return CommonMethods.formatValueString(CommonMethods.hasValue(value["displayData"]) ? value["displayData"] : CommonMethods.hasValue(value["userName"]) ? value["userName"] : value["item"], isZeroConsiderable);

    }

    return this.formatIncomingString(value, item.columnDef, item.dataType, isZeroConsiderable);
  }


  private formatIncomingString(val: any, sourceField: string, dataType?: string, isZeroConsiderable?:boolean): string | number {
    if (sourceField === 'select') return '';

    if (dataType?.toLocaleLowerCase() == "date")
      return CommonMethods.transformDate(val, "dateFormat") || "N / A";
    else if (dataType?.toLocaleLowerCase() == "datetime")
      return CommonMethods.transformDate(val, "dateTimeFormat") || "N / A";
    else if (this.isDateTime(val))
      return new Date(val).toLocaleString();

    return CommonMethods.formatValueString(val,isZeroConsiderable);
  }

  private isDateTime(value: any): boolean {
    const isoDateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{0,3}Z)?$/;
    return isoDateTimeRegex.test(value) && !isNaN(Date.parse(value));
  }

  getValueByPath(obj: any, path: string) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }
}