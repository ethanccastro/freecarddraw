import { EntityManager } from "@mikro-orm/mysql";
import { ServiceTrigger } from "../entities/servicetrigger.entity.js";
import { Entry } from "../entities/entry.entity.js";
import { GiftcardGiveaway_V } from "../entities/giftcardgiveaway_v.entity.js";
import ErrorHandler from "./utils/errorhandler.utilsService.js";
import { giveawayEndEventService } from "./events/giveawayend.eventService.js";
import GiveawayEmail from "./utils/giveawayemail.js"

const THIRTYSECONDS: number = 30000;

export default class ServiceTriggerService {
    private readonly em: EntityManager;
    private static instance: ServiceTriggerService;    
    private intervalId: NodeJS.Timeout | null = null;

    constructor(
        ormem: EntityManager
    ) {
        if (ServiceTriggerService.instance) {
            throw new Error("Only one instance can be called!")
        }
        this.em = ormem;
        ServiceTriggerService.instance = this;
    }
    
    async run(): Promise<void>  {        
        try {
            const em = ServiceTriggerService.instance.em.fork();
            const serviceTriggerRepository = em.getRepository(ServiceTrigger);
            const giftcardGiveaway_vRepository = em.getRepository(GiftcardGiveaway_V);
            const entryRepository = em.getRepository(Entry);  

            this.intervalId = setInterval(async () => {
                try {
                    await giveawayEndEventService(
                        em, 
                        giftcardGiveaway_vRepository, 
                        entryRepository,
                        serviceTriggerRepository
                    );
                } catch (error) {
                    console.log(error);
                }
            }, THIRTYSECONDS);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // For testing purposes
    getIntervalId(): NodeJS.Timeout | null {
        return this.intervalId;
    }
}