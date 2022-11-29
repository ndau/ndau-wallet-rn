/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import UserStore from '../stores/UserStore';
import MultiSafeHelper from '../helpers/MultiSafeHelper';
import KeyMaster from '../helpers/KeyMaster';
import AccountAPIHelper from './AccountAPIHelper';
import AppConstants from '../AppConstants';
import {NativeModules} from 'react-native';
import DataFormatHelper from './DataFormatHelper';
import KeyPathHelper from './KeyPathHelper';
import Account from '../model/Account';
import Wallet from '../model/Wallet';
import User from '../model/User';
import FlashNotification from '../components/common/FlashNotification';
import LogStore from '../stores/LogStore';

/**
 * This function will persist the user information after any setup is
 * complete. If there is an existing user it should be passed to this
 * function so appropriate information can be gathered from it.
 *
 * @param {User} user
 * @param {string} recoveryPhraseString
 * @param {string} walletId
 * @param {number} numberOfAccounts
 * @param {string} encryptionPassword
 * @param {string} addressType=AppConstants.MAINNET_ADDRESS
 */
const setupNewUser = async (
  user,
  recoveryPhraseString,
  walletId,
  numberOfAccounts,
  entropy,
  encryptionPassword,
  addressType = AppConstants.MAINNET_ADDRESS,
) => {
  if (!user) {
    LogStore.log('Generating all keys from phrase given...');
    const recoveryPhraseAsBytes =
      await NativeModules.KeyaddrManager.keyaddrWordsToBytes(
        AppConstants.APP_LANGUAGE,
        recoveryPhraseString,
      );

    user = await createFirstTimeUser(
      recoveryPhraseAsBytes,
      walletId,
      addressType,
      numberOfAccounts,
    );
  }

  return MultiSafeHelper.saveUser(
    user,
    encryptionPassword,
    recoveryPhraseString,
    walletId,
  );
};

/**
 * This function will create the initial User. If no userId is passed
 * in then you do not get any wallets created.
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
  numberOfAccounts = 0,
) => {
  console.log('inside first user');
  if (!recoveryBytes) {
    throw new Error('you MUST pass recoveryPhrase to this method');
  }

  try {
    const user = new User();

    if (userId) {
      user.userId = userId;

      const wallet = await createWallet(
        recoveryBytes,
        null,
        userId,
        chainId,
        numberOfAccounts,
      );
      console.log(wallet, 'wallet created');
      user.wallets[DataFormatHelper.create8CharHash(userId)] = wallet;
    }

    LogStore.log(`User initially created is: ${JSON.stringify(user)}`);
    return user;
  } catch (error) {
    FlashNotification.showError(error);
  }
};

/**
 * This function simply add a new walletyarn to an existing storageKey
 *
 * @param {User} user
 * @param {string} recoveryPhraseString
 * @param {string} walletId
 * @param {string} storageKey
 * @param {number} numberOfAccounts
 * @param {string} encryptionPassword
 * @param {string} addressType=AppConstants.MAINNET_ADDRESS
 */
const addNewWallet = async (
  user,
  recoveryPhraseString,
  walletId,
  storageKey,
  numberOfAccounts,
  encryptionPassword,
  addressType = AppConstants.MAINNET_ADDRESS,
) => {
  const recoveryPhraseAsBytes =
    await NativeModules.KeyaddrManager.keyaddrWordsToBytes(
      AppConstants.APP_LANGUAGE,
      recoveryPhraseString,
    );

  const wallet = await createWallet(
    recoveryPhraseAsBytes,
    null,
    walletId,
    addressType,
    numberOfAccounts,
  );

  user.wallets[DataFormatHelper.create8CharHash(walletId)] = wallet;

  return MultiSafeHelper.saveUser(
    user,
    encryptionPassword,
    recoveryPhraseString,
    storageKey,
  );
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
 * @param  {Wallet} wallet if a wallet is passed then update the wallet
 * @returns {User} an initial user object
 */
const createWallet = async (
  recoveryBytes,
  accountCreationKey,
  walletId,
  chainId = AppConstants.MAINNET_ADDRESS,
  numberOfAccounts = 0,
  rootDerivedPath,
  wallet,
) => {
  console.log('Inside wallet create');
  if (!accountCreationKey && !recoveryBytes) {
    throw new Error(
      'you MUST pass either recoveryBytes or accountCreationKey to this method',
    );
  }

  if (!walletId) {
    throw new Error('you MUST pass walletId');
  }

  if (recoveryBytes) {
    // console.log("Inside wallet create and inside recoveryBytes",recoveryBytes)
    accountCreationKey = await _createAccountCreationKey(recoveryBytes);
    // console.log("Inside wallet create and  after",accountCreationKey)
  }

  try {
    if (!wallet) {
      wallet = new Wallet();
      wallet.walletId = walletId;
      wallet.walletName = walletId;

      wallet.accountCreationKeyHash =
        DataFormatHelper.create8CharHash(accountCreationKey);

      await _createInitialKeys(wallet, accountCreationKey);
    }

    // This function is used in many ways across the application
    // We want the ability to use this to generate an wallet based on
    // the accountCreateKeyPath. HOWEVER, if we have the scenario where
    // we have the keys for genesis generated at root we have to make
    // sure we genereate addresses and keys accordingly. What this does
    // is creates BIP44 addresses for the amount of root accounts found
    // on the blockchain. The recovery process will create the accounts.
    // This method is to merely create the initial wallet with accountCreateKey
    if (numberOfAccounts > 0) {
      await addAccounts(
        wallet,
        accountCreationKey,
        numberOfAccounts,
        rootDerivedPath === ''
          ? rootDerivedPath
          : KeyPathHelper.accountCreationKeyPath(),
        chainId,
        recoveryBytes,
      );
    }

    LogStore.log(`Wallet created is: ${JSON.stringify(wallet)}`);

    return wallet;
  } catch (error) {
    FlashNotification.showError(error);
  }
};

/**
 * Add accounts to the wallet passed in.
 *
 * @param  {Wallet} wallet to have accounts added
 * @param  {string} accountCreationKey
 * @param  {number} numberOfAccounts to be added
 * @param  {string} rootDerivedPath=_generatedRootPth()
 * @param  {string} chainId=AppConstants.MAINNET_ADDRESS
 * @param  {string} recoveryPhraseBytes
 */
const addAccounts = async (
  wallet,
  accountCreationKey,
  numberOfAccounts,
  rootDerivedPath,
  chainId = AppConstants.MAINNET_ADDRESS,
  recoveryPhraseBytes,
) => {
  await _createAccounts(
    numberOfAccounts,
    accountCreationKey,
    wallet,
    rootDerivedPath,
    chainId,
    recoveryPhraseBytes,
  );
};

const createAccounts = async (wallet, numberOfAccounts = 1) => {
  const password = await UserStore.getPassword();
  const user = await MultiSafeHelper.getDefaultUser(password);
  const newWallet = await createNewAccount(wallet, numberOfAccounts);

  KeyMaster.setWalletInUser(user, newWallet);

  await MultiSafeHelper.saveUser(user, password);

  return newWallet;
};

/**
 * create a new account(s) and send back the address created
 * this method must get a valid wallet which has been retrieved from
 * MultiSafeHelper. Ideally this should be coming from the a
 * navigation property passed around.
 *
 * @param  {Wallet} wallet
 * @param  {number} numberOfAccounts=1
 */
const createNewAccount = async (wallet, numberOfAccounts = 1) => {
  if (!wallet.accountCreationKeyHash) {
    throw new Error(
      `The user's wallet passed in has no accountCreationKeyHash`,
    );
  }

  const accountCreationKey =
    wallet.keys[wallet.accountCreationKeyHash].privateKey;
  const pathIndexIncrementor = DataFormatHelper.getNextPathIndex(
    wallet,
    KeyPathHelper.accountCreationKeyPath(),
  );

  for (let i = 0; i < numberOfAccounts; i++) {
    const pathIndex = i + pathIndexIncrementor;
    await _createAccount(accountCreationKey, pathIndex, wallet);
  }

  await AccountAPIHelper.populateWalletWithAddressData(wallet);

  return wallet;
};

const _createAccount = async (
  accountCreationKey,
  childIndex,
  wallet,
  rootDerivedPath = KeyPathHelper.accountCreationKeyPath(),
  chainId = AppConstants.MAINNET_ADDRESS,
  recoveryPhraseBytes,
) => {
  if (childIndex < 0) {
    throw new Error('You cannot create an index less than zero');
  }
  const account = new Account();

  let correctAccountCreationKey = accountCreationKey;
  // So if rootDerivedPath is the empty string ('') then
  // we need to generate accounts at the root of the tree.
  // This was because in version 1.6 we genereated keys at root
  // and not at BIP44. This was fixed in 1.7 and most of our users
  // will have BIP44 addresses. However, there are about 40 or so
  // out there that do have their genesis accounts generated at root
  if (rootDerivedPath === '') {
    const rootPrivateKey = await NativeModules.KeyaddrManager.newKey(
      recoveryPhraseBytes,
    );
    correctAccountCreationKey = rootPrivateKey;
  }

  const childPath = rootDerivedPath + '/' + childIndex;
  const privateKeyForAddress = await NativeModules.KeyaddrManager.child(
    correctAccountCreationKey,
    childIndex,
  );
  account.ownershipKey = DataFormatHelper.create8CharHash(privateKeyForAddress);

  const privateKeyHash = DataFormatHelper.create8CharHash(privateKeyForAddress);
  const publicKey = await NativeModules.KeyaddrManager.toPublic(
    privateKeyForAddress,
  );

  const newKey = KeyMaster.createKey(
    privateKeyForAddress,
    publicKey,
    childPath,
  );
  wallet.keys[privateKeyHash] = newKey;

  const address = await NativeModules.KeyaddrManager.ndauAddress(publicKey);
  account.address = address;

  wallet.accounts[address] = account;
};

const _createAccounts = async (
  numberOfAccounts,
  accountCreationKey,
  wallet,
  rootDerivedPath = KeyPathHelper.accountCreationKeyPath(),
  chainId = AppConstants.MAINNET_ADDRESS,
  recoveryPhraseBytes,
) => {
  for (let i = 1; i <= numberOfAccounts; i++) {
    await _createAccount(
      accountCreationKey,
      i,
      wallet,
      rootDerivedPath,
      chainId,
      recoveryPhraseBytes,
    );
  }
  LogStore.log(`Accounts created: ${wallet.accounts.length}`);
};

const _createAccountCreationKey = async recoveryBytes => {
  console.log('testing account', recoveryBytes);
  const rootPrivateKey = await NativeModules.KeyaddrManager.newKey(
    recoveryBytes,
  );
  // console.log('rootPrivateKey....',rootPrivateKey) // Ex: npvta8jaftcjecmy3u74b98zndjae2h2a4a7dsfsge7ap48dtkgk2u4b37a7sxkqyaaaaaaaaaaaaa8pzrhby5excg96xvkj837i4zmtrkagqf6ypb3b85wgv9euzivmk2xjy7dkx4f7
  const accountCreationKey = await NativeModules.KeyaddrManager.deriveFrom(
    rootPrivateKey,
    '/',
    KeyPathHelper.accountCreationKeyPath(),
  );
  console.log('accountCreationKey....', accountCreationKey); //  Ex: npvta8jaftcjea6fvmes7hh6jx3q6rjsfizuht3baj32cn8r53npduuzv3dm5ppkka6cqmdsaaaantn2awg7yd8am4wvni6giphe4hnmtvbmsfwp49hsu5fwskbaegti4vp8ki38p87f

  return accountCreationKey;
};

const _createInitialKeys = async (wallet, accountCreationKey) => {
  const accountCreationPublicKey = await NativeModules.KeyaddrManager.toPublic(
    accountCreationKey,
  );
  wallet.keys[DataFormatHelper.create8CharHash(accountCreationKey)] =
    KeyMaster.createKey(
      accountCreationKey,
      accountCreationPublicKey,
      KeyPathHelper.accountCreationKeyPath(),
    );
};

export default {
  setupNewUser,
  addNewWallet,
  createFirstTimeUser,
  createWallet,
  addAccounts,
  createAccounts,
  createNewAccount,
};
