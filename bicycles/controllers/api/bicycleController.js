require('../../database/database');

const Bicycle = require("../../models/Bicycle");

exports.create = function (req, res) {
    const bicycle = new Bicycle(req.body);
    bicycle.save().then(() => {
        res.status(200).json(`Bicycle ${req.body.id} created succesfully`)
    }).catch((err) => {
        res.status(500).json('Internal Server Error!');
        console.log(err)
    })
};

exports.list = function (req, res) {
    Bicycle.find().then((bicycles) => {
        if (bicycles.length !== 0) {
            res.status(200).json(bicycles)
        } else {
            res.status(404).send('Bicycles not found');
        }
    }).catch((err) => {
        res.status(500).send('Internal Server Error!');
    });
};

exports.update = function (req, res) {
    Bicycle.findByIdAndUpdate(req.params.id, req.body).then((bicycle) => {
        if (bicycle) {
            res.status(200).json('Bicycle updated Successfully!')
        } else {
            res.status(404).send('Bicycle Not found!');
        }
    }).catch((err) => {
        res.status(500).send('Internal Server Error!');
        console.log(err);
    });
};

exports.delete = function (req, res) {

    Bicycle.findByIdAndDelete(req.params.id).then((bicycle) => {
        if (bicycle) {
            res.status(200).json('Bicycle deleted Successfully!')
        } else {
            res.status(404).send('Bicycle Not found!');
        }
    }).catch((err) => {
        res.status(500).send('Internal Server Error!');
        console.log(err);
    });
};