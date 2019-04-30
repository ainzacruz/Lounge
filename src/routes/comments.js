const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const validation = require("./validation");

router.post(
  "/topics/:topicId/posts/:postId/comments/create",
  validation.validateComments,
  commentController.create
);

router.post(
  "/topics/:topicId/posts/:postId/comments/:id/destroy",
  commentController.destroy
);

module.exports = router;
