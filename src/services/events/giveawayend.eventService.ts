import { EntityManager, EntityRepository } from "@mikro-orm/mysql";
import { Giveaway } from "../../entities/giveaway.entity.js";
import { Entry } from "../../entities/entry.entity.js";
import { EntryUserToken } from "../../entities/entryusertoken.entity.js";
import ErrorHandler from "../utils/errorhandler.utilsService.js";
import GiveawayEmail from "../utils/giveawayemail.js";
import { GiftcardGiveaway_V } from "../../entities/giftcardgiveaway_v.entity.js";
import { ServiceTrigger } from "../../entities/servicetrigger.entity.js";

const THIRTYSECONDS: string = "38c5a182-0dcb-4ce8-ac55-b8c2adb26910";

export async function giveawayEndEventService(
    em: EntityManager, 
    giftcardGiveaway_VRepository: EntityRepository<GiftcardGiveaway_V>,
    entryRepository: EntityRepository<Entry>,
    serviceTriggerRepository: EntityRepository<ServiceTrigger>) {

    let sql: string;
    let params: string[] = [];

    sql = 
    `
        CALL GetEntryWinners();    
    `;       
    const result = await em.execute(sql, params, "all");    
    if (!result || result[0].length == 0) {
        return;
    }    

    const entryRows = result[0] as (Entry & { entry_giveawayuuid: string })[];
    
    const giveawayUUIDList = entryRows
        .map((entryRow) => entryRow.entry_giveawayuuid);

    let giftcardGiveaway_VMap = new Map<string, GiftcardGiveaway_V>();

    if (giveawayUUIDList.length === 0) {
        return;
    }

    const giftcardGiveaway_VRows = await giftcardGiveaway_VRepository.find({
         giftcardgiveaway_v_giveawayuuid: { $in: giveawayUUIDList }
    });

    for (const giftcardGiveaway_VRow of giftcardGiveaway_VRows) {
        giftcardGiveaway_VMap.set(giftcardGiveaway_VRow.giftcardgiveaway_v_giveawayuuid, giftcardGiveaway_VRow);
    }

    for (const entryRow of entryRows) {
        let giftcardGiveaway_VRow =  giftcardGiveaway_VMap.get(entryRow.entry_giveawayuuid);
        if (giftcardGiveaway_VRow) {        
            GiveawayEmail.sendEmailEntryNumberWinner({
                giveawayid: giftcardGiveaway_VRow.giftcardgiveaway_v_ID,
                entryemail: entryRow.entry_email,
                giveawaytitle: giftcardGiveaway_VRow.giftcardgiveaway_v_TITLE,
                giveawaycode: giftcardGiveaway_VRow.giftcardgiveaway_v_giveawaycode,
                giveawaypin: giftcardGiveaway_VRow.giftcardgiveaway_v_giveawaypin,
            });
        }
    }

    const serviceTriggerRow = await serviceTriggerRepository.findOne({
        uuid: THIRTYSECONDS
    });
    if (!serviceTriggerRow) {
        throw new ErrorHandler.NotFoundError(ServiceTrigger.name, THIRTYSECONDS);
    }
    serviceTriggerRow.servicetrigger_lastexecutedtime = new Date();
    await em.flush();
}