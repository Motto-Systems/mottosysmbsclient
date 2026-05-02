import { AfterViewInit, Component, Input, ViewChild } from "@angular/core";
import { BasicImports } from "../../utility/commonBasicImports";
import { environment } from "../../../../environments/environment";
import { Application } from "../../home/environment/environment.model";
import { Router } from "@angular/router";
import { MatMenuDefaultOptions } from "@angular/material/menu";

@Component({
    selector: 'app-scan-header',
    templateUrl: './appScanHeader.html',
    standalone: true,
    imports: [
        ...BasicImports
    ]
})

export class AppScanHeaderComponent implements AfterViewInit {

    @ViewChild('menu1') menuTrigger?: MatMenuDefaultOptions;
    @Input() applications: Array<Application> = [];
    appCode: string = environment.appCode;

    constructor(private _router: Router) { }

    ngAfterViewInit() {
        if (this.menuTrigger)
            this.menuTrigger.overlayPanelClass = "app-menu";
    }

    formatedate() {
        return new Date();
    }

    navigateApp(path: string, appCode: string) {
        window.location.href = path;
    }

    redirectHome() {
        this._router.navigateByUrl("/scanRoot/scanAuth");
    }
}
