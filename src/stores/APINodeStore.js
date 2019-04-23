class APINodeStore {
  constructor () {
    if (!APINodeStore.instance) {
      this._apiNodeStore = []
      this._apiNodeStore.sort((a, b) => {
        return a[1] - b[1]
      })

      APINodeStore.instance = this
    }

    return APINodeStore.instance
  }

  addNode (node) {
    this._apiNodeStore[0].node[node] = 0
  }

  getSortedNode = () => {
    return this._apiNodeStore[0]
  }
}

const instance = new APINodeStore()
Object.freeze(instance)

export default instance
