import { initORM, Services } from "../../server-init.js";
import express from "express";

export default class ServererrorApiService {

    static async errorHandler(err: express.ErrorRequestHandler): Promise<void> {

        // const db: Services  = await initORM();    
        // const sql: string =         
        // `
        //     INSERT INTO
        //         *
        //     FROM 
        //         view_Giftcardgiveaway
        //         JOIN Entry
        //             ON Entry.giveaway_rowguid = view_Giftcardgiveaway.rowguid
        //     WHERE
        //         1 = 1
        //         AND Entry.number = view_Giftcardaway.number
        // `;
        // const view_giftcardgiveaways: Record<string, any>[] = await db.em.execute(sql);

        // await db.error_log.
        // const view_giftcardgiveaways: Record<string, any>[]= await db.view_giftcardgiveaway.createQueryBuilder()
        // .select('*')
        // .where( {number: null} )
        // .execute();
    
        console.log(err)
    }
}