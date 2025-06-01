import { EntityRepository } from "@mikro-orm/mysql";
import { GiftcardGiveaway_V } from "../../entities/giftcardgiveaway_v.entity.js";
import ErrorHandler from "../utils/errorhandler.utilsService.js";

export default class IndexRouteService {

    private readonly GiftcardGiveaway_VRepository: EntityRepository<GiftcardGiveaway_V>;

    constructor(GiftcardGiveaway_VRepo: EntityRepository<GiftcardGiveaway_V>) {
        this.GiftcardGiveaway_VRepository = GiftcardGiveaway_VRepo;
    }

    async getOpenedGiveaways(): Promise<GiftcardGiveaway_V[]> {

        const giftcardGiveaway_vRows =  await this.GiftcardGiveaway_VRepository.createQueryBuilder(
            'GiftcardGiveaway_V'
        )
        .select(
            '*'
        )
        .where({
            $and: [
                { 'GiftcardGiveaway_V.giftcardgiveaway_v_giveawayenddate': { $gt: new Date() } }
            ]
        });

        return giftcardGiveaway_vRows;
    }

    // TODO: create testing
    async getClosedGiveaways(): Promise<GiftcardGiveaway_V[]> {
        const giftcardGiveaway_vRows = await this.GiftcardGiveaway_VRepository.createQueryBuilder(
            'GiftcardGiveaway_V'
        )
        .joinAndSelect(
            'GiftcardGiveaway_V.entries', 'entry'
        )
        .where({
            $and: [
                { 'GiftcardGiveaway_V.giftcardgiveaway_v_giveawayenddate': { $lte: new Date() } }
            ]
        });

        console.log(giftcardGiveaway_vRows[0]);

        return giftcardGiveaway_vRows;
    }    
}