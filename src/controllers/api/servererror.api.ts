import express, { Router } from "express";
import ServererrorApiService from '../../services/api/servererror.apiService.js'

export async function registerServererrorApi(): Promise<void> {

    const router: Router = express.Router();    
    router.get('/', async function (
        req: express.Request, 
        res: express.Response , 
        next: express.NextFunction) {
            
            try {
                // res.render("index", IndexRouteService.getOpenedGiveaways());
            } catch (error) {
                next(error);
            }
        });
}
