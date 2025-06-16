import nodemailer from 'nodemailer';
import { confirmationTemplate } from './email-templates/confirmation.js';
import { entryNumberTemplate } from './email-templates/entry-number.js';
import { winnerTemplate } from './email-templates/winner.js';

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

    static async sendEmailConfirmation(emailOptions: EmailOptions): Promise<void> {
        try {
            const verificationLink = `https://${process.env.URL}/${emailOptions.giveawayid}/${emailOptions.giveawaytitle}/confirm/verifygiveaway?id=${emailOptions.verificationToken}`;
            
            await this.transporter.sendMail({
                from: process.env.NODEMAILER_AUTH_USER,
                to: emailOptions.entryemail,
                subject: `Action Required: Confirm Your Email For giveaway ID: [${emailOptions.giveawayid}]`,
                html: confirmationTemplate(verificationLink),
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error sending confirmation email:', error);
                throw error;
            }
        }
    }

    static async sendEmailentryNumber(emailOptions: EmailOptions): Promise<void> {
        try {
            if (!emailOptions.entryNumber) {
                throw new Error('Entry number is required for sending entry number email');
            }

            await this.transporter.sendMail({
                from: process.env.NODEMAILER_AUTH_USER,
                to: emailOptions.entryemail,
                subject: `Here is Your Entry Number For Giveaway ID: [${emailOptions.giveawayid}]`,
                html: entryNumberTemplate(emailOptions.entryNumber),
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error sending entry number email:', error);
                throw error;
            }
        }
    }

    static async sendEmailEntryNumberWinner(emailOptions: EmailOptions): Promise<void> {
        try {
            if (!emailOptions.giveawaytitle) {
                throw new Error('Giveaway title is required for sending winner notification');
            }

            await this.transporter.sendMail({
                from: process.env.NODEMAILER_AUTH_USER,
                to: emailOptions.entryemail,
                subject: `Congratulations! You've Won! For Giveaway ID: [${emailOptions.giveawayid}]`,
                html: winnerTemplate(emailOptions.giveawaytitle),
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error sending winner notification email:', error);
                throw error;
            }
        }
    }
}