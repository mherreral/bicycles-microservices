require('dotenv').config('./.env');
const http = require('http');

exports.showlogin = function (req, res) {
  res.render('login', { title: 'Login - Red Bicicletas' });
};

exports.login = function (req, res) {
  const endpoint = process.env.AUTH_MS + '/auth/google'
  http.get(endpoint, (resp) => {
    let data = '';
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      res.redirect('/bicicletas')
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
};