import { Component, EventEmitter, Input, Output } from "@angular/core";
import { SearchFilterModalService } from "./service/searchFilterModelService.service";

@Component({
    selector: 'app-advanceSearchChipList',
    templateUrl: './advanceSearchChipList.html',
    standalone: false
})
export class AdvanceSearchChipListComponent {
    
    advanceSearch: string = "";
    @Input() searchResult: any = [];
    @Input() id: string = "";
    @Output() clearOptionsData: EventEmitter<any> = new EventEmitter();    // For sending the data to parent
    @Input() searchBy: string = "";
    @Output() clickOnEnter: EventEmitter<any> = new EventEmitter();
    constructor(public _modalService: SearchFilterModalService) { }
 
    hasSearchVal() {
        var obj = this.searchResult.filter((x: any) => x.code == 'ADV_SRCH')
        return (obj.length > 0);
    }

    /* To open the modal popup based on id */
    openModal() {
        this._modalService.open(this.id);
    }

    /* For sending the selected code and index to parent component */
    clearOptions(code: string, index: number) {
        this.clearOptionsData.emit({ code: code, index: index });
    }

    enterClick() {
        this.clickOnEnter.emit()
    }
}