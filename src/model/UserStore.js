//This is a singleton store to house a user
//for use throughout the application. The
//format of a user is as follows:
//
// {
//   "userId": "7MP-4FV",
//   "addresses": [
//     "tnai24puxki6s4zqyy7ebizgcviw2ui9z9x98pmah5n3ynmz",
//     "tnarpmwz3yxxyk7fdgiu2irmvatygg5u8nrg735xcu5ezezv"
//   ],
//   "selectedNode": "Storrow"
// }
class UserStore {
  constructor() {
    if (!UserStore.instance) {
      this._user = {};
      UserStore.instance = this;
    }

    return UserStore.instance;
  }

  setUser(user) {
    console.debug(`attempting to set ${JSON.stringify(user, null, 2)}`);
    Object.assign(this._user, user);
    console.debug(`UserStore.setUser ${JSON.stringify(this._user, null, 2)}`);
  }

  getUser() {
    console.debug(`UserStore. ${JSON.stringify(this._user, null, 2)}`);
    return this._user;
  }
}

const instance = new UserStore();

export default instance;
