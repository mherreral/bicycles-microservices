require('dotenv').config('./.env');
require('dotenv').config('./.env');
var passport = require('passport');


exports.index = function (req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err || !user) {
      console.log('error is', err);
      res.redirect('/login');
    }
    else {
      res.render('index', { title: 'Red Bicicletas', user: user });
    }
  })(req, res, next);
};