const ApplicationPolicy = require("./application");

module.exports = class TopicPolicy extends ApplicationPolicy {
  new() {
    return this._isAdmin();
  }

  create() {
    return this.new();
  }

  edit() {
    return this._isAdmin();
  }

  update() {
    return this.edit();
  }

  destroy() {
    return this.update();
  }
};
