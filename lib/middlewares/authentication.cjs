function isGuest(req, res, next){
    if(req.isAuthenticated()){
        return next(new Error(`Already logged in as ${req.user.username}. Sign out to access.`));
    }
    next();
}

function isAuthenticated(req, res, next){
    if(!req.isAuthenticated()){
        return next(new Error(`Login to access.`));
    }
    next();
}

module.exports.isGuest = isGuest;
module.exports.isAuthenticated = isAuthenticated;