import AsyncStorageHelper from '../model/AsyncStorageHelper'

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
    if (!this._settings.applicationNetwork) {
      this._settings.applicationNetwork = AsyncStorageHelper.MAIN_NET
    }
    return this._settings.applicationNetwork
  }

  isMainNet () {
    if (
      this._settings.applicationNetwork &&
      this._settings.applicationNetwork.toLowerCase() ===
        AsyncStorageHelper.MAIN_NET
    ) {
      return true
    }
    return false
  }
}

const instance = new SettingsStore()
Object.freeze(instance)

export default instance
