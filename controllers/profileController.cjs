const postsDB = require('../db/posts/repository.cjs');
const usersDB = require('../db/users/repository.cjs');
const { isAuthenticated } = require('../lib/middlewares/authentication.cjs');
const permissions = require('../lib/utils/permissions.cjs');

async function getProfile(req,res, next){
    const profileName = req.params.username;
    const profileUser = await usersDB.getUserByUsername(profileName);

    if(!profileUser){
        return next();
    }
    
    const posts = await postsDB.getByUser(profileUser.id);
    posts.forEach(post => {
        post.relativeDate = getRelativeDate(post.updatedAt || post.createdAt);
    });

    const ownProfile = (req.user.id === profileUser.id);
    const canCreatePost = ownProfile &&  permissions.canCreatePost(req.user);
    const canBecomeMember = ownProfile && permissions.canBecomeMember(req.user);
    res.render('pages/profile', {title: 'Profile', posts, user: req.user, profileUser, previewLength: 50, canCreatePost, canBecomeMember});
} 

module.exports.getProfile = [isAuthenticated, getProfile];