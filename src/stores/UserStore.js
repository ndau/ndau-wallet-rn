class UserStore {
  constructor () {
    if (!UserStore.instance) {
      this._user = []
      this._password = []
      UserStore.instance = this
    }

    return UserStore.instance
  }

  setUser (user) {
    this._user[0] = user
  }

  getUser () {
    return this._user[0]
  }

  setPassword (password) {
    this._password[0] = password
  }

  getPassword () {
    return this._password[0]
  }
}

const instance = new UserStore()
Object.freeze(instance)

export default instance
