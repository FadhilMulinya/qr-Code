"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateQR = void 0;
const QRCode = require('qrcode');
const generateQR = (url_1, ...args_1) => __awaiter(void 0, [url_1, ...args_1], void 0, function* (url, size = 350) {
    try {
        // Generate qr code as a data url (base64 image)
        const qrDataUrl = yield QRCode.toDataURL(url, {
            width: 500, // Set the size of the QR code
            margin: 10, // Set the margin (space around the QR code)
            errorCorrectionLevel: 'H', // Set the error correction level
            color: {
                dark: '#000000', // Dark color for the QR code
                light: '#ffffff' // Light color for the background
            },
            version: 10, // Set the version of the QR code (larger versions have more capacity)
            scale: 6, // Scale of each module (square) in the QR code
            maskPattern: 4, // Choose the mask pattern (between 0 and 7)
        });
        // Log the data url as a base64-encoded string
        // console.log('QR Code generated:', qrDataUrl);
        console.log('Qr code successfully generated');
        // // We could also save the image as a file 
        // const fs = require('fs');
        // const qrCodeBuffer: Buffer = Buffer.from(qrDataUrl.split(',')[1], 'base64');
        // fs.writeFileSync('qrcode.png', qrCodeBuffer);
        return qrDataUrl; // Returning the QR Code Image
    }
    catch (error) {
        console.error('Error generating QR Code:', error);
    }
});
exports.generateQR = generateQR;
(0, exports.generateQR)('https://openai.com/index/chatgpt/?__cf_chl_tk=ygDIOyiD61sa3I4U6TjK9CbBUQmplxIF2uD32d5SaXQ-1742719960-1.0.1.1-iGc7qXn7yZz108PXNXqxTjvZAiFGmk4HuyjJxKQErPQ');
