const postsDB = require('../db/posts/repository.cjs');
const { formatPosts } = require('../posts/postFormatter.cjs');
const permissions = require('../lib/utils/permissions.cjs');

async function getHome(req, res, next){
    try{
        const posts = await postsDB.getAll();
        const formattedPosts = formatPosts(posts);
        res.render('pages/home', 
            {
                posts: formattedPosts,
                canBecomeMember: permissions.canBecomeMember(req.user),
            });
    }
    catch(err){
        next(err);
    }
}

module.exports.getHome = getHome;