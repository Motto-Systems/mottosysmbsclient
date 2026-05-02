import { Component, EventEmitter, Input, Output } from "@angular/core";


@Component({
    selector: 'lkp-grid-com',
    templateUrl: './lookupGrid.html',
    styleUrl: './lookup.scss',
    standalone: false
})

export class LookupGridComponent {
    @Input() headerData: any;
    @Input() dataSource: any;
    @Input() length: number = 0;
    @Input() multiSelectOption: boolean = false;
    @Input() lookupInitialSize: number = 6;

    @Output() onRowSelected: EventEmitter<any> = new EventEmitter();
    @Output() allSelected: EventEmitter<any> = new EventEmitter();

    onRowClick(evt: any) {
        if (!this.multiSelectOption)
            this.onRowSelected.emit(evt);
    }

    allRowsSelected(evt: any) {
        this.allSelected.emit(evt);
    }
}