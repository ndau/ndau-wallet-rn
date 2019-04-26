
const instance = {

  _isOnline: null,

  setOnline: (isOnline) => {
    this._isOnline = Boolean(isOnline)
  },

  online: () => {
    return this._isOnline
  }
}

Object.freeze(instance)

export default instance


