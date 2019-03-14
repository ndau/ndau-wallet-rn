class WalletStore {
  constructor () {
    if (!WalletStore.instance) {
      this._wallet = []
      WalletStore.instance = this
    }

    return WalletStore.instance
  }

  setWallet (wallet) {
    this._wallet[0] = wallet
  }

  getWallet () {
    return this._wallet[0]
  }
}

const instance = new WalletStore()
Object.freeze(instance)

export default instance
