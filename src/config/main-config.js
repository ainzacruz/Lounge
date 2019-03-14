//configure all middleware for this application
require("dotenv").config(); //Node package that assists us with handling environment variables for dev environment
const path = require("path"); //require path module
const viewsFolder = path.join(__dirname, "..", "views"); //set path where the templating engine will find the views and set it on Express application

//modify init with parameters to hold our express app.
module.exports = {
  init(app, express) {
    app.set("views", viewsFolder); //mount the view engine and tell express where to fidn the static assets
    app.set("view engine", "ejs");
    app.use(express.static(path.join(__dirname, "..", "assets")));
  }
};
