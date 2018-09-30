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
    user.setUserId(userId);

    const accountCreationKey = await _createAccountCreationKey(recoveryBytes);
    user.setAccountCreationKey(accountCreationKey);
    user.setKeys(_createInitialKeys(accountCreationKey));
    if (numberOfAccounts > 0) {
      user.setAccounts(await _createAccounts(numberOfAccounts, accountCreationKey, chainId, user));

      const addresses = user.accounts.map((value) => {
        return value.address;
      });
      user.setAddresses(addresses);
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
  const key = new Key();
  key.setKey(accountCreationKey);
  key.setDerivedFromRoot(AppConstants.DERIVED_ROOT_YES);
  key.setPath(_generateRootPath());
  let returnValue = {};
  returnValue[accountCreationKey] = key.toJSON();

  return returnValue;
};

const _createKey = (key, path) => {
  let newKey = new Key();
  newKey.setKey(key);
  newKey.setDerivedFromRoot(AppConstants.DERIVED_ROOT_YES);
  newKey.setPath(path);
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
    console.log(`newPublicKey: ${newPublicKey}`);
    user.keys[publicKey] = newPublicKey;

    const address = await NativeModules.KeyaddrManager.ndauAddress(publicKey, chainId);
    account.setAddress(address);
    accounts.push(account);
  }
  return accounts;
};

export default {
  createFirstTimeUser
};
