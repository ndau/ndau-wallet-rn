class UserStore {
  constructor() {
    if (!UserStore.instance) {
      this._user = {};
      UserStore.instance = this;
    }

    return UserStore.instance;
  }

  setUser(user) {
    Object.assign(this._user, user);
    console.debug(`UserStore.setUser ${JSON.stringify(this._user, null, 2)}`);
  }

  getUser() {
    console.debug(`UserStore. ${JSON.stringify(this._user, null, 2)}`);
    return this._user;
  }
}

const instance = new UserStore();
Object.freeze(instance);

export default instance;
