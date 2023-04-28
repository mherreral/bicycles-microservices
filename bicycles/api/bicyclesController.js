require('../database/database');

const Bicycle = require("./Bicycle");

exports.create = function (req, res) {
    const bicycle = new Bicycle(...req.body);
    bicycle.save().then(() => {
        res.status(200).json(`Bicycle ${req.body.id} created succesfully`)
    }).catch((err) => {
        res.status(500).json('Internal Server Error!');
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
    Bicycle.findOneAndUpdate(req.params.id, req.body).then((bicycle) => {
        if (bicycle) {
            res.status(200).json('Bicycle updated Successfully!')
        } else {
            res.status(404).send('Bicycle Not found!');
        }
    }).catch((err) => {
        res.status(500).send('Internal Server Error!');
    });
};

exports.delete = function (req, res) {
    Bicycle.findOneAndRemove(req.params.id).then((bicycle) => {
        if (bicycle) {
            res.status(200).json('Bicycle deleted Successfully!')
        } else {
            res.status(404).send('Bicycle Not found!');
        }
    }).catch((err) => {
        res.status(500).send('Internal Server Error!');
    });
};

// exports.add = function (req, res) {
//     var bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo);
//     bici.ubicacion = [req.body.lat, req.body.lng];
//     Bicicleta.add(bici);
//     res.status(201).json(`Bicicleta con id: ${req.body.id} Creado exitosamente`);
// };

// exports.update = function (req, res) {
//     try {
//         var bici = Bicicleta.findById(req.body.id);
//         bici.id = req.body.id;
//         bici.color = req.body.color;
//         bici.modelo = req.body.modelo;
//         bici.ubicacion = [req.body.lat, req.body.lng];
//         res.status(201).json({ Bicicleta: bici });
//     } catch (error) {
//         res.status(404).json(error.message);
//     }
// };

// exports.delete = function (req, res) {
//     try {
//         Bicicleta.removeById(req.body.id);
//         res.status(204).json(`Bicicleta id: ${req.body.id} borrada exitosamente.`);
//     } catch (error) {
//         res.status(404).json(error.message);
//     }
// };

// exports.list = function (req, res) {
//     res.status(200).json({
//         bicicletas: Bicicleta.allBicis,
//     });
// };