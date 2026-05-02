import { AfterViewInit, Component, Input } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ActionHistoryComponent } from "./components/actionHistory/actionHistory.component";
import { HistoryDetailsBo } from "./viewHistory.model";
import { ICustomDropdownNCheckListData } from "../customCheckList/customChecklistModel";
import { AppMaterialModule } from "../../../app.material.module";
import { HelpersModule } from "../globalShared.module";

@Component({
  selector: 'app-view-history',
  templateUrl: './viewHistory.html',
  styleUrl: './viewHistory.scss',
  standalone: true,
  imports: [
    HelpersModule,
    FlexLayoutModule,
    ActionHistoryComponent,
    AppMaterialModule
  ]
})
export class ViewHistoryComponent implements AfterViewInit {

  @Input() basicInfoId: number = 0;
  @Input() workflowId: number = 0;

  historyOption: HistoryDetailsBo = new HistoryDetailsBo()
  type = "ACTION_HISTORY";

  constructor(private _dialogRef: MatDialogRef<ViewHistoryComponent>) {
  }

  ngAfterViewInit() {
    //this.initialLoad();

    // if(sessionStorage.getItem("moduleCode") === ModuleCodes.BOM || sessionStorage.getItem("moduleCode") == ModuleCodes.EquipmentCleaningTemplate 
    //     ||sessionStorage.getItem("moduleCode") === ModuleCodes.ProductCleaningSolvent){
    // this.historyOption.historyOptionsList.push({ itemID: "REVISION_HISTORY", itemCode: "REVISION_HISTORY", item: "Revision History", isSelected: false })
    // this.updateOptions(this.historyOption.historyOptionsList)
    // }

  }

  updateOptions(list: ICustomDropdownNCheckListData[]) {
    this.historyOption.historyOptionsList = [...list];
  }

  closeDialog() {
    this._dialogRef.close();
  }

}