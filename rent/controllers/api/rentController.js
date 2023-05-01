var passport = require('passport');
const http = require('http');

exports.list = function (req, res) {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err || !user) {
            console.log('error is', err);
            res.status(500).send('An error has occurred, we cannot greet you at the moment.');
        }
        else {
            //res.send({ success: true, fullName: `${user.name.givenName} ${user.name.familyName}` })
            const endpoint = "http://localhost:5050/list"
            http.get(endpoint, (resp) => {
                let data = '';
                // A chunk of data has been received.
                resp.on('data', (chunk) => {
                    data += chunk;
                });
                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    console.log(data);
                    res.status(200).json(JSON.parse(data))
                });
            }).on("error", (err) => {
                console.log("Error: " + err.message);
            });
        }
    })(req, res, next);

};

exports.rentBicycle = function (req, res) { };

exports.greetme = function (req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err || !user) {
            console.log('error is', err);
            res.status(500).send('An error has occurred, we cannot greet you at the moment.');
        }
        else {
            res.send({ success: true, fullName: `${user.name.givenName} ${user.name.familyName}` })
        }
    })(req, res, next);
};