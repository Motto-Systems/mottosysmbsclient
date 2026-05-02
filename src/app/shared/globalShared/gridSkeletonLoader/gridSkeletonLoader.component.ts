import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";

@Component({
    selector: 'grid-skeleton-loader',
    templateUrl: './gridSkeletonLoader.html',
    standalone: false
})

export class GridSkeletonLoaderComponent implements AfterViewInit {
    @Input() columnCount = 5;
    @Input() rowCount = 5;
    @Input() hasActions: boolean = false;
    skeletonDataSource: MatTableDataSource<any> = new MatTableDataSource();
    displayedColumns: string[] = [];
    columnsToDisplay: string[] = [];

    ngAfterViewInit(): void {
        this.columnsToDisplay = this.displayedColumns = this.gridColumns;
        this.displayedColumns = this.displayedColumns.concat(this.hasActions ? ['actions'] : []);
        this.skeletonDataSource = new MatTableDataSource(this.getDataSourceList);
    }

    private get gridColumns(): string[] {
        return Array.from({ length: this.columnCount }, (_, i) => `col${i}`);
    }

    private get getDataSourceList(): Record<string, string>[] {
        return Array.from({ length: this.rowCount }, () => {
            return this.gridColumns.reduce((obj, colName) => {
                obj[colName] = colName;
                return obj;
            }, {} as Record<string, string>);
        });
    }

}