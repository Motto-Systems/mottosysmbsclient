import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CommonMethods } from '../../shared/utility/commonMethods';

@Injectable()

export class AppHttpService {

    observables$: Observable<any> = new Observable();

    constructor(private _http: HttpClient) { }

    getDataFromService(url: string, baseUrl: string = "", appCode: string = "", headers: HttpHeaders = new HttpHeaders(), isLocalFileAccessing: boolean = false): Observable<any> {

        headers = headers.set("appCode", environment.appCode);

        this.observables$ = this._http.get(this.getUrl(isLocalFileAccessing, url, baseUrl), { headers: headers });
        return this.observables$;
    }

    postDataToService(url: string, body: any, baseUrl: string = "", appCode: string = "", headers: HttpHeaders = new HttpHeaders()): Observable<any> {

        headers = headers.set("appCode", environment.appCode);

        this.observables$ = this._http.post((CommonMethods.hasValue(baseUrl) ? baseUrl : environment.baseUrl) + url, body, { headers: headers });

        return this.observables$;
    }

    getUrl(isLocalFileAccessing: boolean, url: string, baseUrl: string = "") {
        if (!isLocalFileAccessing) {
            url = (CommonMethods.hasValue(baseUrl) ? baseUrl : environment.baseUrl) + url;
        }

        return url;
    }

    //-----------Dynamic API Service from scan
    getDataFromScanService(url: string, headers: HttpHeaders = new HttpHeaders()) {
        headers = headers.set("appCode", environment.appCode);
        this.observables$ = this._http.get(url, { headers: headers });
        return this.observables$;
    }

    postDataFromScanService(url: string, body: any, headers: HttpHeaders = new HttpHeaders()) {
        headers = headers.set("appCode", environment.appCode);
        this.observables$ = this._http.post(url, body, { headers: headers });
        return this.observables$;
    }
}