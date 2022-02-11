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

export const TEST_NET = 'testnet'
export const MAIN_NET = 'mainnet'
export const DEV_NET = 'devnet'

class SettingsStore {
  constructor () {
    if (!SettingsStore.instance) {
      this._settings = {}
      SettingsStore.instance = this
    }
    this.funcs = new Set()
    return SettingsStore.instance
  }

  setApplicationNetwork = async (network) => {
    this._settings.applicationNetwork = network
    await AsyncStorageHelper.setApplicationNetwork(network)
    this.funcs.forEach(func=>func(network))
  }

  addListener (func) {
    this.funcs.add(func)
  }

  removeListener(func) {
    this.funcs.delete(func)
  }

  getApplicationNetworkSync = () => {
    return this._settings.applicationNetwork
  }

  getApplicationNetwork = async() => {
    if (!this._settings.applicationNetwork) {
      await this._ifNetworkNotSetDefaultIt()
      this._settings.applicationNetwork = await AsyncStorageHelper.getApplicationNetwork()
    }
    return this._settings.applicationNetwork
  }

  setNotificationSettings = async (isEnabled) => {
    this._settings.notificationSettings = isEnabled
    await AsyncStorageHelper.setNotificationSettings(isEnabled)
  }

  getNotificationSettings = async () => {
    if (!this._settings.notificationSettings) {
      this._settings.notificationSettings = await AsyncStorageHelper.getNotificationSettings()
    }
    return this._settings.notificationSettings
  }

  /**
   * Application will be using mainnet
   */
  useMainNet = async () => {
    await this.setApplicationNetwork(MAIN_NET)
  }

  /**
   * Application will be using testnet
   */
  useTestNet = async () => {
    await this.setApplicationNetwork(TEST_NET)
  }

  /**
   * Application will be using devnet
   */
  useDevNet = async () => {
    await this.setApplicationNetwork(DEV_NET)
  }

  _ifNetworkNotSetDefaultIt = async () => {
    let network = await AsyncStorageHelper.getApplicationNetwork()

    if (!network) {
      await this.useMainNet()
      network = await AsyncStorageHelper.getApplicationNetwork()
    }
  
    // This is to change the 1.8.1 version of ndau wallet to the newest format
    if (network === 'MainNet') {
      await this.useMainNet()
    }
  }

  /**
   * Is the application using mainnet
   */
  isMainNet = async () => {
    const applicationNetwork = await this.getApplicationNetwork()
    return applicationNetwork && applicationNetwork.toLowerCase() === MAIN_NET
  }
  
  isMainNetSync = () => {
    const applicationNetwork = this._settings.applicationNetwork
    return applicationNetwork && applicationNetwork.toLowerCase() === MAIN_NET
  }

  /**
   * Is the application using testnet
   */
  isTestNet = async () => {
    const applicationNetwork = await this.getApplicationNetwork()
    return applicationNetwork && applicationNetwork.toLowerCase() === TEST_NET
  }

  isTestNetSync = () => {
    const applicationNetwork = this._settings.applicationNetwork
    return applicationNetwork && applicationNetwork.toLowerCase() === TEST_NET
  }
  
  /**
   * Is the application using devnet
   */
  isDevNet = async () => {
    const applicationNetwork = await this.getApplicationNetwork()
    return applicationNetwork && applicationNetwork.toLowerCase() === DEV_NET
  }

}

const instance = new SettingsStore()
Object.freeze(instance)

export default instance
