import { AsyncStorage } from 'react-native'
import CryptoJS from 'crypto-js'
import FlashNotification from '../components/FlashNotification'

const STORAGE_KEY_PREFIX = '@NdauAsyncStorage:'
const CURRENT_USER_KEY = '@CurrentUserKey'

const APPLICATION_PASSWORD = '@ApplicationPassword'

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
    console.debug(`storage key to check is ${storageKey}`)
    AsyncStorage.getItem(STORAGE_KEY_PREFIX + userId)
      .then(user => {
        console.debug(`The following user object was returned: ${user}`)
        if (user !== null) {
          console.debug(`unlockUser - encrypted user is: ${user}`)
          const userDecryptedBytes = CryptoJS.AES.decrypt(
            user,
            encryptionPassword
          )
          const userDecryptedString = userDecryptedBytes.toString(
            CryptoJS.enc.Utf8
          )
          console.debug(
            `unlockUser - decrypted user is: ${userDecryptedString}`
          )

          if (!userDecryptedString) resolve(null)

          resolve(JSON.parse(userDecryptedString))
        } else {
          resolve(null)
        }
      })
      .catch(error => {
        console.debug(
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

    console.debug(`lockUser - user to encrypt to ${storageKey}: ${userString}`)
    const userStringEncrypted = CryptoJS.AES.encrypt(
      userString,
      encryptionPassword
    )
    console.debug(`lockUser - encrypted user is: ${userStringEncrypted}`)

    await AsyncStorage.setItem(storageKey, userStringEncrypted.toString())

    const checkPersist = await unlockUser(user.userId, encryptionPassword)
    console.debug(
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
      .filter(key => key !== CURRENT_USER_KEY)
    console.debug(`keys found in getAllKeys are ${newKeys}`)
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
  getApplicationPassword
}
