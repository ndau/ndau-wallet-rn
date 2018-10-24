import Account from '../model/Account';

/**
 * Assumption here is that either there is no user.accountCreationKey
 * or we are at version 1.8 and the data format has changed to user.wallets.
 * In the former case we can assume we have an account creation key in the wallets
 *
 * @param {User} user
 */
const hasAccountCreationKey = (user) => {
  return user.accountCreationKey || user.wallets ? true : false;
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
