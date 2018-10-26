import User from '../model/User';
import Key from '../model/Key';
import Account from '../model/Account';
import { NativeModules } from 'react-native';
import AppConstants from '../AppConstants';
import AppConfig from '../AppConfig';
import NdauNodeAPIHelper from '../helpers/NdauNodeAPIHelper';
import sha256 from 'crypto-js/sha256';
import ErrorDialog from '../components/ErrorDialog';
import Wallet from '../model/Wallet';

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
    ErrorDialog.showError(`problem encountered creating root addresses: ${error}`);
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
    ErrorDialog.showError(`problem encountered creating BIP44 addresses: ${error}`);
    throw error;
  }

  return addresses;
};

/**
 * This function will create the initial User
 *
 * @param  {string} recoveryBytes
 * @param  {string} userId
 * @param  {string} chainId=AppConstants.MAINNET_ADDRESS
 * @param  {number} numberOfAccounts=0
 * @returns {User} an initial user object
 */
const createFirstTimeUser = async (
  recoveryBytes,
  userId,
  chainId = AppConstants.MAINNET_ADDRESS,
  numberOfAccounts = 0
) => {
  if (!recoveryBytes) {
    throw new Error('you MUST pass recoveryPhrase to this method');
  }

  try {
    const user = new User();
    user.userId = userId;

    const wallet = await createWallet(recoveryBytes, null, userId, chainId, numberOfAccounts);
    user.wallets[userId] = wallet;

    console.log(`User created is: ${JSON.stringify(user, null, 2)}`);
    return user;
  } catch (error) {
    ErrorDialog.showError(error);
  }
};

/**
 * This function will create a user from the account creation
 * key passed in.
 *
 * @param  {string} recoveryBytes
 * @param  {string} accountCreationKey
 * @param  {string} walletId
 * @param  {string} chainId=AppConstants.MAINNET_ADDRESS
 * @param  {number} numberOfAccounts=0
 * @returns {User} an initial user object
 */
const createWallet = async (
  recoveryBytes,
  accountCreationKey,
  walletId,
  chainId = AppConstants.MAINNET_ADDRESS,
  numberOfAccounts = 0
) => {
  if (!accountCreationKey && !recoveryBytes) {
    throw new Error('you MUST pass either recoveryBytes or accountCreationKey to this method');
  }

  if (!walletId) {
    throw new Error('you MUST pass walletId');
  }

  if (recoveryBytes) {
    accountCreationKey = await _createAccountCreationKey(recoveryBytes);
  }

  try {
    let wallet = new Wallet();
    wallet.walletId = walletId;

    wallet.accountCreationKey = _createKeyHash(accountCreationKey);

    if (numberOfAccounts > 0) {
      await addAccounts(wallet, accountCreationKey, numberOfAccounts, _generateRootPath(), chainId);
    }
    _createInitialKeys(wallet, accountCreationKey);

    console.log(`Wallet created is: ${JSON.stringify(wallet, null, 2)}`);

    return wallet;
  } catch (error) {
    ErrorDialog.showError(error);
  }
};

const addAccountsToUser = async (
  recoveryPhraseBytes,
  user,
  numberOfAccounts,
  rootDerivedPath
) => {
  const wallet = await createWallet(
    recoveryPhraseBytes,
    null,
    user.userId,
    AppConstants.MAINNET_ADDRESS,
    numberOfAccounts
  );
  user.wallets[user.userId] = wallet;

  await addAccounts(
    wallet,
    wallet.keys[wallet.accountCreationKey].privateKey,
    numberOfAccounts,
    rootDerivedPath,
    AppConstants.MAINNET_ADDRESS
  );
};

/**
 * Add accounts to the wallet passed in.
 *
 * @param  {Wallet} wallet to have accounts added
 * @param  {string} accountCreationKey
 * @param  {number} numberOfAccounts to be added
 * @param  {string} rootDerivedPath=_generatedRootPth()
 * @param  {string} chainId=AppConstants.MAINNET_ADDRESS
 */
const addAccounts = async (
  wallet,
  accountCreationKey,
  numberOfAccounts,
  rootDerivedPath,
  chainId = AppConstants.MAINNET_ADDRESS
) => {
  await _createAccounts(numberOfAccounts, accountCreationKey, wallet, rootDerivedPath, chainId);
};

/**
 * create a new account(s) and send back the address created
 * this method must get a valid wallet which has been unlocked from
 * AsyncStorageHelper. Ideally this should be coming from the a
 * navigation property passed around.
 *
 * @param  {User} user
 * @param  {number} numberOfAccounts=1
 */
const createNewAccount = async (user, numberOfAccounts = 1) => {
  const wallet = user.wallets[user.userId];
  if (!wallet.accountCreationKey) {
    throw new Error(`The user's wallet passed in has no accountCreationKey`);
  }

  const accountCreationKey = wallet.keys[wallet.accountCreationKey].privateKey;

  for (let i = 0; i < numberOfAccounts; i++) {
    await _createAccount(accountCreationKey, i, wallet);
  }

  await NdauNodeAPIHelper.populateWalletWithAddressData(wallet);

  return user;
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

const _createInitialKeys = (wallet, accountCreationKey) => {
  wallet.keys[_createKeyHash(accountCreationKey)] = _createKey(
    accountCreationKey,
    null,
    _generateRootPath()
  );
};

const _createKey = (privateKey, publicKey, path) => {
  const newKey = new Key();
  if (privateKey) newKey.privateKey = privateKey;
  if (publicKey) newKey.publicKey = publicKey;
  newKey.derivedFromRoot = AppConstants.DERIVED_ROOT_YES;
  newKey.path = path;
  return newKey.toJSON();
};

const _createAccount = async (
  accountCreationKey,
  childIndex,
  wallet,
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
  account.ownershipKey = _createKeyHash(privateKeyForAddress);

  const privateKeyHash = _createKeyHash(privateKeyForAddress);
  const publicKey = await NativeModules.KeyaddrManager.toPublic(privateKeyForAddress);

  const newKey = _createKey(privateKeyForAddress, publicKey, childPath);
  wallet.keys[privateKeyHash] = newKey;

  const address = await NativeModules.KeyaddrManager.ndauAddress(publicKey, chainId);
  account.address = address;

  wallet.accounts[address] = account;
};

const _createKeyHash = (key) => {
  return sha256(key).toString().substring(0, 8);
};

const _createAccounts = async (
  numberOfAccounts,
  accountCreationKey,
  wallet,
  rootDerivedPath = _generateRootPath(),
  chainId = AppConstants.MAINNET_ADDRESS
) => {
  for (let i = 1; i <= numberOfAccounts; i++) {
    await _createAccount(accountCreationKey, i, wallet, rootDerivedPath, chainId);
  }
  console.log(`Accounts created: ${JSON.stringify(wallet.accounts, null, 2)}`);
};

export default {
  createFirstTimeUser,
  createWallet,
  createNewAccount,
  addAccountsToUser,
  getRootAddresses,
  getBIP44Addresses,
  addAccounts
};
