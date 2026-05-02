import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AppHttpService } from "./http.service";
import { environment } from "../../../environments/environment";
import { CommonMethods } from "../../shared/utility/commonMethods";
import { DynamicServicePurposeCodes } from "../../shared/utility/constant";
import { GetSrchDataBO } from "../../shared/globalShared/customGridSearchFields/customGridSearchFields.model";

@Injectable()

export class MasterService {

    id$: Subject<string> = new Subject();
    subject$: Subject<any> = new Subject();
    showSpinnerSubject: Subject<any> = new Subject();
    private formControlsMap: Map<string, string> = new Map();

    constructor(private _http: AppHttpService) { }


    public postApiService<T>(url: string, data: T, purpose: string, attr: Array<string> = [], baseUrl: string = environment.baseUrl, appCode: string = "", extraID: string = "") {
        this._http.postDataToService(CommonMethods.formatString(url, attr), data, baseUrl, appCode)
            .subscribe(resp => {
                this.subject$.next({ "result": resp, "purpose": purpose, extraID: extraID });
            });
    }

    public getApiService(url: string, attr: Array<string> = [], purpose: string, baseUrl: string = environment.baseUrl, appCode: string = "", extraID: string = "") {
        return this._http.getDataFromService(CommonMethods.formatString(url, attr), baseUrl, appCode)
            .subscribe(resp => {
                this.subject$.next({ "result": resp, "purpose": purpose, extraID: extraID });
            });
    }

    public getApiServiceFromScan(url: string, purpose: string, extraID: string = "") {
        this._http.getDataFromScanService(url)
            .subscribe(resp => {
                this.subject$.next({ "result": resp, "purpose": purpose, extraID: extraID });
            });
    }

    public postApiServiceFromScan(url: string, body: any, purpose: string, extraID: string = "") {
        this._http.postDataFromScanService(url, body)
            .subscribe(resp => {
                this.subject$.next({ "result": resp, "purpose": purpose, extraID: extraID });
            });
    }

    ///-----------------------------------

    public nextBasicDataStream(data: any, purpose: string, extraInfo?: any) {
        this.subject$.next({ result: data, purpose: purpose, extraInfo: extraInfo });
    }

    public nextGridDataStream(data: GetSrchDataBO) {
        this.nextBasicDataStream(data, DynamicServicePurposeCodes.NextGridDataStream);
    }

    //----------Store field Control data;

    public updateFormControlMap(controlID: string, id: string) {
        this.formControlsMap.set(controlID, id);
        sessionStorage.setItem('formControlsMap', JSON.stringify(Array.from(this.formControlsMap.entries())));
    }

    public getFormControlMapIDByControlID(controlID: string) {
        if (this.formControlsMap.size === 0) {
            const storedMap = sessionStorage.getItem('formControlsMap') ?? "[]";
            this.formControlsMap = new Map(JSON.parse(storedMap));
        }

        return this.formControlsMap.get(controlID);
    }

    public clearMappedSessionData() {
        sessionStorage.removeItem('formControlsMap');
    }
}