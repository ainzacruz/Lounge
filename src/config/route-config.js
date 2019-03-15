//export an object with a function called init which loads the defined routes and defines them on express app object
module.exports = {
  init(app) {
    const staticRoutes = require("../routes/static");
    const postRoutes = require("../routes/posts");
    const topicRoutes = require("../routes/topics");
    const flairRoutes = require("../routes/flairs");

    app.use(staticRoutes);
    app.use(postRoutes);
    app.use(topicRoutes);
    app.use(flairRoutes);
  }
};
