import { NativeModules } from 'react-native'
import sinon from 'sinon'
import KeyMaster from '../KeyMaster'
import User from '../../model/User'
import AppConfig from '../../AppConfig'
import Wallet from '../../model/Wallet'
import MockAsyncStorage from 'mock-async-storage'
import MockHelper from '../MockHelper'
import AppConstants from '../../AppConstants'

MockHelper.mockServiceDiscovery()
MockHelper.mockAccountsAPI()
MockHelper.mockAccountAPI()
MockHelper.mockEaiRate()
MockHelper.mockMarketPriceAPI()

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

let seedPhraseArray = [
  'goat',
  'amount',
  'liar',
  'amount',
  'expire',
  'adjust',
  'cage',
  'candy',
  'arch',
  'gather',
  'drum',
  'buyer'
]
const userId = 'TAC-3PY'
const numberOfAccounts = 5
const chainId = 'tn'
const errorString = 'Error: you MUST pass recoveryPhrase to this method'
const errorNewAccountUser = `Error: The user's wallet passed in has no accountCreationKeyHash`
const errorGetRootAddresses = 'Error: you MUST pass recoveryBytes'
const errorGetBIP44Addresses = 'Error: you MUST pass recoveryBytes'
let recoveryPhraseString =
  'goat amount liar amount expire adjust cage candy arch gather drum buyer'
const bytes = 'ZWEQAwQFBgcICQoLDA0ODw=='
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
keyaddrWordsToBytes.mockReturnValue(bytes)
const newKey = sinon.spy(NativeModules.KeyaddrManager, 'newKey')
newKey.mockReturnValue(initialPrivateKey)

const hardenedChild = sinon.spy(NativeModules.KeyaddrManager, 'hardenedChild')
for (let i = 0; i < 30; i++) {
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
}

const child = sinon.spy(NativeModules.KeyaddrManager, 'child')
for (let i = 0; i < 30; i++) {
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
}

const ndauAddress = sinon.spy(NativeModules.KeyaddrManager, 'ndauAddress')
for (let i = 0; i < 30; i++) {
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
}

const deriveFrom = sinon.spy(NativeModules.KeyaddrManager, 'deriveFrom')
for (let i = 0; i < 30; i++) {
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
}

const toPublic = sinon.spy(NativeModules.KeyaddrManager, 'toPublic')
for (let i = 0; i < 30; i++) {
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
}

test('createFirstTimeUser test', async () => {
  const firstTimeUser = await KeyMaster.createFirstTimeUser(
    bytes,
    userId,
    chainId,
    numberOfAccounts
  )
  expect(firstTimeUser).toBeDefined()
  expect(JSON.stringify(firstTimeUser)).toBe(
    `{"userId":"TAC-3PY","wallets":{"c79af3b6":{"walletId":"TAC-3PY","accountCreationKeyHash":"c1ca8e03","accounts":{"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac1":{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac1","addressData":{},"ownershipKey":"95b8071e","validationKeys":[]},"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac2":{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac2","addressData":{},"ownershipKey":"20f4d175","validationKeys":[]},"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac3":{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac3","addressData":{},"ownershipKey":"edef8a85","validationKeys":[]},"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac4":{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac4","addressData":{},"ownershipKey":"90808ebd","validationKeys":[]},"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac5":{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac5","addressData":{},"ownershipKey":"d8cc78c1","validationKeys":[]}},"keys":{"c1ca8e03":{"publicKey":"","privateKey":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6sq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmid3kjbfrw628y7c5zit8vcz6x7hjuxgfeu4kasdf1","path":"/44'/20036'/100","derivedFromRoot":"yes"},"95b8071e":{"publicKey":"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj441","privateKey":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx1","path":"/44'/20036'/100/1","derivedFromRoot":"yes"},"20f4d175":{"publicKey":"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj442","privateKey":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx2","path":"/44'/20036'/100/2","derivedFromRoot":"yes"},"edef8a85":{"publicKey":"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj443","privateKey":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx3","path":"/44'/20036'/100/3","derivedFromRoot":"yes"},"90808ebd":{"publicKey":"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj444","privateKey":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx4","path":"/44'/20036'/100/4","derivedFromRoot":"yes"},"d8cc78c1":{"publicKey":"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj445","privateKey":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx5","path":"/44'/20036'/100/5","derivedFromRoot":"yes"}}}}}`
  )
})

test('createFirstTimeUser with 0, as this will be possible post Genesis', async () => {
  const firstTimeUser = await KeyMaster.createFirstTimeUser(
    numberOfAccounts,
    userId,
    bytes,
    chainId
  )

  expect(firstTimeUser).toBeDefined()
  expect(JSON.stringify(firstTimeUser)).toBe(
    `{"userId":"TAC-3PY","wallets":{"c79af3b6":{"walletId":"TAC-3PY","accountCreationKeyHash":"4cb4dca9","accounts":{},"keys":{"4cb4dca9":{"publicKey":"","privateKey":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6sq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmid3kjbfrw628y7c5zit8vcz6x7hjuxgfeu4kasdf2","path":"/44'/20036'/100","derivedFromRoot":"yes"}}}}}`
  )
})

test('createFirstTimeUser no bytes', async () => {
  try {
    await KeyMaster.createFirstTimeUser(null, userId, chainId)
  } catch (error) {
    expect(error.toString()).toBe(errorString)
  }
})

test('createNewAccount test', async () => {
  const firstTimeUser = await KeyMaster.createFirstTimeUser(
    bytes,
    userId,
    chainId,
    numberOfAccounts
  )

  expect(firstTimeUser).toBeDefined()
  expect(Object.keys(firstTimeUser.wallets['c79af3b6'].accounts).length).toBe(5)

  await KeyMaster.createNewAccount(firstTimeUser.wallets['c79af3b6'])
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
    await KeyMaster.createNewAccount(user.wallets[user.userId])
  } catch (error) {
    expect(error.toString()).toBe(errorNewAccountUser)
  }
})

test('test getRootAddresses to make sure we get back one address in the array', async () => {
  const addresses = await KeyMaster.getRootAddresses(
    bytes,
    1,
    AppConfig.NUMBER_OF_KEYS_TO_GRAB_ON_RECOVERY
  )
  expect(addresses.length).toBe(AppConfig.NUMBER_OF_KEYS_TO_GRAB_ON_RECOVERY)
})

test('getRootAddresses has an error', async () => {
  try {
    await KeyMaster.getRootAddresses(null)
  } catch (error) {
    expect(error.toString()).toBe(errorGetRootAddresses)
  }
})

test('test getBIP44Addresses to make sure we get back one address in the array', async () => {
  const addresses = await KeyMaster.getBIP44Addresses(
    bytes,
    1,
    AppConfig.NUMBER_OF_KEYS_TO_GRAB_ON_RECOVERY
  )
  expect(addresses.length).toBe(AppConfig.NUMBER_OF_KEYS_TO_GRAB_ON_RECOVERY)
})

test('getBIP44Addresses has an error', async () => {
  try {
    await KeyMaster.getBIP44Addresses(null)
  } catch (error) {
    expect(error.toString()).toBe(errorGetBIP44Addresses)
  }
})

test('addVadidationKey test', async () => {
  const firstTimeUser = await KeyMaster.createFirstTimeUser(
    bytes,
    userId,
    chainId,
    numberOfAccounts
  )

  expect(firstTimeUser).toBeDefined()
  expect(JSON.stringify(firstTimeUser)).toBe(
    `{"userId":"TAC-3PY","wallets":{"c79af3b6":{"walletId":"TAC-3PY","accountCreationKeyHash":"1e48ba8c","accounts":{"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacb":{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacb","addressData":{},"ownershipKey":"a0bb883b","validationKeys":[]},"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacc":{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacc","addressData":{},"ownershipKey":"d396491a","validationKeys":[]},"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacd":{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacd","addressData":{},"ownershipKey":"2da2eaca","validationKeys":[]},"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyace":{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyace","addressData":{},"ownershipKey":"b960e699","validationKeys":[]},"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacf":{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacf","addressData":{},"ownershipKey":"057391a6","validationKeys":[]}},"keys":{"1e48ba8c":{"publicKey":"","privateKey":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6sq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmid3kjbfrw628y7c5zit8vcz6x7hjuxgfeu4kasdf4","path":"/44'/20036'/100","derivedFromRoot":"yes"},"a0bb883b":{"publicKey":"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj44b","privateKey":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqxb","path":"/44'/20036'/100/1","derivedFromRoot":"yes"},"d396491a":{"publicKey":"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj44c","privateKey":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqxc","path":"/44'/20036'/100/2","derivedFromRoot":"yes"},"2da2eaca":{"publicKey":"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj44d","privateKey":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqxd","path":"/44'/20036'/100/3","derivedFromRoot":"yes"},"b960e699":{"publicKey":"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj44e","privateKey":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqxe","path":"/44'/20036'/100/4","derivedFromRoot":"yes"},"057391a6":{"publicKey":"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj44f","privateKey":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqxf","path":"/44'/20036'/100/5","derivedFromRoot":"yes"}}}}}`
  )

  const wallet = firstTimeUser.wallets['c79af3b6']
  const account =
    wallet.accounts['tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacb']
  const keysLength = Object.keys(wallet.keys).length

  await KeyMaster.addValidationKey(wallet, account)
  await KeyMaster.addValidationKey(wallet, account)

  expect(account.validationKeys.length).toBe(2)
  expect(Object.keys(wallet.keys).length).toBe(keysLength + 2)
})

test('getPublicKeyFromHash test', async () => {
  const firstTimeUser = await KeyMaster.createFirstTimeUser(
    bytes,
    userId,
    chainId,
    numberOfAccounts
  )

  expect(firstTimeUser).toBeDefined()

  const wallet = firstTimeUser.wallets['c79af3b6']
  const account =
    wallet.accounts['tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacg']
  const keysLength = Object.keys(wallet.keys).length

  await KeyMaster.addValidationKey(wallet, account)

  expect(account.validationKeys.length).toBe(1)
  expect(Object.keys(wallet.keys).length).toBe(keysLength + 1)

  const publicKey = KeyMaster.getPublicKeyFromHash(
    wallet,
    account.validationKeys[0]
  )
  expect(
    'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj444'
  ).toBe(publicKey)
})

test('getPrivateKeyFromHash test', async () => {
  const firstTimeUser = await KeyMaster.createFirstTimeUser(
    bytes,
    userId,
    chainId,
    numberOfAccounts
  )

  expect(firstTimeUser).toBeDefined()

  const wallet = firstTimeUser.wallets['c79af3b6']
  const account =
    wallet.accounts['tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac2']
  const keysLength = Object.keys(wallet.keys).length

  await KeyMaster.addValidationKey(wallet, account)

  expect(account.validationKeys.length).toBe(1)
  expect(Object.keys(wallet.keys).length).toBe(keysLength + 1)

  const privateKey = KeyMaster.getPrivateKeyFromHash(
    wallet,
    account.validationKeys[0]
  )
  expect(
    'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6sq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmid3kjbfrw628y7c5zit8vcz6x7hjuxgfeu4kasdf0'
  ).toBe(privateKey)
})

test('_createAccount test when empty string called will use root key', async () => {
  const firstTimeUser = await KeyMaster.createFirstTimeUser(
    bytes,
    userId,
    chainId,
    numberOfAccounts
  )

  expect(firstTimeUser).toBeDefined()

  const countBeforeCall = newKey.callCount
  const wallet = firstTimeUser.wallets['c79af3b6']
  await KeyMaster.addAccounts(
    wallet,
    initialPrivateKey,
    1,
    '',
    AppConstants.MAINNET_ADDRESS,
    bytes
  )

  expect(newKey.callCount).toBe(countBeforeCall + 1)
})

test('addAccountsToUser should add to wallets if passed', async () => {
  const user = {
    userId: 'temp-id',
    wallets: {
      a7bff20a: {
        walletId: 'temp-id',
        accountCreationKeyHash: '716ee87c',
        accounts: {
          ndah7dmb2dsufay2fes8nrh94iy27b6kfrdnqzekj49x2fx8: {
            address: 'ndah7dmb2dsufay2fes8nrh94iy27b6kfrdnqzekj49x2fx8',
            addressData: {},
            ownershipKey: 'bf69b8d9',
            validationKeys: []
          },
          ndaewqeeamz9tad4jqvvszd2suz7iyimay7a82fphjg67pm8: {
            address: 'ndaewqeeamz9tad4jqvvszd2suz7iyimay7a82fphjg67pm8',
            addressData: {},
            ownershipKey: '5b74da2e',
            validationKeys: []
          },
          ndahm67vctjjvxdeh4phxy6j5agf9ps9qhzw4mw6r4wppuq5: {
            address: 'ndahm67vctjjvxdeh4phxy6j5agf9ps9qhzw4mw6r4wppuq5',
            addressData: {},
            ownershipKey: '65556d76',
            validationKeys: []
          },
          ndacp6s7qm44p2iiyu4n4xc9wu62h8j8ttmzwbgm7z2yy645: {
            address: 'ndacp6s7qm44p2iiyu4n4xc9wu62h8j8ttmzwbgm7z2yy645',
            addressData: {},
            ownershipKey: '7fb54752',
            validationKeys: []
          }
        },
        keys: {
          '716ee87c': {
            publicKey: '',
            privateKey:
              'npvta8jaftcjecyu8ure5xqewhznf6rkdgdp5tfwsgupd4e3nvnc6m3i96i2d29sqa2mwwhaaaaanvin6betzynuxq4ds2dg64xah8qkih23hcisumgchfg6xqjztr7ufze5t867yt3j',
            path: "/44'/20036'/100",
            derivedFromRoot: 'yes'
          },
          bf69b8d9: {
            publicKey:
              'npuba4jaftckeebm82py89d5terpugp9tqvycvxsxxuirhcsydtq74d3hv7e5wbtrksezxhv4aaaaaay4v4qykgp323gb8iaq9gcvh4eka6vexqabuqqe9yngk2iavv7qw66j7raient',
            privateKey:
              'npvta8jaftcjeavyyhyzcebu7zbwf82v6n36hshm9xxmcdbjmus5usufqfbpsph5kbf7j68saaaaafyw8vxutvqqgjsruadz3sw38tcshe3fmsanvvth7vbuycae69mxg53cge785twv',
            path: "/44'/20036'/100/1",
            derivedFromRoot: 'yes'
          },
          '5b74da2e': {
            publicKey:
              'npuba4jaftckeebp3g9fsqxg6fkhgmqincgbwsjwv3ibtgm8wnv2an589j476scwcp2ezxhv4aaaaabqr9btk25uz5kf7q8vwncj29rm5rq4dn4uszkwwqw258vvmbtfzzzyb76jt9ui',
            privateKey:
              'npvta8jaftcjebgcvzbga8nja2u5hp3xn8p9egrxxf647e6u66k9mynqf4u3dcy8cbf7j68saaaaamv92nkyg6x84trmzw7dauqh54855ys5gwwf4xfdxgg9w642njp76u4ny5p23bzf',
            path: "/44'/20036'/100/2",
            derivedFromRoot: 'yes'
          },
          '65556d76': {
            publicKey:
              'npuba4jaftckeebe8sntt9we2hihubke7d26pu7sghhcb3thq9e73vgsc5rx3fybkaib7ds9yaaaaaa7s8hsyeu6c4k2erzgzauc9crpziahatyk5w2tgcg5859r6jeugwyfduccyzjc',
            privateKey:
              'npvta8jaftcjedu754sd687sn4qdp8ynwewtpszcmvqstkt3an7geys9r4pp7rtygari6h7saaaaahnht6ftezayuybd73x2esz2v5p4ab2epuy7gejsty9y959cjetxfbg28cqert32',
            path: '/1',
            derivedFromRoot: 'yes'
          },
          '7fb54752': {
            publicKey:
              'npuba4jaftckeebxxr3f3kaastha8q4ctvmnrzen5hxwseh4ymdyfujizfufd4hanqsb7ds9yaaaaabms93t5sufmk5fgvr3667pbir7wn2vqkmqp73e562edzfxa53ci8jn8hen6zus',
            privateKey:
              'npvta8jaftcjeai3ukgdv2p2p7wbj39aqdbnrj9dej3r3z2dzrxrs4kngg6f2dhi6ari6h7saaaaak6h8nq6etk4y3jw58rhhmikd9pdge5uu5vrqjg9gba73pig8iuhvwvhtu95tk56',
            path: '/2',
            derivedFromRoot: 'yes'
          }
        }
      }
    }
  }

  const wallet = await KeyMaster.addAccountsToUser(
    bytes,
    user,
    2,
    undefined,
    'temp-id',
    user.wallets['a7bff20a']
  )

  expect(Object.keys(wallet.accounts).length).toBe(6)
})
