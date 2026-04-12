const {Pool} = require('pg');
const { isProduction } = require('../models/globals.cjs');

const pool = new Pool({
    connectionString: process.env.DB_CONNECTION_STRING,
    ssl: isProduction ? { rejectUnauthorized: false } : false
});

module.exports = pool;