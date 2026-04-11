const { param, validationResult, matchedData, body } = require('express-validator');
const postDB = require('../db/posts/repository.cjs');
const permissions = require('../lib/utils/permissions.cjs');
const {isAuthenticated} = require('../lib/middlewares/authentication.cjs');
const { authorizePostCreation, authorizePostUpdate, authorizePostDeletion } = require('../lib/middlewares/authorization.cjs');

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

async function extractPostData(req,res, next){
    try{
        const errors = validationResult(req);
    
        if(!errors.isEmpty()){
            return res.redirect('/');
        }
    
        const {id} = matchedData(req);

        const post = await postDB.getByPostId(id);

        if(post === undefined){
            const err = new Error('Invalid post id');
            err.status = 400;
            return next(err);
        } 

        req.currentPost = post;

        return next();
    }
    catch(err){
        next(err);
    }
}

async function getPost(req, res, next){
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.redirect('/');
        }

        const {id} = matchedData(req);

        const post = await postDB.getByPostId(id);

        const canEditPost = permissions.canUpdatePost(req.user, post.author);
        const canDeletePost = permissions.canDeletePost(req.user, post.author);

        res.render('pages/posts/post-details', {user: req.user, post, canEditPost, canDeletePost});
    }
    catch(err){
        next(err);
    }
}

function getCreateForm(req, res, next){
    res.render('pages/posts/create-post', {user: req.user});
}

async function postCreateForm(req, res, next){
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400)
            .render('pages/posts/create-post', {user: req.user, errors: errors.array().map(err => err.msg)});
        }

        const {title, content} = matchedData(req);

        await postDB.createPost(req.user.id, title, content);
        return res.redirect('/');
    }
    catch(err){
        next(err);
    }
}

async function getEditForm(req, res){
    res.render('pages/posts/edit-post', {user:req.user, post: req.currentPost});
}

async function postEditForm(req, res, next){
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400)
            .render('pages/posts/edit-post', {user:req.user, post: post.currentPost, errors: errors.array().map(err => err.msg)});
        }

        const {title, content} = matchedData(req, {locations: ['body']});

        await postDB.updatePost(req.currentPost.id, title, content, new Date());
        
        return res.redirect(`/posts/${req.currentPost.id}/details`);
    }
    catch(err){
        return next(err);
    }
}

async function postDelete(req, res, next){
    await postDB.deletePost(req.currentPost.id);
    req.currentPost = undefined;
    res.redirect('/');
}

module.exports.getPost = [isAuthenticated, validatePostId, getPost];
module.exports.getCreateForm = [isAuthenticated, authorizePostCreation, getCreateForm];
module.exports.postCreateForm = [isAuthenticated, authorizePostCreation, validatePostData, postCreateForm];
module.exports.getEditForm = [isAuthenticated, validatePostId, extractPostData, authorizePostUpdate, getEditForm];
module.exports.postEditForm = [isAuthenticated, validatePostId, extractPostData, authorizePostUpdate, validatePostData, postEditForm];
module.exports.postDelete = [isAuthenticated, validatePostId, extractPostData, authorizePostDeletion, postDelete];