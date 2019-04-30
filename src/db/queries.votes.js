const Comment = require("./models").Comment;
const Post = require("./models").Post;
const User = require("./models").User;
const Vote = require("./models").Vote;

module.exports = {
  createVote(req, val, callback) {
    return Vote.findOne({
      where: {
        postId: req.params.postId,
        userId: req.user.id
      }
    }).then(vote => {
      if (vote) {
        vote.value = val;
        vote
          .save()
          .then(vote => {
            callback(null, vote);
          })
          .catch(err => {
            callback(err);
          });
      } else {
        Vote.create({
          value: val,
          postId: req.params.postId,
          userId: req.user.id
        })
          .then(vote => {
            callback(null, vote);
          })
          .catch(err => {
            callback(err);
          });
      }
    });
  }
};
