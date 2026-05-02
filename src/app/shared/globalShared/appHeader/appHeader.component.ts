import { Component, Input, OnDestroy, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { Subscription } from "rxjs";
import { environment } from "../../../../environments/environment";
import { MatMenuDefaultOptions, MatMenuModule } from "@angular/material/menu";
import { UserDetails } from "../../../core/context/contextModel";
import { MasterService } from "../../../core/services/master.service";
import { AppContextService } from "../../../core/context/appContext.service";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";

import { Application } from "../../home/environment/environment.model";
import { MatDialog } from "@angular/material/dialog";
import { UserLogoutService } from "../../login/logout.service";
import { SwitchUnitComponent } from "../../switchUnit/switchUnit.component";
import { CommonMethods } from "../../utility/commonMethods";

@Component({
    selector: 'app-header',
    templateUrl: './appHeader.html',
    standalone: true,
    imports: [MatProgressSpinnerModule, MatProgressBarModule, MatButtonModule, MatToolbarModule, MatIconModule, MatMenuModule, MatDividerModule]
})

export class AppHeaderComponent implements OnDestroy {


    canShow: boolean = false;
    usrDetails: UserDetails = new UserDetails();
    subscription$: Subscription = new Subscription();
    @ViewChild('menu1') menuTrigger?: MatMenuDefaultOptions;
    appCode: string = environment.appCode;
    @Input() applications: Array<Application> = [];
    constructor(private _router: Router, private _service: MasterService, private _dialog: MatDialog,
        private _appContextService: AppContextService, private _logout: UserLogoutService) { }

    redirectHome() {
        this._router.navigateByUrl("/root/home");
    }

    ngOnInit() {
        this.subscription$ = this._service.showSpinnerSubject.subscribe((resp: any) => {
            this.canShow = resp;
        });

        this.usrDetails = this._appContextService.appContext.userDetails;
    }


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

    navigateToManageUserInfo() {
        const modal = this._dialog.open(SwitchUnitComponent, CommonMethods.modalPopupWidth('50'));
    }
    
    logout() {
        this._logout.logOut();
    }

    ngOnDestroy(){
        this.subscription$.unsubscribe();
    }
}
