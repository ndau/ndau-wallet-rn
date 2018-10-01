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
