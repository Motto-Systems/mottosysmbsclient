import { ApplicationRef, createComponent, EnvironmentInjector, Injectable } from "@angular/core";
import { CustomLoaderComponent } from "../../shared/globalShared/customLoader/customLoader.component";

@Injectable({ providedIn: "root" })
export class CustomLoaderService {

    private loaderRef?: ReturnType<typeof createComponent>;

    constructor(private _appRef: ApplicationRef, private _injector: EnvironmentInjector) { }

    async show(message: string = ''): Promise<void> {
        if (this.loaderRef) {
            this.loaderRef.setInput('message', message);
            return;
        }

        this.loaderRef = createComponent(CustomLoaderComponent, {
            environmentInjector: this._injector
        });

        this._appRef.attachView(this.loaderRef.hostView);

        const domElem = (this.loaderRef.location.nativeElement as HTMLElement);
        document.body.appendChild(domElem);

        this.loaderRef.setInput('message', message);
    }

    hide() {
        if (this.loaderRef) {
            this._appRef.detachView(this.loaderRef.hostView);
            this.loaderRef.destroy();
            this.loaderRef = undefined;
        }
    }
}
