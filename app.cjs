const express = require('express');
const path = require('node:path');
const indexRouter = require('./routes/indexRouter.cjs');
const passport = require('passport');

const app = express();

// ==================== SETUP ====================
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

require('./configs/passport.cjs');
app.use(require('./configs/session.cjs'));
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
    console.log(req.session);
    console.log(req.user);
    console.log(req.body);
    next();
});

// ==================== ROUTING ====================
app.use('/', indexRouter);
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
    res.status(err.status || 500).render('pages/errorPage', {title: 'Error', errMessage: err.message || 'Something seems to be broken!'});
});

// ==================== LISTEN TO REQUESTS ====================
const port = process.env.PORT || 8080;

app.listen(port , err => {
    if(err) throw err;

    console.log(`Listening to port: ${port}`);
});