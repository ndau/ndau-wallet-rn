/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import AccountStore from '../AccountStore'

const account1 = {
  ndarc8etbkidm5ewytxhvzida94sgg9mvr3aswufbty8zcun: {
    address: 'ndarc8etbkidm5ewytxhvzida94sgg9mvr3aswufbty8zcun',
    addressData: {
      nickname: 'Account 1'
    },
    ownershipKey: 'b32d1dfb',
    validationKeys: []
  }
}

const account2 = {
  ndaiap4q2me85dtnp5naifa5d8xtmrimm4b997hr9mcm38vz: {
    address: 'ndaiap4q2me85dtnp5naifa5d8xtmrimm4b997hr9mcm38vz',
    addressData: {
      nickname: 'Account 2'
    },
    ownershipKey: 'e54b7ece',
    validationKeys: []
  }
}
test('Make sure we get back falsy if nothing set', async () => {
  expect(AccountStore.getAccount()).toBeFalsy()
})

test('Make sure we can set and reset an address', async () => {
  AccountStore.setAccount(account1)
  expect(AccountStore.getAccount()).toBe(account1)
  AccountStore.setAccount(account2)
  expect(AccountStore.getAccount()).toBe(account2)
  AccountStore.setAccount(account1)
  expect(AccountStore.getAccount()).toBe(account1)
  AccountStore.setAccount(account2)
  expect(AccountStore.getAccount()).toBe(account2)
  expect(AccountStore.getAccount()).not.toBe(account1)
})
