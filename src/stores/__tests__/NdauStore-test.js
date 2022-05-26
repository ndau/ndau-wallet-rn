/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import NdauStore from '../NdauStore'

const marketPrice1 = 16.89
const marketPrice2 = 1234.23

test('Make sure we get back falsy if nothing set', async () => {
  expect(NdauStore.getMarketPrice()).toBeFalsy()
})

test('Make sure we can set and reset the marketPrice', async () => {
  NdauStore.setMarketPrice(marketPrice1)
  expect(NdauStore.getMarketPrice()).toBe(marketPrice1)
  NdauStore.setMarketPrice(marketPrice2)
  expect(NdauStore.getMarketPrice()).toBe(marketPrice2)
  NdauStore.setMarketPrice(marketPrice1)
  expect(NdauStore.getMarketPrice()).toBe(marketPrice1)
  NdauStore.setMarketPrice(marketPrice2)
  expect(NdauStore.getMarketPrice()).toBe(marketPrice2)
  expect(NdauStore.getMarketPrice()).not.toBe(marketPrice1)
})
