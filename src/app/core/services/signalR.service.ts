import { Injectable } from "@angular/core";
import * as signalR from '@microsoft/signalr';
import { Subject, Observable } from 'rxjs';
import { SignalRNotifyBO } from "../../shared/utility/commonModel";
import { environment } from "../../../environments/environment";


@Injectable({
    providedIn: "root"
})

export class SignalRService {

    private hub: signalR.HubConnection;
    private notification$: Subject<SignalRNotifyBO> = new Subject<SignalRNotifyBO>();
    private hubUrl: string = environment.hubUrl;//add hub url
    private methodName: string = "SignalRNotification";

    constructor() {
        this.hub = this.hubConnection();
        this.receive();
    }

    public async connect(): Promise<void> {
        if (this.isConnected())
            return;

        try {
            await this.hub.start();
            console.info("SignalR connected QRCS");

        } catch (error) {
            console.error("SignalR connection error:", error);
        }
    }

    send(data: SignalRNotifyBO) {
        return this.hub.invoke(this.methodName, data);
    }

    onNotification(): Observable<SignalRNotifyBO> {
        return this.notification$.asObservable();
    }

    disConnect(): void {
        if (this.isConnected())
            this.hub.stop();
    }

    private isConnected(): boolean {
        return this.hub.state === signalR.HubConnectionState.Connected;
    }

    private receive() {
        this.hub.on('ReceiveNotification', (data: SignalRNotifyBO) => {
            this.notification$.next(data);
        });
    }

    private hubConnection(): signalR.HubConnection {
        return new signalR.HubConnectionBuilder()
            .withUrl(`${this.hubUrl}?token=NOTIFY_HUB`, { withCredentials: true })
            .configureLogging(signalR.LogLevel.Information)
            .withAutomaticReconnect()
            .build();
    }

}