require('dotenv').config('./.env');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors = require('cors');
var session = require('express-session');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var indexRouter = require('./routes/index');

var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET'
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);

passport.serializeUser(function (user, cb) {
    cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_AUTH_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        // here you can create a user in the database if you want to
        return done(null, profile);
    }
));

module.exports = app;
