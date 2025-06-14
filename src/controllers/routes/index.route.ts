// index.route.ts

import express, { Request, Response, NextFunction } from 'express';
import IndexRouteService from '../../services/routes/index.routeService.js'

export function registerIndexRouter(indexRouteService: IndexRouteService) {
    const router = express.Router();

    // Home page - shows most recent active giveaways
    router.get('/', async function (
        req: Request, 
        res: Response, 
        next: NextFunction) {            
        try {
            const giveaways = await indexRouteService.getRecentActiveGiveaways();
            res.render("index", { 
                giveaways: giveaways,
                activeTab: "recent"
            });
        } catch (error) {
            next(error);
        }
    });
        
    // Closed giveaways page
    router.get('/closed', async function (
        req: Request, 
        res: Response, 
        next: NextFunction) {
        try {
            const closedGiveaways = await indexRouteService.getClosedGiveaways();
            res.render("index", { 
                giveaways: closedGiveaways,
                activeTab: "closed"
            });
        } catch (error) {
            next(error);
        }
    });

    return router;
}