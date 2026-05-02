import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppPaginationService } from '../../globalShared/appPagination/appPagination.service';
import { CommonMethods } from '../../utility/commonMethods';
import { MatTableDataSource } from '@angular/material/table';
import { TodoListGridColumnsInfo, TodoListGridExtraColumnsInfo } from './todoListModel';


@Component({
    selector: 'todo-table',
    templateUrl: './todoListTable.html',
    styleUrl: './todoList.scss',
    standalone: false
})

export class TodoListTableComponent implements OnDestroy {

    @Input('dataSource') dataSource: any[] = [];
    @Output('actionClick') actionClick: EventEmitter<any> = new EventEmitter();
    totalRecords: number = 0;
    isAllowMouseEvt: boolean = true;
    displayData: any[] = [];
    pageSubscription$: Subscription = new Subscription();
    headerData: any[] = [];
    extendedData: any[] = [];
    GridDataSource: MatTableDataSource<any> = new MatTableDataSource<any>();


    constructor(private _pagination: AppPaginationService) { }

    ngOnChanges() {
        this.totalRecords = this.dataSource.length;

        this._pagination.setPageIndex(0);
        this._pagination.setTotalPageCount(this.totalRecords);
        this.getData();
    }

    ngOnInit() {
        this.pageSubscription$ = this._pagination.emitValue.subscribe(resp => {
            this.getData();
        })

        this.headerData = CommonMethods.prepareGridColumns(TodoListGridColumnsInfo);
        this.extendedData = CommonMethods.prepareGridColumns(TodoListGridExtraColumnsInfo);
    }

    onRowSelected(row: any) {
        var val = !row.showExtRows
        this.dataSource.forEach((x: any) => { x.class = 'todo-row'; x.showExtRows = false });
        row.showExtRows = val;
        row.class = row.showExtRows ? "todo-row-active" : "todo-row";
    }

    prepareDataSource() {
        this.GridDataSource = CommonMethods.bindMaterialGridData(CommonMethods.increaseSNo(this.displayData));
    }

    getData() {
        let pageSize = this._pagination.recordsPerPage();
        var dataIndex = (this._pagination.getPageIndex() * pageSize);
        this.displayData = this.dataSource?.filter((_, index: number) => index >= dataIndex && index < dataIndex + pageSize) ?? [];
        this.prepareDataSource();
    }

    onActionClicked(evt: any) {
        this.actionClick.emit(evt);
    }

    ngOnDestroy() {
        this.pageSubscription$.unsubscribe();
    }
}