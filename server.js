const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');

require('dotenv').config();

const app = express();

require('./config/database');
require('./config/passport');

const indexRouter = require('./routes/index');
const householdRouter = require('./routes/households');
const shoppingRouter = require('./routes/shopping');
const tasksRouter = require('./routes/tasks');
const messagesRouter = require('./routes/messages');
const spendingsRouter = require('./routes/spendings');
const membersRouter = require('./routes/members');
const settingsRouter = require('./routes/settings');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: 'weronikamiller',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());



app.use('/', indexRouter);
app.use('/household/shopping', shoppingRouter);
app.use('/household/tasks', tasksRouter);
app.use('/household/messages', messagesRouter);
app.use('/household/spendings', spendingsRouter);
app.use('/household/members', membersRouter);
app.use('/household/settings', settingsRouter);

app.use('/household', householdRouter);


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
