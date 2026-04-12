function postLogout(req, res, next){
    if(!req.isAuthenticated()){
        return res.redirect('/');
    }

    req.logout(err => {
        if(err) return next(err);

        req.session.destroy(err => {
            if(err) return next(err);

            res.clearCookie('connect.sid');
            res.redirect('/');
        });
    });

}

module.exports.postLogout = postLogout;