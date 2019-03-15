const express = require("express");
const router = express.Router();

const topicController = require("../controllers/topicController");

router.get("/topics", topicController.index);
router.get("/topics/new", topicController.new);
router.post("/topics/create", topicController.create);
router.get("/topics/:id", topicController.show);
router.post("/topics/:id/destroy", topicController.destroy);

module.exports = router;
