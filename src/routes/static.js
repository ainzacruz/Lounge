const express = require("express");
const router = express.Router(); //Router instance from express app
const staticController = require("../controllers/staticController");

// //define our routes
// router.get("/", (req, res, next) => {
//   res.send("Welcome to foundit!");
// });
router.get("/", staticController.index);
router.get("/about", staticController.about);
module.exports = router;
