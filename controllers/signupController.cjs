const { validationResult, matchedData, body } = require('express-validator');
const usersDB = require('../db/users/repository.cjs');
const bcrypt = require('bcrypt');
const { isGuest } = require('../lib/middlewares/authentication.cjs');

const validator = [
    body('username').trim().toLowerCase()
    .notEmpty().withMessage('Username must not be empty.').bail()
    .matches(/^[a-z]+([\._][a-z0-9]+)*$/).withMessage('Username can contain letters, numbers, dots, and underscores. No leading, trailing, or consecutive dots/underscores.').bail()
    .isLength({min: 5, max: 25}).withMessage('Username must be between 5 to 25 characters.'),

    body('password').trim()
    .notEmpty().withMessage('Password must not be empty').bail()
    .matches(/^(?=.*[A-Z])(?=.*[\d])(?=.*[\W_])[a-zA-Z\d\W\s_]+$/).withMessage('Password must contain at least 1 uppercase letter, 1 number, and 1 special character').bail()
    .isLength({min: 8}).withMessage('Password should be at least 8 characters long'),

    body('confirmPassword').custom((value, {req}) => {
        if(value !== req.body.password){
            throw new Error("Passwords don't match");
        }

        return true;
    }),
];

function renderSignup(res, data= {}){
    return res.render('pages/signup', {...data});
}

function getSignup(req,res){
    return renderSignup(res);
}

async function postSignup(req, res, next){
    try{
        const errors = validationResult(req);
    
        if(!errors.isEmpty()){
            return renderSignup(res, {
                errors: errors.array().map(e => e.msg),
                username: req.body.username,
            })
        }
    
        const {username, password} = matchedData(req);
        
        const saltRounds = parseInt(process.env.SALT_ROUNDS, 10) || 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);
        
        try{
            await usersDB.createUser(username, passwordHash);
        }
        catch(err){
            if(err.code === '23505') // postgresql error code for violating UNIQUE constraint 
            {
                return renderSignup(res, {
                    errors: ['Username already exists'],
                    username,
                });
            }

            throw err;
        }

        res.redirect('/login');
    }
    catch(err){
        next(err);
    }
}

module.exports.getSignup = [isGuest, getSignup];
module.exports.postSignup = [isGuest, validator, postSignup];