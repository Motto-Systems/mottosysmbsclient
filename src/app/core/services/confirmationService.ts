import { Injectable } from "@angular/core";
import { ConfirmDialogComponent } from "../../shared/globalShared/confirmDialog/confirmDialog.component";
import { MatDialog } from "@angular/material/dialog";
import { CommonMethods } from "../../shared/utility/commonMethods";

@Injectable()

export class ConfirmationService {

    constructor(private _dialog: MatDialog) { }

    confirm(message: string, title: string = "Confirmation", btnOkText: string = "Ok",
        btnCancelText: string = "Cancel") {

        const modal = this._dialog.open(ConfirmDialogComponent, CommonMethods.modalPopupWidth('20'));
        modal.disableClose = true;
        modal.componentInstance.message = message;
        modal.componentInstance.btnOkText = btnOkText;
        modal.componentInstance.btnCancelText = btnCancelText;
        return modal.afterClosed(); 
    }
}
