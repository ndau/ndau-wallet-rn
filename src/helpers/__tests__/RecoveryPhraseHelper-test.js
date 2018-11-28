import { NativeModules } from 'react-native'
import sinon from 'sinon'
import RecoveryPhaseHelper from '../RecoveryPhaseHelper'
import data from '../../api/data'
import NdauNodeAPI from '../../api/NdauNodeAPI'
import services from '../../api/services-dev.json'
import AppConstants from '../../AppConstants'

fetch.resetMocks()

jest.mock('../../api/NdauNodeAPI', () => {
  return {
    getAddressData: jest.fn()
  }
})

jest.mock('NativeModules', () => {
  return {
    KeyaddrManager: {
      keyaddrWordsToBytes: jest.fn(),
      newKey: jest.fn(),
      child: jest.fn(),
      hardenedChild: jest.fn(),
      ndauAddress: jest.fn(),
      deriveFrom: jest.fn(),
      toPublic: jest.fn()
    }
  }
})

const getAddressData = sinon.spy(NdauNodeAPI, 'getAddressData')
getAddressData.mockReturnValueOnce(data.testAddressData)
getAddressData.mockReturnValueOnce(data.testAddressData)

let recoveryPhraseString =
  'goat amount liar amount expire adjust cage candy arch gather drum buyer'
const userId = 'TAC-3PY'
// const numberOfAccounts = 5;
// const chainId = 'tn';
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
keyaddrWordsToBytes
  .mockReturnValueOnce(bytes)
  .mockReturnValueOnce(bytes)
  .mockReturnValueOnce(bytes)
  .mockReturnValueOnce(bytes)
  .mockReturnValueOnce(bytes)
  .mockReturnValueOnce(bytes)
  .mockReturnValueOnce(bytes)
  .mockReturnValueOnce(bytes)

const newKey = sinon.spy(NativeModules.KeyaddrManager, 'newKey')
newKey
  .mockReturnValueOnce(initialPrivateKey)
  .mockReturnValueOnce(initialPrivateKey)
  .mockReturnValueOnce(initialPrivateKey)
  .mockReturnValueOnce(initialPrivateKey)
  .mockReturnValueOnce(initialPrivateKey)
  .mockReturnValueOnce(initialPrivateKey)
  .mockReturnValueOnce(initialPrivateKey)
  .mockReturnValueOnce(initialPrivateKey)

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

test('checkRecoveryPhrase test', async () => {
  fetch.mockResponses([services], [data.testAddressData])

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

  // console.log(`firstTimeUser: ${JSON.stringify(firstTimeUser)}`)

  expect(firstTimeUser).toBeDefined()
  expect(JSON.stringify(firstTimeUser)).toBe(
    `{"userId":"TAC-3PY","wallets":{"39a72c0d":{"walletId":"temp-user","accountCreationKey":"5ba05375","accounts":{"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyace":{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyace","addressData":{},"ownershipKey":"b960e699","validationKeys":[]},"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacf":{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacf","addressData":{},"ownershipKey":"057391a6","validationKeys":[]},"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacg":{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacg","addressData":{},"ownershipKey":"c4f42b96","validationKeys":[]},"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyach":{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyach","addressData":{},"ownershipKey":"d0933f50","validationKeys":[]},"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyaci":{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyaci","addressData":{},"ownershipKey":"08cc485b","validationKeys":[]},"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac1":{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac1","addressData":{},"ownershipKey":"95b8071e","validationKeys":[]},"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac2":{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac2","addressData":{},"ownershipKey":"20f4d175","validationKeys":[]},"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac3":{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac3","addressData":{},"ownershipKey":"edef8a85","validationKeys":[]},"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac4":{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac4","addressData":{},"ownershipKey":"90808ebd","validationKeys":[]},"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac5":{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac5","addressData":{},"ownershipKey":"d8cc78c1","validationKeys":[]},"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac6":{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac6","addressData":{},"ownershipKey":"9d152ff0","validationKeys":[]},"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac7":{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac7","addressData":{},"ownershipKey":"1e12ca49","validationKeys":[]},"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac8":{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac8","addressData":{},"ownershipKey":"42514ecf","validationKeys":[]}},"keys":{"b960e699":{"publicKey":"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj44e","privateKey":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqxe","path":"/44'/20036'/100/1","derivedFromRoot":"yes"},"057391a6":{"publicKey":"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj44f","privateKey":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqxf","path":"/44'/20036'/100/2","derivedFromRoot":"yes"},"c4f42b96":{"publicKey":"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj44g","privateKey":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqxg","path":"/44'/20036'/100/3","derivedFromRoot":"yes"},"d0933f50":{"publicKey":"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj44h","privateKey":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqxh","path":"/44'/20036'/100/6","derivedFromRoot":"yes"},"08cc485b":{"publicKey":"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj44i","privateKey":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqxi","path":"/44'/20036'/100/5","derivedFromRoot":"yes"},"95b8071e":{"publicKey":"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj441","privateKey":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx1","path":"/44'/20036'/100/7","derivedFromRoot":"yes"},"5ba05375":{"publicKey":"","privateKey":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6sq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmid3kjbfrw628y7c5zit8vcz6x7hjuxgfeu4kasdf3","path":"/44'/20036'/100","derivedFromRoot":"yes"},"20f4d175":{"publicKey":"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj442","privateKey":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx2","path":"/1","derivedFromRoot":"yes"},"edef8a85":{"publicKey":"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj443","privateKey":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx3","path":"/2","derivedFromRoot":"yes"},"90808ebd":{"publicKey":"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj444","privateKey":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx4","path":"/3","derivedFromRoot":"yes"},"d8cc78c1":{"publicKey":"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj445","privateKey":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx5","path":"/4","derivedFromRoot":"yes"},"9d152ff0":{"publicKey":"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj446","privateKey":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx6","path":"/5","derivedFromRoot":"yes"},"1e12ca49":{"publicKey":"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj447","privateKey":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx7","path":"/6","derivedFromRoot":"yes"},"42514ecf":{"publicKey":"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj448","privateKey":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx8","path":"/7","derivedFromRoot":"yes"}}}},"addresses":["tnai24puxki6s4zqyy7ebizgcviw2ui9z9x98pmah5n3ynmz","tnarpmwz3yxxyk7fdgiu2irmvatygg5u8nrg735xcu5ezezv"]}`
  )
  expect(Object.keys(firstTimeUser.wallets['39a72c0d'].accounts).length).toBe(
    13
  )
})
