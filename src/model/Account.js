class Account {
  constructor() {
    this.address = '';
    this.accountData = {};
  }

  setAddress = (address) => {
    this.address = address;
  };

  setAccountData = (accountData) => {
    this.accountData = accountData;
  };

  toJSON = () => {
    return {
      address: this.address,
      accountData: this.accountData
    };
  };
}

export default Account;
