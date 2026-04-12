const expressSession = require('express-session');
const SessionStore = require('connect-pg-simple')(expressSession);
const pool = require('../db/pool.cjs');
const { isProduction } = require('../models/globals.cjs');

const session = expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    cookie: {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'lax'
    },

    store: new SessionStore({
        pool,
        tableName: 'user_sessions',
        createTableIfMissing: true
    })
});

module.exports = session;

