import { Injectable } from '@angular/core';
import * as JSPM from 'jsprintmanager';
import { FileSourceType, WSStatus } from 'jsprintmanager';
import { ICustomDropdownNCheckListData } from '../../globalShared/customCheckList/customChecklistModel';
import { BehaviorSubject, Subject } from 'rxjs';
import { JSPrintFileBO, PrintStatusBO } from '../commonModel';
import { AlertService } from '../../../core/services/alert.service';

@Injectable({ providedIn: 'root' })
export class JSPrintManagerService {

    private printers$: BehaviorSubject<ICustomDropdownNCheckListData[]> = new BehaviorSubject<ICustomDropdownNCheckListData[]>([]);
    private statusSubject$ = new Subject<PrintStatusBO>();
    private statusMessages: Partial<Record<WSStatus, string>> = {
        [WSStatus.Closed]: 'JSPrintManager (JSPM) is not installed or not running! Download JSPM Client App from https://neodynamic.com/downloads/jspm',
        [WSStatus.Blocked]: 'JSPM has blocked this website!',
        [WSStatus.WaitingForUserResponse]: 'JSPM is waiting for user response!'
    };
    private preDefinedPrinters: string[] = ['Microsoft Print to PDF', 'Adobe PDF'];
    private connectionPromise: Promise<boolean> | null = null;
    private statusHandlerAttached = false;
    private hasAnnouncedConnection = false;
    private readonly handleStatusChanged = () => this.onStatusChanged();

    public getPrintersList = this.printers$.asObservable();
    public printStatus$ = this.statusSubject$.asObservable();

    constructor(private _alert: AlertService) {
        this.connectJSPrintManager();
    }

    connectJSPrintManager() {
        this.startClient();
    }

    async printPDFFile(fileBO: JSPrintFileBO, fileContentType: FileSourceType, printerName: string, noOfCopies: number = 1, useDefaultPrinter: boolean = false) {
        const connected = await this.ensureConnection();
        if (!connected) {
            this._alert.warning(this.statusMessages[JSPM.JSPrintManager.websocket_status] ?? 'Unable to reach JSPrintManager. Please ensure the client app is installed and running.');
            return;
        }

        const cpj = new JSPM.ClientPrintJob();
        cpj.clientPrinter = useDefaultPrinter
            ? new JSPM.DefaultPrinter()
            : new JSPM.InstalledPrinter(printerName || '');

        const printFile = new JSPM.PrintFilePDF(fileBO.pdfBlob, fileContentType, 'labels.pdf', noOfCopies);
        const jspmAny = JSPM as any;
        const printFileAny = printFile as any;

        if ('printScale' in printFileAny && jspmAny?.PrintScale)
            printFileAny.printScale = jspmAny.PrintScale.None;
        if ('printRotation' in printFileAny && jspmAny?.PrintRotation)
            printFileAny.printRotation = jspmAny.PrintRotation.None;
        if ('pageHandling' in printFileAny && jspmAny?.PDFPageHandling)
            printFileAny.pageHandling = jspmAny.PDFPageHandling.Split;
        if ('pageMargins' in printFileAny && typeof jspmAny?.Margins === 'function') {
            const Margins = jspmAny.Margins;
            printFileAny.pageMargins = new Margins(0, 0, 0, 0);
        }
        if ('customPaperSize' in printFileAny && typeof jspmAny?.PrinterPaperSize === 'function') {
            const PrinterPaperSize = jspmAny.PrinterPaperSize;
            printFileAny.customPaperSize = new PrinterPaperSize(fileBO.width, fileBO.height, 'mm');
        }

        cpj.files.push(printFile);

        cpj.onUpdated = (data: any) => {
            //  console.log('Print job status update:', data);
            this.statusSubject$.next(
                new PrintStatusBO(data.ticket ?? '',
                    data?.result === "ClientPrintJob done" ? "COMPLETE" : "",
                    data["state-description"])
            );
        };

        try {
            await cpj.sendToClient();
            if (this.preDefinedPrinters.some(p => printerName.toLowerCase().includes(p.toLowerCase()))) {
                this.statusSubject$.next(
                    new PrintStatusBO('',
                        'COMPLETED',
                        "COMPLETE"
                    )
                );
            }
            console.log('Print job sent to client successfully.');
        } catch (error) {
            console.error('Error sending print job to client:', error);
        }
    }

    private startClient(): void {
        try {
            JSPM.JSPrintManager.auto_reconnect = true;
            JSPM.JSPrintManager.start();
        } catch (error) {
            console.error('Failed to start JSPrintManager:', error);
        }

        this.attachStatusHandler();
    }

    private attachStatusHandler(): void {
        const ws = JSPM.JSPrintManager.WS;

        if (ws) {
            ws.onStatusChanged = this.handleStatusChanged;
            this.statusHandlerAttached = true;
        } else if (!this.statusHandlerAttached) {
            setTimeout(() => this.attachStatusHandler(), 200);
        }
    }

    private onStatusChanged(): void {
        if (this.isConnected()) {
            this.fetchPrinters();

            if (!this.hasAnnouncedConnection) {
                this._alert.info('JSPrintManager (JSPM) is now connected.');
                this.hasAnnouncedConnection = true;
            }
        } else {
            this.hasAnnouncedConnection = false;
        }
    }

    private async ensureConnection(timeoutMs: number = 6000): Promise<boolean> {
        if (this.isConnected()) {
            return true;
        }

        this.startClient();

        if (this.connectionPromise) {
            return this.connectionPromise;
        }

        this.connectionPromise = new Promise<boolean>((resolve) => {
            const settle = (result: boolean) => {
                clearInterval(intervalId);
                clearTimeout(timeoutId);
                this.connectionPromise = null;
                resolve(result);
            };

            const intervalId = setInterval(() => {
                if (this.isConnected()) {
                    settle(true);
                }
            }, 250);

            const timeoutId = setTimeout(() => {
                settle(this.isConnected());
            }, timeoutMs);
        });

        return this.connectionPromise;
    }

    fetchPrinters() {
        if (this.isConnected()) {
            JSPM.JSPrintManager.getPrinters().then((printers: any) => {
                const printerList = printers.map((name: string, index: number) => {
                    const printerObj = new ICustomDropdownNCheckListData();
                    printerObj.itemID = printerObj.id = index;
                    printerObj.itemCode = printerObj.item = name;
                    printerObj.isActive = true;
                    return printerObj;
                });
                this.printers$.next(printerList);
            });
        }
    }

    private isConnected(): boolean {
        const status = JSPM.JSPrintManager.websocket_status;

        if (status === WSStatus.Open) {
            return true;
        }

        const warningMessage = this.statusMessages[status];
        if (warningMessage) {
            this._alert.warning(warningMessage);
        }

        return status === WSStatus.WaitingForUserResponse;
    }
}