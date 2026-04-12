const buildQueries = require('../../lib/db/buildQueries.cjs');
const query = require('../query.cjs');

const queries = buildQueries(__dirname, 
    'getUserById', 
    'getUserByUsername', 
    'createUser',
    'assignRole',
);

async function getUserById(id){
    const {rows} = await query(queries.getUserById, [id]);
    return rows[0];
}
async function getUserByUsername(username){
    const {rows} = await query(queries.getUserByUsername, [username]);
    return rows[0];
}

async function createUser(username, passwordHash) {
    await query(queries.createUser, [username, passwordHash]);
}

async function assignRole(userId, roleName){
    await query(queries.assignRole, [userId, roleName]);
}

module.exports.getUserById = getUserById;
module.exports.getUserByUsername = getUserByUsername;
module.exports.createUser = createUser;
module.exports.assignRole = assignRole;