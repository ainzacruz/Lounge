const express = require("express"); //require express module
const app = express(); //initialize the app

const routeConfig = require("./config/route-config.js");
const appConfig = require("./config/main-config.js");

appConfig.init(app, express);
routeConfig.init(app);

module.exports = app; //export it so we cna pass into our Node server src/server.js
