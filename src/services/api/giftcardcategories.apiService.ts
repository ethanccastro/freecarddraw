import { EntityRepository } from "@mikro-orm/mysql";
import { GiftcardGiveaway_V } from "../../entities/giftcardgiveaway_v.entity.js";

export default class GiftcardCategoriesApiService {
    private readonly GiftcardGiveaway_VRepository: EntityRepository<GiftcardGiveaway_V>;

    constructor(GiftcardGiveaway_VRepo: EntityRepository<GiftcardGiveaway_V>) {
        this.GiftcardGiveaway_VRepository = GiftcardGiveaway_VRepo;
    }

    async getUniqueGiftcardCategories(): Promise<{ type: string; value: number }[]> {
        try {
            const sql = `
                SELECT DISTINCT 
                    giftcardgiveaway_v_giftcardtype as type,
                    giftcardgiveaway_v_giftcardvalue as value
                FROM giftcardgiveaway_v
                WHERE giftcardgiveaway_v_giveawayenddate > NOW()
                ORDER BY giftcardgiveaway_v_giftcardtype ASC
            `;
            
            const result = await this.GiftcardGiveaway_VRepository.getEntityManager().execute(sql);
            return result as { type: string; value: number }[];
        } catch (error) {
            throw error;
        }
    }
} 