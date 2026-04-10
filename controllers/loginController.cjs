const { body, validationResult, matchedData } = require('express-validator');
const passport = require('passport');

const validator = [
    body('username').trim().toLowerCase()
    .notEmpty().withMessage('Username must not be empty.').bail()
    .matches(/^[a-z]+(\.[a-z0-9]+)*$/).withMessage('Use only letters, numbers, and dots. Dots cannot be at the start, end, or used consecutively.').bail()
    .isLength({min: 5, max: 25}).withMessage('Username must be between 5 to 25 characters.'),

    body('password').trim()
    .notEmpty().withMessage('Password must not be empty').bail()
    .matches(/^(?=.*[A-Z])(?=.*[\d])(?=.*[\W_])[a-zA-Z\d\W\s_]+$/).withMessage('Password must contain at least 1 uppercase letter, 1 number, and 1 special character').bail()
    .isLength({min: 8}).withMessage('Password should be at least 8 characters long'),
]

async function getLogin(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    res.render('pages/login', {title: 'Login'});
}

function validateCredentials(req, res, next){
    const validationErrors = validationResult(req);

    if(!validationErrors.isEmpty()){
        return res.status(400).render('pages/login', {title: 'Login', errors: validationErrors.array().map(err => err.msg)});
    }

    const {username, password} = matchedData(req);

    req.body.username = username;
    req.body.password = password;

    next();
}

async function postLogin(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    
    passport.authenticate('local', (err, user, info) => {

        if(err) return next(err);

        if(!user){
            return res.status(401).render('pages/login', {title: 'Login', errors: [info.message]});
        }

        req.login(user, err => {
            if(err) return next(err);
            
            res.redirect('/');
        });
    })(req, res, next);
}

module.exports.getLogin = getLogin;
module.exports.postLogin = [validator, validateCredentials, postLogin];