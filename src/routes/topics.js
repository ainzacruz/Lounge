const express = require("express");
const router = express.Router();
const validation = require("./validation");

const topicController = require("../controllers/topicController");

router.get("/topics", topicController.index);

router.get("/topics/new", topicController.new);

router.post(
  "/topics/create",
  validation.validateTopics,
  topicController.create
);

router.get("/topics/:id", topicController.show);

router.post("/topics/:id/destroy", topicController.destroy);

router.get("/topics/:id/edit", validation.validateTopics, topicController.edit);

router.post("/topics/:id/update", topicController.update);

module.exports = router;
