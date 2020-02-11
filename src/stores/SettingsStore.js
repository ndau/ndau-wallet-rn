/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import AsyncStorageHelper from '../model/AsyncStorageHelper'

class SettingsStore {
  constructor () {
    if (!SettingsStore.instance) {
      this._settings = {}
      SettingsStore.instance = this
    }
    this.funcs = new Set()
    return SettingsStore.instance
  }

  setApplicationNetwork (network) {
    this._settings.applicationNetwork = network
    this.funcs.forEach(func=>func(network))
  }

  addListener (func) {
    this.funcs.add(func)
  }

  removeListener(func) {
    this.funcs.delete(func)
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
