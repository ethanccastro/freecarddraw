const knex = require('knex')({
    client: 'mysql2',
    version: '8.0',
    connection: {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        namedPlaceholders: true,
    }
});

module.exports = knex;