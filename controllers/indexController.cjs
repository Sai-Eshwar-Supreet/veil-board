const postsDB = require('../db/posts/repository.cjs');
const { getRelativeDate } = require('../lib/utils/dateUtils.cjs');

async function getHome(req, res){
    const posts = await postsDB.getAll();
    posts.forEach(post => {
        post.relativeDate = getRelativeDate(post.updatedAt || post.createdAt);
    });
    res.render('pages/home', {title: 'Home', posts, user: req.user, previewLength: 50});
}

module.exports.getHome = getHome;