import User from '../model/User'
import KeyAddrGenManager from '../keyaddrgen/KeyAddrGenManager'
import AppConstants from '../AppConstants'
import UserData from '../model/UserData'
import { NativeModules } from 'react-native'
import MultiSafe from '../model/MultiSafe'

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
    console.debug('Generating all keys from phrase given...')
    console.debug(`recoveryPhraseString: ${recoveryPhraseString}`)
    const recoveryPhraseAsBytes = await NativeModules.KeyaddrManager.keyaddrWordsToBytes(
      AppConstants.APP_LANGUAGE,
      recoveryPhraseString
    )
    console.debug(`recoveryPhraseAsBytes: ${recoveryPhraseAsBytes}`)

    user = await KeyAddrGenManager.createFirstTimeUser(
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

const _internalSaveUser = async (
  user,
  encryptionPassword,
  walletId,
  recoveryPhraseString
) => {
  const multiSafe = new MultiSafe()

  console.log(
    `persisting the following into MultiSafe: ${JSON.stringify(user, null, 2)}`
  )

  await UserData.loadData(user)

  // create a multisafe
  await multiSafe.create(walletId, encryptionPassword)
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
 * @param {string} encryptionPassword any password combination to get at phoneData
 */
const getDefaultUser = async encryptionPassword => {
  const multiSafe = new MultiSafe()

  // get all storage keys and get the first one
  const storageKeys = await multiSafe.getStorageKeys()
  // call create to initialize the storageKey
  await multiSafe.create(storageKeys[0], encryptionPassword)
  // actually get the data
  const user = await multiSafe.retrieve(encryptionPassword)

  return user
}

/**
 * Save a user to MultiSafe with the corresponding password.
 *
 * @param {User} user User to be saved into MultiSafe
 * @param {string} encryptionPassword to save it in with
 */
const saveUser = async (user, encryptionPassword) => {
  return _internalSaveUser(user, encryptionPassword, user.userId)
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
  await multiSafe.addCombination(newPassword, recoveryPhraseString)
}

export default {
  setupNewUser,
  getDefaultUser,
  saveUser,
  resetPassword
}
