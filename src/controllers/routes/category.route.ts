import { Router, Request, Response } from 'express';
import CategoryRouteService from '../../services/routes/category.routeService.js';

export function registerCategoryRouter(categoryRouteService: CategoryRouteService) {
    const router = Router();

    // Recent giveaways for a specific category
    router.get('/category/:type', async (req: Request, res: Response) => {
        try {
            const { type } = req.params;
            
            // Validate if the category type exists
            const isValidCategory = await categoryRouteService.validateCategoryType(type);
            if (!isValidCategory) {
                return res.status(404).render('error', {
                    message: `Category "${type}" not found`,
                    activeTab: 'recent'
                });
            }

            const giveaways = await categoryRouteService.getRecentGiveawaysByType(type);
            
            res.render('category', {
                categoryType: type,
                giftcardGiveaway_vRows: giveaways,
                activeTab: 'recent',
                status: 'open'
            });
        } catch (error) {
            console.error('Error in category route:', error);
            res.status(500).render('error', {
                message: 'An error occurred while fetching category giveaways',
                activeTab: 'recent'
            });
        }
    });

    // Closed giveaways for a specific category
    router.get('/category/:type/closed', async (req: Request, res: Response) => {
        try {
            const { type } = req.params;
            
            // Validate if the category type exists
            const isValidCategory = await categoryRouteService.validateCategoryType(type);
            if (!isValidCategory) {
                return res.status(404).render('error', {
                    message: `Category "${type}" not found`,
                    activeTab: 'closed'
                });
            }

            const giveaways = await categoryRouteService.getClosedGiveawaysByType(type);
            
            res.render('category', {
                categoryType: type,
                giftcardGiveaway_vRows: giveaways,
                activeTab: 'closed',
                status: 'closed'
            });
        } catch (error) {
            console.error('Error in category closed route:', error);
            res.status(500).render('error', {
                message: 'An error occurred while fetching closed category giveaways',
                activeTab: 'closed'
            });
        }
    });

    return router;
} 