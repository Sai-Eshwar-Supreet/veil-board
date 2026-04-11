const permissions = require("../utils/permissions.cjs");

function authorizePostCreation(req, res, next){
    if(permissions.canCreatePost(req.user)){
        return next();
    }

    res.redirect('/membership/join');
}

async function authorizePostDeletion(req, res, next){
    if(permissions.canDeletePost(req.user, req.currentPost.author)){
        return next();
    }

    res.redirect('/membership/join');
}

function authorizePostUpdate(req, res, next){
    if(permissions.canUpdatePost(req.user, req.currentPost.author)){
        return next();
    }
    
    res.redirect('/membership/join');
}

function authorizeJoinMembership(req, res, next){
    if(req.user.roles.includes('member')){
        return res.redirect('/');
    }

    next();
}

module.exports.authorizePostCreation = authorizePostCreation;
module.exports.authorizePostDeletion = authorizePostDeletion;
module.exports.authorizePostUpdate = authorizePostUpdate;
module.exports.authorizeJoinMembership = authorizeJoinMembership;