import { AfterContentInit, Component, EventEmitter, Input, Output } from "@angular/core";
import { TemplateActionBO } from "../../utility/commonModel";

@Component({
    selector: 'app-common-template',
    templateUrl: './appCommonTemplate.html',
    standalone: false
})
export class AppCommonTemplateComponent implements AfterContentInit {

    @Input() loadingTimer: number = 500;

    @Input() leftSubTitle: string = "";
    @Input() rightSubTitle: string = "";
    @Input() templateActions: TemplateActionBO[] = [];
    @Input() disableAction: boolean = false;
    @Output() tempAction: EventEmitter<string> = new EventEmitter();

    @Input() actionCode: string = "";
    isLoaded: boolean = false;

    isLeftHidden: boolean = false;
    isClicked: boolean = false;

    ngAfterContentInit() {
        if (this.templateActions.length > 0) {
            this.onTempAction(this.templateActions[0]);
        }

        setTimeout(() => { this.isLoaded = true; }, this.loadingTimer);
    }

    toggleLeftSection() {
        this.isLeftHidden = !this.isLeftHidden;
        this.isClicked = !this.isClicked;
    }

    onTempAction(action: TemplateActionBO, idx: number = 0) {
        if (this.disableAction && idx > 0) {
            return;
        }

        this.actionCode = action.actionCode;
        this.rightSubTitle = action.actionName;

        this.tempAction.emit(this.actionCode);
    }


}