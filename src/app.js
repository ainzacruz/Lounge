const express = require("express"); //require express module
const app = express(); //initialize the app

const routeConfig = require("./config/route-config.js");

routeConfig.init(app);

module.exports = app; //export it so we cna pass into our Node server src/server.js
