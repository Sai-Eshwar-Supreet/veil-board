const buildQueries = require('../../lib/db/buildQueries.cjs');
const pool = require('../pool.cjs');

const queries = buildQueries(__dirname, 'getUserById', 'getUserByUsername', 'createUser');

async function getUserById(id){
    const {rows} = await pool.query(queries.getUserById, [id]);
    return rows[0];
}
async function getUserByUsername(username){
    const {rows} = await pool.query(queries.getUserByUsername, [username]);
    return rows[0];
}

module.exports.getUserById = getUserById;
module.exports.getUserByUsername = getUserByUsername;