import User from '../model/User'
import Key from '../model/Key'
import Account from '../model/Account'
import { NativeModules } from 'react-native'
import AppConstants from '../AppConstants'
import AppConfig from '../AppConfig'
import NdauNodeAPIHelper from '../helpers/NdauNodeAPIHelper'
import sha256 from 'crypto-js/sha256'
import FlashNotification from '../components/FlashNotification'
import Wallet from '../model/Wallet'
import DataFormatHelper from '../helpers/DataFormatHelper'
import KeyPathHelper from '../helpers/KeyPathHelper'

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
const getRootAddresses = async recoveryBytes => {
  if (!recoveryBytes) {
    throw new Error('you MUST pass recoveryBytes')
  }
  const addresses = []

  try {
    const rootPrivateKey = await NativeModules.KeyaddrManager.newKey(
      recoveryBytes
    )

    for (let i = 1; i <= AppConfig.NUMBER_OF_KEYS_TO_GRAB_ON_RECOVERY; i++) {
      const derivedKey = await NativeModules.KeyaddrManager.deriveFrom(
        rootPrivateKey,
        '/',
        `/${i}`
      )

      console.debug(`root derivedKey: ${derivedKey}`)

      const address = await NativeModules.KeyaddrManager.ndauAddress(
        derivedKey,
        AppConstants.MAINNET_ADDRESS
      )

      console.debug(`root address: ${address}`)

      addresses.push(address)
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
 * @param {string} recoveryBytes string of bytes
 */
const getBIP44Addresses = async recoveryBytes => {
  if (!recoveryBytes) {
    throw new Error('you MUST pass recoveryBytes')
  }
  const addresses = []

  try {
    const rootPrivateKey = await NativeModules.KeyaddrManager.newKey(
      recoveryBytes
    )
    for (let i = 1; i <= AppConfig.NUMBER_OF_KEYS_TO_GRAB_ON_RECOVERY; i++) {
      const derivedKey = await NativeModules.KeyaddrManager.deriveFrom(
        rootPrivateKey,
        '/',
        KeyPathHelper.accountCreationKeyPath() + `/${i}`
      )

      console.debug(`BIP44 derivedKey: ${derivedKey}`)

      const address = await NativeModules.KeyaddrManager.ndauAddress(
        derivedKey,
        AppConstants.MAINNET_ADDRESS
      )

      console.debug(`BIP44 address: ${address}`)
      addresses.push(address)
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

    console.log(`User created is: ${JSON.stringify(user, null, 2)}`)
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
    let wallet = new Wallet()
    wallet.walletId = walletId

    wallet.accountCreationKeyHash = DataFormatHelper.create8CharHash(
      accountCreationKey
    )

    if (numberOfAccounts > 0) {
      await addAccounts(
        wallet,
        accountCreationKey,
        numberOfAccounts,
        KeyPathHelper.accountCreationKeyPath(),
        chainId
      )
    }
    _createInitialKeys(wallet, accountCreationKey)

    console.log(`Wallet created is: ${JSON.stringify(wallet, null, 2)}`)

    return wallet
  } catch (error) {
    FlashNotification.showError(error.message)
  }
}

const addAccountsToUser = async (
  recoveryPhraseBytes,
  user,
  numberOfAccounts,
  rootDerivedPath,
  walletId
) => {
  const wallet = await createWallet(
    recoveryPhraseBytes,
    null,
    walletId,
    AppConstants.MAINNET_ADDRESS,
    numberOfAccounts
  )
  user.wallets[DataFormatHelper.create8CharHash(walletId)] = wallet

  await addAccounts(
    wallet,
    wallet.keys[wallet.accountCreationKeyHash].privateKey,
    numberOfAccounts,
    rootDerivedPath,
    AppConstants.MAINNET_ADDRESS
  )
}

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
  await _createAccounts(
    numberOfAccounts,
    accountCreationKey,
    wallet,
    rootDerivedPath,
    chainId
  )
}

/**
 * create a new account(s) and send back the address created
 * this method must get a valid wallet which has been retrieved from
 * MultiSafeHelper. Ideally this should be coming from the a
 * navigation property passed around.
 *
 * @param  {User} user
 * @param  {number} numberOfAccounts=1
 */
const createNewAccount = async (user, numberOfAccounts = 1) => {
  // TODO: FOR NOW WE HARDCODE to the first wallet
  // I have done this as this will all change in MVP where
  // we will have the ability to add accounts to specific
  // wallets. This meets the need for the Genesis release
  const wallet = user.wallets[Object.keys(user.wallets)[0]]
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

  await NdauNodeAPIHelper.populateWalletWithAddressData(wallet)

  return user
}

const addValidationKey = async (wallet, account) => {
  const nextIndex = DataFormatHelper.getNextPathIndex(
    wallet,
    KeyPathHelper.validationKeyPath()
  )
  const keyPath = KeyPathHelper.validationKeyPath() + `/${nextIndex}`

  const validationPrivateKey = await NativeModules.KeyaddrManager.deriveFrom(
    wallet.keys[account.ownershipKey].privateKey,
    '/',
    keyPath
  )

  const validationPublicKey = await NativeModules.KeyaddrManager.toPublic(
    validationPrivateKey
  )

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

const _createInitialKeys = (wallet, accountCreationKey) => {
  wallet.keys[
    DataFormatHelper.create8CharHash(accountCreationKey)
  ] = _createKey(
    accountCreationKey,
    null,
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
  chainId = AppConstants.MAINNET_ADDRESS
) => {
  if (childIndex < 0) {
    throw new Error('You cannot create an index less than zero')
  }
  const account = new Account()

  const childPath = rootDerivedPath + '/' + childIndex
  const privateKeyForAddress = await NativeModules.KeyaddrManager.child(
    accountCreationKey,
    childIndex
  )
  account.ownershipKey = DataFormatHelper.create8CharHash(privateKeyForAddress)

  const privateKeyHash = DataFormatHelper.create8CharHash(privateKeyForAddress)
  const publicKey = await NativeModules.KeyaddrManager.toPublic(
    privateKeyForAddress
  )

  const newKey = _createKey(privateKeyForAddress, publicKey, childPath)
  wallet.keys[privateKeyHash] = newKey

  const address = await NativeModules.KeyaddrManager.ndauAddress(
    publicKey,
    chainId
  )
  account.address = address

  wallet.accounts[address] = account
}

const _createAccounts = async (
  numberOfAccounts,
  accountCreationKey,
  wallet,
  rootDerivedPath = KeyPathHelper.accountCreationKeyPath(),
  chainId = AppConstants.MAINNET_ADDRESS
) => {
  for (let i = 1; i <= numberOfAccounts; i++) {
    await _createAccount(
      accountCreationKey,
      i,
      wallet,
      rootDerivedPath,
      chainId
    )
  }
  console.log(`Accounts created: ${JSON.stringify(wallet.accounts, null, 2)}`)
}

export default {
  createFirstTimeUser,
  createWallet,
  createNewAccount,
  addAccountsToUser,
  getRootAddresses,
  getBIP44Addresses,
  addAccounts,
  addValidationKey
}
