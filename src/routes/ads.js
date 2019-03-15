const express = require("express");
const router = express.Router();

const adsController = require("../controllers/adsController");

router.get("/ads", adsController.index);
router.get("/ads/new", adsController.new);
router.post("/ads/create", adsController.create);
router.get("/ads/:id", adsController.show);
router.post("/ads/:id/destroy", adsController.destroy);
router.get("/ads/:id/edit", adsController.edit);
router.post("/ads/:id/update", adsController.update);

module.exports = router;
