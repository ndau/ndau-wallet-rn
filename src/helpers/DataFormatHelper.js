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

export default {
  moveTempUserToWalletName
}
