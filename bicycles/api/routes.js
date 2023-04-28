const express = require("express");
const router = express.Router();
const bicicletaController = require("./bicyclesController");

router.get("/list", bicicletaController.list);
router.post("/create", bicicletaController.create);
router.put("/:id/update", bicicletaController.update);
router.delete("/:id/delete", bicicletaController.delete);

module.exports = router;
