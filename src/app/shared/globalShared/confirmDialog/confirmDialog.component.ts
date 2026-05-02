import { Component, Input } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Component({
    selector: 'confirmDialog',
    templateUrl: './confirmDialog.html',
    standalone: false
})

export class ConfirmDialogComponent {

    @Input() title: string = "Confirmation";
    @Input() message!: string;
    @Input() btnOkText: string = "OK";
    @Input() btnCancelText: string = "Cancel";

    safeMessage!: SafeHtml;

    constructor(private sanitizer: DomSanitizer, public dialogRef: MatDialogRef<ConfirmDialogComponent>) { }

    ngOnInit() {
        this.safeMessage = this.sanitizer.bypassSecurityTrustHtml(this.message);
    }

    proceed() {
        this.dialogRef.close(true);
    }
    cancel() {
        this.dialogRef.close(false);
    }
}