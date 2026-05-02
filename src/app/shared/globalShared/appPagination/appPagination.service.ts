import { EventEmitter, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable()

export class AppPaginationService {

    pageIndex$: BehaviorSubject<number> = new BehaviorSubject(0);
    totalPageCount$: BehaviorSubject<number> = new BehaviorSubject(0);
    recordsPerPage$: BehaviorSubject<number> = new BehaviorSubject(0);

    emitValue: EventEmitter<any> = new EventEmitter();

    constructor() {
        this.resetRecordsPerPageCount();
    }

    getPageIndex() {
        return this.pageIndex$.value;
    }

    setPageIndex(val: number) {
        this.pageIndex$.next(val);
    }

    setTotalPageCount(val: number) {
        this.totalPageCount$.next(val);
    }

    setRecordsPerPageCount(val: number) {
        this.recordsPerPage$.next(val);
    }

    resetRecordsPerPageCount() {
        this.recordsPerPage$.next(environment.recordsPerPage);
    }

    getTotalPageCount() {
        return this.totalPageCount$.value;
    }

    recordsPerPage() {
        return this.recordsPerPage$.value;
    }

}