import { AfterViewInit, Component, Input } from "@angular/core";
import { PurposeHandler } from "../../../../utility/commonModel";
import { CommonReqPurposeCode, CommonReqServiceUrls } from "../../../../utility/commonServiceUrls";
import { CommonMethods } from "../../../../utility/commonMethods";
import { TransactionService } from "../../../../../core/services/commonTransaction.service";
import { MatTableDataSource } from "@angular/material/table";
import { RevisionHistoryGridColumnsInfo, RevisionHistoryGridExtraColumnsInfo } from "../../viewHistory.model";

@Component({
    selector: 'revisionHistory',
    templateUrl: './revisionHistory.html',
    standalone: false
})

export class RevisionHistoryComponent extends TransactionService implements AfterViewInit {

    @Input() override basicInfoID: number = 0;

    headers: any[] = [];
    extraColumns: any[] = [];
    dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

    private purposeHandlers: Record<string, PurposeHandler> = {
        [CommonReqPurposeCode.GetRevisionHistoryDetails]: (result: any) => this.handleRevisionHistory(result),
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
        this.headers = CommonMethods.prepareGridColumns(RevisionHistoryGridColumnsInfo);
        this.extraColumns = CommonMethods.prepareGridColumns(RevisionHistoryGridExtraColumnsInfo);
        this.getRevisionHistoryDetails()
    }

    doAfterViewInit(resp: any) {
        const handler = this.purposeHandlers[resp.purpose];
        if (handler) {
            handler(resp.result);
        }
    }

    handleRevisionHistory(result: any) {
        this.dataSource = CommonMethods.bindMaterialGridData(result)
    }

    getRevisionHistoryDetails() {
        this._service.getApiService(CommonReqServiceUrls.GetRevisionHistoryDetails, [String(this.basicInfoID), this.moduleCode], CommonReqPurposeCode.GetRevisionHistoryDetails);
    }


    ngOnDestroy() {
        this.subscription$.unsubscribe()
    }
}