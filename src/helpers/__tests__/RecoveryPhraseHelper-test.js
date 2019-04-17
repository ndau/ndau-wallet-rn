import { NativeModules } from 'react-native'
import MockAsyncStorage from 'mock-async-storage'
import sinon from 'sinon'
import RecoveryPhaseHelper from '../RecoveryPhaseHelper'
import data from '../../api/data'
import MockHelper from '../MockHelper'

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
for (let i = 0; i < 200; i++) {
  ndauAddress.mockReturnValueOnce(
    'ndarc8etbkidm5ewytxhvzida94sgg9mvr3aswufbty8zc11'
  )
  ndauAddress.mockReturnValueOnce(
    'ndaiap4q2me85dtnp5naifa5d8xtmrimm4b997hr9mcm3822'
  )
  ndauAddress.mockReturnValueOnce(
    'ndamm8kxzf9754axd24wrkh3agvj2cidx75wdfhjiufcjf33'
  )
  ndauAddress.mockReturnValueOnce(
    'ndanhgm5avd68gj9ufiwq7ttcsshxciupgz5i7nnzk68f644'
  )
  ndauAddress.mockReturnValueOnce(
    'ndafwi9munvx8uhgg3pmaw7m6p22ixp5mpv7nipgc5zjyp65'
  )
  ndauAddress.mockReturnValueOnce(
    'ndap34mk6yzyiru49ivfitgzybkfqxnejcr9qvtnd3ychb66'
  )
  ndauAddress.mockReturnValueOnce(
    'ndaq9euuwf83yds7f3bwcfqdqsx43x5v4vjbcctkndy2fk77'
  )
  ndauAddress.mockReturnValueOnce(
    'ndarc8etbkidm5ewytxhvzida94sgg9mvr3aswufbty8zcu8'
  )
  ndauAddress.mockReturnValueOnce(
    'ndaiap4q2me85dtnp5naifa5d8xtmrimm4b997hr9mcm38v9'
  )
  ndauAddress.mockReturnValueOnce(
    'ndamm8kxzf9754axd24wrkh3agvj2cidx75wdfhjiufcjf10'
  )
  ndauAddress.mockReturnValueOnce(
    'ndanhgm5avd68gj9ufiwq7ttcsshxciupgz5i7nnzk68f611'
  )
  ndauAddress.mockReturnValueOnce(
    'ndafwi9munvx8uhgg3pmaw7m6p22ixp5mpv7nipgc5zjyp12'
  )
  ndauAddress.mockReturnValueOnce(
    'ndap34mk6yzyiru49ivfitgzybkfqxnejcr9qvtnd3ychb13'
  )
  ndauAddress.mockReturnValueOnce(
    'ndaq9euuwf83yds7f3bwcfqdqsx43x5v4vjbcctkndy2fk14'
  )
  ndauAddress.mockReturnValueOnce(
    'ndarc8etbkidm5ewytxhvzida94sgg9mvr3aswufbty8zc15'
  )
  ndauAddress.mockReturnValueOnce(
    'ndaiap4q2me85dtnp5naifa5d8xtmrimm4b997hr9mcm3816'
  )
  ndauAddress.mockReturnValueOnce(
    'ndamm8kxzf9754axd24wrkh3agvj2cidx75wdfhjiufcjf17'
  )
  ndauAddress.mockReturnValueOnce(
    'ndanhgm5avd68gj9ufiwq7ttcsshxciupgz5i7nnzk68f618'
  )
  ndauAddress.mockReturnValueOnce(
    'ndafwi9munvx8uhgg3pmaw7m6p22ixp5mpv7nipgc5zjyp519'
  )
  ndauAddress.mockReturnValueOnce(
    'ndap34mk6yzyiru49ivfitgzybkfqxnejcr9qvtnd3ychb20'
  )
}

const deriveFrom = sinon.spy(NativeModules.KeyaddrManager, 'deriveFrom')
for (let i = 0; i < 500; i++) {
  deriveFrom.mockReturnValueOnce(deriveFromKey + i)
}

const toPublic = sinon.spy(NativeModules.KeyaddrManager, 'toPublic')
for (let i = 0; i < 500; i++) {
  toPublic.mockReturnValueOnce(publicKey + i)
}

test('recoverUser test', async () => {
  MockHelper.mockReset()
  MockHelper.mockServiceDiscovery()
  MockHelper.mockAccountAPI()
  MockHelper.mockEaiRate()
  MockHelper.mockMarketPriceAPI()
  MockHelper.mockAccountsAPIReplyOnce(data.testAddressData20Items)
  MockHelper.mockAccountsAPIReplyOnce(data.testAddressData)
  MockHelper.mockAccountsAPIReplyOnce()
  MockHelper.mockAccountsAPIReplyOnce(data.testAddressData20ItemsRoot)
  MockHelper.mockAccountsAPIReplyOnce(data.testAddressDataRoot)
  MockHelper.mockAccountsAPIReplyOnce()

  const user = {
    userId: userId,
    wallets: {}
  }

  const firstTimeUser = await RecoveryPhaseHelper.recoverUser(
    recoveryPhraseString,
    user
  )
  expect(Object.keys(firstTimeUser.wallets['a7bff20a'].accounts).length).toBe(
    20
  )
  expect(Object.keys(firstTimeUser.wallets['a7bff20a'].keys).length).toBe(21)
})

test('checkAddresses gets the correct format for BIP44 addresses', async () => {
  MockHelper.mockReset()
  MockHelper.mockServiceDiscovery()
  MockHelper.mockAccountAPI()
  MockHelper.mockEaiRate()
  MockHelper.mockMarketPriceAPI()
  MockHelper.mockAccountsAPIReplyOnce(data.testAddressData20Items)
  MockHelper.mockAccountsAPIReplyOnce(data.testAddressData)
  MockHelper.mockAccountsAPIReplyOnce()

  const bip44Addresses = await RecoveryPhaseHelper.checkAddresses(
    recoveryPhraseString
  )

  expect(Object.keys(bip44Addresses).length).toBe(20)
  expect(Object.values(bip44Addresses).length).toBe(20)
})
