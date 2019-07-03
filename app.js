const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieSession = require('cookie-session');
const Lockit = require('lockit');
const config = require('./config.js');
const indexRouter = require('./routes/index');
const kpiRouter = require('./routes/form');
const privateRouter = require('./routes/private');
const app = express();
var lockit = new Lockit(config);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cookieSession({
    name: 'ads',
    secret: 'my super secret String'
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(lockit.router);
app.use('/', indexRouter);
app.use('/form', kpiRouter);
app.use('/site', privateRouter);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'html')));
app.use(express.static(path.join(__dirname, 'static/vendor')));
app.use(function(req, res, next) {
  next(createError(404));
});
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
