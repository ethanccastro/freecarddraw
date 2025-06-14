import { EntityManager, EntityRepository } from "@mikro-orm/mysql";
import { GiftcardGiveaway_V } from "../../entities/giftcardgiveaway_v.entity.js";
import { Entry } from "../../entities/entry.entity.js";
import { EntryUserToken } from "../../entities/entryusertoken.entity.js";
import GiveawayEmail from "../utils/giveawayemail.js"
import Global from "../utils/global.js"
import  ErrorHandler from "../utils/errorhandler.utilsService.js"

export default class GiveawayRouteService {

private readonly em: EntityManager;
private readonly GiftcardGiveaway_VRepository: EntityRepository<GiftcardGiveaway_V>;
private readonly entryRepository: EntityRepository<Entry>;
private readonly entryUserTokenRepository: EntityRepository<EntryUserToken>;

    constructor(
        ormem: EntityManager,
        GiftcardGiveaway_VRepo: EntityRepository<GiftcardGiveaway_V>,
        entryRepo: EntityRepository<Entry>,
        entryUserTokenRepo: EntityRepository<EntryUserToken>
    ) {
        this.em = ormem;
        this.GiftcardGiveaway_VRepository = GiftcardGiveaway_VRepo;
        this.entryRepository = entryRepo;
        this.entryUserTokenRepository = entryUserTokenRepo;
    }

    async getGiveawayByID(giveawayID: string): Promise<GiftcardGiveaway_V | null> {
        try {
            const giftcardGiveaway_VRow = await this.GiftcardGiveaway_VRepository.findOne( {
                giftcardgiveaway_v_ID: giveawayID
            } );
    
            if (!giftcardGiveaway_VRow) {
                throw new ErrorHandler.NotFoundError(GiftcardGiveaway_V.name, giveawayID)
            }

            // If the giveaway is closed and has a winning number, get the winner's entry
            if (new Date() > new Date(giftcardGiveaway_VRow.giftcardgiveaway_v_giveawayenddate) && 
                giftcardGiveaway_VRow.giftcardgiveaway_v_giveawaynumber) {
                const winnerEntry = await this.entryRepository.findOne({
                    giftcardgiveaway_v: giftcardGiveaway_VRow,
                    entry_giveawaynumber: giftcardGiveaway_VRow.giftcardgiveaway_v_giveawaynumber
                });
                if (winnerEntry) {
                    // Add the winner's username to the giveaway row
                    (giftcardGiveaway_VRow as any).winner_username = winnerEntry.entry_name;
                }
            }
    
            return giftcardGiveaway_VRow;
        }
        catch (error) {
            throw error;
        }
    }

    async getEntryUserTokenByUUID(entryUserTokenUUID: string): Promise<EntryUserToken | null> {
        try {
            const entryUserTokenRow =  await this.entryUserTokenRepository.findOne( {
                uuid: entryUserTokenUUID
            } );
    
            if (!entryUserTokenRow) {
                throw new ErrorHandler.NotFoundError(EntryUserToken.name, entryUserTokenUUID);
            }
    
            return entryUserTokenRow;
        }
        catch (error) {
            throw error;
        }
    }

    async isEntryEmailUnique(giveawayID: string, entryemail: string): Promise<Boolean> {
        try {
            const giftcardGiveaway_VRow = await this.GiftcardGiveaway_VRepository.findOne( {
                giftcardgiveaway_v_ID: giveawayID
            } );
        
            if (!giftcardGiveaway_VRow) {
                throw new ErrorHandler.NotFoundError(GiftcardGiveaway_V.name, giveawayID)
            }
            
            const entryRow = await this.entryRepository.findOne( {
                giftcardgiveaway_v: giftcardGiveaway_VRow, 
                entry_email: entryemail
            } );
    
            if (entryRow) {
                return false;
            }
    
            return true;
        }
        catch (error) {
            throw error;
        }
    }

    async enterGiveaway(giveawayID: string, entryemail: string, entryname: string): Promise<string> {
        try {
            const entryUserTokenUUID: string = Global.getUUID();
            let result: any;
    
            const giftcardGiveaway_VRow = await this.GiftcardGiveaway_VRepository.findOne( {
                giftcardgiveaway_v_ID: giveawayID
            } );
            
            if (!giftcardGiveaway_VRow) {
                throw new ErrorHandler.NotFoundError(GiftcardGiveaway_V.name, giveawayID);
            }
            
            const entryRow = new Entry(
                Global.getCurrentTime(),
                entryemail,
                entryname,
                giftcardGiveaway_VRow
            );
    
            const entryUserTokenRow = new EntryUserToken(
                giftcardGiveaway_VRow.giftcardgiveaway_v_giveawayuuid,
                entryemail
            );
            entryUserTokenRow.uuid = entryUserTokenUUID;
    
            await this.em.persistAndFlush([
                entryRow, 
                entryUserTokenRow
            ]);
    
            GiveawayEmail.sendEmailConfirmation({
                giveawayid: giftcardGiveaway_VRow.giftcardgiveaway_v_ID,
                entryusertokenuuid: entryUserTokenRow.uuid,
                giveawaytitle: giftcardGiveaway_VRow.giftcardgiveaway_v_LINKTITLE,
                entryemail: entryemail,
                verificationToken: Global.setVerificationToken(entryUserTokenUUID)            
            });
    
            return entryUserTokenUUID;
        }
        catch (error) {
            throw error;
        }
    }   

    async getEntryNumber(jsonWebToken: string) {
        let entryUserTokenRow: EntryUserToken | null;
        let giftcardgiveaway_vRow: GiftcardGiveaway_V | null;
        let entryRow: Entry | null;
        let entryNumber: number;
        let sql: string;
        let params: string[];
        let rawResult: any[] = [];        
        
        try {

            const entryUserTokenUUID = Global.getVerificationToken(jsonWebToken).uuid;

            entryUserTokenRow = await this.entryUserTokenRepository.findOne( {
                uuid: entryUserTokenUUID
            } );
            
            if (!entryUserTokenRow) {
                throw new ErrorHandler.NotFoundError(EntryUserToken.name, entryUserTokenUUID)
            }    
    
            giftcardgiveaway_vRow = await this.GiftcardGiveaway_VRepository.findOne( {
                giftcardgiveaway_v_giveawayuuid: entryUserTokenRow.entryusertoken_giveawayuuid
            } );
            
            if (!giftcardgiveaway_vRow) {
                throw new ErrorHandler.NotFoundError(GiftcardGiveaway_V.name, entryUserTokenRow.entryusertoken_giveawayuuid)
            }
    
            entryRow = await this.entryRepository.findOne( {
                entry_email: entryUserTokenRow.entryusertoken_entryemail,
                giftcardgiveaway_v: giftcardgiveaway_vRow
            } );
    
            if (!entryRow) {
                throw new ErrorHandler.NotFoundError(Entry.name, entryUserTokenRow.entryusertoken_entryemail)
            }
    
            sql = `
                CALL GetEntryGiveawayNumber(?)                 
            `
            params = [giftcardgiveaway_vRow.giftcardgiveaway_v_giveawayuuid];
            while (!rawResult || rawResult.length == 0) {
                rawResult = await this.em.execute(sql, params, "all");
            }
            entryNumber = rawResult[0][0].entry_giveawaynumber;
    
            entryRow.entry_giveawaynumber = entryNumber;
            this.em.remove(entryUserTokenRow);
    
            this.em.flush();
        
            GiveawayEmail.sendEmailentryNumber({
                giveawayid: giftcardgiveaway_vRow.giftcardgiveaway_v_ID,
                entryemail: entryRow.entry_email,
                entryNumber: entryRow.entry_giveawaynumber
            });
        
            return entryNumber;
        }
        catch (error) {
            throw error;
        }
    }

    async getEmailPageMessage(isConfirmation: boolean, entryNumber?: number) {
        try {
            let subject: string;
            let body: string;
    
            if (isConfirmation) {
                subject = `Entry Confirmed`;
                body = `
                        <p>Thank you for confirming your email address. You are now entered into the giveaway!</p>
                        <p>Your entry number is: <strong>${entryNumber}</strong>. Please keep this number safe.</p>
                        <p>We have also sent your entry number to your email address. Please check your inbox.</p>
                        <p>Periodically check our website for the winning number. Good luck!</p>     
                `
            }
            else {
                subject = `Giveaway Entered`;
                body = `
                        <h2>You're Almost In!</h2>
                        <p>Thank you for entering the giveaway! To complete your entry and receive your assigned number, please confirm your email address.</p>
                        <p>We've sent a confirmation email to the address you provided. Please check your inbox (and spam folder) and click the confirmation link.</p>
                        <p>Once confirmed, you'll be officially entered and assigned a unique giveaway number.</p>
                        <p>Good luck!</p>            
                `            
            }
    
            return {
                subject: subject,
                body: body
            }

        }
        catch (error) {
            throw error;
        }
    }
}