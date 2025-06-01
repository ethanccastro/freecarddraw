import express, { Request, Response, NextFunction } from 'express';
import ProfanityApiService from '../../services/api/profanity.apiService.js'
const router = express.Router();

export function registerProfanityApi(
    profanityApiService: ProfanityApiService
) {
    router.post('/', async function (
        req: Request, 
        res: Response, 
        next: NextFunction) {
        try {
            if (await profanityApiService.isUsernameProfanity(req.body.username)) {
                res.status(200).send({message : true});
            }
            else {
                res.status(200).send({message : false});
            }
        } catch (error) {
            next(error);
        }
    });    

    return router;
}

