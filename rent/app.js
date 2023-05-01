var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');

var app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
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
