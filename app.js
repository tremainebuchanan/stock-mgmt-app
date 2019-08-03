require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const redisStore = require('connect-redis')(session)
const redis = require('redis')
const client = redis.createClient()
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const productsRouter = require('./routes/products')
const inventoryRoute = require('./routes/inventory')
const settingsRoute = require('./routes/settings')
const loginRoute = require('./routes/login')
const sessionRoute = require('./routes/session')
const mongoose = require('mongoose')
const configs = require('./config/config')
mongoose.Promise = global.Promise

mongoose.connect(configs.mongo.uri, configs.mongo.options)

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected')
})

mongoose.connection.on('error', (err) => {
  console.log('Mongoose not connected: =>', err)
})

var app = express();

client.on('connect', ()=>{
  console.log('Redis is connected')
})

client.on('error', (err)=>{
  console.log('Redis not connected' + err)
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  name: '_stock',
  secret: configs.app.session.secret,
  duration: parseInt(configs.app.session.maxAge),
  store: new redisStore({ host: 'localhost', port: 6379, client: client, ttl: 86400 }),
  saveUninitialized: false,
  resave: false,
  cookie: {secure: false, sameSite: true, maxAge: parseInt(configs.app.session.maxAge) }
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', productsRouter)
app.use('/', inventoryRoute)
app.use('/', settingsRoute)
app.use('/', loginRoute)
app.use('/', sessionRoute)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
