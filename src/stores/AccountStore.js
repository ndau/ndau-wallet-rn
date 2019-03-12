class AccountStore {
  constructor () {
    if (!AccountStore.instance) {
      this._account = []
      AccountStore.instance = this
    }

    return AccountStore.instance
  }

  setAccount (account) {
    this._account[0] = account
  }

  getAccount () {
    return this._account[0]
  }
}

const instance = new AccountStore()
Object.freeze(instance)

export default instance
