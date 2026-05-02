import { Injectable } from "@angular/core";
import { AppContextService } from "../../core/context/appContext.service";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { PageUrls } from "./login.model";
import { CookieService } from "ngx-cookie-service";
import { Store } from "@ngrx/store";

@Injectable({ providedIn: 'root' })

export class UserLogoutService {

    constructor(private _context: AppContextService, private _router: Router, private cookieService: CookieService, private store: Store) { }

    logOut() {

        this._context.clearSession();
        localStorage.clear();
        this.cookieService.deleteAll('/', window.location.hostname);


        sessionStorage.setItem("BACK_URLS", JSON.stringify([]));

        if (environment.production) {
            setTimeout(() => {
                window.location.href = environment.usmurl + PageUrls.logout;
            }, 1000);
        }
        else
            this._router.navigate([PageUrls.login])
    }

    switchApp() {

        this._context.clearSession();
        localStorage.clear();

        setTimeout(() => {
            window.location.href = environment.usmurl + PageUrls.userLanding;
        }, 1000);
    }
}
