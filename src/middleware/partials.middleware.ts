import { Request, Response, NextFunction } from 'express';
import PartialsService from '../services/partials/partials.service.js';

export function createPartialsMiddleware(partialsService: PartialsService) {
    return async function(req: Request, res: Response, next: NextFunction) {
        try {
            // Get the categories for the partials
            const categories = await partialsService.getUniqueGiftcardTypes();
            
            // Add to res.locals so it's available in all views
            res.locals.categories = categories;
            
            next();
        } catch (error) {
            next(error);
        }
    };
} 