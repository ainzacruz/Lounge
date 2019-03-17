module.exports = class ApplicationPolicy {
  // #1
  constructor(user, record) {
    this.user = user;
    this.record = record;
  }

  // #2
  _isOwner() {
    return this.record && this.record.userId == this.user.id;
  }

  _isAdmin() {
    return this.user && this.user.role == "admin";
  }

  // #3
  new() {
    return this.user != null;
  }

  create() {
    return this.new();
  }

  show() {
    return true;
  }

  // #4
  edit() {
    return this.new() && this.record && (this._isOwner() || this._isAdmin());
  }

  update() {
    return this.edit();
  }

  // #5
  destroy() {
    return this.update();
  }
};
