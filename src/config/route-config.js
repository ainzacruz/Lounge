//export an object with a function called init which loads the defined routes and defines them on express app object
module.exports = {
  init(app) {
    const staticRoutes = require("../routes/static");
    const postRoutes = require("../routes/posts");
    const topicRoutes = require("../routes/topics");
    const flairRoutes = require("../routes/flairs");
    const userRoutes = require("../routes/users");
    const commentRoutes = require("../routes/comments");
    const voteRoutes = require("../routes/votes");
    const favoriteRoutes = require("../routes/favorites");

    if (process.env.NODE_ENV === "test") {
      const mockAuth = require("../../spec/support/mock-auth.js");
      mockAuth.fakeIt(app);
    }

    app.use(staticRoutes);
    app.use(postRoutes);
    app.use(topicRoutes);
    app.use(flairRoutes);
    app.use(userRoutes);
    app.use(commentRoutes);
    app.use(voteRoutes);
    app.use(favoriteRoutes);
  }
};
