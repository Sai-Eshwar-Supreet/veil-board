const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const userDB = require('../db/users/repository.cjs');


async function verifyFunction(username, password, done){
    try{
        const user =  await userDB.getUserByUsername(username);

        if(!user){
            return done(null, false);
        }

        const match = await bcrypt.compare(password, user.passwordHash);

        if(!match){
            return done(null, false);
        }

        return done(null, user);
    }
    catch(err){
        done(err);
    }
}

const strategy = new LocalStrategy(verifyFunction);
passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
    try{
        const user = await userDB.getUserById(id);

        done(null, user);
    }
    catch(err){
        done(err);
    }
});