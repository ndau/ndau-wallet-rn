class User {
  constructor() {
    this.userId = '';
    this.accountCreationKey = '';
    this.accounts = [];
    this.keys = {};

    //This is to satisfy the initial pre Genesis folks
    //Once we use accounts, we are post Genesis and everyone
    //has claimed their accounts we can think about removing this
    this.addresses = [];
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

  setAddresses = (addresses) => {
    this.addresses = addresses;
  };

  toJSON = () => {
    return {
      userId: this.userId,
      accountCreationKey: this.accountCreationKey,
      accounts: this.accounts,
      keys: this.keys,
      addresses: this.addresses
    };
  };
}

export default User;
