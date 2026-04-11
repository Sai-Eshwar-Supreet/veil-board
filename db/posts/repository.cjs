const buildQueries = require('../../lib/db/buildQueries.cjs');
const pool = require('../pool.cjs');

const queries = buildQueries(__dirname, 
    'getAll', 
    'getByPostId', 
    'getByUser', 
    'createPost',
    'updatePost',
    'deletePost',
);

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

async function createPost(user_id, title, content){
    await pool.query(queries.createPost, [user_id, title, content]);
}

async function updatePost(postId, title, content, updatedAt){
    await pool.query(queries.updatePost, [postId, title, content, updatedAt]);
}

async function deletePost(postId){
    await pool.query(queries.deletePost, [postId]);
}

module.exports.getAll = getAll;
module.exports.getByPostId = getByPostId;
module.exports.getByUser = getByUser;
module.exports.createPost = createPost;
module.exports.updatePost = updatePost;
module.exports.deletePost = deletePost;