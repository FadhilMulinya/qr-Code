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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.qr = void 0;
const telegraf_1 = require("telegraf");
const dotenv_1 = __importDefault(require("dotenv"));
const qrCode_1 = require("./qrCode");
dotenv_1.default.config();
const qr = () => __awaiter(void 0, void 0, void 0, function* () {
    const bot = new telegraf_1.Telegraf(process.env.BOT_TOKEN || '');
    //Start command when a user starts the bot
    bot.start((ctx) => {
        const user = ctx.from.first_name;
        ctx.reply(`Hello , ${user} ! Send me a link and and I'll generate a QR code for it ASAP!`);
    });
    //On text command when a user sends a text message
    bot.on('text', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const url = ctx.message.text.trim();
        if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
            try {
                //Generate the qr code as a data url
                const qrDataUrl = yield (0, qrCode_1.generateQR)(url);
                //send the QR code image as a photo (base64 image )
                if (qrDataUrl) {
                    yield ctx.replyWithPhoto({ source: Buffer.from(qrDataUrl.split(',')[1], 'base64') });
                    console.log('QR code sent successfully');
                }
                else {
                    ctx.reply('Failed to generate QR code');
                }
            }
            catch (error) {
                console.error('Error generating qr code', error);
                ctx.reply('Sorry there was an error generating the QR CODE');
            }
        }
        else {
            ctx.reply('Please send a valid URL that starts with http:// or https://');
        }
    }));
    bot.launch(() => console.log('Bot started!'));
});
exports.qr = qr;
(0, exports.qr)();
