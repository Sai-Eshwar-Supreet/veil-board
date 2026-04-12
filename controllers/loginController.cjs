const { body, validationResult, matchedData } = require('express-validator');
const passport = require('passport');
const { isGuest } = require('../lib/middlewares/authentication.cjs');

const validator = [
    body('username').trim().toLowerCase()
    .notEmpty().withMessage('Username is required.'),

    body('password').trim()
    .notEmpty().withMessage('Password is required')
];

function renderLogin(res, data = {}) {
  return res.render('pages/login', { ...data});
}

function validateCredentials(req, res, next){
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return renderLogin(res, {
            errors: errors.array().map(e => e.msg),
            username: req.body.username
        });
    }

    const {username, password} = matchedData(req);

    req.body.username = username;
    req.body.password = password;
    next();
}

async function getLogin(req, res){
    return renderLogin(res);
}


async function postLogin(req, res, next){
    passport.authenticate('local', (err, user) => {

        if(err) return next(err);

        if(!user){
            return renderLogin(res, {
                errors: ['Invalid username or password'],
                username: req.body.username,
            });
        }

        req.login(user, err => {
            if(err) return next(err);
            
            res.redirect('/');
        });
    })(req, res, next);
}

module.exports.getLogin = [isGuest, getLogin];
module.exports.postLogin = [isGuest, validator, validateCredentials, postLogin];