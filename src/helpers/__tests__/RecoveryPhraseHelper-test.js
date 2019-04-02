import { NativeModules } from 'react-native'
import MockAsyncStorage from 'mock-async-storage'
import sinon from 'sinon'
import RecoveryPhaseHelper from '../RecoveryPhaseHelper'
import data from '../../api/data'
import MockHelper from '../MockHelper'

MockHelper.mockServiceDiscovery()

MockHelper.mockAccountAPI()
MockHelper.mockEaiRate()
MockHelper.mockMarketPriceAPI()

NativeModules.KeyaddrManager = {
  keyaddrWordsToBytes: jest.fn(),
  newKey: jest.fn(),
  child: jest.fn(),
  hardenedChild: jest.fn(),
  ndauAddress: jest.fn(),
  deriveFrom: jest.fn(),
  toPublic: jest.fn()
}

const mock = () => {
  const mockImpl = new MockAsyncStorage()
  jest.mock('AsyncStorage', () => mockImpl)
}

mock()

let recoveryPhraseString =
  'goat amount liar amount expire adjust cage candy arch gather drum buyer'
const userId = 'TAC-3PY'
const bytes = 'ZWEQAwQFBgcICQoLDA0ODw=='
const initialPrivateKey =
  'npvt8aaaaaaaaaaaadyj632qv3ip7jhi66dxjzdtbvabf2nrrupjaqignfha5smckbu4nagfhwce3f9gfutkhmk5weuicjwyrsiax8qgq56bnhg5wrb6uwbigqk3bgw'
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
for (let i = 0; i < 500; i++) {
  keyaddrWordsToBytes
    .mockReturnValueOnce(bytes)
    .mockReturnValueOnce(bytes)
    .mockReturnValueOnce(bytes)
    .mockReturnValueOnce(bytes)
    .mockReturnValueOnce(bytes)
    .mockReturnValueOnce(bytes)
    .mockReturnValueOnce(bytes)
    .mockReturnValueOnce(bytes)
    .mockReturnValueOnce(bytes)
    .mockReturnValueOnce(bytes)
    .mockReturnValueOnce(bytes)
    .mockReturnValueOnce(bytes)
    .mockReturnValueOnce(bytes)
    .mockReturnValueOnce(bytes)
    .mockReturnValueOnce(bytes)
    .mockReturnValueOnce(bytes)
}

const newKey = sinon.spy(NativeModules.KeyaddrManager, 'newKey')
for (let i = 0; i < 500; i++) {
  newKey.mockReturnValueOnce(initialPrivateKey + i)
}

const hardenedChild = sinon.spy(NativeModules.KeyaddrManager, 'hardenedChild')
for (let i = 0; i < 500; i++) {
  hardenedChild.mockReturnValueOnce(bip44hardenedPrivateKey + i)
}

const child = sinon.spy(NativeModules.KeyaddrManager, 'child')
for (let i = 0; i < 500; i++) {
  child.mockReturnValueOnce(childPrivate100 + i)
}

const ndauAddress = sinon.spy(NativeModules.KeyaddrManager, 'ndauAddress')
for (let i = 0; i < 500; i++) {
  ndauAddress.mockReturnValueOnce(address + i)
}

const deriveFrom = sinon.spy(NativeModules.KeyaddrManager, 'deriveFrom')
for (let i = 0; i < 500; i++) {
  deriveFrom.mockReturnValueOnce(deriveFromKey + i)
}

const toPublic = sinon.spy(NativeModules.KeyaddrManager, 'toPublic')
for (let i = 0; i < 500; i++) {
  toPublic.mockReturnValueOnce(publicKey + i)
}

test('checkRecoveryPhrase test', async () => {
  MockHelper.mockAccountsAPIReplyOnce(data.testAddressData20Items)
  MockHelper.mockAccountsAPIReplyOnce()
  MockHelper.mockAccountsAPIReplyOnce(data.testAddressData20ItemsRoot)
  MockHelper.mockAccountsAPIReplyOnce(data.testAddressDataRoot)

  const user = {
    userId: userId,
    wallets: {},
    addresses: [
      'tnai24puxki6s4zqyy7ebizgcviw2ui9z9x98pmah5n3ynmz',
      'tnarpmwz3yxxyk7fdgiu2irmvatygg5u8nrg735xcu5ezezv'
    ]
  }

  const firstTimeUser = await RecoveryPhaseHelper.checkRecoveryPhrase(
    recoveryPhraseString,
    user
  )

  console.log(`TEST ${JSON.stringify(firstTimeUser)}`)

  expect(firstTimeUser).toBeDefined()
  expect(Object.keys(firstTimeUser.wallets['a7bff20a'].accounts).length).toBe(
    54
  )
})

test('_checkRootAddresses works correctly', async () => {
  MockHelper.mockReset()
  MockHelper.mockServiceDiscovery()
  MockHelper.mockAccountsAPIReplyOnce(data.testAddressData20Items)
  MockHelper.mockAccountsAPIReplyOnce()
  MockHelper.mockAccountsAPIReplyOnce(data.testAddressData20ItemsRoot)
  MockHelper.mockAccountsAPIReplyOnce(data.testAddressDataRoot)

  const user = {
    userId: userId,
    wallets: {}
  }

  const firstTimeUser = await RecoveryPhaseHelper.checkRecoveryPhrase(
    recoveryPhraseString,
    user
  )
  expect(Object.keys(firstTimeUser.wallets['a7bff20a'].accounts).length).toBe(
    54
  )
})
