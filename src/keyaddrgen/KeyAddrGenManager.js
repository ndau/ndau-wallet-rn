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
      user.accounts = await _createAccounts(numberOfAccounts, accountCreationKey, chainId, user);

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

const _createAccounts = async (numberOfAccounts, accountCreationKey, chainId, user) => {
  const accounts = [];
  for (let i = 1; i <= numberOfAccounts; i++) {
    const account = new Account();
    const childPath = _generateRootPath() + '/' + i;

    const privateKeyForAddress = await NativeModules.KeyaddrManager.child(accountCreationKey, i);
    const newKey = _createKey(privateKeyForAddress, childPath);

    user.keys[privateKeyForAddress] = newKey;

    const publicKey = await NativeModules.KeyaddrManager.toPublic(privateKeyForAddress);
    const newPublicKey = _createKey(publicKey, childPath);
    user.keys[publicKey] = newPublicKey;

    const address = await NativeModules.KeyaddrManager.ndauAddress(publicKey, chainId);
    account.address = address;
    accounts.push(account);
  }
  return accounts;
};

export default {
  createFirstTimeUser
};
