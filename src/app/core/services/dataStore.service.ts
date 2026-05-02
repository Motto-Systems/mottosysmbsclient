import { Injectable } from "@angular/core";
import { SharedDataBO } from "../../shared/utility/commonModel";
import { BehaviorSubject, Observable } from "rxjs";
import { CachedDataKey } from "../../shared/utility/constant";

@Injectable({ providedIn: 'root' })

export class DataStoreService {
    private dataStore: Map<string, any> = new Map();
    private _dataSupplier$: BehaviorSubject<SharedDataBO> = new BehaviorSubject<SharedDataBO>(new SharedDataBO());

    getStoredData(key: CachedDataKey) {
        return this.dataStore.get(key);
    }

    setStoreData(key: CachedDataKey, data: any) {
        this.dataStore.set(key, data);
        this._dataSupplier$.next({ key, data });
    }

    hasStoreData(key: CachedDataKey): boolean {
        return this.dataStore.has(key);
    }

    getDataInfo(): Observable<SharedDataBO> {
        return this._dataSupplier$.asObservable();
    }

    clearStoreByKey(key: CachedDataKey) {
        this.dataStore.delete(key);
    }

    clearAllStore() {
        this.dataStore.clear();
    }
}