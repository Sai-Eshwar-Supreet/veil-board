const postsDB = require('../db/posts/repository.cjs');
const usersDB = require('../db/users/repository.cjs');
const { isAuthenticated } = require('../lib/middlewares/authentication.cjs');
const permissions = require('../lib/utils/permissions.cjs');
const { formatPosts } = require('../posts/postFormatter.cjs');

async function getProfile(req,res, next){
    try{
        const profileName = req.params.username;
        const profileUser = await usersDB.getUserByUsername(profileName);
    
        if(!profileUser){
            return next(Object.assign(new Error('User not found'), { status: 404 }));
        }
        
        const posts = await postsDB.getByUser(profileUser.id);
        const formattedPosts = formatPosts(posts);
    
        const isOwner =  req.user.id === profileUser.id;
        const canCreatePost = isOwner &&  permissions.canCreatePost(req.user);
        const canBecomeMember = isOwner && permissions.canBecomeMember(req.user);
        res.render('pages/profile', 
            {
                posts: formattedPosts, 
                profileUser,
                canCreatePost, 
                canBecomeMember
            });
    }
    catch(err){
        next(err);
    }
} 

module.exports.getProfile = [isAuthenticated, getProfile];