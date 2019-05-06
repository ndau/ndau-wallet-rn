class SettingsStore {
  constructor () {
    if (!SettingsStore.instance) {
      this._settings = {}
      SettingsStore.instance = this
    }

    return SettingsStore.instance
  }

  setApplicationNetwork (network) {
    this._settings.applicationNetwork = network
  }

  getApplicationNetwork () {
    return this._settings.applicationNetwork
  }
}

const instance = new SettingsStore()
Object.freeze(instance)

export default instance
