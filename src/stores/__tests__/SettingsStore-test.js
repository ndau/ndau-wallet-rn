/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import SettingsStore from '../SettingsStore'
import AsyncStorage from '@react-native-community/async-storage'

describe('SettingsStore tests...', () => {
  it('should set MainNet by default and validate that is being used', async () => {
    expect(await SettingsStore.isMainNet()).toBe(true)
    expect(await SettingsStore.isTestNet()).toBe(false)
    expect(await SettingsStore.isDevNet()).toBe(false)
  })

  it('should set MainNet and validate that is being used', async () => {
    await SettingsStore.useMainNet()
    expect(await SettingsStore.isMainNet()).toBe(true)
    expect(await SettingsStore.isTestNet()).toBe(false)
    expect(await SettingsStore.isDevNet()).toBe(false)
  })

  it('should set TestNet and validate that is being used', async () => {
    await SettingsStore.useTestNet()
    expect(await SettingsStore.isMainNet()).toBe(false)
    expect(await SettingsStore.isTestNet()).toBe(true)
    expect(await SettingsStore.isDevNet()).toBe(false)
  })

  it('should set DevNet and validate that is being used', async () => {
    await SettingsStore.useDevNet()
    expect(await SettingsStore.isMainNet()).toBe(false)
    expect(await SettingsStore.isTestNet()).toBe(false)
    expect(await SettingsStore.isDevNet()).toBe(true)
  })

  it('should set DevNet and validate that is being used', async () => {
    await SettingsStore.useDevNet()
    expect(await SettingsStore.getApplicationNetwork()).toBe('devnet')
    await SettingsStore.useMainNet()
    expect(await SettingsStore.getApplicationNetwork()).toBe('mainnet')
    await SettingsStore.useTestNet()
    expect(await SettingsStore.getApplicationNetwork()).toBe('testnet')
  })

  it('make sure that is calls send back the correct value or default', async () => {
    await AsyncStorage.clear()
    expect(await SettingsStore.isMainNet()).toBeTruthy()
    await AsyncStorage.clear()
    expect(await SettingsStore.isDevNet()).toBeFalsy()
    await SettingsStore.useDevNet()
    await AsyncStorage.clear()
    expect(await SettingsStore.isMainNet()).toBeTruthy()
  })
})
