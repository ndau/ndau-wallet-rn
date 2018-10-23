import Account from '../model/Account';

const hasAccountCreationKey = (user) => {
  return user.accountCreationKey ? true : false;
};

const hasAccountsObject = (user) => {
  return Object.prototype.toString.call(user.accounts) === '[object Object]' ? true : false;
};

const createAccountsFromAddresses = (user) => {
  if (user.addresses && !user.accounts) {
    user.accounts = [];
    user.addresses.forEach((address) => {
      const account = new Account();
      account.address = address;
      user.accounts.push(account);
    });
  }
};

export default {
  hasAccountCreationKey,
  createAccountsFromAddresses,
  hasAccountsObject
};
