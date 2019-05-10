import AppConstants from '../AppConstants'
import AppConfig from '../AppConfig'
import sha256 from 'crypto-js/sha256'
import AccountAPIHelper from './AccountAPIHelper'
import ndaujs from 'ndaujs'
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
    wallet.walletName = walletId
    user.wallets[create8CharHash(walletId)] = wallet
    delete user.wallets[hashedTempKey]
  } else if (user.wallets[create8CharHash(AppConstants.TEMP_ID)]) {
    const wallet = user.wallets[hashedTempKey]
    wallet.walletId = walletId
    wallet.walletName = walletId
    user.wallets[create8CharHash(walletId)] = wallet
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
  let nextAddress = 1
  if (!keys) return nextAddress

  Object.keys(keys).forEach(theKey => {
    const key = keys[theKey]
    if (key.path && key.path.includes(path)) {
      let pathLengthAdder = path === '/' ? 0 : 1
      let nextPossibility = parseInt(
        key.path.substring(path.length + pathLengthAdder, key.path.length)
      )

      // We check below if we are att the validationKey inded
      // This is at 10000. If we hit that we want to just ignore that
      // altogether
      if (
        !isNaN(nextPossibility) &&
        nextPossibility >= nextAddress &&
        nextPossibility !== AppConstants.VALIDATION_KEY
      ) {
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
 * @param {number} digits precision past decimal
 * @param {boolean} addCommas to your ndau
 */
const getNdauFromNapu = (
  napu,
  digits = AppConfig.NDAU_SUMMARY_PRECISION,
  addCommas = false
) => {
  return ndaujs.formatNapuForDisplay(napu, digits, addCommas)
}

/**
 * Convert ndau to napu
 *
 * @param {number} napu
 */
const getNapuFromNdau = ndau => {
  return ndau ? ndaujs.parseNdau(ndau) : null
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
 * Truncate the string to maxLength characters with an elipsis
 * if it is maxLength characters or greater. The string is then
 * truncated to the maxLength including the elipsis.
 *
 * @param {string} string to truncate
 * @param {number} maxLength default is 20
 */
const truncateString = (string, maxLength = 20) => {
  const realizedMaxLength = maxLength - 3
  if (realizedMaxLength < 5 || string.length + 3 < maxLength) return string
  return string.length >= maxLength
    ? string.slice(0, realizedMaxLength) + '...'
    : string
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
    const weightedAverageAge = account.weightedAverageAge
    const lock = account.lock

    if (lock) {
      const weightedAverageAgeInDays = AccountAPIHelper.weightedAverageAgeInDays(
        addressData
      )
      const theLockEAIBonus = AccountAPIHelper.lockBonusEAI(
        DateHelper.getDaysFromISODate(lock.noticePeriod)
      )
      lock.bonus = theLockEAIBonus * 10000000000
    }
    return {
      address: accountKey,
      weightedAverageAge,
      lock
    }
  })
}

/**
 * Take in nano seconds and convert to dollars by
 * dividing 10^11
 *
 * @param {number} number to convert
 * @returns number converted
 */
const convertNanoCentsToDollars = number => {
  const dollars = number / 100000000000
  return dollars.toFixed(2)
}

/**
 * Given a wallet send back the a custom
 * version of this call to get possible lock rates
 *
 * @param {string} account
 */
const getAccountEaiRateRequestForLock = account => {
  return Object.keys(AppConstants.LOCK_ACCOUNT_POSSIBLE_TIMEFRAMES).map(
    period => {
      const weightedAverageAge = account.addressData.weightedAverageAge
      const weightedAverageAgeInDays = AccountAPIHelper.weightedAverageAgeInDays(
        account.addressData
      )
      const theLockEAIBonus = AccountAPIHelper.lockBonusEAI(
        DateHelper.getDaysFromISODate(period)
      )
      const lock = {}
      lock.noticePeriod = `${period}`
      lock.bonus = theLockEAIBonus * 10000000000

      // We use period here because we just need a unique identifier
      // to separate out the rates.
      return {
        address: period,
        weightedAverageAge,
        lock
      }
    }
  )
}
const convertRecoveryArrayToString = recoveryPhrase => {
  return recoveryPhrase
    .join()
    .replace(/\s+/g, '')
    .replace(/,/g, ' ')
    .toLowerCase()
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

/**
 * Add commas to the dollar amount given. The number can be a string.
 * If it is a string then this method cannot fix the precision.
 *
 * why not use .toLocaleString you ask...here is why:
 *
 * https://github.com/facebook/react-native/issues/15717
 *
 * @param {number | float} number
 *
 * @returns {string} the return value is a string version
 * of the number
 */
const formatUSDollarValue = number => {
  let numberToAddCommas = number
  try {
    numberToAddCommas = number.toFixed(2)
  } catch (error) {
    // we swallow this up, if we can't do this then we assume you have passed in a string
  }

  return numberToAddCommas.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export default {
  moveTempUserToWalletName,
  getNextPathIndex,
  getNdauFromNapu,
  getObjectWithAllAccounts,
  getAccountEaiRateRequest,
  convertRecoveryArrayToString,
  checkIfWalletAlreadyExists,
  create8CharHash,
  getNapuFromNdau,
  getAccountEaiRateRequestForLock,
  truncateString,
  formatUSDollarValue,
  convertNanoCentsToDollars
}
