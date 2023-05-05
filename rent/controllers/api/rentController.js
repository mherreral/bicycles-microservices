var passport = require('passport');
const http = require('http');
const request = require('request');
require('dotenv').config('./.env');

exports.rentBicycle = function (req, res) {
    const options = {
        url: process.env.BICYCLE_MS + '/api/v1/' + req.body.id + "/update",
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: { color: req.body.color, model: req.body.model, location: req.body.location, rent_status: true },
        json: true
    }
    request(options, function (error, response, body) {
        if (error) {
            console.log(error)
        }
        console.log(body);
    });
};