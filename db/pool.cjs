const {Pool} = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
    connectionString: process.env.DB_CONNECTION_STRING,
    ssl: isProduction ? { rejectUnauthorized: false } : false
});

module.exports = pool;