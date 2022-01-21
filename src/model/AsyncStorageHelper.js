/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY_PREFIX = '@NdauAsyncStorage:'
const CURRENT_USER_KEY = '@CurrentUserKey'

const APPLICATION_PASSWORD = '@ApplicationPassword'
const APPLICATION_NETWORK = '@ApplicationNetwork'
const NOTIFICATION_SETTINGS = '@NotificationSettings'
const DEBUG_ROWS = 'debug-rows'

const LAST_ACCOUNT_DATA = '@LastAccountData'

/**
 * Cache the last call to address data so we can check to see if we
 * have gotten anything new
 *
 * @param {string} lastAccountData
 */
const setLastAccountData = async lastAccountData => {
  await AsyncStorage.setItem(LAST_ACCOUNT_DATA, JSON.stringify(lastAccountData))
}

/**
 * Get the cached last account data out of AsyncStorage
 */
const getLastAccountData = async () => {
  const lastAccountData = await AsyncStorage.getItem(LAST_ACCOUNT_DATA)
  return JSON.parse(lastAccountData)
}

/** Cache the network which is used
 *
 * @param {string} network
 */
const setApplicationNetwork = async network => {
  await AsyncStorage.setItem(APPLICATION_NETWORK, network)
}

/**
* Get the cached application network out of AsyncStorage
*/
const getApplicationNetwork = async () => {
  return await AsyncStorage.getItem(APPLICATION_NETWORK)
}

/** Cache notifications settings
 *
 * @param {boolean} isEnabled
 */
 const setNotificationSettings = async isEnabled => {
   await AsyncStorage.setItem(NOTIFICATION_SETTINGS, JSON.stringify(isEnabled))
}

/**
* Get the cached notification settings out of AsyncStorage
*/
const getNotificationSettings = async () => {
  const result = await AsyncStorage.getItem(NOTIFICATION_SETTINGS)
  return result ? JSON.parse(result) : false
}

/**
 * This function is deprecated. It is only kept around for the 1.8 release. After that
 * we can look at phasing this out.
 * @deprecated as of 1.8
 */
const getAllKeys = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys()
    const newKeys = keys
      .map(key => {
        return key.replace(STORAGE_KEY_PREFIX, '')
      })
      .filter(
        key =>
          key !== CURRENT_USER_KEY &&
          key !== APPLICATION_NETWORK &&
          key !== NOTIFICATION_SETTINGS &&
          key !== APPLICATION_PASSWORD &&
          key !== DEBUG_ROWS &&
          key !== LAST_ACCOUNT_DATA
      )
    return newKeys
  } catch (error) {
    return []
  }
}

export default {
  getAllKeys,
  setLastAccountData,
  getLastAccountData,
  setApplicationNetwork,
  getApplicationNetwork,
  getNotificationSettings,
  setNotificationSettings
}
