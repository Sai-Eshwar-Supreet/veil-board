const { param, validationResult, matchedData, body } = require('express-validator');
const postDB = require('../db/posts/repository.cjs');
const permissions = require('../lib/utils/permissions.cjs');
const {isAuthenticated} = require('../lib/middlewares/authentication.cjs');
const { authorizePostCreation, authorizePostUpdate, authorizePostDeletion } = require('../lib/middlewares/authorization.cjs');
const { formatPost } = require('../posts/postFormatter.cjs');


const validatePostId = [
    param('id').toInt().isInt().withMessage('post id should be an integer')
];

const validatePostData = [
    body('title').trim()
    .notEmpty().withMessage('Title should not be empty').bail()
    .isLength({min: 5, max: 64}).withMessage('Title must be between 5 and 64 characters'),

    body('content').trim()
    .notEmpty().withMessage('Content should not be empty')
];

function renderCreate(res, data = {}) {
  return res.render('pages/posts/create', { ...data });
}

function renderEdit(res, data = {}) {
  return res.render('pages/posts/edit', { ...data });
}

async function extractPostData(req,res, next){
    try{
        const errors = validationResult(req);
    
        if(!errors.isEmpty()){
            return next(Object.assign(new Error('Invalid post ID'), {status : 400}));
        }
    
        const {id} = matchedData(req);

        const post = await postDB.getByPostId(id);

        if(!post){
            return next(Object.assign(new Error('Post not found'), { status: 404 }));
        } 

        req.currentPost = post;

        next();
    }
    catch(err){
        next(err);
    }
}

async function getPost(req, res, next){
    const post = formatPost(req.currentPost);
    const canEditPost = permissions.canUpdatePost(req.user, post.author);
    const canDeletePost = permissions.canDeletePost(req.user, post.author);
    res.render('pages/posts/details', 
        {
            post, 
            canEditPost, 
            canDeletePost
        });
}

function getCreateForm(req, res, next){
    renderCreate(res);
}

async function postCreateForm(req, res, next){
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return renderCreate(res, {
                errors: errors.array().map(err => err.msg),
                title: req.body.title,
                content: req.body.content,
            });
        }

        const {title, content} = matchedData(req, {locations: ['body']});

        await postDB.createPost(req.user.id, title, content);
        return res.redirect('/');
    }
    catch(err){
        next(err);
    }
}

async function getEditForm(req, res){
    renderEdit(res, {
        post: req.currentPost
    });
}

async function postEditForm(req, res, next){
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return renderEdit(res, {
                post: req.currentPost,
                errors: errors.array().map(e => e.msg)
            });
        }

        const {title, content} = matchedData(req, {locations: ['body']});

        await postDB.updatePost(req.currentPost.id, title, content);
        
        res.redirect(`/posts/${req.currentPost.id}/details`);
    }
    catch(err){
        next(err);
    }
}

async function postDelete(req, res, next){
    try{
        await postDB.deletePost(req.currentPost.id);
        res.redirect('/');
    }
    catch(err){
        next(err);
    }
}

module.exports.getPost = [isAuthenticated, validatePostId, extractPostData, getPost];
module.exports.getCreateForm = [isAuthenticated, authorizePostCreation, getCreateForm];
module.exports.postCreateForm = [isAuthenticated, authorizePostCreation, validatePostData, postCreateForm];
module.exports.getEditForm = [isAuthenticated, validatePostId, extractPostData, authorizePostUpdate, getEditForm];
module.exports.postEditForm = [isAuthenticated, validatePostId, extractPostData, authorizePostUpdate, validatePostData, postEditForm];
module.exports.postDelete = [isAuthenticated, validatePostId, extractPostData, authorizePostDeletion, postDelete];