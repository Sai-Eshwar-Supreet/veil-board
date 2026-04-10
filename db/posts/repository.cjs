const buildQueries = require('../../lib/db/buildQueries.cjs');
const pool = require('../pool.cjs');

const queries = buildQueries(__dirname, 'getAll', 'getByPostId', 'getByUser');

async function getAll(){
    const {rows} = await pool.query(queries.getAll);
    return rows;
}

async function getByPostId(postId){
    const {rows} = await pool.query(queries.getByPostId, [postId]);
    return rows[0];
}

async function getByUser(userId){
    const {rows} = await pool.query(queries.getByUser, [userId]);
    return rows;
}

module.exports.getAll = getAll;
module.exports.getByPostId = getByPostId;
module.exports.getByUser = getByUser;