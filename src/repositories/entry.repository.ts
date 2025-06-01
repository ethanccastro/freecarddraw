import { EntityRepository } from "@mikro-orm/mysql";
import { Entry } from "../entities/entry.entity.js";

export class EntryRepository extends EntityRepository<Entry> {
    async getNewNumber(giveawayRowguid: string): Promise<number> {{
        let sqlCommand =
        `
            SELECT
                NUM
            FROM
            (
                SELECT
                    FLOOR(RAND() * (5000 - 1 + 1)) + 1 AS NUM
                FROM
                    entry
                WHERE
                    1 = 1
                    AND giveaway_rowguid = '${giveawayRowguid}'
            ) AS RANDNUM
            WHERE
                1 = 1
                AND NUM NOT IN
                (
                    SELECT
                        IFNULL(Number,0)
                    FROM
                        entry
                    WHERE
                        1 = 1
                        AND giveaway_rowguid = '${giveawayRowguid}'
                )              
        `
        const result = await this.em.execute(sqlCommand);
        
        return result[0].NUM;
    }}
}