import { Injectable } from "@angular/core";
import { BehaviorSubject, distinctUntilChanged, map, Observable } from "rxjs";
import { ComponentModelBO } from "../../shared/utility/commonModel";
import { ComponentCode, MODE_TYPE } from "../../shared/utility/constant";

@Injectable({ providedIn: 'root' })

export class ComponentStoreService {

    private _componentList$ = new BehaviorSubject<ComponentModelBO[]>([]);
    readonly getComponentList$ = this._componentList$.asObservable();

    setComponentList(components: ComponentModelBO[]) {
        this._componentList$.next(components);
    }

    getValue(): ComponentModelBO[] {
        return this._componentList$.getValue();
    }

    getModeInfoByComponentCode(componentCode: ComponentCode, routeMode: MODE_TYPE): Observable<boolean> {
        return this._componentList$.pipe(
            map(list => {

                if (routeMode === MODE_TYPE.VIEW) {
                    return false;
                }
                if (list.length <= 0) {
                    return routeMode === MODE_TYPE.MANAGE;
                }

                const mode = list.find(c => c.componentCode === componentCode)?.mode;
                return mode === MODE_TYPE.MANAGE;
            }),
            distinctUntilChanged()
        );
    }

    setModeForComponent(componentCode: ComponentCode, mode: MODE_TYPE) {
        const updated = this._componentList$.getValue().map(c =>
            c.componentCode === componentCode ? { ...c, mode } : c
        );
        this._componentList$.next(updated);
    }
}
