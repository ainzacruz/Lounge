const ApplicationPolicy = require("./application");

module.exports = class FavoritePolicy extends ApplicationPolicy {
  destroy() {
    return this._isOwner();
  }
};
