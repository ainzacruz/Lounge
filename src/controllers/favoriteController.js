// #1
const favoriteQueries = require("../db/queries.favorites.js");

module.exports = {
  // #2
  create(req, res, next) {
    if (req.user) {
      favoriteQueries.createFavorite(req, (err, favorite) => {
        if (err) {
          req.flash("error", err);
        }
      });
    } else {
      req.flash("notice", "You must be signed in to do that.");
    }
    res.redirect(req.headers.referer);
  },

  // #3
  destroy(req, res, next) {
    if (req.user) {
      favoriteQueries.deleteFavorite(req, (err, favorite) => {
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
