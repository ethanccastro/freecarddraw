// static.route.ts

import express, { Request, Response, NextFunction } from 'express';
import { StaticRouteService } from '../../services/routes/static.routeService.js';

export function registerStaticRouter(staticRouteService: StaticRouteService) {
    const router = express.Router();

    // Generic route handler for static pages
    router.get('/:page', async function (
        req: Request, 
        res: Response, 
        next: NextFunction) {
        try {
            const page = req.params.page;
            let pageData;

            // Route to appropriate service method based on page parameter
            switch (page) {
                case 'about':
                    pageData = staticRouteService.getAboutUsData();
                    break;
                case 'contact':
                    pageData = staticRouteService.getContactUsData();
                    break;
                case 'terms':
                    pageData = staticRouteService.getTermsAndConditionsData();
                    break;
                case 'sitemap':
                    pageData = staticRouteService.getSitemapData();
                    break;
                default:
                    // If page doesn't match any of our static pages, pass to next middleware
                    return next();
            }

            res.render("static", { 
                pageData: pageData
            });
        } catch (error) {
            next(error);
        }
    });

    return router;
} 