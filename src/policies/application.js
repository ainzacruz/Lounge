module.exports = class ApplicationPolicy {
  constructor(user, record) {
    this.user = user;
    this.record = record;
  }

  _isOwner() {
    // THIS.RECORD.USERID AND THIS.USER.ID ARE DIFFERENT NUMBERS EVEN THOUGH THEY SHOULD BE THE SAME
    return this.user && this.record && this.record.userId == this.user.id;
  }

  _isAdmin() {
    return this.user && this.user.role == "admin";
  }

  new() {
    return this.user != null;
  }

  create() {
    return this.new();
  }

  show() {
    return true;
  }

  edit() {
    return this.new() && this.record && (this._isOwner() || this._isAdmin());
  }

  update() {
    return this.edit();
  }

  destroy() {
    return this.update();
  }
};
