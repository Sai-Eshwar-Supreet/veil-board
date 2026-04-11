const { isAuthenticated } = require("../lib/middlewares/authentication.cjs");

async function postLogout(req, res, next){
    req.logout(err => {
        if(err) return next(err);
        res.redirect('/');
    });

}

module.exports.postLogout = [isAuthenticated, postLogout];