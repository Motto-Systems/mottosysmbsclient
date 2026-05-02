import { CommonModule } from "@angular/common";
import { Component, AfterViewInit, OnDestroy, Input, Output, EventEmitter } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HelpersModule } from "../../../globalShared.module";
import { CommonReqPurposeCode, CommonReqServiceUrls } from "../../../../utility/commonServiceUrls";
import { ActionHistoryExtendedGridColumnsInfo, ActionHistoryGridColumnsInfo, ActionHistoryTemplateActions, CurrentActionHistoryGridColumnsInfo, HistoryDetailsBo, uiTitles } from "../../viewHistory.model";
import { CommonMethods } from "../../../../utility/commonMethods";
import { ICustomDropdownNCheckListData } from "../../../customCheckList/customChecklistModel";
import { FormsModule } from "@angular/forms";
import { TransactionService } from "../../../../../core/services/commonTransaction.service";
import { PurposeHandler } from "../../../../utility/commonModel";
import { MatTableDataSource } from "@angular/material/table";

@Component({
    selector: 'actionHistory-mng',
    templateUrl: './actionHistory.html',
    standalone: true,
    imports: [
        HelpersModule,
        CommonModule,
        FormsModule,
        FlexLayoutModule
    ]
})
export class ActionHistoryComponent extends TransactionService implements AfterViewInit, OnDestroy {

    uiTitles = uiTitles;
    currentHistoryHeaders: Array<any> = [];
    currentHistoryDataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
    extendedData: Array<any> = [];
    dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
    headerData: Array<any> = [];
    @Input() override basicInfoID: number = 0
    @Input() historyOptions: HistoryDetailsBo = new HistoryDetailsBo();
    @Output() historyOptionsList = new EventEmitter<ICustomDropdownNCheckListData[]>();
    isFromMultiLevelUser: boolean = false;
    tempActions = ActionHistoryTemplateActions;

    private purposeHandlers: Record<string, PurposeHandler> = {
        [CommonReqPurposeCode.GetRequestBasicInfoNew]: (result: any) => this.handleActionHistoryResponse(result),
    }

    constructor() {
        super();
    }

    ngAfterViewInit() {
        this.subscription$ = this._service.subject$.subscribe(resp => {
            this.doAfterViewInit(resp);
        })
        this.initialLoad();
    }

    initialLoad() {
        this.headerData = CommonMethods.prepareGridColumns(ActionHistoryGridColumnsInfo);
        this.extendedData = CommonMethods.prepareGridColumns(ActionHistoryExtendedGridColumnsInfo);
        this.currentHistoryHeaders = CommonMethods.prepareGridColumns(CurrentActionHistoryGridColumnsInfo);
        this.getRequestBasicInfo(this.basicInfoID);
    }

    doAfterViewInit(resp: any) {
        const handler = this.purposeHandlers[resp.purpose];
        if (handler) {
            handler(resp.result);
        }
    }

    handleActionHistoryResponse(result: any) {
        const hasWorkflow = (result.workflowAssignmentID > 0);
        CommonMethods.dynamicLabelBinding(result, this.historyOptions.labelList);

        if (hasWorkflow) {
            this.historyOptions.historyOptionsList.push({ itemID: "WORKFLOW", itemCode: "WORKFLOW", item: "Workflow", isSelected: false })
            this.historyOptionsList.emit(this.historyOptions.historyOptionsList)
        }

        this.dataSource = CommonMethods.bindMaterialGridData(CommonMethods.increaseSNo(result?.actionHistoryData ?? []));
        this.currentHistoryDataSource = CommonMethods.bindMaterialGridData(CommonMethods.increaseSNo([result?.currentUserDetails])) ?? [];
       // this.isFromMultiLevelUser = CommonMethods.hasValue(this.currentHistoryDataSource?.data[0]?.user?.displayData) ? false : true

    }

    getActionHistoryData() {
        if (this.basicInfoID)
            this._service.getApiService(CommonReqServiceUrls.GetRequestBasicInfoNew, [String(this.basicInfoID)], CommonReqPurposeCode.GetRequestBasicInfoNew);
    }

    onTempAction(evt: string) {
        this.actionCode = evt;
    }

    ngOnDestroy() {
        this.subscription$.unsubscribe();
    }

}