var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var session = require('express-session');
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET'
}));

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);

const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['auth'];
  }
  return token;
};
const TOKEN_SECRET = 'SECRET';
const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: TOKEN_SECRET,
};
passport.use(
  'jwt',
  new JwtStrategy(opts, (jwt_payload, done) => {
    try {
      console.log('jwt_payload', jwt_payload);
      done(null, jwt_payload);
    } catch (err) {
      done(err);
    }
  }),
);

module.exports = app;
