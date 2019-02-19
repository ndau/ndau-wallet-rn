import { AsyncStorage } from 'react-native'
import CryptoJS from 'crypto-js'
import FlashNotification from '../components/FlashNotification'
import LoggingService from '../services/LoggingService'

const STORAGE_KEY_PREFIX = '@NdauAsyncStorage:'
const CURRENT_USER_KEY = '@CurrentUserKey'

const APPLICATION_PASSWORD = '@ApplicationPassword'
const APPLICATION_NETWORK = '@ApplicationNetwork'
const DEBUG_ROWS = 'debug-rows'

const LAST_ACCOUNT_DATA = '@LastAccountData'

const NEEDS_REFRESH = '@NeedsRefresh'

const TEST_NET = 'TestNet'
const MAIN_NET = 'MainNet'

/**
 * This is a place to cache the application password to be
 * used by other sections of the ndau wallet code
 *
 * @param {string} password
 */
const setApplicationPassword = async password => {
  await AsyncStorage.setItem(APPLICATION_PASSWORD, password)
}

/**
 * Get the cached application password out of AsyncStorage
 */
const getApplicationPassword = async () => {
  const password = await AsyncStorage.getItem(APPLICATION_PASSWORD)
  return password
}

/**
 * Cache the last call to address data so we can check to see if we
 * have gotten anything new
 *
 * @param {string} lastAccountData
 */
const setLastAccountData = async lastAccountData => {
  await AsyncStorage.setItem(LAST_ACCOUNT_DATA, JSON.stringify(lastAccountData))
}

/**
 * Get the cached last account data out of AsyncStorage
 */
const getLastAccountData = async () => {
  const lastAccountData = await AsyncStorage.getItem(LAST_ACCOUNT_DATA)
  return JSON.parse(lastAccountData)
}

/**
 * Application will be using MainNet
 */
const useMainNet = async () => {
  await AsyncStorage.setItem(APPLICATION_NETWORK, MAIN_NET)
}

/**
 * Application will be using TestNet
 */
const useTestNet = async () => {
  await AsyncStorage.setItem(APPLICATION_NETWORK, TEST_NET)
}

/**
 * Is the application using MainNet
 */
const isMainNet = async () => {
  const applicationNetwork = await AsyncStorage.getItem(APPLICATION_NETWORK)
  return applicationNetwork === MAIN_NET
}

/**
 * Is the application using TestNet
 */
const isTestNet = async () => {
  const applicationNetwork = await AsyncStorage.getItem(APPLICATION_NETWORK)
  return applicationNetwork === TEST_NET
}

/**
 * This function is deprecated. It is only kept around for the 1.8 release. After that
 * we can look at phasing this out.
 *
 * @param {string} userId
 * @param {string} encryptionPassword
 * @deprecated as of 1.8
 */
const unlockUser = (userId, encryptionPassword) => {
  return new Promise((resolve, reject) => {
    const storageKey = STORAGE_KEY_PREFIX + userId
    LoggingService.debug(`storage key to check is ${storageKey}`)
    AsyncStorage.getItem(STORAGE_KEY_PREFIX + userId)
      .then(user => {
        LoggingService.debug(`The following user object was returned: ${user}`)
        if (user !== null) {
          LoggingService.debug(`unlockUser - encrypted user is: ${user}`)
          const userDecryptedBytes = CryptoJS.AES.decrypt(
            user,
            encryptionPassword
          )
          const userDecryptedString = userDecryptedBytes.toString(
            CryptoJS.enc.Utf8
          )
          LoggingService.debug(
            `unlockUser - decrypted user is: ${userDecryptedString}`
          )

          if (!userDecryptedString) resolve(null)

          resolve(JSON.parse(userDecryptedString))
        } else {
          resolve(null)
        }
      })
      .catch(error => {
        LoggingService.debug(
          `User could be present but password is incorrect: ${error}`
        )
        reject(error)
      })
  })
}

/**
 * This function is deprecated. It is only kept around for the 1.8 release. After that
 * we can look at phasing this out.
 *
 * @param {string} user
 * @param {string} encryptionPassword
 * @param {boolean} storageKeyOverride
 * @deprecated as of 1.8
 */
const lockUser = async (user, encryptionPassword, storageKeyOverride) => {
  try {
    if (!encryptionPassword) {
      throw Error('you must pass an encryptionPassword to use this method')
    }
    if (!user.userId) {
      throw Error('you must pass user.userId containing a valid ID')
    }

    const userString = JSON.stringify(user)
    const storageKey = storageKeyOverride || STORAGE_KEY_PREFIX + user.userId

    LoggingService.debug(
      `lockUser - user to encrypt to ${storageKey}: ${userString}`
    )
    const userStringEncrypted = CryptoJS.AES.encrypt(
      userString,
      encryptionPassword
    )
    LoggingService.debug(`lockUser - encrypted user is: ${userStringEncrypted}`)

    await AsyncStorage.setItem(storageKey, userStringEncrypted.toString())

    const checkPersist = await unlockUser(user.userId, encryptionPassword)
    LoggingService.debug(
      `Successfully set user to: ${JSON.stringify(checkPersist, null, 2)}`
    )
  } catch (error) {
    FlashNotification.showError(`Problem locking user: ${error.message}`)
    throw error
  }
}

/**
 * This function is deprecated. It is only kept around for the 1.8 release. After that
 * we can look at phasing this out.
 * @deprecated as of 1.8
 */
const getAllKeys = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys()
    const newKeys = keys
      .map(key => {
        return key.replace(STORAGE_KEY_PREFIX, '')
      })
      .filter(
        key =>
          key !== CURRENT_USER_KEY &&
          key !== APPLICATION_NETWORK &&
          key !== APPLICATION_PASSWORD &&
          key !== DEBUG_ROWS
      )
    LoggingService.debug(`keys found in getAllKeys are ${newKeys}`)
    return newKeys
  } catch (error) {
    return []
  }
}

export default {
  unlockUser,
  lockUser,
  getAllKeys,
  setApplicationPassword,
  getApplicationPassword,
  setLastAccountData,
  getLastAccountData,
  useMainNet,
  useTestNet,
  isMainNet,
  isTestNet
}
