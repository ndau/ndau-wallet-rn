class Account {
  constructor() {
    this.address = '';
    this.accountData = {};
  }

  toJSON = () => {
    return {
      address: this.address,
      accountData: this.accountData
    };
  };
}

export default Account;
