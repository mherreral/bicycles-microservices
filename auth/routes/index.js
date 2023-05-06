var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
require('dotenv').config('./.env');

const TOKEN_SECRET = 'SECRET';

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/error' }),
  function (req, res) {
    const token = jwt.sign({ id: req.user.sub, name: req.user.name }, TOKEN_SECRET, {
      expiresIn: 60 * 60,
    });
    res.cookie('auth', token, { httpOnly: true });
    console.log(token)
    //res.status(200).json("You are now authenticated");
    res.redirect(200, process.env.FRONTEND_MS)
  });

module.exports = router;
