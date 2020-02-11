/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import AsyncStorageHelper from '../AsyncStorageHelper'
import AsyncStorage from '@react-native-community/async-storage'

describe('AsyncStorageHelper tests...', () => {
  it('should set MainNet by default and validate that is being used', async () => {
    expect(await AsyncStorageHelper.isMainNet()).toBe(true)
    expect(await AsyncStorageHelper.isTestNet()).toBe(false)
    expect(await AsyncStorageHelper.isDevNet()).toBe(false)
  })

  it('should set MainNet and validate that is being used', async () => {
    await AsyncStorageHelper.useMainNet()
    expect(await AsyncStorageHelper.isMainNet()).toBe(true)
    expect(await AsyncStorageHelper.isTestNet()).toBe(false)
    expect(await AsyncStorageHelper.isDevNet()).toBe(false)
  })

  it('should set TestNet and validate that is being used', async () => {
    await AsyncStorageHelper.useTestNet()
    expect(await AsyncStorageHelper.isMainNet()).toBe(false)
    expect(await AsyncStorageHelper.isTestNet()).toBe(true)
    expect(await AsyncStorageHelper.isDevNet()).toBe(false)
  })

  it('should set DevNet and validate that is being used', async () => {
    await AsyncStorageHelper.useDevNet()
    expect(await AsyncStorageHelper.isMainNet()).toBe(false)
    expect(await AsyncStorageHelper.isTestNet()).toBe(false)
    expect(await AsyncStorageHelper.isDevNet()).toBe(true)
  })

  it('should set DevNet and validate that is being used', async () => {
    await AsyncStorageHelper.useDevNet()
    expect(await AsyncStorageHelper.getNetwork()).toBe('devnet')
    await AsyncStorageHelper.useMainNet()
    expect(await AsyncStorageHelper.getNetwork()).toBe('mainnet')
    await AsyncStorageHelper.useTestNet()
    expect(await AsyncStorageHelper.getNetwork()).toBe('testnet')
  })

  it('make sure that is calls send back the correct value or default', async () => {
    await AsyncStorage.clear()
    expect(await AsyncStorageHelper.isMainNet()).toBeTruthy()
    await AsyncStorage.clear()
    expect(await AsyncStorageHelper.isDevNet()).toBeFalsy()
    await AsyncStorageHelper.useDevNet()
    await AsyncStorage.clear()
    expect(await AsyncStorageHelper.isMainNet()).toBeTruthy()
  })
})
