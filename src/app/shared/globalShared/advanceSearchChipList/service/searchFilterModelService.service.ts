import { Injectable } from "@angular/core";
import { SearchModalPopUpBO } from "../advanceSearchModel";

@Injectable({providedIn:'root'})
export class SearchFilterModalService {
    private modals: Array<SearchModalPopUpBO> = new Array<SearchModalPopUpBO>();

    add(_modal: any) {
        // add modal to array of active modals
        // console.log(_modal);

        this.modals.push({ modal: _modal, isOpened: false });
    }

    remove(id: string) {
        // remove modal from array of active modals
        this.modals = this.modals.filter(x => x.modal.id !== id);
    }

    open(id: string) {
        // open modal specified by id
        const _modal = this.modals.find(x => x.modal.id === id);
        if (_modal) {
            _modal.isOpened = true;
            _modal.modal.open();
        }

    }

    close(id: string) {
        // close modal specified by id
        if (this.isExists(id)) {
            const _modal = this.modals.find(x => x.modal.id === id);
            if (_modal) {
                _modal.modal.close();
                _modal.isOpened = false;
            }
        }
    }

    isExists(id: string): boolean {
        return this.modals.findIndex(x => x.modal.id === id) > -1;
    }

    isOpened(id: string) {
        return this.modals.filter(x => x.modal.id === id && x.isOpened == true).length > 0;
    }

}