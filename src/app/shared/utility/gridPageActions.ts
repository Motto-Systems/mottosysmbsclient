import { AppTableActionsBO } from "../globalShared/appGrid/appGrid.model";
import { CommonMethods } from "./commonMethods";

export class GridPageActions {

  basicInfo: AppTableActionsBO = { action: [], onActionClick: () => null };

  constructor() { }

  //#region Append Actions

  public appendActions<T>(data: Array<any> = [], entityCode: string) {

    data?.forEach((item: any) => {
      item['actions'] = this.getFilterActions(item, entityCode);
    })

    return data;
  }

  public getFilterActions(item: any, entityCode: string): AppTableActionsBO {
    return {
      action: this.getActions(item, entityCode),
      onActionClick: this.basicInfo.onActionClick  //(data: any, action: any) => this.getActionClickData(data, action)
    }
  }


  private getActions(item: any, entityCode: string) {
    switch (entityCode) {

      case "NO_CONDITION":
        return CommonMethods.noConditionForActions(this.basicInfo.action);

      default:
        return [];
    }
  }

}
  