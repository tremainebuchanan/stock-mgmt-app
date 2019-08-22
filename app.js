require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('redis');
const mongoose = require('mongoose');

const client = redis.createClient();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const inventoryRoute = require('./routes/inventory');
const settingsRoute = require('./routes/settings');
const loginRoute = require('./routes/login');
const sessionRoute = require('./routes/session');
const configs = require('./config/config');

mongoose.Promise = global.Promise;

mongoose.connect(configs.mongo.uri, configs.mongo.options);

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected');
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose not connected: =>', err);
});

const app = express();

client.on('connect', () => {
  console.log('Redis is connected');
});

client.on('error', (err) => {
  console.log('Redis not connected' + err);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  name: '_stock',
  secret: configs.app.session.secret,
  // eslint-disable-next-line radix
  duration: parseInt(configs.app.session.maxAge),
  store: new RedisStore({
    host: 'localhost',
    port: 6379,
    client,
    ttl: 86400,
  }),
  saveUninitialized: false,
  resave: false,
  cookie: {
    secure: false,
    sameSite: true,
    // eslint-disable-next-line radix
    maxAge: parseInt(configs.app.session.maxAge), 
  },
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', productsRouter);
app.use('/', inventoryRoute);
app.use('/', settingsRoute);
app.use('/', loginRoute);
app.use('/', sessionRoute);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
