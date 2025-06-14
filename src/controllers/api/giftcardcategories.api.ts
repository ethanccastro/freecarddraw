import express, { Request, Response, NextFunction } from 'express';
import GiftcardCategoriesApiService from '../../services/api/giftcardcategories.apiService.js'

export function registerGiftcardCategoriesApi(
    giftcardCategoriesApiService: GiftcardCategoriesApiService
) {
    const router = express.Router();

    router.get('/', async function (
        req: Request, 
        res: Response, 
        next: NextFunction) {
        try {
            const categories = await giftcardCategoriesApiService.getUniqueGiftcardCategories();
            res.json(categories);
        } catch (error) {
            next(error);
        }
    });

    return router;
} 