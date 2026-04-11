const { isAuthenticated } = require("../lib/middlewares/authentication.cjs");
const { authorizeJoinMembership } = require("../lib/middlewares/authorization.cjs");
const userDB = require('../db/users/repository.cjs');

function getMembershipPage(req, res, next){
    res.render('pages/membership', {user: req.user});
}


async function postJoinMembership(req, res, next){
    try{
        const id = req.user.id;

        await userDB.assignRole(id, 'member');

        res.redirect('/');
    }
    catch(err){
        next(err);
    }
}

module.exports.getMembershipPage = [isAuthenticated, authorizeJoinMembership, getMembershipPage]
module.exports.postJoinMembership = [isAuthenticated, authorizeJoinMembership, postJoinMembership]