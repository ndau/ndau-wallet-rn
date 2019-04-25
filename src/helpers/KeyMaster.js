import User from '../model/User'
import Key from '../model/Key'
import Account from '../model/Account'
import { NativeModules } from 'react-native'
import AppConstants from '../AppConstants'
import AppConfig from '../AppConfig'
import AccountAPIHelper from './AccountAPIHelper'
import FlashNotification from '../components/common/FlashNotification'
import Wallet from '../model/Wallet'
import DataFormatHelper from './DataFormatHelper'
import KeyPathHelper from './KeyPathHelper'
import LoggingService from '../services/LoggingService'

/**
 * This function will return an array of addresses that can be
 * used to check the blockchain. Please keep in mind that this method
 * is only for the existence.
 *
 * @deprecated since version 1.8 - this should ONLY be used by the code
 * that is checking fot the older existence of keys
 * @returns {Object} of address:path (ex. {'abcd123':"/44'/20036'/100/1"})
 * @param {string} recoveryBytes string of bytes
 * @param {number} startIndex what index in the derivation path to
 * start searching for addresses
 * @param {number} endIndex what index in the derivation path to
 * end the search for an addresses
 */
const getRootAddresses = async (recoveryBytes, startIndex, endIndex) => {
  if (!recoveryBytes) {
    throw new Error('you MUST pass recoveryBytes')
  }
  const addresses = []

  try {
    const rootPrivateKey = await NativeModules.KeyaddrManager.newKey(
      recoveryBytes
    )

    for (let i = startIndex; i <= endIndex; i++) {
      const derivedKey = await NativeModules.KeyaddrManager.deriveFrom(
        rootPrivateKey,
        '/',
        `/${i}`
      )

      const address = await NativeModules.KeyaddrManager.ndauAddress(derivedKey)

      if (address) {
        addresses[address] = `/${i}`
      }
    }
  } catch (error) {
    FlashNotification.showError(
      `problem encountered creating root addresses: ${error.message}`
    )
    throw error
  }

  return addresses
}

/**
 * This function will return the addresses from the BIP44 compliant
 * path we use for the accountCreationKey. This is used in recovery to check
 * for the existence of an address on the blockchain.
 *
 * @returns {Object} of address:path (ex. {'abcd123':"/44'/20036'/100/1"})
 * @param {string} recoveryBytes string of bytes
 * @param {number} startIndex what index in the derivation path to
 * start searching for addresses
 * @param {number} endIndex what index in the derivation path to
 * end the search for an addresses
 */
const getBIP44Addresses = async (recoveryBytes, startIndex, endIndex) => {
  if (!recoveryBytes) {
    throw new Error('you MUST pass recoveryBytes')
  }
  const addresses = {}

  try {
    const rootPrivateKey = await NativeModules.KeyaddrManager.newKey(
      recoveryBytes
    )
    for (let i = startIndex; i <= endIndex; i++) {
      const derivedKey = await NativeModules.KeyaddrManager.deriveFrom(
        rootPrivateKey,
        '/',
        KeyPathHelper.accountCreationKeyPath() + `/${i}`
      )

      const address = await NativeModules.KeyaddrManager.ndauAddress(derivedKey)

      if (address) {
        addresses[address] = KeyPathHelper.accountCreationKeyPath() + `/${i}`
      }
    }
  } catch (error) {
    FlashNotification.showError(
      `problem encountered creating BIP44 addresses: ${error.message}`
    )
    throw error
  }

  return addresses
}

/**
 * This function will return possible validation keys within a
 * keys object. This is used during recovery of validation keys
 *
 *
 * @param {Wallet} wallet
 * @param {Account} account
 * @param {number} startIndex what index in the derivation path to
 * start searching for validation keys
 * @param {number} endIndex what index in the derivation path to
 * end the search for validation keys
 * @param {boolean} legacy
 */
const getValidationKeys = async (
  wallet,
  account,
  startIndex,
  endIndex,
  legacy
) => {
  const keys = {}

  try {
    for (let i = startIndex; i <= endIndex; i++) {
      if (legacy) {
        const key = await generateLegacyValidationKey(wallet, account, i)
        keys[key.publicKey] = key
      } else {
        const key = await generateValidationKey(wallet, account, i)
        keys[key.publicKey] = key
      }
    }
  } catch (error) {
    FlashNotification.showError(
      `problem encountered creating object of validation public and private keys: ${
        error.message
      }`
    )
    throw error
  }

  return keys
}

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
  numberOfAccounts = 0
) => {
  if (!recoveryBytes) {
    throw new Error('you MUST pass recoveryPhrase to this method')
  }

  try {
    const user = new User()

    if (userId) {
      user.userId = userId

      const wallet = await createWallet(
        recoveryBytes,
        null,
        userId,
        chainId,
        numberOfAccounts
      )
      user.wallets[DataFormatHelper.create8CharHash(userId)] = wallet
    }

    LoggingService.debug(`User initially created is: ${JSON.stringify(user)}`)
    return user
  } catch (error) {
    FlashNotification.showError(error.message)
  }
}

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
  wallet
) => {
  if (!accountCreationKey && !recoveryBytes) {
    throw new Error(
      'you MUST pass either recoveryBytes or accountCreationKey to this method'
    )
  }

  if (!walletId) {
    throw new Error('you MUST pass walletId')
  }

  if (recoveryBytes) {
    accountCreationKey = await _createAccountCreationKey(recoveryBytes)
  }

  try {
    if (!wallet) {
      wallet = new Wallet()
      wallet.walletId = walletId
      wallet.walletName = walletId

      wallet.accountCreationKeyHash = DataFormatHelper.create8CharHash(
        accountCreationKey
      )

      await _createInitialKeys(wallet, accountCreationKey)
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
        recoveryBytes
      )
    }

    LoggingService.debug(`Wallet created is: ${JSON.stringify(wallet)}`)

    return wallet
  } catch (error) {
    FlashNotification.showError(error.message)
  }
}

const getWalletFromUser = (user, walletId) => {
  return user.wallets[DataFormatHelper.create8CharHash(walletId)]
}

const setWalletInUser = (user, wallet) => {
  return (user.wallets[
    DataFormatHelper.create8CharHash(wallet.walletId)
  ] = wallet)
}
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
  recoveryPhraseBytes
) => {
  await _createAccounts(
    numberOfAccounts,
    accountCreationKey,
    wallet,
    rootDerivedPath,
    chainId,
    recoveryPhraseBytes
  )
}

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
    throw new Error(`The user's wallet passed in has no accountCreationKeyHash`)
  }

  const accountCreationKey =
    wallet.keys[wallet.accountCreationKeyHash].privateKey
  const pathIndexIncrementor = DataFormatHelper.getNextPathIndex(
    wallet,
    KeyPathHelper.accountCreationKeyPath()
  )

  for (let i = 0; i < numberOfAccounts; i++) {
    const pathIndex = i + pathIndexIncrementor
    await _createAccount(accountCreationKey, pathIndex, wallet)
  }

  await AccountAPIHelper.populateWalletWithAddressData(wallet)

  return wallet
}

/**
 * This method will generate a key object based on either
 * the nextIndex or a passed in index. This function MUST be used
 * when recovering legacy validation keys. As of the 1.8 ndau wallet
 * we started to SetValidation (or now SetValidation). In doing this
 * we generate a validation key. The key generated in this method
 * is what was used initially. The path of the keys are:
 *
 * /44'/20036'/100/x/44'/20036'/2000/y
 *
 * where x is the accounts index and y will be the validation key
 * index.
 *
 * @param {Wallet} wallet
 * @param {Account} account
 * @param {number} index
 */
const generateLegacyValidationKey = async (wallet, account, index) => {
  if (!index) {
    index = DataFormatHelper.getNextPathIndex(
      wallet,
      KeyPathHelper.legacyValidationKeyPath()
    )
  }
  const keyPath = KeyPathHelper.legacyValidationKeyPath() + `/${index}`

  const validationPrivateKey = await NativeModules.KeyaddrManager.deriveFrom(
    wallet.keys[account.ownershipKey].privateKey,
    '/',
    keyPath
  )

  const validationPublicKey = await NativeModules.KeyaddrManager.toPublic(
    validationPrivateKey
  )

  const actualPath = wallet.keys[account.ownershipKey].path + keyPath
  return _createKey(validationPrivateKey, validationPublicKey, actualPath)
}

/**
 * This is the correct method to use for generating validation keys.
 * The path for a validation key is as follows:
 *
 * `/44'/20036'/100/10000/x/y
 *
 * where x is the accounts index and y will be the validation key index
 *
 * @param {Wallet} wallet
 * @param {Account} account
 * @param {number} index
 */
const generateValidationKey = async (wallet, account, index) => {
  const privateValidationRootKey = await NativeModules.KeyaddrManager.deriveFrom(
    wallet.keys[wallet.accountCreationKeyHash].privateKey,
    KeyPathHelper.accountCreationKeyPath(),
    KeyPathHelper.validationKeyPath()
  )

  const keyPath = KeyPathHelper.getAccountValidationKeyPath(
    wallet,
    account,
    index
  )

  const validationPrivateKey = await NativeModules.KeyaddrManager.deriveFrom(
    privateValidationRootKey,
    KeyPathHelper.getRootAccountValidationKeyPath(wallet, account),
    keyPath
  )

  const validationPublicKey = await NativeModules.KeyaddrManager.toPublic(
    validationPrivateKey
  )

  return _createKey(validationPrivateKey, validationPublicKey, keyPath)
}

/**
 * Create a validation key given the wallet and account passed in.
 * The wallet is updated directly in this function so there is no need
 * for a return arguement.
 *
 * @param {Wallet} wallet
 * @param {Account} account
 */
const addValidationKey = async (wallet, account) => {
  const key = await generateValidationKey(wallet, account)

  addThisValidationKey(account, wallet, key.privateKey, key.publicKey, key.path)
}

const addThisValidationKey = (
  account,
  wallet,
  validationPrivateKey,
  validationPublicKey,
  keyPath
) => {
  if (!keyPath) {
    const nextIndex = DataFormatHelper.getNextPathIndex(
      wallet,
      KeyPathHelper.validationKeyPath()
    )
    keyPath = KeyPathHelper.validationKeyPath() + `/${nextIndex}`
  }
  const validationKeyHash = DataFormatHelper.create8CharHash(
    validationPrivateKey
  )
  wallet.keys[validationKeyHash] = _createKey(
    validationPrivateKey,
    validationPublicKey,
    keyPath
  )
  account.validationKeys.push(validationKeyHash)
}

/**
 * Given the wallet and the key hash, this function will pass back
 * the string representation of the public key found.
 *
 * @param {Wallet} wallet
 * @param {string} hashForKey
 */
const getPublicKeyFromHash = (wallet, hashForKey) => {
  return wallet.keys[hashForKey].publicKey
}

/**
 * Given the wallet and the key hash, this function will pass back
 * the string representation of the private key found.
 *
 * @param {Wallet} wallet
 * @param {string} hashForKey
 */
const getPrivateKeyFromHash = (wallet, hashForKey) => {
  return wallet.keys[hashForKey].privateKey
}

const _createAccountCreationKey = async recoveryBytes => {
  const rootPrivateKey = await NativeModules.KeyaddrManager.newKey(
    recoveryBytes
  )
  const accountCreationKey = await NativeModules.KeyaddrManager.deriveFrom(
    rootPrivateKey,
    '/',
    KeyPathHelper.accountCreationKeyPath()
  )
  return accountCreationKey
}

const _createInitialKeys = async (wallet, accountCreationKey) => {
  const accountCreationPublicKey = await NativeModules.KeyaddrManager.toPublic(
    accountCreationKey
  )
  wallet.keys[
    DataFormatHelper.create8CharHash(accountCreationKey)
  ] = _createKey(
    accountCreationKey,
    accountCreationPublicKey,
    KeyPathHelper.accountCreationKeyPath()
  )
}

const _createKey = (privateKey, publicKey, path) => {
  const newKey = new Key()
  if (privateKey) newKey.privateKey = privateKey
  if (publicKey) newKey.publicKey = publicKey
  newKey.derivedFromRoot = AppConstants.DERIVED_ROOT_YES
  newKey.path = path
  return newKey.toJSON()
}

const _createAccount = async (
  accountCreationKey,
  childIndex,
  wallet,
  rootDerivedPath = KeyPathHelper.accountCreationKeyPath(),
  chainId = AppConstants.MAINNET_ADDRESS,
  recoveryPhraseBytes
) => {
  if (childIndex < 0) {
    throw new Error('You cannot create an index less than zero')
  }
  const account = new Account()

  let correctAccountCreationKey = accountCreationKey
  // So if rootDerivedPath is the empty string ('') then
  // we need to generate accounts at the root of the tree.
  // This was because in version 1.6 we genereated keys at root
  // and not at BIP44. This was fixed in 1.7 and most of our users
  // will have BIP44 addresses. However, there are about 40 or so
  // out there that do have their genesis accounts generated at root
  if (rootDerivedPath === '') {
    const rootPrivateKey = await NativeModules.KeyaddrManager.newKey(
      recoveryPhraseBytes
    )
    correctAccountCreationKey = rootPrivateKey
  }

  const childPath = rootDerivedPath + '/' + childIndex
  const privateKeyForAddress = await NativeModules.KeyaddrManager.child(
    correctAccountCreationKey,
    childIndex
  )
  account.ownershipKey = DataFormatHelper.create8CharHash(privateKeyForAddress)

  const privateKeyHash = DataFormatHelper.create8CharHash(privateKeyForAddress)
  const publicKey = await NativeModules.KeyaddrManager.toPublic(
    privateKeyForAddress
  )

  const newKey = _createKey(privateKeyForAddress, publicKey, childPath)
  wallet.keys[privateKeyHash] = newKey

  const address = await NativeModules.KeyaddrManager.ndauAddress(publicKey)
  account.address = address

  wallet.accounts[address] = account
}

/**
 * This method will create an account from the path and data
 * sent in. This method will support the use of the root private
 * key as well. This is to support generation of some initial wallets
 * at root.
 *
 * @param {Wallet} wallet Wallet where account is added
 * @param {string} derivedPath path to be created
 * @param {string} addressData data to add to the account
 * @param {string} rootPrivateKey If present we use this key and assume it is root
 */
const createAccountFromPath = async (
  wallet,
  derivedPath,
  addressData,
  rootPrivateKey
) => {
  if (!wallet || !derivedPath) {
    throw new Error('You must pass in wallet and derivedPath')
  }
  const account = new Account()

  let privateDerivedKey
  if (rootPrivateKey) {
    // So we must take the derivedPath into consideration and here.
    // The assumption is that this private key passed in is at root
    privateDerivedKey = await NativeModules.KeyaddrManager.deriveFrom(
      rootPrivateKey,
      '/',
      derivedPath
    )
  } else {
    privateDerivedKey = await NativeModules.KeyaddrManager.deriveFrom(
      wallet.keys[wallet.accountCreationKeyHash].privateKey,
      wallet.keys[wallet.accountCreationKeyHash].path,
      derivedPath
    )
  }

  const privateKeyHash = DataFormatHelper.create8CharHash(privateDerivedKey)
  account.ownershipKey = privateKeyHash

  const publicKey = await NativeModules.KeyaddrManager.toPublic(
    privateDerivedKey
  )

  const newKey = _createKey(privateDerivedKey, publicKey, derivedPath)
  wallet.keys[privateKeyHash] = newKey

  const address = await NativeModules.KeyaddrManager.ndauAddress(publicKey)
  account.address = address

  if (addressData) {
    account.addressData = addressData
  }

  wallet.accounts[address] = account
}

const _createAccounts = async (
  numberOfAccounts,
  accountCreationKey,
  wallet,
  rootDerivedPath = KeyPathHelper.accountCreationKeyPath(),
  chainId = AppConstants.MAINNET_ADDRESS,
  recoveryPhraseBytes
) => {
  for (let i = 1; i <= numberOfAccounts; i++) {
    await _createAccount(
      accountCreationKey,
      i,
      wallet,
      rootDerivedPath,
      chainId,
      recoveryPhraseBytes
    )
  }
  LoggingService.debug(`Accounts created: ${JSON.stringify(wallet.accounts)}`)
}

export default {
  createFirstTimeUser,
  createWallet,
  createNewAccount,
  getRootAddresses,
  getBIP44Addresses,
  addAccounts,
  addValidationKey,
  getPublicKeyFromHash,
  getPrivateKeyFromHash,
  getWalletFromUser,
  setWalletInUser,
  getValidationKeys,
  addThisValidationKey,
  generateLegacyValidationKey,
  generateValidationKey,
  createAccountFromPath
}
