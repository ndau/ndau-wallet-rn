/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import ServiceDiscovery from '../ServiceDiscovery'
import MockHelper from '../../helpers/MockHelper'

describe('...testing ServiceDiscovery', () => {
  test('getBlockchainServiceNodeURL should return something back', async () => {
    MockHelper.mockServiceDiscovery()

    const serverUrl = await ServiceDiscovery.getBlockchainServiceNodeURL()

    // its testnet because that is what we pull in within MockHelper
    expect(serverUrl.includes('api.ndau.tech:31300')).toBeTruthy()
  })

  test('getRecoverServiceNodeURL should return something back', async () => {
    MockHelper.mockServiceDiscovery()

    const serverUrl = await ServiceDiscovery.getRecoveryServiceNodeURL()

    // its testnet because that is what we pull in within MockHelper
    expect(serverUrl.includes('recovery.ndau.tech')).toBeTruthy()
  })
})
