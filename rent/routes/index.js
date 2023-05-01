var express = require('express');
var router = express.Router();
var passport = require('passport');
const rentController = require("../controllers/api/rentController");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/greetme', (req, res, next) => {
//   passport.authenticate('jwt', { session: false }, (err, user, info) => {
//     if (err || !user) {
//       console.log('error is', err);
//       res.status(500).send('An error has occurred, we cannot greet you at the moment.');
//     }
//     else {
//       res.send({ success: true, fullName: `${user.name.givenName} ${user.name.familyName}` })
//     }
//   })(req, res, next);
// });

router.get("/list", rentController.list);
router.get("/greetme", rentController.greetme);

module.exports = router;
