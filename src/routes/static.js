const express = require("express");
const router = express.Router(); //Router instance from express app
const staticController = require("../controllers/staticController");

router.get("/", staticController.index);
module.exports = router;
