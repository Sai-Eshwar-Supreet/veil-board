const express = require('express');
const path = require('node:path');
const passport = require('passport');
const expressLayout = require('express-ejs-layouts');

const indexRouter = require('./routes/indexRouter.cjs');
const loginRouter = require('./routes/loginRouter.cjs');
const signupRouter = require('./routes/signupRouter.cjs');
const postsRouter = require('./routes/postsRouter.cjs');
const membershipRouter = require('./routes/membershipRouter.cjs');
const logoutRouter = require('./routes/logoutRouter.cjs');
const profileRouter = require('./routes/profileRouter.cjs');

const app = express();

// ==================== SETUP ====================
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayout);

require('./configs/passport.cjs');
app.use(require('./configs/session.cjs'));
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

// ==================== ROUTING ====================
app.use('/', indexRouter);
app.use('/profiles', profileRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/signup', signupRouter);
app.use('/posts', postsRouter);
app.use('/membership', membershipRouter);
app.use((req, res, next) => {
    const error = new Error('Path not found');
    error.status = 404;
    next(error);
});

// ==================== ERROR HANDLING ====================
app.use((err, req, res, next) => {
    if(res.headersSent){
        return next(err);
    }

    console.error(err);
    res.status(err.status || 500).render('pages/error', {title: 'Error', errMessage: err.message || 'Something seems to be broken!', status: err.status, user: req.user});
});

// ==================== LISTEN TO REQUESTS ====================
const port = process.env.PORT || 8080;

app.listen(port , err => {
    if(err) throw err;

    console.log(`Listening to port: ${port}`);
});