import { EntityRepository } from "@mikro-orm/mysql";
import { GiftcardGiveaway_V } from "../../entities/giftcardgiveaway_v.entity.js";

export default class PartialsService {
    private readonly GiftcardGiveaway_VRepository: EntityRepository<GiftcardGiveaway_V>;

    constructor(GiftcardGiveaway_VRepo: EntityRepository<GiftcardGiveaway_V>) {
        this.GiftcardGiveaway_VRepository = GiftcardGiveaway_VRepo;
    }

    async getUniqueGiftcardTypes(): Promise<{ type: string; value: number }[]> {
        try {
            const sql = `
                SELECT DISTINCT 
                    giftcardgiveaway_v_giftcardtype as type,
                    MAX(CAST(giftcardgiveaway_v_giftcardvalue AS SIGNED)) as value
                FROM giftcardgiveaway_v
                WHERE giftcardgiveaway_v_giveawayenddate > NOW()
                GROUP BY giftcardgiveaway_v_giftcardtype
                ORDER BY type ASC
            `;
            
            const result = await this.GiftcardGiveaway_VRepository.getEntityManager().execute(sql);
            return result as { type: string; value: number }[];
        } catch (error) {
            throw error;
        }
    }
} 