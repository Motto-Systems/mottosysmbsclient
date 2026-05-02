import { Component, Input } from "@angular/core";

@Component({
    selector: 'custom-loader',
    templateUrl: './customLoader.html',
    styleUrls: ['./customLoader.scss'],
    standalone: false
})
export class CustomLoaderComponent {
    @Input() message: string = 'Loading, please wait...';
    @Input() icon: string = "fa-icon-info-mat-icon";

}