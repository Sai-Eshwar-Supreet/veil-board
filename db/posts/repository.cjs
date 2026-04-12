const buildQueries = require('../../lib/db/buildQueries.cjs');
const query = require('../query.cjs');

const queries = buildQueries(__dirname, 
    'getAll', 
    'getByPostId', 
    'getByUser', 
    'createPost',
    'updatePost',
    'deletePost',
);

async function getAll(){
    const {rows} = await query(queries.getAll);
    return rows;
}

async function getByPostId(postId){
    const {rows} = await query(queries.getByPostId, [postId]);
    return rows[0];
}

async function getByUser(userId){
    const {rows} = await query(queries.getByUser, [userId]);
    return rows;
}

async function createPost(user_id, title, content){
    await query(queries.createPost, [user_id, title, content]);
}

async function updatePost(postId, title, content){
    await query(queries.updatePost, [postId, title, content]);
}

async function deletePost(postId){
    await query(queries.deletePost, [postId]);
}

module.exports.getAll = getAll;
module.exports.getByPostId = getByPostId;
module.exports.getByUser = getByUser;
module.exports.createPost = createPost;
module.exports.updatePost = updatePost;
module.exports.deletePost = deletePost;