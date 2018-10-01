import User from '../model/User';
import Key from '../model/Key';
import Account from '../model/Account';
import { NativeModules } from 'react-native';
import AppConstants from '../AppConstants';

// This function will create the initial User
const createFirstTimeUser = async (
  userId,
  recoveryBytes,
  chainId = AppConstants.MAINNET_ADDRESS,
  numberOfAccounts = 0
) => {
  if (!userId || !recoveryBytes) {
    throw new Error('you MUST pass userId, recoveryPhrase to this method');
  }

  try {
    const user = new User();
    user.userId = userId;

    const accountCreationKey = await _createAccountCreationKey(recoveryBytes);
    user.accountCreationKey = accountCreationKey;
    user.keys = _createInitialKeys(accountCreationKey);
    if (numberOfAccounts > 0) {
      user.accounts = await _createAccounts(numberOfAccounts, accountCreationKey, user, chainId);

      const addresses = user.accounts.map((value) => {
        return value.address;
      });
      user.addresses = addresses;
    }

    return user;
  } catch (error) {
    console.error(error);
  }
};

//create a new account and send back the address created
//this method must get a valid user which has been unlocked from
//AsyncStorageHelper. Ideally this should be coming from the a
//navigation property passed around
const createNewAccount = async (user) => {
  if (!user.accountCreationKey) {
    throw new Error(`The user passed in has no accountCreationKey`);
  }

  const account = await _createAccount(user.accountCreationKey, user.accounts.length - 1, user);
  user.accounts.push(account);

  return account;
};

const _createAccountCreationKey = async (recoveryBytes) => {
  const rootPrivateKey = await NativeModules.KeyaddrManager.newKey(recoveryBytes);
  const accountCreationKey = await NativeModules.KeyaddrManager.deriveFrom(
    rootPrivateKey,
    '/',
    _generateRootPath()
  );
  return accountCreationKey;
};

const _generateRootPath = () => {
  const returnValue =
    '/' +
    AppConstants.HARDENED_CHILD_BIP_44 +
    "'" +
    '/' +
    AppConstants.NDAU_CONSTANT +
    "'" +
    '/' +
    AppConstants.ACCOUNT_CREATION_KEY_CHILD;

  return returnValue;
};

const _createInitialKeys = (accountCreationKey) => {
  let returnValue = {};
  returnValue[accountCreationKey] = _createKey(accountCreationKey, _generateRootPath());

  return returnValue;
};

const _createKey = (key, path) => {
  const newKey = new Key();
  newKey.key = key;
  newKey.derivedFromRoot = AppConstants.DERIVED_ROOT_YES;
  newKey.path = path;
  return newKey.toJSON();
};

const _createAccount = async (
  accountCreationKey,
  childIndex,
  user,
  chainId = AppConstants.MAINNET_ADDRESS
) => {
  if (childIndex < 0) {
    throw new Error('You cannot create an index less than zero');
  }
  const account = new Account();
  const childPath = _generateRootPath() + '/' + childIndex;

  const privateKeyForAddress = await NativeModules.KeyaddrManager.child(
    accountCreationKey,
    childIndex
  );
  const newKey = _createKey(privateKeyForAddress, childPath);

  user.keys[privateKeyForAddress] = newKey;

  const publicKey = await NativeModules.KeyaddrManager.toPublic(privateKeyForAddress);
  const newPublicKey = _createKey(publicKey, childPath);
  user.keys[publicKey] = newPublicKey;

  const address = await NativeModules.KeyaddrManager.ndauAddress(publicKey, chainId);
  account.address = address;
  return account;
};

const _createAccounts = async (
  numberOfAccounts,
  accountCreationKey,
  user,
  chainId = AppConstants.MAINNET_ADDRESS
) => {
  const accounts = [];
  for (let i = 1; i <= numberOfAccounts; i++) {
    const account = await _createAccount(accountCreationKey, i, user, chainId);
    accounts.push(account);
  }
  return accounts;
};

export default {
  createFirstTimeUser,
  createNewAccount
};
