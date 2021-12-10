/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import User from '../../model/User'
import Wallet from '../../model/Wallet'
import AccountHelper from '../AccountHelper'
import KeyMaster from '../KeyMaster'
import MockHelper from '../MockHelper'

MockHelper.mockServiceDiscovery()
MockHelper.mockAccountsAPI()
MockHelper.mockAccountAPI()
MockHelper.mockEaiRate()
MockHelper.mockMarketPriceAPI()

const userId = 'TAC-3PY'
const numberOfAccounts = 5
const chainId = 'tn'
const errorNewAccountUser = `Error: The user's wallet passed in has no accountCreationKeyHash`
const bytes = 'ZWEQAwQFBgcICQoLDA0ODw=='

test('createNewAccount test', async () => {
  const firstTimeUser = await KeyMaster.createFirstTimeUser(
    bytes,
    userId,
    chainId,
    numberOfAccounts
  )

  expect(firstTimeUser).toBeDefined()
  expect(Object.keys(firstTimeUser.wallets['c79af3b6'].accounts).length).toBe(5)

  await AccountHelper.createNewAccount(firstTimeUser.wallets['c79af3b6'])
  expect(Object.keys(firstTimeUser.wallets['c79af3b6'].accounts).length).toBe(6)
  expect(
    firstTimeUser.wallets['c79af3b6'].accounts[
      'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac6'
    ].address
  ).toBe('tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac6')
})

test('createNewAccount has bogus user', async () => {
  try {
    const user = new User()
    user.userId = 'blahblah'
    const wallet = new Wallet()
    user.wallets[user.userId] = wallet
    await AccountHelper.createNewAccount(user.wallets[user.userId])
  } catch (error) {
    expect(error.toString()).toBe(errorNewAccountUser)
  }
})