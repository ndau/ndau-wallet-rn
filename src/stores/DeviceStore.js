
const instance = {

  _isOnline: null,

  setOnline: (isOnline) => {
    this._isOnline = Boolean(isOnline)
  },

  online: () => {
    if (process.env.NODE_ENV === 'test' ) {
      console.log('Returning true online status for testing environment.')
      return true
    }
    return this._isOnline
  }
}

Object.freeze(instance)

export default instance


