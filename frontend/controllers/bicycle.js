require('dotenv').config('./.env');
var passport = require('passport');
const http = require('http');
const request = require('request');


exports.create_get = function (req, res) {
  res.render("bicycles/create");
};

exports.create_post = function (req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err || !user) {
      console.log('error is', err);
      res.redirect('/login');
    }
    else {
      const options = {
        method: 'POST',
        url: process.env.BICYCLE_MS + '/api/v1/create',
        headers: { 'Content-Type': 'application/json' },
        body: { color: req.body.color, model: req.body.model, location: [req.body.lat, req.body.lng], rent_status: false },
        json: true
      };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
      });

      res.redirect('/bicicletas')
    }
  })(req, res, next);
};

exports.update_get = function (req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err || !user) {
      console.log('error is', err);
      res.redirect('/login');
    }
    else {
      const endpoint = process.env.BICYCLE_MS + '/api/v1/' + req.params.id + '/show'
      console.log(req.params.id);
      http.get(endpoint, (resp) => {
        let data = '';
        // A chunk of data has been received.
        resp.on('data', (chunk) => {
          data += chunk;
        });
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          bici = JSON.parse(data)
          res.render('bicycles/update', bici)
        });
      }).on("error", (err) => {
        console.log("Error: " + err.message);
      });
    }
  })(req, res, next);
};

exports.update_post = function (req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err || !user) {
      console.log('error is', err);
      res.redirect('/login');
    }
    else {
      console.log(req.body);
      const options = {
        method: 'PUT',
        url: process.env.BICYCLE_MS + '/api/v1/' + req.body.id + '/update',
        headers: { 'Content-Type': 'application/json' },
        body: { color: req.body.color, model: req.body.model, location: [req.body.lat, req.body.lng], rent_status: req.body.rented },
        json: true
      };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
      });

      res.redirect('/bicicletas')
    }
  })(req, res, next);
};

exports.list = function (req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err || !user) {
      console.log('error is', err);
      res.redirect('/login');
    }
    else {
      const list_bicycle_endpoint = process.env.BICYCLE_MS + '/api/v1/list'
      const endpoint = list_bicycle_endpoint
      http.get(endpoint, (resp) => {
        let data = '';
        // A chunk of data has been received.
        resp.on('data', (chunk) => {
          data += chunk;
        });
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          bicycles = JSON.parse(data)
          res.render('bicycles/index', bicycles)
        });
      }).on("error", (err) => {
        console.log("Error: " + err.message);
      });
    }
  })(req, res, next);
};

exports.show = function (req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err || !user) {
      console.log('error is', err);
      res.redirect('/login');
    }
    else {
      const endpoint = process.env.BICYCLE_MS + '/api/v1/' + req.params.id + '/show'
      console.log(req.params.id);
      http.get(endpoint, (resp) => {
        let data = '';
        // A chunk of data has been received.
        resp.on('data', (chunk) => {
          data += chunk;
        });
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          bici = JSON.parse(data)
          res.render('bicycles/show', bici)
        });
      }).on("error", (err) => {
        console.log("Error: " + err.message);
      });
    }
  })(req, res, next);
};

exports.delete = function (req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err || !user) {
      console.log('error is', err);
      res.redirect('/login');
    }
    else {
      const options = {
        method: 'DELETE',
        url: process.env.BICYCLE_MS + '/api/v1/' + req.body.id + '/delete'
      };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
      });

      res.redirect('/bicicletas')
    }
  })(req, res, next);
};

exports.rent = function (req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err || !user) {
      console.log('error is', err);
      res.redirect('/login');
    }
    else {
      const bicycle = JSON.parse(req.body.bici);
      console.log(bicycle);
      const options = {
        method: 'POST',
        url: process.env.RENT_MS + '/api/v1/' + req.body.id + '/rent',
        headers: { 'Content-Type': 'application/json' },
        body: { id: bicycle._id, color: bicycle.color, model: bicycle.model, location: bicycle.location, rent_status: true },
        json: true
      };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
      });

      res.redirect('/bicicletas')
    }
  })(req, res, next);
};