class User {
  constructor() {
    this.userId = '';
    this.accountCreationKey = '';
    this.accounts = [];
    this.keys = {};
  }

  setUserId = (userId) => {
    this.userId = userId;
  };

  setAccountCreationKey = (accountCreationKey) => {
    this.accountCreationKey = accountCreationKey;
  };

  setAccounts = (accounts) => {
    this.accounts = accounts;
  };

  setKeys = (keys) => {
    this.keys = keys;
  };

  toJSON = () => {
    return {
      userId: this.userId,
      accountCreationKey: this.accountCreationKey,
      accounts: this.accounts,
      keys: this.keys
    };
  };
}

export default User;
