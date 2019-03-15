const postQueries = require("../db/queries.posts.js");

module.exports = {
  new(req, res, next) {
    res.render("posts/new", { topicId: req.params.topicId });
  },
  create(req, res, next) {
    let newPost = {
      title: req.body.title,
      body: req.body.body,
      topicId: req.params.topicId
    };
    postQueries.addPost(newPost, (err, post) => {
      if (err) {
        res.redirect(500, "/posts/new");
      } else {
        res.redirect(303, `/topics/${newPost.topicId}/posts/${post.id}`);
      }
    });
  }
};
