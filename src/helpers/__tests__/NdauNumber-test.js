/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import NdauNumber from '../NdauNumber'

test('check NdauNumber constructor',  () => {
  expect(()=>new NdauNumber('A')).toThrow()
  expect(()=>new NdauNumber(0.1)).toThrow()
  expect(()=>new NdauNumber(Number.NaN)).toThrow()
  expect(()=>new NdauNumber('100')).not.toThrow()
  expect(()=>new NdauNumber(100)).not.toThrow()
})

test('check NdauNumber toSummary',  () => {
  expect((new NdauNumber(100000000)).toSummary()).toBe('1.00')
  expect((new NdauNumber(100000003)).toSummary()).toBe('1.00')
  expect((new NdauNumber(102000003)).toSummary()).toBe('1.02')
  expect((new NdauNumber(3)).toSummary()).toBe('0.00000003')
  expect((new NdauNumber(2000000)).toSummary()).toBe('0.02')
  expect((new NdauNumber(2000000)).toSummary()).toBe('0.02')
  expect((new NdauNumber(0)).toSummary()).toBe('0.00')
})

