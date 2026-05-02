import { BaseItem } from "../../utility/commonModel";

export class LookupInfo {
  title: string = "";
  dataSourceID: string = "";
  displayField: string = "";
 // headers: Array<any> = [];
 headers: Array<BaseItem> = [];
  multiSelectOption: boolean = false;
}

export class LookUpBO {
  lookupID: string = "";
  lookupCode: string = "";
  dataSourceID: string = "";
  lookupDisplayField: string = "";
  lookupFields!: LookupFields;
}

export interface LookupFields {
  description: string
  options: Option[]
}

export interface Option {
  itemID: string
  itemCode: string
  item: string
  itemType: string
}
