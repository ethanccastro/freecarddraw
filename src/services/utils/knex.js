const config = require('../../config/config');


const knex = require('knex')( {
    client: 'mysql2',
    version: '8.0',
    connection: {
        host: config.mySqlHost,
        port: config.mySqlPort,
        user: config.mySqlUser,
        password: config.mySqlPassword,
        database: config.mySqlDatabase,
        namedPlaceholders: true,        
    }
});

module.exports = knex;