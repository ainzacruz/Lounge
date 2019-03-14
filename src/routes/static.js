const express = require("express");
const router = express.Router(); //Router instance from express app

//define our routes
router.get("/", (req, res, next) => {
  res.send("Welcome to foundit!");
});

router.get("/marco", (req, res, next) => {
  res.send("polo");
});

module.exports = router;
