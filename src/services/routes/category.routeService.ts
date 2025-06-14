import { EntityRepository } from "@mikro-orm/mysql";
import { GiftcardGiveaway_V } from "../../entities/giftcardgiveaway_v.entity.js";
import ErrorHandler from "../utils/errorhandler.utilsService.js";

export default class CategoryRouteService {
    private readonly GiftcardGiveaway_VRepository: EntityRepository<GiftcardGiveaway_V>;

    constructor(GiftcardGiveaway_VRepo: EntityRepository<GiftcardGiveaway_V>) {
        this.GiftcardGiveaway_VRepository = GiftcardGiveaway_VRepo;
    }

    async getRecentGiveawaysByType(type: string): Promise<GiftcardGiveaway_V[]> {
        try {
            const sql = `
                SELECT *
                FROM giftcardgiveaway_v
                WHERE giftcardgiveaway_v_giftcardtype = ?
                AND giftcardgiveaway_v_giveawayenddate > NOW()
                ORDER BY giftcardgiveaway_v_giveawaybegindate DESC
            `;
            
            const result = await this.GiftcardGiveaway_VRepository.getEntityManager().execute(sql, [type]);
            return result as GiftcardGiveaway_V[];
        } catch (error) {
            throw error;
        }
    }

    async getClosedGiveawaysByType(type: string): Promise<GiftcardGiveaway_V[]> {
        try {
            const sql = `
                SELECT *
                FROM giftcardgiveaway_v
                WHERE giftcardgiveaway_v_giftcardtype = ?
                AND giftcardgiveaway_v_giveawayenddate <= NOW()
                ORDER BY giftcardgiveaway_v_giveawayenddate DESC
            `;
            
            const result = await this.GiftcardGiveaway_VRepository.getEntityManager().execute(sql, [type]);
            return result as GiftcardGiveaway_V[];
        } catch (error) {
            throw error;
        }
    }

    async validateCategoryType(type: string): Promise<boolean> {
        try {
            const sql = `
                SELECT COUNT(*) as count
                FROM giftcardgiveaway_v
                WHERE giftcardgiveaway_v_giftcardtype = ?
            `;
            
            const result = await this.GiftcardGiveaway_VRepository.getEntityManager().execute(sql, [type]);
            return (result[0] as { count: number }).count > 0;
        } catch (error) {
            throw error;
        }
    }
} 