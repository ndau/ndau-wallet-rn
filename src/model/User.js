// Please be aware that to remain backwards compatible we must
// always add to or deprecate items. We CANNOT remove anything
// from this class. If you feel it shuold be removed please check
// with KP before doing so.
class User {
  constructor () {
    this.userId = ''
    // map of wallet objects
    this.wallets = {}
  }

  toJSON = () => {
    return {
      userId: this.userId,
      wallets: this.wallets
    }
  }
}

export default User
