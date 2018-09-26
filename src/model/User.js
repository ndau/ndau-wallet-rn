class User {
  constructor() {
    this._userId = '';
    this._accountCreationKey = '';
    this._accounts = [];
    this._keys = {};
  }

  setUserId = (userId) => {
    this._userId = userId;
  };

  setAccountCreationKey = (accountCreationKey) => {
    this._accountCreationKey = accountCreationKey;
  };

  setAccounts = (accounts) => {
    this._accounts = accounts;
  };

  setKeys = (keys) => {
    this._keys = keys;
  };

  toJSON = () => {
    JSON.stringify(JSON.parse(this), null, 2);
  };
}

export default User;
