import { Component, Input } from "@angular/core";

@Component({
    selector: "no-data-available",
    templateUrl: "./noDataAvailable.html",
    standalone: false
})
export class NoDataAvailableComponent {
    @Input() iconClass: string = 'fa-icon-layer-group-light';
    @Input() infoMsg: string = 'No Data Available';
    @Input() activityMsg: string = 'Please Scan Label / Enter Code';
    @Input() showActivityMsg: boolean = true;
}