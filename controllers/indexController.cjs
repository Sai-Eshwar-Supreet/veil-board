const postsDB = require('../db/posts/repository.cjs');

async function getHome(req, res){
    const posts = await postsDB.getAll();
    res.render('pages/home', {title: 'Home', posts, username: req?.user?.username, previewLength: 50});
}

module.exports.getHome = getHome;