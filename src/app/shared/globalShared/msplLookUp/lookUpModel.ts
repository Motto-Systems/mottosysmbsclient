import { BaseItem } from "../../utility/commonModel";

export class LookupInfo {
  title: string = "";
  dataSourceID: string = "";
  displayField: string = "";
  //headers: Array<any> = [];
  headers: Array<BaseItem> = [];  
  multiSelectOption: boolean = false;
}

export class LookupDataInfo {
  lookupTitle: string = "";
  lookupCode: string = "";
  lookupDisplayField: string = "";
  headers: Array<LookupFields> = [];
  multiSelectOption: boolean = false;
  apiPath: string = "";
  appCode : string = "";
} 

export class LookupHeaderInfo {
  item: string = "";
  itemCode: string = "";
  itemID: string = "";
  itemType: string = "";
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


export class LookupFetchBO {
  lookupCode: string = "";
  searchText: string = "";
  filters: Array<LookupFilterBO> = [];
  noOfItemsLoaded: number = 0;
  lastId: string = "";
  isFromHistory?: boolean = false;
}

export class LookupFilterBO {
  propertyName: string = "";
  isMandatory: boolean = false;
  propertyValue: string = "";

  constructor(propertyName: string, propertyValue: string, isMandatory: boolean) {
    this.propertyName = propertyName;
    this.propertyValue = propertyValue;
    this.isMandatory = isMandatory
  }
}

export class AppLookupFetchBO {
  lookupCode: string = "";
  searchText: string = "";
  filters: Array<LookupFilterBO> = [];
  ResponseHeadersData : Array<ResponseHeadersDataBO> = [];
  lastID: string = "";
  collectionName : string = "";
  unitFilter : boolean = true;
  IsCustomLookup : boolean = false;
  lookUpService : string = "";
  lookupTitle : string = "";
  appCode : string = "";
  database: string = "";
  fullClassName: string = "";
  requestID: number | null = null;
  isActiveFilterApplicable: boolean = true;
}

export class ResponseHeadersDataBO{
  headerName: string = "";
  property: string = "";
  isDisplay: boolean = true;
}