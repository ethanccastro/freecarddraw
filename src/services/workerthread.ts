import { MikroORM } from '@mikro-orm/mysql';
import config from '../mikro-orm.config.js';
import ServiceTriggerService from "./servicetrigger.js"

async function initWorker() {
    const orm = await MikroORM.init(config);
    const serviceTriggerService = new ServiceTriggerService(orm.em);
    await serviceTriggerService.run();
}

initWorker().catch(error => {
    console.error('Worker initialization failed:', error);
    process.exit(1);
});
