const express = require('express');
const path = require('node:path');
const passport = require('passport');
const expressLayout = require('express-ejs-layouts');

const { isProduction } = require('./models/globals.cjs');

const app = express();

// ==================== SETUP ====================
app.set('trust proxy', 1);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayout);

require('./configs/passport.cjs');

app.use(require('./configs/session.cjs'));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// Global locals
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.title = process.env.TITLE;
  next();
});


// ==================== ROUTES ====================
app.use('/', require('./routes/indexRouter.cjs'));
app.use('/profiles', require('./routes/profileRouter.cjs'));
app.use('/login', require('./routes/loginRouter.cjs'));
app.use('/logout', require('./routes/logoutRouter.cjs'));
app.use('/signup', require('./routes/signupRouter.cjs'));
app.use('/posts', require('./routes/postsRouter.cjs'));
app.use('/membership', require('./routes/membershipRouter.cjs'));

app.use((req, res, next) => {
    next(Object.assign(new Error('Path not found'), {status: 404}));
});

// ==================== ERROR HANDLING ====================
app.use((err, req, res, next) => {
    if(res.headersSent){
        return next(err);
    }

    console.error(err);

    res.status(err.status || 500).render('pages/error', 
        {
            errMessage: isProduction ? 'Something seems to be broken!' :  err.message, 
            status: err.status,
        });
});

// ==================== LISTEN TO REQUESTS ====================
const port = process.env.PORT || 8080;

app.listen(port , err => {
    if(err) throw err;

    console.log(`Listening to port: ${port}`);
});