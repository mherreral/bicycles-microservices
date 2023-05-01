const express = require("express");
const router = express.Router();
const bicyclesController = require("../../controllers/api/bicycleController");

router.get("/list", bicyclesController.list);
router.post("/create", bicyclesController.create);
router.put("/:id/update", bicyclesController.update);
router.delete("/:id/delete", bicyclesController.delete);

module.exports = router;
