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
  },
  getPost(id, callback) {
    return Post.findById(id)
      .then(post => {
        callback(null, post);
      })
      .catch(err => {
        callback(err);
      });
  },
  show(req, res, next) {
    postQueries.getPost(req.params.id, (err, post) => {
      if (err || post == null) {
        res.redirect(404, "/");
      } else {
        res.render("posts/show", { post });
      }
    });
  },
  destroy(req, res, next) {
    postQueries.deletePost(req.params.id, (err, deletedRecordsCount) => {
      if (err) {
        res.redirect(
          500,
          `/topics/${req.params.topicId}/posts/${req.params.id}`
        );
      } else {
        res.redirect(303, `/topics/${req.params.topicId}`);
      }
    });
  }
};
