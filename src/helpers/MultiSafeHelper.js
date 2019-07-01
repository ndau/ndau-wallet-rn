import User from '../model/User'
import KeyMaster from './KeyMaster'
import AppConstants from '../AppConstants'
import { NativeModules } from 'react-native'
import MultiSafe from '../model/MultiSafe'
import DataFormatHelper from './DataFormatHelper'
import LogStore from '../stores/LogStore'
// ATTENTION - DO NOT REMOVE THIS COMMENTED CODE!
// IF YOU WOULD LIKE TO TEST LOG USER DATA UNCOMMENT THIS
// import UserTestData from './UserTestData'

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
  encryptionPassword,
  addressType = AppConstants.MAINNET_ADDRESS
) => {
  if (!user) {
    LogStore.log('Generating all keys from phrase given...')
    const recoveryPhraseAsBytes = await NativeModules.KeyaddrManager.keyaddrWordsToBytes(
      AppConstants.APP_LANGUAGE,
      recoveryPhraseString
    )

    user = await KeyMaster.createFirstTimeUser(
      recoveryPhraseAsBytes,
      walletId,
      addressType,
      numberOfAccounts
    )
  }

  return _internalSaveUser(
    user,
    encryptionPassword,
    walletId,
    recoveryPhraseString
  )
}

/**
 * Check to see if the userId and recoveryPhrase pased in
 * exists in the wallet. If it does then we send back true
 * @param {string} userId User.userId
 * @param {string} recoveryPhrase 12 words phrase/combo
 */
const recoveryPhraseAlreadyExists = async (userId, recoveryPhrase) => {
  const multiSafe = new MultiSafe()

  try {
    return await multiSafe.doesMultiSafeExist(
      userId.replace(/\s+/g, ''),
      recoveryPhrase
    )
  } catch (error) {}
  return false
}

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
  addressType = AppConstants.MAINNET_ADDRESS
) => {
  const recoveryPhraseAsBytes = await NativeModules.KeyaddrManager.keyaddrWordsToBytes(
    AppConstants.APP_LANGUAGE,
    recoveryPhraseString
  )

  const wallet = await KeyMaster.createWallet(
    recoveryPhraseAsBytes,
    null,
    walletId,
    addressType,
    numberOfAccounts
  )

  user.wallets[DataFormatHelper.create8CharHash(walletId)] = wallet

  return _internalSaveUser(
    user,
    encryptionPassword,
    storageKey,
    recoveryPhraseString
  )
}

const _internalSaveUser = async (
  user,
  encryptionPassword,
  walletId,
  recoveryPhraseString
) => {
  const multiSafe = new MultiSafe()

  LogStore.log(
    `Persisting key ${walletId} into MultiSafe: ${JSON.stringify(user)}`
  )

  // create a multisafe
  await multiSafe.create(walletId.replace(/\s+/g, ''), encryptionPassword)
  // store the phone data
  await multiSafe.store(user, encryptionPassword)
  // add recovery phrase as combination so we can unlock with this
  if (recoveryPhraseString) {
    await multiSafe.addCombination(recoveryPhraseString, encryptionPassword)
  }

  return user
}

/**
 * This passes back the default user. At this time the default user
 * is the first user in the phoneData object.
 *
 * If you are in UserTestData.user is defined then
 * have the wallet use that as its user
 *
 * @param {string} encryptionPassword any password combination to get at phoneData
 */
const getDefaultUser = async encryptionPassword => {
  // ATTENTION - DO NOT REMOVE THIS COMMENTED CODE!
  // IF YOU WOULD LIKE TO TEST LOG USER DATA UNCOMMENT THIS
  // if (UserTestData) {
  //   return UserTestData
  // }

  const multiSafe = new MultiSafe()
  let user = null
  // get all storage keys and get the first one
  const storageKeys = await multiSafe.getStorageKeys()
  // TODO: storageKeys[0] is a workaround for single user
  // once we have multiple users we will need to revisit this
  if (storageKeys && storageKeys[0] && encryptionPassword) {
    // call create to initialize the storageKey
    // Iterate through array to get to the right key
    await multiSafe.create(storageKeys[0], encryptionPassword)
    // actually get the data
    user = await multiSafe.retrieve(encryptionPassword)
  }

  return user
}

/**
 * Save a user to MultiSafe with the corresponding password.
 *
 * @param {User} user User to be saved into MultiSafe
 * @param {string} encryptionPassword to save it in with
 * @param {string} recoveryPhraseString as another combination to use
 */
const saveUser = async (user, encryptionPassword, recoveryPhraseString) => {
  return _internalSaveUser(
    user,
    encryptionPassword,
    user.userId,
    recoveryPhraseString
  )
}

/**
 * To the outside world this is a password reset. However, for multisafe
 * this is merely adding a new combination given an existing one.
 *
 * @param {string} recoveryPhraseString
 * @param {string} newPassword
 */
const resetPassword = async (recoveryPhraseString, newPassword) => {
  const multiSafe = new MultiSafe()

  // get all storage keys and get the first one
  const storageKeys = await multiSafe.getStorageKeys()
  // call create to initialize the storageKey
  await multiSafe.create(storageKeys[0], recoveryPhraseString)
  // add a combination to the safe
  await multiSafe.overwritePassword(newPassword, recoveryPhraseString)
}

export default {
  setupNewUser,
  getDefaultUser,
  saveUser,
  resetPassword,
  addNewWallet,
  recoveryPhraseAlreadyExists
}
