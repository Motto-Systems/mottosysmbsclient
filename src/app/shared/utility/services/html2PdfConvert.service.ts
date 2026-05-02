import { Injectable } from "@angular/core";
import html2canvas from "html2canvas";
import { jsPDF } from 'jspdf';
import { JSPrintFileBO } from "../commonModel";

@Injectable({ providedIn: 'root' })

export class Html2PdfConvertService {

    protected mmPerInch = 25.4;

    constructor() { }

    async getPdfBlobByDomIds(domNodes: HTMLElement[]): Promise<JSPrintFileBO> {
        if (!domNodes?.length) {
            return new JSPrintFileBO();
        }

        const deviceScale = Math.max(window.devicePixelRatio || 1, 2);

        const pages = await Promise.all(
            domNodes.map(async (node) => {
                const canvas = await html2canvas(node, {
                    scale: deviceScale,
                    useCORS: true,
                    backgroundColor: '#fff'
                });

                const rect = node.getBoundingClientRect();
                const widthMm = this.pxToMmConverter(rect.width);
                const heightMm = this.pxToMmConverter(rect.height);

                return {
                    imgData: canvas.toDataURL('image/png', 1.0),
                    width: widthMm,
                    height: heightMm
                };
            })
        );

        return this.preparePdfBlob(pages);
    }

    private async preparePdfBlob(pages: { imgData: string; width: number; height: number }[]): Promise<JSPrintFileBO> {
        if (!pages.length) {
            return new JSPrintFileBO();
        }

        const firstPage = pages[0];
        const initialOrientation = firstPage.width >= firstPage.height ? 'l' : 'p';
        const pdf = new jsPDF({
            orientation: initialOrientation,
            unit: 'mm',
            format: [firstPage.width, firstPage.height]
        });

        pages.forEach((page, index) => {
            if (index > 0) {
                const orientation = page.width >= page.height ? 'l' : 'p';
                pdf.addPage([page.width, page.height], orientation);
            }

            pdf.addImage(page.imgData, 'PNG', 0, 0, page.width, page.height, undefined, 'FAST');
        });

        const pdfFileBO = new JSPrintFileBO();
        pdfFileBO.pdfBlob = pdf.output('blob');
        pdfFileBO.width = firstPage.width;
        pdfFileBO.height = firstPage.height;

        return pdfFileBO;
    }

    private pxToMmConverter(px: number, dpi: number = 96): number {
        return this.round((px * this.mmPerInch) / dpi, 2);
    }

    private round(value: number, decimals: number = 2): number {
        const factor = Math.pow(10, decimals);
        return Math.round(value * factor) / factor;
    }

}