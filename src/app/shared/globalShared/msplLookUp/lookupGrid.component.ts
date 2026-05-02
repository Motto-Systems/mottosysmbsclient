// import { Component, EventEmitter, input, Input, Output } from "@angular/core";


// @Component({
//     selector: 'mspl-lkp-grid-com',
//     templateUrl: './lookupGrid.html',
//     styleUrl: './lookup.scss',
//     standalone: false
// })

// export class MsplLookupGridComponent {
//     @Input() headerData: any;
//     @Input() dataSource: any;
//     @Input() length: number = 0;
//     @Input() multiSelectOption: boolean = false;
//     @Input() lookupCode: string = "";

//     @Output() onRowSelected: EventEmitter<any> = new EventEmitter();
//     @Output() allSelected: EventEmitter<any> = new EventEmitter();

//     onRowClick(evt: any) {
//         if (!this.multiSelectOption)
//             this.onRowSelected.emit(evt);
//     }

//     allRowsSelected(evt: any) {
//         this.allSelected.emit(evt);
//     }
// }


import { Component, EventEmitter, Input, Output, AfterViewInit, OnChanges, OnInit } from "@angular/core";
import { SelectionModel } from '@angular/cdk/collections';


@Component({
    selector: 'mspl-lkp-grid-com',
    templateUrl: './lookupGrid.html',
    styleUrl: './lookup.scss',
    standalone: false
})

export class MsplLookupGridComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() headerData: any;
  @Input() dataSource: any;
  @Input() length: number = 0;
  @Input() multiSelectOption: boolean = false;
  @Input() lookupInitialSize: number = 6;
  @Input() isLoadingMore: boolean = false; // Input for loading state
  @Input() hasMoreData: boolean = true; // Input for checking if more data available

  @Output() onRowSelected: EventEmitter<any> = new EventEmitter();
  @Output() allSelected: EventEmitter<any> = new EventEmitter();
  @Output() loadMoreData: EventEmitter<void> = new EventEmitter(); // Output for load more event

  private scrollPosition: number = 0; // Store scroll position

  // Mat-table properties
  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = [];

  ngOnInit(): void {
    this.updateDisplayedColumns();
  }

  ngAfterViewInit(): void {
    // Check scrollability after view is initialized
    setTimeout(() => {
      this.isContentScrollable();
    }, 100);
  }

  ngOnChanges(): void {
    // Update displayed columns when header data changes
    this.updateDisplayedColumns();

    // Restore scroll position after data changes
    if (this.scrollPosition > 0) {
      setTimeout(() => {
        this.restoreScrollPosition();
      }, 100);
    }
  }

  // Update displayed columns based on header data
  updateDisplayedColumns(): void {
    this.displayedColumns = [];

    if (this.multiSelectOption) {
      this.displayedColumns.push('select');
    }

    if (this.headerData && this.headerData.length > 0) {
      this.headerData.forEach((header: any) => {
        if (header.columnDef !== 'select') {
          this.displayedColumns.push(header.columnDef);
        }
      });
    }
  }

  // Mat-table selection methods
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource?.data?.length || 0;
    return numSelected === numRows;
  }

  masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource?.data?.forEach((row: any) => this.selection.select(row));
    }
    this.emitAllSelected();
  }

  onRowSelectionChange(row: any, checked: boolean): void {
    row.select = checked;
    if (checked) {
      this.selection.select(row);
    } else {
      this.selection.deselect(row);
    }
    this.emitAllSelected();
  }

  onRowClickSingle(row: any): void {
    if (!this.multiSelectOption) {
      this.onRowSelected.emit(row);
    }
  }

  onCellClick(element: any): void {
    if (!this.multiSelectOption) {
      this.onRowSelected.emit(element);
    }
  }

  emitAllSelected(): void {
    const selectedRows = this.selection.selected;
    this.allSelected.emit({
      checked: selectedRows.length > 0,
      selected: selectedRows.length === this.dataSource?.data?.length ? "ALL" : "SINGLE",
      row: selectedRows
    });
  }

  onRowClick(evt: any) {
    if (!this.multiSelectOption)
      this.onRowSelected.emit(evt);
  }

  allRowsSelected(evt: any) {
    this.allSelected.emit(evt);
  }

  onLoadMore() {
    if (!this.isLoadingMore && this.hasMoreData) {
      // Store current scroll position before loading more data
      this.saveScrollPosition();
      this.loadMoreData.emit();
    }
  }

  // Save current scroll position
  private saveScrollPosition(): void {
    const container = document.querySelector('.lkp-grid-content');
    if (container) {
      this.scrollPosition = container.scrollTop;
    }
  }

  // Restore scroll position
  private restoreScrollPosition(): void {
    const container = document.querySelector('.lkp-grid-content');
    if (container && this.scrollPosition > 0) {
      container.scrollTop = this.scrollPosition;
    }
  }

  // Helper method to check if content is scrollable
  isContentScrollable(): boolean {
    const container = document.querySelector('.lkp-grid-content');
    if (container) {
      const isScrollable = container.scrollHeight > container.clientHeight;
      // If content is not scrollable and we have more data, auto-load more
      if (!isScrollable && this.hasMoreData && this.length > (this.dataSource?.data?.length || 0)) {
        setTimeout(() => {
          this.onLoadMore();
        }, 1000);
      }

      return isScrollable;
    }
    return false;
  }

  onScroll(event: Event): void {
    // Update scroll position
    const element = event.target as HTMLElement;
    this.scrollPosition = element.scrollTop;

    if (this.isLoadingMore || !this.hasMoreData) {
      return;
    }

    const threshold = 50; // pixels from bottom to trigger load
    if (element.scrollHeight - element.scrollTop - element.clientHeight <= threshold) {
      this.onLoadMore();
    } 
  }
}
