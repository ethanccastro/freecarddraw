// index.routeservice.ts

import { EntityRepository } from "@mikro-orm/mysql";
import { GiftcardGiveaway_V } from "../../entities/giftcardgiveaway_v.entity.js";

export default class IndexRouteService {

    private readonly GiftcardGiveaway_VRepository: EntityRepository<GiftcardGiveaway_V>;

    constructor(GiftcardGiveaway_VRepo: EntityRepository<GiftcardGiveaway_V>) {
        this.GiftcardGiveaway_VRepository = GiftcardGiveaway_VRepo;
    }

    async getUniqueGiftcardCategories(): Promise<{ type: string; value: number }[]> {
        try {
            const sql = `
                SELECT DISTINCT 
                    giftcardgiveaway_v_giftcardtype as type,
                    MAX(CAST(giftcardgiveaway_v_giftcardvalue AS SIGNED)) as value
                FROM 
                    giftcardgiveaway_v
                WHERE
                    1 = 1 
                    AND giftcardgiveaway_v_giveawayenddate > NOW()
                GROUP BY 
                    giftcardgiveaway_v_giftcardtype
                ORDER BY 
                    type ASC
            `;
            
            const result = await this.GiftcardGiveaway_VRepository.getEntityManager().execute(sql);
            return result as { type: string; value: number }[];
        } catch (error) {
            throw error;
        }
    }

    async getRecentActiveGiveaways(): Promise<GiftcardGiveaway_V[]> {
        try {
            const sql = `
                SELECT 
                    *
                FROM 
                    giftcardgiveaway_v
                WHERE
                    1 = 1 
                    AND giftcardgiveaway_v_giveawayenddate > NOW()
                ORDER BY 
                    giftcardgiveaway_v_giveawaybegindate DESC
                LIMIT 10
            `;
            
            const result = await this.GiftcardGiveaway_VRepository.getEntityManager().execute(sql);
            return result as GiftcardGiveaway_V[];
        } catch (error) {
            throw error;
        }
    }

    // NEW METHOD TO GET CLOSED CATEGORIES
    async getUniqueClosedGiftcardCategories(): Promise<{ type: string; value: number }[]> {
        try {
            const sql = `
                SELECT DISTINCT 
                    giftcardgiveaway_v_giftcardtype as type,
                    MAX(CAST(giftcardgiveaway_v_giftcardvalue AS SIGNED)) as value
                FROM 
                    giftcardgiveaway_v
                WHERE
                    1 = 1 
                    AND giftcardgiveaway_v_giveawayenddate <= NOW()
                GROUP BY 
                    giftcardgiveaway_v_giftcardtype
                ORDER BY 
                    type ASC
            `;
            
            const result = await this.GiftcardGiveaway_VRepository.getEntityManager().execute(sql);
            return result as { type: string; value: number }[];
        } catch (error) {
            throw error;
        }
    }

    async getGiveawaysByType(type: string): Promise<GiftcardGiveaway_V[]> {
        try {
            const giftcardGiveaway_vRows = await this.GiftcardGiveaway_VRepository.createQueryBuilder(
                'GiftcardGiveaway_V'
            )
            .select('*')
            .where({
                $and: [
                    { 'GiftcardGiveaway_V.giftcardgiveaway_v_giveawayenddate': { $gt: new Date() } },
                    { 'GiftcardGiveaway_V.giftcardgiveaway_v_giftcardtype': type }
                ]
            }).getResultList();

            return giftcardGiveaway_vRows;
        } catch (error) {
            throw error;
        }
    }

    async getOpenedGiveaways(): Promise<GiftcardGiveaway_V[]> {
        const giftcardGiveaway_vRows = await this.GiftcardGiveaway_VRepository.createQueryBuilder(
            'GiftcardGiveaway_V'
        )
        .select('*')
        .where({
            'GiftcardGiveaway_V.giftcardgiveaway_v_giveawayenddate': { $gt: new Date() }
        }).getResultList();

        return giftcardGiveaway_vRows;
    }
    
    async getClosedGiveaways(): Promise<GiftcardGiveaway_V[]> {
        try {
            const sql = `
                SELECT 
                    *
                FROM 
                    giftcardgiveaway_v
                WHERE 
                    1 = 1
                    AND giftcardgiveaway_v_giveawayenddate <= NOW()
                ORDER BY 
                    giftcardgiveaway_v_giveawayenddate DESC
            `;
            
            const result = await this.GiftcardGiveaway_VRepository.getEntityManager().execute(sql);
            return result as GiftcardGiveaway_V[];
        } catch (error) {
            throw error;
        }
    }    
}