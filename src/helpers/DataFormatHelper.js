/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import AppConstants from '../AppConstants'
import AppConfig from '../AppConfig'
import sha256 from 'crypto-js/sha256'
import AccountAPIHelper from './AccountAPIHelper'
import ndaujs from 'ndaujs'
import DateHelper from './DateHelper'
import KeyPathHelper from './KeyPathHelper'

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
 * The function is used to get the next path index within the
 * `wallet` passed in. For example, if I have the following
 * key paths:
 *
 * `/44'/20036'/100/2`
 * `/44'/20036'/100/4`
 * `/44'/20036'/100/90`
 *
 * If `path` is `/44'/20036'/100` then the result of this
 * function is 91. If the `path` is instead `/` the result
 * would be 1.
 *
 * @param {Wallet} wallet contains the keys we will iterate over
 * @param {string} path is the key path MINUS the index. This is
 * used to check if we should consider the key path being iterated
 * contains contains `path` in it. If it does, then it needs to
 * be considered as the highest value.
 */
const getNextPathIndex = (wallet, path) => {
  const keys = wallet.keys
  let nextAddress = 1
  if (!keys) return nextAddress

  Object.keys(keys).forEach(theKey => {
    const key = keys[theKey]
    if (key.path && key.path.includes(path)) {
      // Get the start index
      const start = (path === '/' ? 0 : 1) + path.length
      // using the path passed in get what is left over from
      // the wallet key path we are iterating over
      const walletKeyPathRemainder = key.path.substring(start, key.path.length)
      // if there is remaining slashes in the path then we are
      // looking at a key path in the wallet that should not be
      // considered for this calculation
      if (!walletKeyPathRemainder.includes('/')) {
        // We have a index to increment
        let nextPossibility = parseInt(walletKeyPathRemainder)

        // is it highter than what we have looked at so far...
        // yes...then increment it and use it
        if (!isNaN(nextPossibility) && nextPossibility >= nextAddress) {
          nextAddress = nextPossibility + 1
        }
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
 * request to /system/eai/rate RESTful API call
 *
 * @param {string} addressData
 */
const getAccountEaiRateRequest = addressData => {
  return Object.keys(addressData).map(accountKey => {
    const account = addressData[accountKey]
    const weightedAverageAge = account.weightedAverageAge
    const lock = account.lock

    if (lock) {
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

/**
 * Given a wallet either pull out the walletName if it exists
 * or pull out the walletId. This is done as we use walletName
 * going forward. However, there still could be data with only
 * walletId. This is fixed up on a successful grab of the latest
 * data.
 *
 * @param {string} wallet
 */
const getWalletName = wallet => {
  return wallet.walletName ? wallet.walletName : wallet.walletId
}

/**
 * Given the array passed in, create a new array that
 * contains rows.
 *
 * @param {Array} arr array to group into rows based on length
 * @param {number} length row length
 */
const groupArrayIntoRows = (arr = [], length) => {
  let res = []
  for (let i = 0; i < arr.length; i += length) {
    res.push(arr.slice(i, i + length))
  }
  return res
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
  convertNanoCentsToDollars,
  getWalletName,
  groupArrayIntoRows
}
