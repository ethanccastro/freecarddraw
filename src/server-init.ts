import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { fileURLToPath } from 'url';
import { EntityManager, EntityRepository, MikroORM, Options } from '@mikro-orm/mysql';
import { RequestContext } from '@mikro-orm/core'
import { Entry } from './entities/entry.entity.js';
import { EntryUserToken } from './entities/entryusertoken.entity.js';
import { ErrorLog } from './entities/errorlog.entity.js';
import { Giftcard } from './entities/giftcard.entity.js';
import { Giveaway } from './entities/giveaway.entity.js';
import { GiftcardGiveaway_V } from './entities/giftcardgiveaway_v.entity.js';
import { ServiceTrigger } from './entities/servicetrigger.entity.js';
import ErrorHandler from "./services/utils/errorhandler.utilsService.js"
 
import { registerIndexRouter } from "./controllers/routes/index.route.js";
import { registerGiveawayRoute } from "./controllers/routes/giveaway.route.js";
import { registerProfanityApi } from "./controllers/api/profanity.api.js";

import IndexRouteService from "./services/routes/index.routeService.js";
import GiveawayRouteService from "./services/routes/giveaway.routeService.js";
import ProfanityApiService from "./services/api/profanity.apiService.js";


export interface Services {
    orm: MikroORM;
    em: EntityManager;
    entry: EntityRepository<Entry>;
    entryusertoken: EntityRepository<EntryUserToken>;
    errorlog: EntityRepository<ErrorLog>;
    giftcard: EntityRepository<Giftcard>;
    giveaway: EntityRepository<Giveaway>;
    giftcardGiveaway_v: EntityRepository<GiftcardGiveaway_V>;
    serviceTrigger: EntityRepository<ServiceTrigger>;
}

let cache: Services | undefined;
export function _test_resetORMCache() {
    cache = undefined;
}

export async function initMiddleware(app: express.Application): Promise<void> {
        app.use(express.static('public'));
        app.use(express.urlencoded( {extended: true, limit: '1mb'} ));
        app.use(express.json( {limit: '1mb'} ));
        app.set('view engine', 'ejs');

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename)
        app.set('views', path.join(__dirname, '../public/views'));

        // services
        const orm: Services  = await initORM();    
        const indexRouteService = new IndexRouteService(
            orm.giftcardGiveaway_v);

        const giveawayRouteService = new GiveawayRouteService(
            orm.em, 
            orm.giftcardGiveaway_v, 
            orm.entry, 
            orm.entryusertoken);

            
        const profanityApiService = new ProfanityApiService();
        
        
        app.use((req: Request, res: Response, next: NextFunction) => {
            RequestContext.create(orm.em, next);
        });
        
        // controller - routes
        app.use('/', registerIndexRouter(indexRouteService));
        app.use('/:giftcardgiveaway_v_ID/:giftcardgiveaway_v_TITLE', registerGiveawayRoute(giveawayRouteService));
        
        // controller - api
        app.use('/profanity', registerProfanityApi(profanityApiService));         

    }

export async function initORM(options?: Options): Promise<Services> {
    if (cache) {
        return cache;
    }

    const orm = await MikroORM.init(options);

    return cache = {
        orm,
        em: orm.em,
        entry: orm.em.getRepository(Entry),
        entryusertoken: orm.em.getRepository(EntryUserToken),
        errorlog: orm.em.getRepository(ErrorLog),
        giftcard: orm.em.getRepository(Giftcard),
        giveaway: orm.em.getRepository(Giveaway),
        giftcardGiveaway_v: orm.em.getRepository(GiftcardGiveaway_V),
        serviceTrigger: orm.em.getRepository(ServiceTrigger),
    }
}