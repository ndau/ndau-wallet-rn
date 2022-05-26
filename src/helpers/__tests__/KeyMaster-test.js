/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import { NativeModules } from 'react-native'
import sinon from 'sinon'
import KeyMaster from '../KeyMaster'
import MockHelper from '../MockHelper'

MockHelper.mockServiceDiscovery()
MockHelper.mockAccountsAPI()
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
const errorGetRootAddresses = 'Error: you MUST pass rootPrivateKey'
const errorGetBIP44Addresses = 'Error: you MUST pass rootPrivateKey'
const bytes = 'ZWEQAwQFBgcICQoLDA0ODw=='
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
    .mockReturnValueOnce(address + 'j')
    .mockReturnValueOnce(address + 'k')
    .mockReturnValueOnce(address + 'l')
    .mockReturnValueOnce(address + 'm')
    .mockReturnValueOnce(address + 'n')
    .mockReturnValueOnce(address + 'o')
    .mockReturnValueOnce(address + 'p')
    .mockReturnValueOnce(address + 'q')
    .mockReturnValueOnce(address + 'r')
    .mockReturnValueOnce(address + 's')
    .mockReturnValueOnce(address + 't')
    .mockReturnValueOnce(address + 'u')
    .mockReturnValueOnce(address + 'v')
    .mockReturnValueOnce(address + 'w')
    .mockReturnValueOnce(address + 'x')
    .mockReturnValueOnce(address + 'y')
    .mockReturnValueOnce(address + 'z')
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
    .mockReturnValueOnce(deriveFromKey + 'i')
    .mockReturnValueOnce(deriveFromKey + 'j')
    .mockReturnValueOnce(deriveFromKey + 'k')
    .mockReturnValueOnce(deriveFromKey + 'l')
    .mockReturnValueOnce(deriveFromKey + 'm')
    .mockReturnValueOnce(deriveFromKey + 'n')
    .mockReturnValueOnce(deriveFromKey + 'o')
    .mockReturnValueOnce(deriveFromKey + 'p')
    .mockReturnValueOnce(deriveFromKey + 'q')
    .mockReturnValueOnce(deriveFromKey + 'r')
    .mockReturnValueOnce(deriveFromKey + 's')
    .mockReturnValueOnce(deriveFromKey + 't')
    .mockReturnValueOnce(deriveFromKey + 'u')
    .mockReturnValueOnce(deriveFromKey + 'v')
    .mockReturnValueOnce(deriveFromKey + 'w')
    .mockReturnValueOnce(deriveFromKey + 'x')
    .mockReturnValueOnce(deriveFromKey + 'y')
    .mockReturnValueOnce(deriveFromKey + 'z')
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

const testWallet7MP4FVStart = {
  walletId: 'Wallet 1',
  accountCreationKeyHash: '308c3bc3',
  accounts: {
    ndac6k7vxp5majxe8ed2wagp2dw8ip8ce3mwxeuttym9c9ze: {
      address: 'ndac6k7vxp5majxe8ed2wagp2dw8ip8ce3mwxeuttym9c9ze',
      addressData: {
        balance: 338699,
        validationKeys: [
          'npuba4jaftckeeba47fzizq3gs2vnnawj329tkiuh4xi2u8gurh3y2vu8jgbvndeh9sieut3eaaaaaaxrtumjidjk2y6fcdsb6rdy5gc9yfptsexhan92ch373d52z7y8izmz8j7rddg',
          'npuba8jadtbbeac7cpavqfv555pi4wbdznse8ta5g4xdz6ehc35fmxaei7zc9j9sgxjcx893wh23',
          'npuba8jadtbbec9vnei6qnxcczpsw6wjbmejt2scwqbaa9axxdxf3znry482gaz5r9u6mbmz3uz4'
        ],
        validationScript: 'oAAgiA==',
        rewardsTarget: null,
        incomingRewardsFrom: [
          'ndae2m6h32eee2qci9fjhzmfxtpni6pizmks839npbqz8yq4'
        ],
        delegationNode: 'ndam75fnjn7cdues7ivi7ccfq8f534quieaccqibrvuzhqxa',
        lock: {
          noticePeriod: '3m',
          unlocksOn: '2019-09-08T12:48:04Z',
          bonus: 10000000000
        },
        lastEAIUpdate: '2019-06-11T00:53:09Z',
        lastWAAUpdate: '2019-06-11T00:53:09Z',
        weightedAverageAge: '2dt13h39m19s958562us',
        sequence: 39,
        stake_rules: null,
        costakers: {},
        holds: null,
        recourseSettings: {
          period: 't1h',
          changes_at: null,
          next: null
        },
        currencySeatDate: null,
        parent: null,
        progenitor: null
      },
      ownershipKey: 'ddb5fb2c',
      validationKeys: []
    },
    ndae2m6h32eee2qci9fjhzmfxtpni6pizmks839npbqz8yq4: {
      address: 'ndae2m6h32eee2qci9fjhzmfxtpni6pizmks839npbqz8yq4',
      addressData: {
        balance: 95950000,
        validationKeys: [
          'npuba4jaftckeebijwfxqwdyk3nt9bjxek7dq2mx2kjfgpbkq7dmrpa3rep5bsp3362idhqsyaaaaabaff879kt39fvjd7nntqutczzu2hm6u7vr73uutw3gqjxeqvgyjzf2es8ry7fi',
          'npuba8jadtbbeckdfcbf2jy9eq7xmxfyehvxajxyxeuusjcjasu4aqz9iyvtz8txapsisybygqpn',
          'npuba8jadtbbec9vnei6qnxcczpsw6wjbmejt2scwqbaa9axxdxf3znry482gaz5r9u6mbmz3uz4'
        ],
        validationScript: 'oAAgiA==',
        rewardsTarget: 'ndac6k7vxp5majxe8ed2wagp2dw8ip8ce3mwxeuttym9c9ze',
        incomingRewardsFrom: null,
        delegationNode: 'ndam75fnjn7cdues7ivi7ccfq8f534quieaccqibrvuzhqxa',
        lock: {
          noticePeriod: '1y25d',
          unlocksOn: '2019-06-26T00:00:00Z',
          bonus: 30000000000
        },
        lastEAIUpdate: '2019-06-11T00:53:09Z',
        lastWAAUpdate: '2018-06-01T00:00:00Z',
        weightedAverageAge: '1y10dt14h27m19s877005us',
        sequence: 74,
        stake_rules: null,
        costakers: {},
        holds: null,
        recourseSettings: {
          period: 't1h',
          changes_at: null,
          next: null
        },
        currencySeatDate: null,
        parent: null,
        progenitor: null
      },
      ownershipKey: 'f5b17631',
      validationKeys: []
    },
    ndafxgxquvuzrmrungp3kgn5jnsgptxd7th67ymxxwsscech: {
      address: 'ndafxgxquvuzrmrungp3kgn5jnsgptxd7th67ymxxwsscech',
      addressData: {
        balance: 1000000,
        validationKeys: null,
        validationScript: null,
        rewardsTarget: null,
        incomingRewardsFrom: null,
        delegationNode: null,
        lock: null,
        lastEAIUpdate: '2019-05-30T18:13:35Z',
        lastWAAUpdate: '2019-05-30T18:13:35Z',
        weightedAverageAge: '11dt20h13m44s358385us',
        sequence: 0,
        stake_rules: null,
        costakers: {},
        holds: null,
        recourseSettings: {
          period: 't1h',
          changes_at: null,
          next: null
        },
        currencySeatDate: null,
        parent: null,
        progenitor: null
      },
      ownershipKey: '358fffef',
      validationKeys: []
    },
    ndajh3pt3appxib22sjf4ec6deu7mwgqph2jjd26i63iepp3: {
      address: 'ndajh3pt3appxib22sjf4ec6deu7mwgqph2jjd26i63iepp3',
      addressData: {
        balance: 10875547,
        validationKeys: [
          'npuba4jaftckeeb4v85jps39h79f8kfw8tnje2mx2b7496e99s5e3dk5mq8fefsfffsfzti4gaaaaaa3k3zqrfz6pe9gde3pa5yxjc9dz6aet25zpuyryy986fybetmgn9u224i4jp5t'
        ],
        validationScript: null,
        rewardsTarget: null,
        incomingRewardsFrom: null,
        delegationNode: 'ndahnsxr8zh7r6u685ka865wz77wb78xcn45rgskpeyiwuza',
        lock: {
          noticePeriod: '3m',
          unlocksOn: '2019-08-19T20:09:01Z',
          bonus: 10000000000
        },
        lastEAIUpdate: '2019-06-11T00:53:06Z',
        lastWAAUpdate: '2019-05-21T13:19:45Z',
        weightedAverageAge: '21dt1h7m34s594652us',
        sequence: 7,
        stake_rules: null,
        costakers: {},
        holds: null,
        recourseSettings: {
          period: 't1h',
          changes_at: null,
          next: null
        },
        currencySeatDate: null,
        parent: null,
        progenitor: null
      },
      ownershipKey: 'f2fb495a',
      validationKeys: ['b837699c']
    }
  },
  keys: {
    '308c3bc3': {
      publicKey:
        'npuba4jaftckeebbp4w4zhfx276c6c7sg36q48ebtaj9wr93qu5r9jyfv44z2gw649id7axp8aaaabufyh7wbsk8zfc2khpmk8s5xcvfexc8j4d3h8tj7w65f3kx9w3ee3jr68zj8snb',
      privateKey: '*suppressed*',
      path: "/44'/20036'/100",
      derivedFromRoot: 'yes'
    },
    ddb5fb2c: {
      publicKey:
        'npuba4jaftckeebgxwhzw2mir4czjkuwyp7g9vpsh4bx9t5dym87h8gbkbqinmjqdjaebgfnuaaaaabciwbqfusup9mpmwwi95p9diatshqegkq4j8jwyd7qayid9tvy64uig6he34ei',
      privateKey: '*suppressed*',
      path: "/44'/20036'/100/2",
      derivedFromRoot: 'yes'
    },
    f5b17631: {
      publicKey:
        'npuba4jaftckeebetgbepdnd9i99mwmtj8cjphfwnec3z2shy6dyu6t2mt8zkxg86i2ebgfnuaaaaaax7xqpbtrwsj896d6izqqw4nbzw3gde4ygc58rfzzwcxxrxrgvdhcrf7izg49q',
      privateKey: '*suppressed*',
      path: "/44'/20036'/100/1",
      derivedFromRoot: 'yes'
    },
    '358fffef': {
      publicKey:
        'npuba4jaftckeebd3kvpv4ngpqi6ne5ti9a47ryu4kvqb7qan84y7wut5n34bue7g72ebgfnuaaaaacbd87ke2nj35yyd532fzhcjg3mbfywdyef8ncxjbtjesshgt2qa7jy38nu9hi7',
      privateKey: '*suppressed*',
      path: "/44'/20036'/100/4",
      derivedFromRoot: 'yes'
    },
    f2fb495a: {
      publicKey:
        'npuba4jaftckeeb6kcdj4hngiv8b4is4z2h3hwzypq9etkvnpjn8483uq43i99rsf82ebgfnuaaaaabs4jwv9k8dnth46qyzjsmw6cfqgy6ipvqb4hky8gwtg9tpe22yijbdg4sw4i5u',
      privateKey: '*suppressed*',
      path: "/44'/20036'/100/3",
      derivedFromRoot: 'yes'
    },
    b837699c: {
      publicKey:
        'npuba4jaftckeeb4v85jps39h79f8kfw8tnje2mx2b7496e99s5e3dk5mq8fefsfffsfzti4gaaaaaa3k3zqrfz6pe9gde3pa5yxjc9dz6aet25zpuyryy986fybetmgn9u224i4jp5t',
      privateKey: 'validation5',
      path: "/44'/20036'/100/10000/3/5",
      derivedFromRoot: 'yes'
    }
  }
}

test('test getRootAddresses to make sure we get back one address in the array', async () => {
  const addresses = await KeyMaster.getRootAddresses(
    bytes,
    1,
    AppConfig.NUMBER_OF_KEYS_TO_GRAB_ON_RECOVERY
  )
  expect(Object.keys(addresses).length).toBe(
    AppConfig.NUMBER_OF_KEYS_TO_GRAB_ON_RECOVERY
  )
  expect(Object.values(addresses)[0]).toBe('/1')
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
  expect(Object.keys(addresses).length).toBe(
    AppConfig.NUMBER_OF_KEYS_TO_GRAB_ON_RECOVERY
  )
  expect(Object.values(addresses)[0]).toBe(`/44'/20036'/100/1`)
})

test('getBIP44Addresses has an error', async () => {
  try {
    await KeyMaster.getBIP44Addresses(null)
  } catch (error) {
    expect(error.toString()).toBe(errorGetBIP44Addresses)
  }
})

test('getPublicKeyFromHash test', async () => {
  const wallet = JSON.parse(JSON.stringify(testWallet7MP4FVStart))
  const account =
    wallet.accounts['ndajh3pt3appxib22sjf4ec6deu7mwgqph2jjd26i63iepp3']

  const publicKey = KeyMaster.getPublicKeyFromHash(
    wallet,
    account.validationKeys[0]
  )
  expect(
    'npuba4jaftckeeb4v85jps39h79f8kfw8tnje2mx2b7496e99s5e3dk5mq8fefsfffsfzti4gaaaaaa3k3zqrfz6pe9gde3pa5yxjc9dz6aet25zpuyryy986fybetmgn9u224i4jp5t'
  ).toBe(publicKey)
})

test('getPrivateKeyFromHash test', async () => {
  const wallet = JSON.parse(JSON.stringify(testWallet7MP4FVStart))
  const account =
    wallet.accounts['ndajh3pt3appxib22sjf4ec6deu7mwgqph2jjd26i63iepp3']

  const privateKey = KeyMaster.getPrivateKeyFromHash(
    wallet,
    account.validationKeys[0]
  )
  expect(privateKey).toBe('validation5')
})

test('createAccountFromPath should add to wallets if passed', async () => {
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

  const wallet = await KeyMaster.createAccountFromPath(
    user.wallets['a7bff20a'],
    `/44'/20036'/100/20`
  )

  expect(Object.keys(user.wallets['a7bff20a'].accounts).length).toBe(5)
  expect(Object.keys(user.wallets['a7bff20a'].keys).length).toBe(6)
})
