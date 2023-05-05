const express = require("express");
const router = express.Router();
const bicyclesController = require("../../controllers/api/bicycleController");

router.get("/api/v1/list", bicyclesController.list);
router.post("/api/v1/create", bicyclesController.create);
router.put("/api/v1/:id/update", bicyclesController.update);
router.delete("/api/v1/:id/delete", bicyclesController.delete);
router.get("/api/v1/:id/show", bicyclesController.show);

module.exports = router;
