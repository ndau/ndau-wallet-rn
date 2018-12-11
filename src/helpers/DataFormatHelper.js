import AppConstants from '../AppConstants'
import AppConfig from '../AppConfig'
import sha256 from 'crypto-js/sha256'
import DataFormatHelper from '../helpers/DataFormatHelper'
import DateHelper from './DateHelper'

/**
 * This method will check to see if there is a AppConstants.TEMP_ID
 * present. If there is we will change it to the walletId. Also, if there
 * is a wallet hanging around with a temp user, we switch that too.
 *
 * @param {User} user
 * @param {string} walletId
 */
const moveTempUserToWalletName = (user, walletId) => {
  const hashedTempKey = create8CharHash(AppConstants.TEMP_ID)
  if (user.userId === AppConstants.TEMP_ID) {
    user.userId = walletId
    const wallet = user.wallets[hashedTempKey]
    wallet.walletId = walletId
    user.wallets[DataFormatHelper.create8CharHash(walletId)] = wallet
    delete user.wallets[hashedTempKey]
  } else if (user.wallets[create8CharHash(AppConstants.TEMP_ID)]) {
    const wallet = user.wallets[hashedTempKey]
    wallet.walletId = walletId
    user.wallets[DataFormatHelper.create8CharHash(walletId)] = wallet
    delete user.wallets[hashedTempKey]
  }
}

/**
 * Simple function to create a 8 character SHA256 hash
 * of the string passed in.
 *
 * @param {string} toHash
 */
const create8CharHash = toHash => {
  return sha256(toHash)
    .toString()
    .substring(0, 8)
}

/**
 * This function will find the next available path index
 * within a derived path of a given wallet.
 *
 * @param {Wallet} wallet
 * @param {string} path
 */
const getNextPathIndex = (wallet, path) => {
  const keys = wallet.keys
  let nextAddress = 0
  if (!keys) return nextAddress

  Object.keys(keys).forEach(theKey => {
    const key = keys[theKey]
    if (key.path && key.path.indexOf(path) !== -1) {
      let pathLengthAdder = path === '/' ? 0 : 1
      let nextPossibility = parseInt(
        key.path.substring(path.length + pathLengthAdder, key.path.length)
      )

      if (!isNaN(nextPossibility) && nextPossibility >= nextAddress) {
        nextAddress = nextPossibility + 1
      }
    }
  })
  return nextAddress === 0 ? nextAddress : nextAddress++
}

/**
 * Convert napu to ndau
 *
 * @param {number} napu
 */
const getNdauFromNapu = napu => {
  return napu / 100000000
}

/**
 * Given a user return back all the accounts within
 * a single object.
 *
 * @param {User} user
 */
const getObjectWithAllAccounts = user => {
  const newObject = {}
  Object.keys(user.wallets).forEach(walletKey => {
    const wallet = user.wallets[walletKey]
    Object.assign(newObject, wallet.accounts)
  })
  return newObject
}

/**
 * Given a wallet send back the format for the
 * request to /account/eai/rate RESTful API call
 *
 * @param {string} addressData
 */
const getAccountEaiRateRequest = addressData => {
  return Object.keys(addressData).map(accountKey => {
    const account = addressData[accountKey]
    let weightedAverageAge = account.weightedAverageAge
    if (!weightedAverageAge && account.lastWAAUpdate) {
      weightedAverageAge =
        weightedAverageAge +
        (DateHelper.getMicrosecondsSinceNdauEpoch() - account.lastWAAUpdate)
    }
    return {
      address: accountKey,
      weightedAverageAge,
      lock: account.lock
    }
  })
}

const convertRecoveryArrayToString = recoveryPhrase => {
  return recoveryPhrase
    .join()
    .replace(/\s+/g, '')
    .replace(/,/g, ' ')
    .toLowerCase()
}

/**
 * Add commas into the number given.
 *
 * why not use .toLocaleString you ask...here is why:
 *
 * https://github.com/facebook/react-native/issues/15717
 *
 * @param {number | float} number
 * @param {number} precision=AppConfig.NDAU_SUMMARY_PRECISION
 *
 * @returns {string} the return value is a string version
 * of the number
 */
const addCommas = (number, precision = AppConfig.NDAU_SUMMARY_PRECISION) => {
  return number
    .toFixed(precision)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * Check if the walletId passed in is an actual wallet within
 * the User already.
 *
 * @param {User} user
 * @param {string} walletId
 */
const checkIfWalletAlreadyExists = (user, walletId) => {
  if (!user) return false

  for (const walletKey of Object.keys(user.wallets)) {
    const wallet = user.wallets[walletKey]
    if (wallet.walletId === walletId) {
      return true
    }
  }
  return false
}

export default {
  moveTempUserToWalletName,
  getNextPathIndex,
  getNdauFromNapu,
  getObjectWithAllAccounts,
  getAccountEaiRateRequest,
  convertRecoveryArrayToString,
  addCommas,
  checkIfWalletAlreadyExists,
  create8CharHash
}
