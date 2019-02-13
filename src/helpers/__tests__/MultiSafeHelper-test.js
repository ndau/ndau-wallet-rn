import MockAsyncStorage from 'mock-async-storage'
import { NativeModules } from 'react-native'
import sinon from 'sinon'
import MultiSafeHelper from '../MultiSafeHelper'
import data from '../../api/data'
import AccountAPI from '../../api/AccountAPI'
import KeyPathHelper from '../KeyPathHelper'

const mock = () => {
  const mockImpl = new MockAsyncStorage()
  jest.mock('AsyncStorage', () => mockImpl)
}

mock()

NativeModules.KeyaddrManager = {
  keyaddrWordsToBytes: jest.fn(),
  newKey: jest.fn(),
  child: jest.fn(),
  hardenedChild: jest.fn(),
  ndauAddress: jest.fn(),
  deriveFrom: jest.fn(),
  toPublic: jest.fn()
}

jest.mock('../../api/AccountAPI', () => {
  return {
    getAddressData: jest
      .fn()
      .mockReturnValueOnce(data.testAddressData)
      .mockReturnValueOnce(data.testAddressData)
      .mockReturnValueOnce(data.testAddressData)
      .mockReturnValueOnce(data.testAddressData)
      .mockReturnValueOnce(data.testAddressData)
      .mockReturnValueOnce(data.testAddressData)
      .mockReturnValueOnce(data.testAddressData)
      .mockReturnValueOnce(data.testAddressData)
      .mockReturnValueOnce(data.testAddressData)
      .mockReturnValueOnce(data.testAddressData)
      .mockReturnValueOnce(data.testAddressData)
      .mockReturnValueOnce(data.testAddressData)
      .mockReturnValueOnce(data.testAddressData)
      .mockReturnValueOnce(data.testAddressData)
      .mockReturnValueOnce(data.testAddressData)
      .mockReturnValueOnce(data.testAddressData)
      .mockReturnValueOnce(data.testAddressData)
      .mockReturnValueOnce(data.testAddressData)
      .mockReturnValueOnce(data.testAddressData)
      .mockReturnValueOnce(data.testAddressData)
  }
})

const numberOfAccounts = 2
let recoveryPhraseString =
  'goat amount liar amount expire adjust cage candy arch gather drum buyer'
const recoveryPhraseBytes = 'ZWEQAwQFBgcICQoLDA0ODw=='
const initialPrivateKey =
  'npvt8aaaaaaaaaaaadyj632qv3ip7jhi66dxjzdtbvabf2nrrupjaqignfha5smckbu4nagfhwce3f9gfutkhmk5weuicjwyrsiax8qgq56bnhg5wrb6uwbigqk3bgw3'
const bip44hardenedPrivateKey =
  'npvt8ard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkah8hjr9cnqmrxn4a9rcrzu9yerbyhhykt6nq586kyw8t2g3kkbk5a6m4pa'
const publicKey =
  'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj44'
const childPrivate100 =
  'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx'
const deriveFromKey =
  'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6sq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmid3kjbfrw628y7c5zit8vcz6x7hjuxgfeu4kasdf'
const address = 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac'
const keyaddrWordsToBytes = sinon.spy(
  NativeModules.KeyaddrManager,
  'keyaddrWordsToBytes'
)
keyaddrWordsToBytes.mockReturnValue(recoveryPhraseBytes)
const newKey = sinon.spy(NativeModules.KeyaddrManager, 'newKey')
newKey.mockReturnValue(initialPrivateKey)

const hardenedChild = sinon.spy(NativeModules.KeyaddrManager, 'hardenedChild')
hardenedChild
  .mockReturnValueOnce(bip44hardenedPrivateKey + 1)
  .mockReturnValueOnce(bip44hardenedPrivateKey + 2)
  .mockReturnValueOnce(bip44hardenedPrivateKey + 3)
  .mockReturnValueOnce(bip44hardenedPrivateKey + 4)
  .mockReturnValueOnce(bip44hardenedPrivateKey + 5)
  .mockReturnValueOnce(bip44hardenedPrivateKey + 6)
  .mockReturnValueOnce(bip44hardenedPrivateKey + 7)
  .mockReturnValueOnce(bip44hardenedPrivateKey + 8)
  .mockReturnValueOnce(bip44hardenedPrivateKey + 9)
  .mockReturnValueOnce(bip44hardenedPrivateKey + 0)
  .mockReturnValueOnce(bip44hardenedPrivateKey + 'a')
  .mockReturnValueOnce(bip44hardenedPrivateKey + 'b')
  .mockReturnValueOnce(bip44hardenedPrivateKey + 'c')
  .mockReturnValueOnce(bip44hardenedPrivateKey + 'd')
  .mockReturnValueOnce(bip44hardenedPrivateKey + 'e')
  .mockReturnValueOnce(bip44hardenedPrivateKey + 'f')
  .mockReturnValueOnce(bip44hardenedPrivateKey + 'g')
  .mockReturnValueOnce(bip44hardenedPrivateKey + 'h')
  .mockReturnValueOnce(bip44hardenedPrivateKey + 'i')
  .mockReturnValueOnce(bip44hardenedPrivateKey + 'h')

const child = sinon.spy(NativeModules.KeyaddrManager, 'child')
child
  .mockReturnValueOnce(childPrivate100 + 1)
  .mockReturnValueOnce(childPrivate100 + 2)
  .mockReturnValueOnce(childPrivate100 + 3)
  .mockReturnValueOnce(childPrivate100 + 4)
  .mockReturnValueOnce(childPrivate100 + 5)
  .mockReturnValueOnce(childPrivate100 + 6)
  .mockReturnValueOnce(childPrivate100 + 7)
  .mockReturnValueOnce(childPrivate100 + 8)
  .mockReturnValueOnce(childPrivate100 + 9)
  .mockReturnValueOnce(childPrivate100 + 0)
  .mockReturnValueOnce(childPrivate100 + 'a')
  .mockReturnValueOnce(childPrivate100 + 'b')
  .mockReturnValueOnce(childPrivate100 + 'c')
  .mockReturnValueOnce(childPrivate100 + 'd')
  .mockReturnValueOnce(childPrivate100 + 'e')
  .mockReturnValueOnce(childPrivate100 + 'f')
  .mockReturnValueOnce(childPrivate100 + 'g')
  .mockReturnValueOnce(childPrivate100 + 'h')
  .mockReturnValueOnce(childPrivate100 + 'i')
  .mockReturnValueOnce(childPrivate100 + 'h')

const ndauAddress = sinon.spy(NativeModules.KeyaddrManager, 'ndauAddress')
ndauAddress
  .mockReturnValueOnce(address + 1)
  .mockReturnValueOnce(address + 2)
  .mockReturnValueOnce(address + 3)
  .mockReturnValueOnce(address + 4)
  .mockReturnValueOnce(address + 5)
  .mockReturnValueOnce(address + 6)
  .mockReturnValueOnce(address + 7)
  .mockReturnValueOnce(address + 8)
  .mockReturnValueOnce(address + 9)
  .mockReturnValueOnce(address + 0)
  .mockReturnValueOnce(address + 'a')
  .mockReturnValueOnce(address + 'b')
  .mockReturnValueOnce(address + 'c')
  .mockReturnValueOnce(address + 'd')
  .mockReturnValueOnce(address + 'e')
  .mockReturnValueOnce(address + 'f')
  .mockReturnValueOnce(address + 'g')
  .mockReturnValueOnce(address + 'h')
  .mockReturnValueOnce(address + 'i')
  .mockReturnValueOnce(address + 'h')

const deriveFrom = sinon.spy(NativeModules.KeyaddrManager, 'deriveFrom')
deriveFrom
  .mockReturnValueOnce(deriveFromKey + 1)
  .mockReturnValueOnce(deriveFromKey + 2)
  .mockReturnValueOnce(deriveFromKey + 3)
  .mockReturnValueOnce(deriveFromKey + 4)
  .mockReturnValueOnce(deriveFromKey + 5)
  .mockReturnValueOnce(deriveFromKey + 6)
  .mockReturnValueOnce(deriveFromKey + 7)
  .mockReturnValueOnce(deriveFromKey + 8)
  .mockReturnValueOnce(deriveFromKey + 9)
  .mockReturnValueOnce(deriveFromKey + 0)
  .mockReturnValueOnce(deriveFromKey + 'a')
  .mockReturnValueOnce(deriveFromKey + 'b')
  .mockReturnValueOnce(deriveFromKey + 'c')
  .mockReturnValueOnce(deriveFromKey + 'd')
  .mockReturnValueOnce(deriveFromKey + 'e')
  .mockReturnValueOnce(deriveFromKey + 'f')
  .mockReturnValueOnce(deriveFromKey + 'g')
  .mockReturnValueOnce(deriveFromKey + 'h')
  .mockReturnValueOnce(deriveFromKey + 'i')
  .mockReturnValueOnce(deriveFromKey + 'h')

const toPublic = sinon.spy(NativeModules.KeyaddrManager, 'toPublic')
toPublic
  .mockReturnValueOnce(publicKey + 1)
  .mockReturnValueOnce(publicKey + 2)
  .mockReturnValueOnce(publicKey + 3)
  .mockReturnValueOnce(publicKey + 4)
  .mockReturnValueOnce(publicKey + 5)
  .mockReturnValueOnce(publicKey + 6)
  .mockReturnValueOnce(publicKey + 7)
  .mockReturnValueOnce(publicKey + 8)
  .mockReturnValueOnce(publicKey + 9)
  .mockReturnValueOnce(publicKey + 0)
  .mockReturnValueOnce(publicKey + 'a')
  .mockReturnValueOnce(publicKey + 'b')
  .mockReturnValueOnce(publicKey + 'c')
  .mockReturnValueOnce(publicKey + 'd')
  .mockReturnValueOnce(publicKey + 'e')
  .mockReturnValueOnce(publicKey + 'f')
  .mockReturnValueOnce(publicKey + 'g')
  .mockReturnValueOnce(publicKey + 'h')
  .mockReturnValueOnce(publicKey + 'i')
  .mockReturnValueOnce(publicKey + 'h')

test('setupNewUser creates a MultiSafe and we can then retrieve with password', async () => {
  const walletId = 'Kris'
  const encryptionPassword = 'asdfjkl'

  await MultiSafeHelper.setupNewUser(
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
              'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj441',
            privateKey:
              'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx1',
            path: KeyPathHelper.accountCreationKeyPath() + '/1',
            derivedFromRoot: 'yes'
          },
          '20f4d175': {
            publicKey:
              'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj442',
            privateKey:
              'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx2',
            path: KeyPathHelper.accountCreationKeyPath() + '/2',
            derivedFromRoot: 'yes'
          },
          c1ca8e03: {
            publicKey: '',
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

test('setupTestUser creates a MultiSafe and we can then retrieve with recovery phrase', async () => {
  const walletId = 'Kris'
  const encryptionPassword = 'asdfjkl'
  await MultiSafeHelper.setupNewUser(
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
        accountCreationKeyHash: '4cb4dca9',
        accounts: {
          tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac3: {
            address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac3',
            addressData: {},
            ownershipKey: 'edef8a85',
            validationKeys: []
          },
          tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac4: {
            address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac4',
            addressData: {},
            ownershipKey: '90808ebd',
            validationKeys: []
          }
        },
        keys: {
          edef8a85: {
            publicKey:
              'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj443',
            privateKey:
              'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx3',
            path: KeyPathHelper.accountCreationKeyPath() + '/1',
            derivedFromRoot: 'yes'
          },
          '90808ebd': {
            publicKey:
              'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj444',
            privateKey:
              'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx4',
            path: KeyPathHelper.accountCreationKeyPath() + '/2',
            derivedFromRoot: 'yes'
          },
          '4cb4dca9': {
            publicKey: '',
            privateKey:
              'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6sq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmid3kjbfrw628y7c5zit8vcz6x7hjuxgfeu4kasdf2',
            path: KeyPathHelper.accountCreationKeyPath(),
            derivedFromRoot: 'yes'
          }
        }
      }
    }
  }

  // make sure you can get it back with password and recovery phrase
  const user = await MultiSafeHelper.getDefaultUser(recoveryPhraseString)

  expect(user).toBeDefined()
  expect(user).toEqual(userGettingCreated)
})

test('setupTestUser creates a MultiSafe and we can then retrieve with recovery phrase', async () => {
  const walletId = 'Kris'
  const encryptionPassword = 'asdfjkl'
  await MultiSafeHelper.setupNewUser(
    null,
    recoveryPhraseString,
    walletId,
    1,
    encryptionPassword
  )

  const userGettingCreated = {
    userId: 'Kris',
    wallets: {
      '61d9b642': {
        walletId: 'Kris',
        accountCreationKeyHash: '5ba05375',
        accounts: {
          tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac5: {
            address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac5',
            addressData: {},
            ownershipKey: 'd8cc78c1',
            validationKeys: []
          }
        },
        keys: {
          d8cc78c1: {
            publicKey:
              'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj445',
            privateKey:
              'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx5',
            path: KeyPathHelper.accountCreationKeyPath() + '/1',
            derivedFromRoot: 'yes'
          },
          '5ba05375': {
            publicKey: '',
            privateKey:
              'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6sq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmid3kjbfrw628y7c5zit8vcz6x7hjuxgfeu4kasdf3',
            path: KeyPathHelper.accountCreationKeyPath(),
            derivedFromRoot: 'yes'
          }
        }
      }
    }
  }

  // make sure you can get it back with password and recovery phrase
  const user = await MultiSafeHelper.getDefaultUser(recoveryPhraseString)

  expect(user).toBeDefined()
  expect(user).toEqual(userGettingCreated)

  const newUser = {
    userId: 'Kris',
    wallets: {
      '61d9b642': {
        walletId: 'Kris',
        accountCreationKeyHash: '5ba05375',
        accounts: {
          tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac5: {
            address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac5',
            addressData: {},
            ownershipKey: 'd8cc78c1',
            validationKeys: []
          },
          tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac6: {
            address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac5',
            addressData: {},
            ownershipKey: 'd8cc78c1',
            validationKeys: []
          }
        },
        keys: {
          d8cc78c1: {
            publicKey:
              'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj445',
            privateKey:
              'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx5',
            path: KeyPathHelper.accountCreationKeyPath() + '/1',
            derivedFromRoot: 'yes'
          },
          d8cc78c2: {
            publicKey:
              'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj445',
            privateKey:
              'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx5',
            path: KeyPathHelper.accountCreationKeyPath() + '/2',
            derivedFromRoot: 'yes'
          },
          '5ba05375': {
            publicKey: '',
            privateKey:
              'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6sq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmid3kjbfrw628y7c5zit8vcz6x7hjuxgfeu4kasdf3',
            path: KeyPathHelper.accountCreationKeyPath(),
            derivedFromRoot: 'yes'
          }
        }
      }
    }
  }

  await MultiSafeHelper.saveUser(newUser, encryptionPassword)

  const theNewUser = await MultiSafeHelper.getDefaultUser(encryptionPassword)
  expect(theNewUser).toBeDefined()
  expect(theNewUser).toEqual(newUser)
})

test('setupTestUser creates a MultiSafe, retrieve with recovery and then resetPassword', async () => {
  const walletId = 'Kris'
  const encryptionPassword = 'asdfjkl'
  await MultiSafeHelper.setupNewUser(
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
        accountCreationKeyHash: '1e48ba8c',
        accounts: {
          tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac6: {
            address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac6',
            addressData: {},
            ownershipKey: '9d152ff0',
            validationKeys: []
          },
          tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac7: {
            address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac7',
            addressData: {},
            ownershipKey: '1e12ca49',
            validationKeys: []
          }
        },
        keys: {
          '9d152ff0': {
            publicKey:
              'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj446',
            privateKey:
              'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx6',
            path: KeyPathHelper.accountCreationKeyPath() + '/1',
            derivedFromRoot: 'yes'
          },
          '1e12ca49': {
            publicKey:
              'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj447',
            privateKey:
              'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx7',
            path: KeyPathHelper.accountCreationKeyPath() + '/2',
            derivedFromRoot: 'yes'
          },
          '1e48ba8c': {
            publicKey: '',
            privateKey:
              'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6sq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmid3kjbfrw628y7c5zit8vcz6x7hjuxgfeu4kasdf4',
            path: KeyPathHelper.accountCreationKeyPath(),
            derivedFromRoot: 'yes'
          }
        }
      }
    }
  }

  // make sure you can get it back with password and recovery phrase
  const user = await MultiSafeHelper.getDefaultUser(recoveryPhraseString)

  expect(user).toBeDefined()
  expect(user).toEqual(userGettingCreated)

  const newPassword = '123abc'
  await MultiSafeHelper.resetPassword(recoveryPhraseString, newPassword)

  const userFromNewPassword = await MultiSafeHelper.getDefaultUser(newPassword)

  expect(userFromNewPassword).toBeDefined()
  expect(userFromNewPassword).toEqual(userGettingCreated)

  const anotherPassword = 'asdfasdf'
  await MultiSafeHelper.resetPassword(recoveryPhraseString, anotherPassword)

  const userFromNewPassword1 = await MultiSafeHelper.getDefaultUser(
    anotherPassword
  )

  expect(userFromNewPassword1).toBeDefined()
  expect(userFromNewPassword1).toEqual(userGettingCreated)

  try {
    // original password is gone
    await MultiSafeHelper.getDefaultUser(newPassword)
    expect('should never get here').toBeFalsy()
  } catch (err) {
    expect(err).toBeDefined()
  }

  try {
    // original password is gone
    await MultiSafeHelper.getDefaultUser(encryptionPassword)
    expect('should never get here').toBeFalsy()
  } catch (err) {
    expect(err).toBeDefined()
  }
})

test('addNewWallet adds a new wallet to an existing user in a safe', async () => {
  const walletIdNew = 'Kris'
  const encryptionPasswordNew = 'asdfasdf'

  await MultiSafeHelper.setupNewUser(
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
              'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj448',
            privateKey:
              'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx8',
            path: KeyPathHelper.accountCreationKeyPath() + '/1',
            derivedFromRoot: 'yes'
          },
          '4e842c41': {
            publicKey:
              'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj449',
            privateKey:
              'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx9',
            path: KeyPathHelper.accountCreationKeyPath() + '/2',
            derivedFromRoot: 'yes'
          },
          '5a3b36e3': {
            publicKey: '',
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

  await MultiSafeHelper.addNewWallet(
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

test('if you can check that a recovery phrase exists already', async () => {
  const walletIdNew = 'Kris'
  const encryptionPasswordNew = 'asdfasdf'

  await MultiSafeHelper.setupNewUser(
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
              'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj448',
            privateKey:
              'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx8',
            path: KeyPathHelper.accountCreationKeyPath() + '/1',
            derivedFromRoot: 'yes'
          },
          '4e842c41': {
            publicKey:
              'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj449',
            privateKey:
              'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx9',
            path: KeyPathHelper.accountCreationKeyPath() + '/2',
            derivedFromRoot: 'yes'
          },
          '5a3b36e3': {
            publicKey: '',
            privateKey:
              'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6sq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmid3kjbfrw628y7c5zit8vcz6x7hjuxgfeu4kasdf5',
            path: KeyPathHelper.accountCreationKeyPath(),
            derivedFromRoot: 'yes'
          }
        }
      }
    }
  }

  expect(
    await MultiSafeHelper.recoveryPhraseAlreadyExists(
      'Kris',
      recoveryPhraseString
    )
  ).toBeTruthy()
  expect(
    await MultiSafeHelper.recoveryPhraseAlreadyExists(
      'Kris',
      'this twelve word phrase is not already in the multisafe at all'
    )
  ).toBeFalsy()
})
