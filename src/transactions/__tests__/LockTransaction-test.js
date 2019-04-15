import { LockTransaction } from '../LockTransaction'
import { Transaction } from '../Transaction'
import MockHelper from '../../helpers/MockHelper'
import { NativeModules } from 'react-native'
import data from '../../api/data'

MockHelper.mockServiceDiscovery()
MockHelper.mockAccountsAPI()
MockHelper.mockAccountAPI(
  data.testSingleAddressData,
  'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacb'
)
MockHelper.mockEaiRate()
MockHelper.mockMarketPriceAPI()
MockHelper.mockLockTx()

NativeModules.KeyaddrManager = {
  keyaddrWordsToBytes: jest.fn(),
  newKey: jest.fn(),
  child: jest.fn(),
  hardenedChild: jest.fn(),
  ndauAddress: jest.fn(),
  deriveFrom: jest.fn(),
  toPublic: jest.fn(),
  sign: jest.fn().mockRejectedValue(new Error('testing sign error'))
}

jest.mock('../../api/TransactionAPI', {
  prevalidate: jest.fn().mockReturnValue({ err: 'error being sent' })
})

const user = {
  userId: 'TAC-3PY',
  wallets: {
    c79af3b6: {
      walletId: 'TAC-3PY',
      accountCreationKeyHash: '1e48ba8c',
      accounts: {
        tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacb: {
          address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacb',
          addressData: {
            sequence: 3830689464
          },
          ownershipKey: 'a0bb883b',
          validationKeys: ['5a3b36e3', 'ea7ced47']
        },
        tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacc: {
          address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacc',
          addressData: {},
          ownershipKey: 'd396491a',
          validationKeys: []
        },
        tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacd: {
          address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacd',
          addressData: {},
          ownershipKey: '2da2eaca',
          validationKeys: []
        },
        tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyace: {
          address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyace',
          addressData: {},
          ownershipKey: 'b960e699',
          validationKeys: []
        },
        tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacf: {
          address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacf',
          addressData: {},
          ownershipKey: '057391a6',
          validationKeys: []
        }
      },
      keys: {
        a0bb883b: {
          publicKey:
            'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj44b',
          privateKey:
            'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqxb',
          path: "/44'/20036'/100/1",
          derivedFromRoot: 'yes'
        },
        d396491a: {
          publicKey:
            'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj44c',
          privateKey:
            'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqxc',
          path: "/44'/20036'/100/2",
          derivedFromRoot: 'yes'
        },
        '2da2eaca': {
          publicKey:
            'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj44d',
          privateKey:
            'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqxd',
          path: "/44'/20036'/100/3",
          derivedFromRoot: 'yes'
        },
        b960e699: {
          publicKey:
            'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj44e',
          privateKey:
            'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqxe',
          path: "/44'/20036'/100/4",
          derivedFromRoot: 'yes'
        },
        '057391a6': {
          publicKey:
            'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj44f',
          privateKey:
            'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqxf',
          path: "/44'/20036'/100/5",
          derivedFromRoot: 'yes'
        },
        '1e48ba8c': {
          publicKey: '',
          privateKey:
            'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6sq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmid3kjbfrw628y7c5zit8vcz6x7hjuxgfeu4kasdf4',
          path: "/44'/20036'/100",
          derivedFromRoot: 'yes'
        },
        '5a3b36e3': {
          publicKey:
            'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj44g',
          privateKey:
            'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6sq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmid3kjbfrw628y7c5zit8vcz6x7hjuxgfeu4kasdf5',
          path: "/44'/20036'/2000/1",
          derivedFromRoot: 'yes'
        },
        ea7ced47: {
          publicKey:
            'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj44h',
          privateKey:
            'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6sq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmid3kjbfrw628y7c5zit8vcz6x7hjuxgfeu4kasdf6',
          path: "/44'/20036'/2000/2",
          derivedFromRoot: 'yes'
        }
      }
    }
  }
}

test('creation of a lock transaction', async () => {
  const theLockTransaction = {
    period: '3m',
    target: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacb',
    sequence: 3830689465
  }

  Object.assign(LockTransaction.prototype, Transaction)

  const lockTransaction = new LockTransaction(
    user.wallets.c79af3b6,
    user.wallets.c79af3b6.accounts[
      'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacb'
    ],
    '3m'
  )
  const createdLockTransaction = await lockTransaction.create()
  expect(createdLockTransaction).toEqual(theLockTransaction)
})

test('lock fails if no sequence', async () => {
  const userNoValidationKeys = {
    userId: 'fail',
    wallets: {
      c79af3b6: {
        accounts: {
          tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacb: {
            address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacb',
            addressData: {},
            ownershipKey: 'a0bb883b',
            validationKeys: ['5a3b36e3', 'ea7ced47']
          }
        },
        keys: {
          '5a3b36e3': {
            publicKey:
              'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj44g',
            privateKey:
              'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6sq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmid3kjbfrw628y7c5zit8vcz6x7hjuxgfeu4kasdf5',
            path: "/44'/20036'/2000/1",
            derivedFromRoot: 'yes'
          },
          ea7ced47: {
            publicKey:
              'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj44h',
            privateKey:
              'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6sq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmid3kjbfrw628y7c5zit8vcz6x7hjuxgfeu4kasdf6',
            path: "/44'/20036'/2000/2",
            derivedFromRoot: 'yes'
          }
        }
      }
    }
  }

  try {
    Object.assign(LockTransaction.prototype, Transaction)

    const lockTransaction = new LockTransaction(
      userNoValidationKeys.wallets.c79af3b6,
      userNoValidationKeys.wallets.c79af3b6.accounts[
        'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacb'
      ],
      '3m'
    )
    await lockTransaction.create()
    expect(false).toBe(true)
  } catch (error) {
    expect(error.toString()).toEqual('Error: No sequence found in addressData')
  }
})

test('failure of any transaction around sign', async () => {
  const theLockTransaction = {
    period: '5m',
    target: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacb',
    sequence: 3830689465
  }

  try {
    Object.assign(LockTransaction.prototype, Transaction)

    const lockTransaction = new LockTransaction(
      user.wallets.c79af3b6,
      user.wallets.c79af3b6.accounts[
        'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacb'
      ],
      '5m'
    )
    const createdLockTransaction = await lockTransaction.create()
    expect(createdLockTransaction).toEqual(theLockTransaction)
    await lockTransaction.sign()
  } catch (error) {
    expect(error.toString()).toEqual('Error: testing sign error')
  }
})

test('failure of any transaction around prevalidate', async () => {
  const theLockTransaction = {
    period: '12m',
    target: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacb',
    sequence: 3830689465
  }

  try {
    Object.assign(LockTransaction.prototype, Transaction)
    const lockTransaction = new LockTransaction(
      user.wallets.c79af3b6,
      user.wallets.c79af3b6.accounts[
        'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacb'
      ],
      '12m'
    )
    const createdLockTransaction = await lockTransaction.create()
    expect(createdLockTransaction).toEqual(theLockTransaction)
    await lockTransaction.prevalidate()
  } catch (error) {
    expect(error.toString()).toEqual('Error: error being sent')
  }
})

test('failure of any transaction around submit', async () => {
  const theLockTransaction = {
    period: '2m',
    target: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacb',
    sequence: 3830689465
  }

  try {
    Object.assign(LockTransaction.prototype, Transaction)
    const lockTransaction = new LockTransaction(
      user.wallets.c79af3b6,
      user.wallets.c79af3b6.accounts[
        'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacb'
      ],
      '2m'
    )
    const createdLockTransaction = await lockTransaction.create()
    expect(createdLockTransaction).toEqual(theLockTransaction)
    await lockTransaction.submit()
  } catch (error) {
    expect(error.toString()).toEqual('Error: error being sent')
  }
})
