import User from '../model/User';
import Key from '../model/Key';
import Account from '../model/Account';
import { NativeModules } from 'react-native';
import AppConstants from '../AppConstants';
import AppConfig from '../AppConfig';

/**
 * This function will return an array of addresses that can be
 * used to check the blockchain. Please keep in mind that this method
 * is only for the existence.
 *
 * @deprecated since version 1.8 - this should ONLY be used by the code
 * that is checking fot the older existence of keys
 * @returns {(string|Array)} of addresses
 * @param {string} recoveryBytes string of bytes
 */
const getRootAddresses = async (recoveryBytes) => {
  if (!recoveryBytes) {
    throw new Error('you MUST pass recoveryBytes');
  }
  const addresses = [];

  try {
    const rootPrivateKey = await NativeModules.KeyaddrManager.newKey(recoveryBytes);

    for (let i = 1; i <= AppConfig.NUMBER_OF_KEYS_TO_GRAB_ON_RECOVERY; i++) {
      const privateRootKey = await NativeModules.KeyaddrManager.deriveFrom(
        rootPrivateKey,
        '/',
        `/${i}`
      );

      const address = await NativeModules.KeyaddrManager.ndauAddress(
        privateRootKey,
        AppConstants.MAINNET_ADDRESS
      );
      addresses.push(address);
    }
  } catch (error) {
    console.error(`problem encountered creating root addresses: ${error}`);
    throw error;
  }

  return addresses;
};

/**
 * This function will return the addresses from the BIP44 compliant
 * path we use for the accountCreationKey. This is used in recovery to check
 * for the existence of an address on the blockchain.
 *
 * @param {string} recoveryBytes string of bytes
 */
const getBIP44Addresses = async (recoveryBytes) => {
  if (!recoveryBytes) {
    throw new Error('you MUST pass recoveryBytes');
  }
  const addresses = [];

  try {
    const rootPrivateKey = await NativeModules.KeyaddrManager.newKey(recoveryBytes);
    for (let i = 1; i <= AppConfig.NUMBER_OF_KEYS_TO_GRAB_ON_RECOVERY; i++) {
      const privateRootKey = await NativeModules.KeyaddrManager.deriveFrom(
        rootPrivateKey,
        '/',
        _generateRootPath() + `/${i}`
      );

      const address = await NativeModules.KeyaddrManager.ndauAddress(
        privateRootKey,
        AppConstants.MAINNET_ADDRESS
      );
      addresses.push(address);
    }
  } catch (error) {
    console.error(`problem encountered creating BIP44 addresses: ${error}`);
    throw error;
  }

  return addresses;
};

/**
 * This function will create the initial User
 *
 * @param  {string} userId
 * @param  {string} recoveryBytes
 * @param  {string} chainId=AppConstants.MAINNET_ADDRESS
 * @param  {number} numberOfAccounts=0
 * @returns {User} an initial user object
 */
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
      user = addAccounts(user, numberOfAccounts, _generateRootPath(), chainId);
    }

    return user;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Add accounts to the user passed in.
 *
 * @param  {User} user to have accounts added
 * @param  {number} numberOfAccounts to be added
 * @param  {string} rootDerivedPath=_generatedRootPth()
 * @param  {string} chainId=AppConstants.MAINNET_ADDRESS
 * @return {User} an altered user object
 */
const addAccounts = async (
  user,
  numberOfAccounts,
  rootDerivedPath,
  chainId = AppConstants.MAINNET_ADDRESS
) => {
  const accounts = await _createAccounts(
    numberOfAccounts,
    user.accountCreationKey,
    user,
    rootDerivedPath,
    chainId
  );
  Array.prototype.push.apply(user.accounts, accounts);

  const addresses = accounts.map((value) => {
    return value.address;
  });
  Array.prototype.push.apply(user.addresses, addresses);

  return user;
};

/**
 * create a new account and send back the address created
 * this method must get a valid user which has been unlocked from
 * AsyncStorageHelper. Ideally this should be coming from the a
 * navigation property passed around.
 *
 * @param  {string} user
 */
const createNewAccount = async (user) => {
  if (!user.accountCreationKey) {
    throw new Error(`The user passed in has no accountCreationKey`);
  }

  const account = await _createAccount(
    user.accountCreationKey,
    user.accounts.length === 0 ? 1 : user.accounts.length - 1,
    user
  );
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
  rootDerivedPath = _generateRootPath(),
  chainId = AppConstants.MAINNET_ADDRESS
) => {
  if (childIndex < 0) {
    throw new Error('You cannot create an index less than zero');
  }
  const account = new Account();
  const childPath = rootDerivedPath + '/' + childIndex;

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
  rootDerivedPath = _generateRootPath(),
  chainId = AppConstants.MAINNET_ADDRESS
) => {
  const accounts = [];
  for (let i = 1; i <= numberOfAccounts; i++) {
    const account = await _createAccount(accountCreationKey, i, user, rootDerivedPath, chainId);
    accounts.push(account);
  }
  return accounts;
};

export default {
  createFirstTimeUser,
  createNewAccount,
  getRootAddresses,
  getBIP44Addresses,
  addAccounts
};
