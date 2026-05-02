import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output } from "@angular/core";
import { debounceTime, Subscription } from "rxjs";
import { CommonMethods } from "../../utility/commonMethods";
import { DynamicServicePurposeCodes, StateCodes } from "../../utility/constant";
import { CustomSearchFieldsInfo, GetSrchDataBO, GridFilterKeys, TableFilter } from "./customGridSearchFields.model";
import { MasterService } from "../../../core/services/master.service";

@Component({
    selector: 'custom-search-fields',
    templateUrl: './customGridSearchFields.html',
    standalone: false
})
export class CustomSearchFieldsComponent implements AfterViewInit, OnDestroy {

    @Input() isShowStateDropdown: boolean = false;
    @Input() label: string = "Search";
    @Output() getDataSource: EventEmitter<any[]> = new EventEmitter();

    fieldsInfo: CustomSearchFieldsInfo = new CustomSearchFieldsInfo();
    dataBO: GetSrchDataBO = new GetSrchDataBO();
    fieldFlex: string = "";
    filterBO: TableFilter = new TableFilter();

    private subscription$: Subscription = new Subscription();
    private searchSubscription$: Subscription = new Subscription();

    constructor(private _service: MasterService) { }

    ngAfterViewInit() {
        this.fieldFlex = this.isShowStateDropdown ? '70' : '100';

        this.subscription$ = this._service.subject$.subscribe(resp => {
            if (resp.purpose === DynamicServicePurposeCodes.NextGridDataStream) {
                this.initializeGridData(resp.result);
            }
        });

        this.searchSubscription$ = this.fieldsInfo.searchControl.valueChanges
            .pipe(debounceTime(300))
            .subscribe(resp => {
                this.filterBO.searchText = resp;
                this.finalFilterData();
            });
    }

    onStateFilter(state: string) {
        this.filterBO.selectedState = state;
        this.finalFilterData();
    }

    private finalFilterData() {
        this.dataBO.dataSource.filter = JSON.stringify(this.filterBO);
        this.getDataSource.emit(this.prepareGridData(this.dataBO.dataSource.filteredData));
    }

    private initializeGridData(result: GetSrchDataBO) {
        this.dataBO = result ?? new GetSrchDataBO();
        this.addStateToFilterKeys();
        this.dataBO.dataSource.filterPredicate = this.setFilterPredicate();

        if (this.isShowStateDropdown)
            this.onStateFilter(StateCodes.ACTIVE);
    }

    private addStateToFilterKeys() {
        if (!this.dataBO.filterKeys.includes(GridFilterKeys.state)) {
            this.dataBO.filterKeys = [GridFilterKeys.state, ...this.dataBO.filterKeys];
        }
    }

    private setFilterPredicate(): (row: any, filter: string) => boolean {
        return (row, filter) => {
            const { searchText, selectedState }: TableFilter = JSON.parse(filter ?? '{}');

            const search = searchText?.trim().toLowerCase() ?? '';
            const matchesText = this.searchTextFilter(search, row);
            const matchesState = (selectedState && selectedState !== StateCodes.All)
                ? (row?.state?.toLowerCase() === selectedState.toLowerCase())
                : true;

            return (matchesText && matchesState);
        }
    }

    private searchTextFilter(search: string, row: any) {
        return this.dataBO.filterKeys.some(field => {
            const value = this.getNestedValue(row, field);
            return value?.toString().toLowerCase().includes(search);
        });
    }

    private prepareGridData(list: any[]) {
        return ((CommonMethods.increaseSNo(JSON.parse(JSON.stringify(list ?? [])))));
    }

    private getNestedValue(obj: any, path: string): any {
        return path.split('.').reduce((acc, part) => acc?.[part], obj);
    }

    ngOnDestroy(): void {
        this.searchSubscription$.unsubscribe();
        this.subscription$.unsubscribe();
    }
}