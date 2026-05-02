export interface ModuleCapability {
  item: string;
  itemCode: string;
  itemID: string;
  itemActualID: string | null;
  isActive: boolean | null;
  displayData: any;
}

export interface ModuleCapabilitiesState {
  [key: string]: ModuleCapability[];
}
