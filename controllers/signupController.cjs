const { validationResult, matchedData, body } = require('express-validator');
const usersDB = require('../db/users/repository.cjs');
const bcrypt = require('bcrypt');
const { isGuest } = require('../lib/middlewares/authentication.cjs');

const validator = [
    body('username').trim().toLowerCase()
    .notEmpty().withMessage('Username must not be empty.').bail()
    .matches(/^[a-z]+([\._][a-z0-9]+)*$/).withMessage('Username can contain letters, numbers, dots, and underscores. No leading, trailing, or consecutive dots/underscores.').bail()
    .isLength({min: 5, max: 25}).withMessage('Username must be between 5 to 25 characters.').bail()
    .custom(async (value) => {
        const user = await usersDB.getUserByUsername(value);

        if(user){
            throw new Error('Username already exists');
        }

        return true;
    }),

    body('password').trim()
    .notEmpty().withMessage('Password must not be empty').bail()
    .matches(/^(?=.*[A-Z])(?=.*[\d])(?=.*[\W_])[a-zA-Z\d\W\s_]+$/).withMessage('Password must contain at least 1 uppercase letter, 1 number, and 1 special character').bail()
    .isLength({min: 8}).withMessage('Password should be at least 8 characters long'),

    body('confirm-password').custom((value, {req}) => {
        if(value !== req.body.password){
            throw new Error("Passwords don't match");
        }

        return true;
    }),
];

function getSignup(req,res){
    res.render('pages/signup', {user: req.user, title: 'Sign Up'});
}

async function postSignup(req, res, next){
    try{
        const errors = validationResult(req);
    
        if(!errors.isEmpty()){
            return res.status(400).render('pages/signup', {user: req.user, title: 'Sign Up', errors: errors.array().map(err => err.msg)});
        }
    
        const {username, password} = matchedData(req);
    
        const passwordHash = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
    
        await usersDB.createUser(username, passwordHash);

        res.redirect('/login');
    }
    catch(err){
        next(err);
    }
}

module.exports.getSignup = [isGuest, getSignup];
module.exports.postSignup = [isGuest, validator, postSignup];