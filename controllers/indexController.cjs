const postsDB = require('../db/posts/repository.cjs');
const permissions = require('../lib/utils/permissions.cjs');

async function getHome(req, res){
    const posts = await postsDB.getAll();
    const canCreatePost = permissions.canCreatePost(req.user);
    res.render('pages/home', {title: 'Home', posts, user: req.user, previewLength: 50, canCreatePost});
}

module.exports.getHome = getHome;