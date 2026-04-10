function passOnNotAuth(req, res, next){
    if(req.isAuthenticated()){
        return next(new Error(`Already logged in as ${req.user.username}. Sign out to access.`));
    }
    next();
}

function passOnAuth(req, res, next){
    if(!req.isAuthenticated()){
        return next(new Error(`Already logged in as ${req.user.username}. Login to access.`));
    }
    next();
}

module.exports.passOnAuth = passOnAuth;
module.exports.passOnNotAuth = passOnNotAuth;