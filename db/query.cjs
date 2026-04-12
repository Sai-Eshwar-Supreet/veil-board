const pool = require('./pool.cjs');

async function query(text, params = []) {
    try {
        return await pool.query(text, params);
    } catch (err) {
        console.error('DB ERROR:', err.message);
        console.error('QUERY:', text);
        console.error('PARAMS:', params);
        throw err;
    }
}

module.exports = query;