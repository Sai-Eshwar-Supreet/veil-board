const postsDB = require('../db/posts/repository.cjs');
const { formatPosts } = require('../posts/postFormatter.cjs');

async function getHome(req, res, next){
    try{
        const posts = await postsDB.getAll();
        const formattedPosts = formatPosts(posts);
        res.render('pages/home', 
            {
                posts: formattedPosts,
            });
    }
    catch(err){
        next(err);
    }
}

module.exports.getHome = getHome;