function getHome(req, res){
    res.render('pages/home', {title: 'Home'});
}

module.exports.getHome = getHome;