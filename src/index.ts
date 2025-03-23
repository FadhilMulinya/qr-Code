import {Telegraf} from 'telegraf';
import dotenv from 'dotenv';
import {generateQR} from './qrCode';
dotenv.config();

export const qr = async () => {

    const bot = new Telegraf(process.env.BOT_TOKEN! || '');

    //Start command when a user starts the bot
    bot.start((ctx) => {
        const user = ctx.from.first_name;
        ctx.reply(`Hello , ${user} ! Send me a link and and I'll generate a QR code for it ASAP!`)
    });

    //On text command when a user sends a text message

    bot.on('text', async (ctx) => {
        const url = ctx.message.text.trim();
        
        if(url && (url.startsWith('http://') || url.startsWith('https://'))){
            try {
                //Generate the qr code as a data url
                const qrDataUrl = await generateQR(url);

                //send the QR code image as a photo (base64 image )
                if (qrDataUrl) {
                    await ctx.replyWithPhoto({source: Buffer.from(qrDataUrl.split(',')[1], 'base64')});
                    console.log('QR code sent successfully');
                } else {
                    ctx.reply('Failed to generate QR code');
                }
            } catch(error){
                console.error('Error generating qr code', error);
                ctx.reply('Sorry there was an error generating the QR CODE');
            }
            }
            else {
                ctx.reply('Please send a valid URL that starts with http:// or https://');
            }
    });


    bot.launch(() => console.log('Bot started!'));

}
qr();