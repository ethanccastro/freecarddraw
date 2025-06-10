import nodemailer from 'nodemailer';
import Global from './global.js';

interface EmailOptions {
    entryemail: string;
    giveawayid: string;
    entryusertokenuuid?: string;
    giveawaytitle?: string;
    verificationToken?: string;
    entryNumber?: number;
    giftcard?: string;
}

export default class GiveawayEmail {
    private static transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NODEMAILER_AUTH_USER,
            pass: process.env.NODEMAILER_AUTH_PASS
        }
    });

    private static htmlEmailentryNumber:string = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Confirm Your Email</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <style type="text/css">
            body {
                font-family: 'Google Sans', Roboto, Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
            }

            .email-container {
                background-color: white;
                padding: 40px;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                width: 90%;
                max-width: 600px;
                text-align: center;
            }

            h1 {
                color: #AF231C;
                margin-bottom: 20px;
                font-family: 'SI', sans-serif;
            }

            p {
                color: #333;
                line-height: 1.6;
                margin-bottom: 30px;
            }

            .verify-button {
                display: inline-block;
                background-color: #AF231C;
                color: white;
                padding: 15px 30px;
                text-decoration: none;
                border-radius: 5px;
                font-weight: bold;
                transition: background-color 0.3s;
            }

            .verify-button:hover {
                background-color: #c94740;
            }

            .link-text {
                color: #007bff;
                text-decoration: underline;
                word-break: break-all;
            }

            .footer {
                margin-top: 40px;
                color: #777;
                font-size: 0.9em;
            }

            @font-face {
                font-family: SI;
                src: url('https://fonts.googleapis.com/css2?family=Special+Elite&display=swap');
            }
        </style>
    </head>
    <body style="font-family: 'Google Sans', Roboto, Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh;">
        <div class="email-container" style="background-color: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); width: 90%; max-width: 600px; text-align: center;">
    <h1 style="color: #AF231C; margin-bottom: 20px; font-family: 'SI', sans-serif;">Your entry Number</h1>    
            <p style="color: #333; line-height: 1.6; margin-bottom: 30px;">Thank you for confirming your email address. You are now entered into the giveaway!</p>
            <p style="color: #333; line-height: 1.6; margin-bottom: 30px;">Your entry number is: <strong>[entryNumber]</strong>. Please keep this number safe.</p>
        </div>
    </body>
    </html>`;

    private static htmlEmailConfirmation:string  = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Confirm Your Email</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <style type="text/css">
            body {
                font-family: 'Google Sans', Roboto, Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
            }

            .email-container {
                background-color: white;
                padding: 40px;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                width: 90%;
                max-width: 600px;
                text-align: center;
            }

            h1 {
                color: #AF231C;
                margin-bottom: 20px;
                font-family: 'SI', sans-serif;
            }

            p {
                color: #333;
                line-height: 1.6;
                margin-bottom: 30px;
            }

            .verify-button {
                display: inline-block;
                background-color: #AF231C;
                color: white;
                padding: 15px 30px;
                text-decoration: none;
                border-radius: 5px;
                font-weight: bold;
                transition: background-color 0.3s;
            }

            .verify-button:hover {
                background-color: #c94740;
            }

            .link-text {
                color: #007bff;
                text-decoration: underline;
                word-break: break-all;
            }

            .footer {
                margin-top: 40px;
                color: #777;
                font-size: 0.9em;
            }

            @font-face {
                font-family: SI;
                src: url('https://fonts.googleapis.com/css2?family=Special+Elite&display=swap');
            }
        </style>
    </head>
    <body style="font-family: 'Google Sans', Roboto, Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh;">
        <div class="email-container" style="background-color: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); width: 90%; max-width: 600px; text-align: center;">
            <h1 style="color: #AF231C; margin-bottom: 20px; font-family: 'SI', sans-serif;">Confirm Your Email</h1>
            <p style="color: #333; line-height: 1.6; margin-bottom: 30px;">To finalize your entry and receive your unique giveaway number, please confirm your email address by clicking the button below:</p>
            <a href="[Verification Link]" class="verify-button" style="display: inline-block; background-color: #AF231C; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; transition: background-color 0.3s;">Verify Email</a>
            <p style="color: #333; line-height: 1.6; margin-bottom: 30px;">If you did not enter the giveaway, please disregard this email.</p>
        </div>
    </body>
    </html>`;

    private static htmlEmailEntryNumberWinner:string = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Congratulations! You've Won!</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <style type="text/css">
        body {
            font-family: 'Google Sans', Roboto, Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }

        .email-container {
            background-color: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            width: 90%;
            max-width: 600px;
            text-align: center;
        }

        h1 {
            color: #AF231C;
            margin-bottom: 20px;
            font-family: 'SI', sans-serif;
        }

        p {
            color: #333;
            line-height: 1.6;
            margin-bottom: 20px; /* Adjusted margin */
        }

        .action-button { /* Renamed from verify-button */
            display: inline-block;
            background-color: #AF231C;
            color: white !important; /* Ensured text color is white */
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            transition: background-color 0.3s;
            margin-top: 10px; /* Added margin */
            margin-bottom: 20px; /* Added margin */
        }

        .action-button:hover {
            background-color: #c94740;
        }

        .link-text {
            color: #007bff;
            text-decoration: underline;
            word-break: break-all;
        }

        .footer {
            margin-top: 40px;
            color: #777;
            font-size: 0.9em;
        }

        @font-face {
            font-family: SI; /* Ensure this font is web safe or properly linked if it's custom */
            /* Consider a fallback font if SI is not universally available or if the src URL is an issue */
            src: url('https://fonts.googleapis.com/css2?family=Special+Elite&display=swap');
        }
    </style>
</head>
<body style="font-family: 'Google Sans', Roboto, Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh;">
    <div class="email-container" style="background-color: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); width: 90%; max-width: 600px; text-align: center;">
        <h1 style="color: #AF231C; margin-bottom: 20px; font-family: 'SI', sans-serif;">🎉 Congratulations, Winner! 🎉</h1>
        <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">Amazing news! Your entry has been selected, and you are a winner in the giveaway! We're so excited for you.</p>
        <p style="color: #333; line-height: 1.6; margin-bottom: 10px;">You've won: <strong>[Giveaway]</strong>!</p>
        <p style="color: #333; line-height: 1.6; margin-bottom: 30px;">To claim your prize, please click the button below or follow this link:</p>

        <div class="footer" style="margin-top: 40px; color: #777; font-size: 0.9em;">
            <p>Thank you for participating!</p>
            </div>
    </div>
</body>
</html>`;

    static async sendEmailConfirmation(emailOptions: EmailOptions): Promise<void> {
        try {
            console.log('email: ', process.env.NODEMAILER_AUTH_PASS);
            await this.transporter.sendMail({
                from: process.env.NODEMAILER_AUTH_USER,
                to: emailOptions.entryemail,
                subject: `Action Required: Confirm Your Email For giveaway ID: [${emailOptions.giveawayid}]`,
                html: this.htmlEmailConfirmation.replace('[Verification Link]', `http://${process.env.URL}/${emailOptions.giveawayid}/${emailOptions.giveawaytitle}/confirm/verifygiveaway?id=${emailOptions.verificationToken}`),
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error);
                // await Error_Log.insertErrorLog(
                //     Global.getMetaData(),
                //     error.stack || error.message
                // );
            }
        }
    }

    static async sendEmailentryNumber(emailOptions: EmailOptions): Promise<void> {
        try {
            await this.transporter.sendMail({
                from: process.env.NODEMAILER_AUTH_USER,
                to: emailOptions.entryemail,
                subject: `Here is Your entry Number Copy For Giveaway ID: [${emailOptions.giveawayid}]`,
                html: this.htmlEmailentryNumber.replace('[entryNumber]', `${emailOptions.entryNumber}`),
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                // await Error_Log.insertErrorLog(
                //     Global.getMetaData(),
                //     error.stack || error.message
                // );
            }
        }
    }

    static async sendEmailEntryNumberWinner(emailOptions: EmailOptions): Promise<void> {
        try {
            await this.transporter.sendMail({
                from: process.env.NODEMAILER_AUTH_USER,
                to: emailOptions.entryemail,
                subject: `Congratulations! You've Won! For Giveaway ID: [${emailOptions.giveawayid}]`,
                html: this.htmlEmailEntryNumberWinner.replace('[entryNumber]', `${emailOptions.entryNumber}`),
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                // await Error_Log.insertErrorLog(
                //     Global.getMetaData(),
                //     error.stack || error.message
                // );
            }
        }
    }    
}