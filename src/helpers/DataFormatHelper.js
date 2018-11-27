import AppConstants from '../AppConstants'

/**
 * This method will check to see if there is a AppConstants.TEMP_USER
 * present. If there is we will change it to the walletId. Also, if there
 * is a wallet hanging around with a temp user, we switch that too.
 *
 * @param {User} user
 * @param {string} walletId
 */
const moveTempUserToWalletName = (user, walletId) => {
  if (user.userId === AppConstants.TEMP_USER) {
    user.userId = walletId
    const wallet = user.wallets[AppConstants.TEMP_USER]
    wallet.walletId = walletId
    user.wallets[walletId] = wallet
    delete user.wallets[AppConstants.TEMP_USER]
  } else if (user.wallets[AppConstants.TEMP_USER]) {
    const wallet = user.wallets[AppConstants.TEMP_USER]
    wallet.walletId = walletId
    user.wallets[walletId] = wallet
    delete user.wallets[AppConstants.TEMP_USER]
  }
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
 * @param {Wallet} wallet
 */
const getAccountEaiRateRequest = wallet => {
  return Object.keys(wallet.accounts).map(accountKey => {
    const account = wallet.accounts[accountKey]
    const addressData = Object.create(account.addressData)
    addressData.address = accountKey
    return addressData
  })
}

const convertRecoveryArrayToString = recoveryPhrase => {
  return recoveryPhrase
    .join()
    .replace(/\s+/g, '')
    .replace(/,/g, ' ')
    .toLowerCase()
}

export default {
  moveTempUserToWalletName,
  getNextPathIndex,
  getNdauFromNapu,
  getObjectWithAllAccounts,
  getAccountEaiRateRequest,
  convertRecoveryArrayToString
}
