import AppConstants from '../AppConstants'

/**
 * This method will check to see if there is a AppConstants.TEMP_USER
 * present. If there is
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
  }
}

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
  console.log(`TEMP: ${JSON.stringify(newObject, null, 2)}`)
  return newObject
}

export default {
  moveTempUserToWalletName,
  getNextPathIndex,
  getNdauFromNapu,
  getObjectWithAllAccounts
}
