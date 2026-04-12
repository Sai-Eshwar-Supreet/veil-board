function isGuest(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    next();
}

function isAuthenticated(req, res, next){
    if(!req.isAuthenticated()){
        return res.redirect('/login');
    }
    next();
}

module.exports.isGuest = isGuest;
module.exports.isAuthenticated = isAuthenticated;