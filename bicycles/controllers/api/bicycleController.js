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
    console.log("TESTINGGGG: ", req.body, req.params.id);
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

exports.show = function (req, res) {
    Bicycle.findById(req.params.id).then((bicycle) => {
        console.log(bicycle)
        if (bicycle != null) {
            res.status(200).json(bicycle)
        } else {
            res.status(404).send('Bicycle Not found!');
        }
    }).catch((err) => {
        res.status(500).send('Internal Server Error!');
        console.log(err);
    });
};

exports.get_available_bicycles = function (req, res) {
    Bicycle.find({rent_status: false}).then((bicycles) => {
        if (bicycles.length !== 0) {
            res.status(200).json(bicycles)
        } else {
            res.status(404).send('Bicycles not found');
        }
    }).catch((err) => {
        res.status(500).send('Internal Server Error!');
    });
};