import express, { Request, Response, NextFunction } from 'express';
import IndexRouteService from '../../services/routes/index.routeService.js'

export function registerIndexRouter(indexRouteService: IndexRouteService) {
    const router = express.Router();

    router.get('/', async function (
        req: Request, 
        res: Response, 
        next: NextFunction) {            
        try {
            res.render("index", { 
                giftcardGiveaway_vRows: await indexRouteService.getOpenedGiveaways(),
                status: "open"
            });
        } catch (error) {
            next(error);
        }
        });
        
    router.get('/closed', async function (
        req: Request, 
        res: Response, 
        next: NextFunction) {
        
        try {
            res.render("index", { 
                giftcardGiveaway_vRows: await indexRouteService.getClosedGiveaways(),
                status: "closed" 
            }) ;
        } catch (error) {
            next(error);
        }
    });

    return router;
}