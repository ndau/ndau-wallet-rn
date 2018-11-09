// Please be aware that to remain backwards compatible we must
// always add to or deprecate items. We CANNOT remove anything
// from this class. If you feel it shuold be removed please check
// with KP before doing so.
class Wallet {
  constructor () {
    this.walletId = ''
    this.accountCreationKey = ''
    this.accounts = {}
    this.keys = {}
  }

  toJSON = () => {
    return {
      walletId: this.walletId,
      accountCreationKey: this.accountCreationKey,
      accounts: this.accounts,
      keys: this.keys
    }
  }
}

export default Wallet
