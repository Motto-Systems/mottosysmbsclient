import { Injectable } from '@angular/core';
import * as QRCode from 'qrcode';
import { QRCodeData, QRCodeOptions } from '../commonModel';

@Injectable({
    providedIn: 'root'
})
export class QRCodeService {

    private defaultOptions: QRCodeOptions = {
        width: 150,
        margin: 2,
        colorDark: '#000000',
        colorLight: '#FFFFFF',
        errorCorrectionLevel: 'M',
        type: 'image/png'
    };

    /**
     * Generate QR code data URL from any object
     * @param data - Data to encode in QR code
     * @param options - QR code generation options
     * @returns Promise<string> - Base64 data URL
     */
    async generateQRCodeURL(data: any, options?: QRCodeOptions): Promise<string> {
        try {
            const qrOptions = { ...this.defaultOptions, ...options };

            // Convert data to JSON string
            const dataString = typeof data === 'string' ? data : JSON.stringify(data);

            // Generate QR code as data URL
            const qrCodeDataURL = await QRCode.toDataURL(dataString, {
                width: qrOptions.width,
                margin: qrOptions.margin,
                color: {
                    dark: qrOptions.colorDark!,
                    light: qrOptions.colorLight!
                },
                errorCorrectionLevel: qrOptions.errorCorrectionLevel,
                type: qrOptions.type
            });

            return qrCodeDataURL;
        } catch (error) {
            console.error('Error generating QR code:', error);
            throw new Error('Failed to generate QR code');
        }
    }

    /**
     * Generate QR code for label data
     * @param labelData - Label specific data
     * @param options - QR code options
     * @returns Promise<string> - QR code data URL
     */
    async generateLabelQRCode(labelData: QRCodeData, options?: QRCodeOptions): Promise<string> {
        const qrData: QRCodeData = {
            labelId: labelData.labelId || `LABEL_${Date.now()}`,
            timestamp: labelData.timestamp || new Date().toISOString(),
            fields: labelData.fields || {},
            company: labelData.company || {
                name: 'Sai Life Sciences Limited',
                address: 'SLN Terminus, 4th Floor, Gachibowli, Hyderabad - 500082, Telangana, India.'
            },
            ...labelData
        };

        return this.generateQRCodeURL(qrData, options);
    }

    /**
     * Generate QR code from dropped fields array
     * @param droppedFields - Array of dropped field items
     * @param options - QR code options
     * @returns Promise<string> - QR code data URL
     */
    async generateFieldsQRCode(droppedFields: any[], options?: QRCodeOptions): Promise<string> {
        const fieldsData = droppedFields.reduce((acc, field) => {
            acc[field.name] = field.sampleValue || field.value || '';
            return acc;
        }, {} as { [key: string]: any });

        const labelData: QRCodeData = {
            labelId: `LABEL_${Date.now()}`,
            timestamp: new Date().toISOString(),
            fields: fieldsData,
            fieldCount: droppedFields.length
        };

        return this.generateLabelQRCode(labelData, options);
    }

    /**
     * Download QR code as image file
     * @param dataURL - QR code data URL
     * @param filename - Downloaded file name
     */
    downloadQRCode(dataURL: string, filename: string = 'qr-code.png'): void {
        try {
            const link = document.createElement('a');
            link.download = filename;
            link.href = dataURL;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading QR code:', error);
        }
    }

    /**
     * Generate QR code canvas element
     * @param data - Data to encode
     * @param canvasElement - HTML canvas element
     * @param options - QR code options
     */
    async generateQRCodeToCanvas(data: any, canvasElement: HTMLCanvasElement, options?: QRCodeOptions): Promise<void> {
        try {
            const qrOptions = { ...this.defaultOptions, ...options };
            const dataString = typeof data === 'string' ? data : JSON.stringify(data);

            await QRCode.toCanvas(canvasElement, dataString, {
                width: qrOptions.width,
                margin: qrOptions.margin,
                color: {
                    dark: qrOptions.colorDark!,
                    light: qrOptions.colorLight!
                },
                errorCorrectionLevel: qrOptions.errorCorrectionLevel
            });
        } catch (error) {
            console.error('Error generating QR code to canvas:', error);
            throw new Error('Failed to generate QR code to canvas');
        }
    }

    /**
     * Validate QR code data size
     * @param data - Data to validate
     * @returns boolean - Whether data is valid for QR code
     */
    validateQRData(data: any): boolean {
        try {
            const dataString = typeof data === 'string' ? data : JSON.stringify(data);
            // QR codes have different capacity limits based on error correction level
            // For alphanumeric data with error correction level M: ~1273 characters
            return dataString.length <= 1200; // Safe limit
        } catch (error) {
            return false;
        }
    }
}