var express = require('express');
var router = express.Router();

const bicicletaController = require("../controllers/bicycle");
const homeController = require('../controllers/home')
const loginController = require('../controllers/login')

router.get("/", homeController.index)
router.get("/login", loginController.showlogin)
router.get("/google-login", loginController.login)
router.get("/bicicletas", bicicletaController.list);
router.get("/bicicletas/:id/show", bicicletaController.show);
router.get("/bicicletas/create", bicicletaController.create_get);
router.post("/bicicletas/create", bicicletaController.create_post);
router.get("/bicicletas/:id/update", bicicletaController.update_get);
router.post("/bicicletas/:id/update", bicicletaController.update_post);
router.post("/bicicletas/:id/delete", bicicletaController.delete);
router.post("/bicicletas/:id/rent", bicicletaController.rent);

module.exports = router;