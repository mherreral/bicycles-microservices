var express = require('express');
var router = express.Router();
var passport = require('passport');
const rentController = require("../controllers/api/rentController");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/api/v1/:id/rent", rentController.rentBicycle);

module.exports = router;
