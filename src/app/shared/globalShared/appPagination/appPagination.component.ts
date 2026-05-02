import { Component, Input, OnDestroy } from "@angular/core";
import { AppPaginationService } from "./appPagination.service";
import { CommonMethods } from "../../utility/commonMethods";

@Component({
    selector: 'app-pagination',
    templateUrl: './appPagination.html',
    standalone: false
})
export class AppPaginationComponent implements OnDestroy {

    @Input() recordPerPage: number = 10;
    @Input() showNoOfRecords: boolean = false;
    displayIndex: number = 1;

    constructor(private _appService: AppPaginationService) { }

    onPageIndexClick(val: any) {
        this._appService.emitValue.emit(val.pageIndex);
    }

    get currentSelectedIndex() {
        return this._appService.getPageIndex();
    }

    get totalRecords() {
        return this._appService.getTotalPageCount();
    }

    ngAfterContentInit() {
        this._appService.pageIndex$.subscribe(resp => this.displayIndex = resp + 1);
    }

    keyPress(event: any) {
        event = (event) ? event : window.event;
        var charCode = (event.which) ? event.which : event.keyCode;

        if (charCode == 13)
            this.goToPage(event);
        return CommonMethods.allowNumber(event, '');
    }

    goToPage(evt: any) {
        var index = evt.target.value;
        if (!CommonMethods.hasValue(index) || index == 0 || index > this.getTotalCount())
            return this.displayIndex = this.currentSelectedIndex + 1;
        else
            this.displayIndex = index
        this._appService.setPageIndex(this.displayIndex - 1);
        return this._appService.emitValue.next(this.currentSelectedIndex);
    }

    getTotalCount() {
        if (this.totalRecords && this.totalRecords > 0)
            return Math.ceil(this.totalRecords / this.recordPerPage);
        return 0;
    }

    navigate(val: number) {
        if (val == -1 && this.currentSelectedIndex == 0)
            return
        else if (val == 1 && this.currentSelectedIndex + 1 >= this.getTotalCount())
            return
        this._appService.setPageIndex(this.currentSelectedIndex + val);
        this.displayIndex = this.currentSelectedIndex + 1;
        return this._appService.emitValue.next(this.currentSelectedIndex);
    }

    ngOnDestroy() { }



}