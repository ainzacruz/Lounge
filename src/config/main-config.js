//configure all middleware for this application
require("dotenv").config(); //Node package that assists us with handling environment variables for dev environment
const path = require("path"); //require path module
const viewsFolder = path.join(__dirname, "..", "views"); //set path where the templating engine will find the views and set it on Express application
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const session = require("express-session");
const flash = require("express-flash");
const passportConfig = require("./passport-config");

//modify init with parameters to hold our express app.
module.exports = {
  init(app, express) {
    app.set("views", viewsFolder); //mount the view engine and tell express where to fidn the static assets
    app.set("view engine", "ejs");
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, "..", "assets")));
    app.use(expressValidator());
    app.use(
      session({
        secret: process.env.cookieSecret,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1.21e9 } //set cookie to expire in 14 days
      })
    );
    app.use(flash());
    passportConfig.init(app);
    app.use((req, res, next) => {
      res.locals.currentUser = req.user;
      next();
    });
  }
};
