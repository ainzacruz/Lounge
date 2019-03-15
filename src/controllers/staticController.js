module.exports = {
  index(req, res, next) {
    res.render("static/index", { title: "Welcome to foundit!" });
  },
  about(req, res, next) {
    res.render("static/about", { title: "Learn about Us" });
  }
};
