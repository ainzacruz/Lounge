// #1
const voteQueries = require("../db/queries.votes.js");

module.exports = {
  upvote(req, res, next) {
    // #2
    if (req.user) {
      voteQueries.createVote(req, 1, (err, vote) => {
        if (err) {
          req.flash("error", err);
        }
        res.redirect(req.headers.referer);
      });

      // #3
    } else {
      req.flash("notice", "You must be signed in to do that.");
      res.redirect(req.headers.referer);
    }
  },
  downvote(req, res, next) {
    if (req.user) {
      voteQueries.createVote(req, -1, (err, vote) => {
        if (err) {
          req.flash("error", err);
        }
        res.redirect(req.headers.referer);
      });
    } else {
      req.flash("notice", "You must be signed in to do that.");
      res.redirect(req.headers.referer);
    }
  }
};
