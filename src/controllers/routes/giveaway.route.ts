import express, { Request, Response, NextFunction } from 'express';
import GiveawayRouteService from '../../services/routes/giveaway.routeService.js'
import { error } from 'console';
const router = express.Router({ mergeParams: true });

export function registerGiveawayRoute(
    giveawayRouteService: GiveawayRouteService
) {

    router.get('/', async function ( 
            req: express.Request, 
            res: express.Response , 
            next: express.NextFunction) {
        try {        
            res.render("giveaway", {giftcardGiveaway_vRow: await giveawayRouteService.getGiveawayByID(req.params.giftcardgiveaway_v_ID)});
        } catch (error) {
            next(error);
        }
    });


    router.post('/isemailentryunique', async function (
        req: Request, 
        res: Response, 
        next: NextFunction) {
            
            try {
                if (await giveawayRouteService.isEntryEmailUnique(req.params.giftcardgiveaway_v_ID, req.body.email)) {
                    res.status(200).send({messaage : true});
                }         
                else {
                    res.status(409).send({message : false});
                }
            } catch (error) {
                next(error);
            }
        });
        
    router.post('/entergiveaway', async function (
        req: Request, 
        res: Response, 
        next: NextFunction) {
        try {
            const entryUserTokenRowguid: string = await giveawayRouteService.enterGiveaway(req.params.giftcardgiveaway_v_ID, req.body.email, req.body.username)            
            res.status(200).send({
                message: 'Success',
                id: entryUserTokenRowguid
            });
        } catch (error) {
            next(error);
        }
    });

    router.get('/confirm/verifygiveaway', async function (
        req: Request, 
        res: Response, 
        next: NextFunction) {
        try {
            const id = req.query.id;
            if (typeof id !== 'string') {
                throw error("WHYYYYY");
            }
            const entryNumber: number = await giveawayRouteService.getEntryNumber(id);
            res.render("emailpage", {
                message: await giveawayRouteService.getEmailPageMessage(true, entryNumber)});
        } catch (error) {
            next(error);
        }
    });    

    router.get('/:entryUserTokenUUID', async function (
        req: express.Request, 
        res: express.Response , 
        next: express.NextFunction) {
        try {
            res.render("emailpage", {
                entryUserTokenRow: await giveawayRouteService.getEntryUserTokenByUUID(req.params.entryUserTokenUUID),
                message: await giveawayRouteService.getEmailPageMessage(false)});
        } catch (error) {
            next(error);
        }
    })

    return router;
}