import { HttpEvent, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, Observable, of } from "rxjs";
import { MockResponse } from "./mock-data";
import { CommonResponseCode, MockApiServiceUrls } from "../../shared/utility/constant";

@Injectable()

export class MockService {

    private requestInfo!: HttpRequest<any>;

    isAllowMockApi(request: HttpRequest<any>) {
        this.requestInfo = request;
        const endPoint = this.getMockEndPoint();
        const UrlsObj = { ...MockApiServiceUrls };
        return Object.values(UrlsObj).map((x: string) => x.split('?')[0]).includes(endPoint);
    }

    getMockRespose(): Observable<HttpEvent<any>> | null {
        const { method, body } = this.requestInfo;
        const endPoint = this.getMockEndPoint();

        if (method === 'GET') {
            const mockResponse = MockResponse[endPoint];
            return of(new HttpResponse({ status: 200, body: mockResponse })).pipe(delay(500));
        }

        if (method === 'POST') {
            const result = this.saveToMockDataBase(body, MockResponse[endPoint]);
            return of(new HttpResponse({ status: 200, body: result })).pipe(delay(500));
        }

        return null; // No mock match — fall through to real request
    }

    private saveToMockDataBase(body: any, data: any) {
        const targetArray = [];//(MockResponse[LabelDesignServiceUrls.ManageLabelDetails] as Array<any>);

        const newEntry = {
            id: targetArray.length + 1,
            ...body
        };

        targetArray.push(newEntry);

        return { resultFlag: CommonResponseCode.success, ...data };
    }

    private getMockEndPoint() {
        const { url } = this.requestInfo;
        const reqUrl = url.includes('?') ? url.split('?')[0] : url;

        let endPoint: string = "";
        const pathname = new URL(reqUrl).pathname;
        const apiIndex = pathname.indexOf('/api/');
        if (apiIndex !== -1) {
            endPoint = pathname.substring(apiIndex + 5); // everything after '/api/'
        }

        return endPoint;
    }


}