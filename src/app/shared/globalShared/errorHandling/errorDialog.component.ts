import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
@Component({
    selector: "app-error-dialog",
    templateUrl: "./errorDialog.html",
    standalone: false
})
export class ErrorDialogComponent {

    data: any;

    constructor(private _close: MatDialogRef<ErrorDialogComponent> ) { }
    
    close(){
        this._close.close()
    }
}
