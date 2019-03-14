class NdauStore {
  constructor () {
    if (!NdauStore.instance) {
      this._marketPrice = []
      NdauStore.instance = this
    }

    return NdauStore.instance
  }

  setMarketPrice (marketPrice) {
    this._marketPrice[0] = marketPrice
  }

  getMarketPrice () {
    return this._marketPrice[0]
  }
}

const instance = new NdauStore()
Object.freeze(instance)

export default instance
