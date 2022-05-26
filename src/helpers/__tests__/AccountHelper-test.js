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
import MultiSafeHelper from '../MultiSafeHelper'
import KeyPathHelper from '../KeyPathHelper'
import AppConstants from '../../AppConstants'
import MockHelper from '../MockHelper'

MockHelper.mockServiceDiscovery()
MockHelper.mockAccountsAPI()
MockHelper.mockAccountAPI()
MockHelper.mockEaiRate()
MockHelper.mockMarketPriceAPI()

const userId = 'TAC-3PY'
const numberOfAccounts = 5
const chainId = 'tn'
const errorString = 'Error: you MUST pass recoveryPhrase to this method'
const errorNewAccountUser = `Error: The user's wallet passed in has no accountCreationKeyHash`
const bytes = 'ZWEQAwQFBgcICQoLDA0ODw=='
const recoveryPhraseString = 'goat amount liar amount expire adjust cage candy arch gather drum buyer'
const initialPrivateKey =
'npvt8aaaaaaaaaaaadyj632qv3ip7jhi66dxjzdtbvabf2nrrupjaqignfha5smckbu4nagfhwce3f9gfutkhmk5weuicjwyrsiax8qgq56bnhg5wrb6uwbigqk3bgw3'

test('createNewAccount test', async () => {
  const firstTimeUser = await AccountHelper.createFirstTimeUser(
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

test('_createAccount test when empty string called will use root key', async () => {
  const firstTimeUser = await AccountHelper.createFirstTimeUser(
    bytes,
    userId,
    chainId,
    numberOfAccounts
  )

  expect(firstTimeUser).toBeDefined()

  const countBeforeCall = newKey.callCount
  const wallet = firstTimeUser.wallets['c79af3b6']
  await AccountHelper.addAccounts(
    wallet,
    initialPrivateKey,
    1,
    '',
    AppConstants.MAINNET_ADDRESS,
    bytes
  )

  expect(newKey.callCount).toBe(countBeforeCall + 1)
})

test('setupNewUser creates a MultiSafe and we can then retrieve with password', async () => {
  const walletId = 'Kris'
  const encryptionPassword = 'asdfjkl'

  await AccountHelper.setupNewUser(
    null,
    recoveryPhraseString,
    walletId,
    numberOfAccounts,
    encryptionPassword
  )

  const userGettingCreated = {
    userId: 'Kris',
    wallets: {
      '61d9b642': {
        walletId: 'Kris',
        accountCreationKeyHash: 'c1ca8e03',
        accounts: {
          tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac1: {
            address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac1',
            addressData: {},
            ownershipKey: '95b8071e',
            validationKeys: []
          },
          tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac2: {
            address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac2',
            addressData: {},
            ownershipKey: '20f4d175',
            validationKeys: []
          }
        },
        keys: {
          '95b8071e': {
            publicKey:
              'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj442',
            privateKey:
              'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx1',
            path: KeyPathHelper.accountCreationKeyPath() + '/1',
            derivedFromRoot: 'yes'
          },
          '20f4d175': {
            publicKey:
              'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj443',
            privateKey:
              'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx2',
            path: KeyPathHelper.accountCreationKeyPath() + '/2',
            derivedFromRoot: 'yes'
          },
          c1ca8e03: {
            publicKey:
              'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj441',
            privateKey:
              'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6sq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmid3kjbfrw628y7c5zit8vcz6x7hjuxgfeu4kasdf1',
            path: KeyPathHelper.accountCreationKeyPath(),
            derivedFromRoot: 'yes'
          }
        }
      }
    }
  }

  // make sure you can get it back with password and recovery phrase
  const user = await MultiSafeHelper.getDefaultUser(encryptionPassword)

  expect(user).toBeDefined()
  expect(user).toEqual(userGettingCreated)
})

test('addNewWallet adds a new wallet to an existing user in a safe', async () => {
  const walletIdNew = 'Kris'
  const encryptionPasswordNew = 'asdfasdf'

  await AccountHelper.setupNewUser(
    null,
    recoveryPhraseString,
    walletIdNew,
    numberOfAccounts,
    encryptionPasswordNew
  )

  const userGettingCreated = {
    userId: 'Kris',
    wallets: {
      '61d9b642': {
        walletId: 'Kris',
        accountCreationKeyHash: '5a3b36e3',
        accounts: {
          tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac8: {
            address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac8',
            addressData: {},
            ownershipKey: '42514ecf',
            validationKeys: []
          },
          tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac9: {
            address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac9',
            addressData: {},
            ownershipKey: '4e842c41',
            validationKeys: []
          }
        },
        keys: {
          '42514ecf': {
            publicKey:
              'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj44c',
            privateKey:
              'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx8',
            path: KeyPathHelper.accountCreationKeyPath() + '/1',
            derivedFromRoot: 'yes'
          },
          '4e842c41': {
            publicKey:
              'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj44d',
            privateKey:
              'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx9',
            path: KeyPathHelper.accountCreationKeyPath() + '/2',
            derivedFromRoot: 'yes'
          },
          '5a3b36e3': {
            publicKey:
              'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj44b',
            privateKey:
              'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6sq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmid3kjbfrw628y7c5zit8vcz6x7hjuxgfeu4kasdf5',
            path: KeyPathHelper.accountCreationKeyPath(),
            derivedFromRoot: 'yes'
          }
        }
      }
    }
  }

  // make sure you can get it back with password and recovery phrase
  const user = await MultiSafeHelper.getDefaultUser(encryptionPasswordNew)

  expect(user).toBeDefined()
  expect(user).toEqual(userGettingCreated)

  const anotherWalletId = 'Jill'

  await AccountHelper.addNewWallet(
    user,
    recoveryPhraseString,
    anotherWalletId,
    walletIdNew,
    numberOfAccounts,
    encryptionPasswordNew
  )

  const userWithNewWallet = await MultiSafeHelper.getDefaultUser(
    recoveryPhraseString
  )

  expect(userWithNewWallet).toBeDefined()
  expect(Object.keys(userWithNewWallet.wallets).length).toEqual(2)
})

test('createFirstTimeUser test', async () => {
  const firstTimeUser = await AccountHelper.createFirstTimeUser(
    bytes,
    userId,
    chainId,
    numberOfAccounts
  )
  expect(firstTimeUser).toBeDefined()
})

test('createFirstTimeUser with 0, as this will be possible post Genesis', async () => {
  const firstTimeUser = await AccountHelper.createFirstTimeUser(
    numberOfAccounts,
    userId,
    bytes,
    chainId
  )

  expect(firstTimeUser).toBeDefined()
  expect(JSON.stringify(firstTimeUser)).toBe(
    `{"userId":"TAC-3PY","wallets":{"c79af3b6":{"walletId":"TAC-3PY","accountCreationKeyHash":"4cb4dca9","accounts":{},"keys":{"4cb4dca9":{"publicKey":"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj447","privateKey":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6sq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmid3kjbfrw628y7c5zit8vcz6x7hjuxgfeu4kasdf2","path":"/44'/20036'/100","derivedFromRoot":"yes"}}}}}`
  )
})

test('createFirstTimeUser no bytes', async () => {
  try {
    await AccountHelper.createFirstTimeUser(null, userId, chainId)
  } catch (error) {
    expect(error.toString()).toBe(errorString)
  }
})
