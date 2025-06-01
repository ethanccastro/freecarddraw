import { Options, MySqlDriver} from '@mikro-orm/mysql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { EntityCaseNamingStrategy } from '@mikro-orm/core';

const config: Options = {
    driver: MySqlDriver,
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    metadataProvider: TsMorphMetadataProvider,
    debug: true,
    dbName: 'test',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Kilanator1!',
    namingStrategy: EntityCaseNamingStrategy
};

export default config;