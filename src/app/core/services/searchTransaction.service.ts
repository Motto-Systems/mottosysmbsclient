import { inject, Injectable } from "@angular/core";
import { TransactionService } from "./commonTransaction.service";
import { MatTableDataSource } from "@angular/material/table";
import { ActionBO } from "../../shared/globalShared/appGrid/appGrid.model";
import { AdvanceSearchChipListComponent } from "../../shared/globalShared/advanceSearchChipList/advanceSearchChipList.component";
import { CommonMethods } from "../../shared/utility/commonMethods";
import { SearchChipBO } from "../../shared/utility/commonModel";
import { GLOBAL_CONSTANTS } from "../../shared/utility/constant";
import { SearchFilterModalService } from "../../shared/globalShared/advanceSearchChipList/service/searchFilterModelService.service";
import { AppPaginationService } from "../../shared/globalShared/appPagination/appPagination.service";
import { ACTION_GET, Actions } from "../../shared/utility/actions";
import { Subscription } from "rxjs";

@Injectable()

export class SearchTransactionService<T> extends TransactionService {

    searchResult: any = [];
    searchTitle: string = "";
    searchBO!: T;
    genericSearch: string = "";

    headerData: any[] = [];
    dataSource: MatTableDataSource<any> = new MatTableDataSource();
    actions: ActionBO[] = [];
    chipFieldList: SearchChipBO[] = [];
    private serviceUrl: string = "";
    private purposeCode: string = "";
    private boFactory!: () => T;
    protected advChipListRef!: AdvanceSearchChipListComponent;

    _modalService = inject(SearchFilterModalService);
    _pagination = inject(AppPaginationService);

    pageSubscription$: Subscription = new Subscription();

    constructor() {
        super();
        this._context.pageHeaderInfo.showPageHeader = false;
    }

    setBOFactory(factory: () => T): void {
        this.boFactory = factory;
        this.searchBO = factory();
    }

    setAdvChipListRef(ref: AdvanceSearchChipListComponent) {
        this.advChipListRef = ref;
    }

    updateActions(actions: ACTION_GET[]): void {
        this.actions = actions.map((action: ACTION_GET) => Actions.GetActionByCode(action));
    }

    updateServiceUrl(url: string, purposeCode: string): void {
        this.serviceUrl = url;
        this.purposeCode = purposeCode;

    }

    handleSearchResult(result: any, respAction: (searchList: any) => void) {
        this._pagination.setTotalPageCount(result.totalNumberOfRows ?? 0);
        this._pagination.setPageIndex(result.pageIndex);
        this._modalService.close(this.moduleCode);

        respAction(result.searchList);
    }

    searchService() {
        sessionStorage.setItem(`${this.moduleCode}_SRCH_FILTER`, JSON.stringify(this.searchBO));
        this._service.postApiService(this.serviceUrl, this.searchBO, this.purposeCode);
    }

    processChipList() {
        this.searchResult = [];

        if (this.advChipListRef?.advanceSearch?.trim()) {
            (this.searchBO as any).advanceSearch = this.advChipListRef.advanceSearch;
            this.searchResult = [{ name: `Search Text : ${this.advChipListRef.advanceSearch}`, code: GLOBAL_CONSTANTS.ADV_SRCH, type: 'advanceSearch' }];
        }

        this.chipFieldList.forEach(({ key, label, value, displayData }) => {
            if (CommonMethods.hasValue(value)) {
                this.searchResult.push({
                    name: `${label} : ${displayData}`,
                    code: GLOBAL_CONSTANTS.EMPTY,
                    type: key
                });
            }
        });
    }

    clearOptions(evt: any) {
        const adSearch = this.searchResult[evt.index];
        this.searchResult.splice(evt.index, 1);

        if (evt.code == GLOBAL_CONSTANTS.ADV_SRCH) {
            this.advChipListRef.advanceSearch = (this.searchBO as any).advanceSearch = GLOBAL_CONSTANTS.EMPTY;
        }

        if (CommonMethods.hasValue((this.searchBO as any)[adSearch.type])) {
            (this.searchBO as any)[adSearch.type] = undefined;
        }

        if (this.searchResult.length <= 0) {
            this.clear();
        }

        this.searchService();
    }

    clear() {
        this.advChipListRef.advanceSearch = "";
        this.searchBO = this.boFactory();
        this.searchResult = [];
    }

}