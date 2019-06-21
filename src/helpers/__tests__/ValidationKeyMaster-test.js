import { NativeModules } from 'react-native'
import ValidationKeyMaster from '../ValidationKeyMaster'
import MockHelper from '../MockHelper'
import sinon from 'sinon'

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

const deriveFrom = sinon.stub(NativeModules.KeyaddrManager, 'deriveFrom')
const toPublic = sinon.stub(NativeModules.KeyaddrManager, 'toPublic')

deriveFrom
  .withArgs('*suppressed*', `/44'/20036'/100`, `/44'/20036'/100/10000`)
  .returns('root')

deriveFrom
  .withArgs('*suppressed*', `/44'/20036'/100`, `/44'/20036'/100/10000'`)
  .returns('root')

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
        recourseSettings: { period: 't1h', changes_at: null, next: null },
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
        recourseSettings: { period: 't1h', changes_at: null, next: null },
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
        recourseSettings: { period: 't1h', changes_at: null, next: null },
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
        recourseSettings: { period: 't1h', changes_at: null, next: null },
        currencySeatDate: null,
        parent: null,
        progenitor: null
      },
      ownershipKey: 'f2fb495a',
      validationKeys: []
    },
    ndagxwdab8xcqugwnsyg6nzvvw9faun6ah5fx6w7r7ee98h6: {
      address: 'ndagxwdab8xcqugwnsyg6nzvvw9faun6ah5fx6w7r7ee98h6',
      addressData: {
        balance: 200000000,
        validationKeys: null,
        validationScript: null,
        rewardsTarget: null,
        incomingRewardsFrom: null,
        delegationNode: null,
        lock: null,
        lastEAIUpdate: '2019-06-13T13:55:18Z',
        lastWAAUpdate: '2019-06-13T13:55:18Z',
        weightedAverageAge: 't3m56s998031us',
        sequence: 0,
        stake_rules: null,
        costakers: {},
        holds: [
          {
            qty: 200000000,
            expiry: '2019-06-13T14:55:18Z',
            tx_hash: '14lNHI2fLRuAk4RnCpl6NQ',
            stake: null
          }
        ],
        recourseSettings: { period: 't1h', changes_at: null, next: null },
        currencySeatDate: null,
        parent: null,
        progenitor: null,
        nickname: 'Account 98h6',
        walletId: 'Wallet 4',
        eaiValueForDisplay: 0
      },
      ownershipKey: '569f6154',
      validationKeys: []
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
    '569f6154': {
      publicKey:
        'npuba4jaftckeebpwg4zs7zknwftppzazp5etsm9d44fndf5z7xyeb3g4ipn23xxpxaebgfnuaaaaadcaiadxhwk5wth3hg58v82suv99p5ck3pheqk6hrzjqbkps9v9bti76nhkfa35',
      privateKey: '*suppressed*',
      path: "/44'/20036'/100/6",
      derivedFromRoot: 'yes'
    }
  }
}

const cloneOf7MP4FVStart = JSON.parse(JSON.stringify(testWallet7MP4FVStart))

test('addValidationKey test for no validationKey and make sure we index properly', async () => {
  const wallet = cloneOf7MP4FVStart
  const account =
    wallet.accounts['ndafxgxquvuzrmrungp3kgn5jnsgptxd7th67ymxxwsscech']
  const keysLength = Object.keys(wallet.keys).length

  expect(account.validationKeys.length).toBe(0)

  deriveFrom
    .withArgs('root', `/44'/20036'/100/10000'`, `/44'/20036'/100/10000'/4'/1`)
    .returns('validation1')
  toPublic.withArgs('validation1').returns('pubVal1')

  await ValidationKeyMaster.addValidationKey(wallet, account)

  expect(account.validationKeys.length).toBe(1)
  expect(Object.keys(wallet.keys).length).toBe(keysLength + 1)
  expect(wallet.keys['c9a80d6d'].privateKey).toBe('validation1')
  expect(wallet.keys['c9a80d6d'].publicKey).toBe('pubVal1')
})

test('addValidationKey test for no validationKey and make sure we index properly', async () => {
  // THIS time do not create a new instance and make sure that
  // we index the validation key propertly
  const wallet = cloneOf7MP4FVStart
  const account =
    wallet.accounts['ndagxwdab8xcqugwnsyg6nzvvw9faun6ah5fx6w7r7ee98h6']
  const keysLength = Object.keys(wallet.keys).length

  expect(account.validationKeys.length).toBe(0)

  deriveFrom
    .withArgs('root', `/44'/20036'/100/10000'`, `/44'/20036'/100/10000'/6'/1`)
    .returns('validation6')
  toPublic.withArgs('validation6').returns('pubVal6')

  await ValidationKeyMaster.addValidationKey(wallet, account)

  expect(account.validationKeys.length).toBe(1)
  expect(Object.keys(wallet.keys).length).toBe(keysLength + 1)
  expect(wallet.keys['c4b2f182'].privateKey).toBe('validation6')
  expect(wallet.keys['c4b2f182'].publicKey).toBe('pubVal6')
})

test('addValidationKey test an account which will be recovered, this is just to test gen', async () => {
  const wallet = cloneOf7MP4FVStart
  const account =
    wallet.accounts['ndajh3pt3appxib22sjf4ec6deu7mwgqph2jjd26i63iepp3']
  const keysLength = Object.keys(wallet.keys).length

  expect(account.validationKeys.length).toBe(0)

  deriveFrom
    .withArgs('root', `/44'/20036'/100/10000'`, `/44'/20036'/100/10000'/3'/1`)
    .returns('validation3')
  toPublic.withArgs('validation3').returns('pubVal3')

  await ValidationKeyMaster.addValidationKey(wallet, account)

  expect(account.validationKeys.length).toBe(1)
  expect(Object.keys(wallet.keys).length).toBe(keysLength + 1)
  expect(wallet.keys['1f973fb8'].privateKey).toBe('validation3')
  expect(wallet.keys['1f973fb8'].publicKey).toBe('pubVal3')
})

test('recoverValidationKeys with a genesis account found in legacy1', async () => {
  const wallet = JSON.parse(JSON.stringify(testWallet7MP4FVStart))
  const account =
    wallet.accounts['ndae2m6h32eee2qci9fjhzmfxtpni6pizmks839npbqz8yq4']

  // mock out legacy 1
  for (let i = 0; i < 30; i++) {
    if (i === 28) {
      deriveFrom
        .withArgs('*suppressed*', `/`, `/44'/20036'/2000/${i}`)
        .returns(`validationRoot${i}`)
      toPublic
        .withArgs(`validationRoot${i}`)
        .returns(
          `npuba4jaftckeebijwfxqwdyk3nt9bjxek7dq2mx2kjfgpbkq7dmrpa3rep5bsp3362idhqsyaaaaabaff879kt39fvjd7nntqutczzu2hm6u7vr73uutw3gqjxeqvgyjzf2es8ry7fi`
        )
    } else {
      deriveFrom
        .withArgs('*suppressed*', `/`, `/44'/20036'/2000/${i}`)
        .returns(`validationRoot${i}`)
      toPublic.withArgs(`validationRoot${i}`).returns(`pubVal${i}`)
    }
  }

  // mock out legacy 2
  for (let i = 0; i < 30; i++) {
    deriveFrom
      .withArgs(
        'root',
        `/44'/20036'/100/10000/1`,
        `/44'/20036'/100/10000/1/${i}`
      )
      .returns(`validation${i}`)
    toPublic.withArgs(`validation${i}`).returns(`pubVal${i}`)
  }

  // mock out hardened and current
  for (let i = 0; i < 10; i++) {
    deriveFrom
      .withArgs(
        'root',
        `/44'/20036'/100/10000'`,
        `/44'/20036'/100/10000'/1'/${i}`
      )
      .returns(`validation${i}`)
    toPublic.withArgs(`validation${i}`).returns(`pubVal${i}`)
  }

  for (let i = 0; i < 10; i++) {
    deriveFrom
      .withArgs('root', `/44'/20036'/100/10000`, `/44'/20036'/100/10000/1/${i}`)
      .returns(`validationLegacy3${i}`)
    toPublic.withArgs(`validationLegacy3${i}`).returns(`pubValLegacy3${i}`)
  }

  for (let i = 0; i < 10; i++) {
    deriveFrom
      .withArgs('*suppressed*', `/`, `/44'/20036'/100/10000/1/${i}`)
      .returns(`validationLegacy4${i}`)
    toPublic.withArgs(`validationLegacy4${i}`).returns(`pubValLegacy4${i}`)
  }

  await ValidationKeyMaster.recoveryValidationKey(
    wallet,
    account,
    account.addressData.validationKeys
  )

  expect(wallet.keys['ec2761b6'].privateKey).toBe('validationRoot28')
  expect(wallet.keys['ec2761b6'].path).toBe(
    `/44'/20036'/100/1/44'/20036'/2000/28`
  )
})

test('recoverValidationKeys with a genesis account found in legacy2', async () => {
  const wallet = JSON.parse(JSON.stringify(testWallet7MP4FVStart))
  const account =
    wallet.accounts['ndac6k7vxp5majxe8ed2wagp2dw8ip8ce3mwxeuttym9c9ze']

  for (let i = 0; i < 10; i++) {
    deriveFrom
      .withArgs('*suppressed*', `/`, `/44'/20036'/2000/${i}`)
      .returns(`validationRoot${i}`)
    toPublic.withArgs(`validationRoot${i}`).returns(`pubValRoot${i}`)
  }

  for (let i = 0; i < 10; i++) {
    if (i === 5) {
      deriveFrom
        .withArgs(
          'root',
          `/44'/20036'/100/10000/2`,
          `/44'/20036'/100/10000/2/${i}`
        )
        .returns(`validationLegacy${i}`)
      toPublic
        .withArgs(`validationLegacy${i}`)
        .returns(
          `npuba4jaftckeeba47fzizq3gs2vnnawj329tkiuh4xi2u8gurh3y2vu8jgbvndeh9sieut3eaaaaaaxrtumjidjk2y6fcdsb6rdy5gc9yfptsexhan92ch373d52z7y8izmz8j7rddg`
        )
    } else {
      deriveFrom
        .withArgs(
          'root',
          `/44'/20036'/100/10000/2`,
          `/44'/20036'/100/10000/2/${i}`
        )
        .returns(`validationLegacy${i}`)
      toPublic.withArgs(`validationLegacy${i}`).returns(`pubValLegacy${i}`)
    }
  }

  for (let i = 0; i < 10; i++) {
    deriveFrom
      .withArgs(
        'root',
        `/44'/20036'/100/10000'`,
        `/44'/20036'/100/10000'/2'/${i}`
      )
      .returns(`validation${i}`)
    toPublic.withArgs(`validation${i}`).returns(`pubVal${i}`)
  }

  for (let i = 0; i < 10; i++) {
    deriveFrom
      .withArgs('root', `/44'/20036'/100/10000`, `/44'/20036'/100/10000/2/${i}`)
      .returns(`validationLegacy3${i}`)
    toPublic.withArgs(`validationLegacy3${i}`).returns(`pubValLegacy3${i}`)
  }

  for (let i = 0; i < 10; i++) {
    deriveFrom
      .withArgs('*suppressed*', `/`, `/44'/20036'/100/10000/2/${i}`)
      .returns(`validationLegacy4${i}`)
    toPublic.withArgs(`validationLegacy4${i}`).returns(`pubValLegacy4${i}`)
  }

  await ValidationKeyMaster.recoveryValidationKey(
    wallet,
    account,
    account.addressData.validationKeys
  )

  expect(wallet.keys['f5663a94'].privateKey).toBe('validationLegacy5')
  expect(wallet.keys['f5663a94'].path).toBe(`/44'/20036'/100/10000/2/5`)
})

test('recoverValidationKeys with a genesis account found in current', async () => {
  const wallet = JSON.parse(JSON.stringify(testWallet7MP4FVStart))
  const account =
    wallet.accounts['ndae2m6h32eee2qci9fjhzmfxtpni6pizmks839npbqz8yq4']

  for (let i = 0; i < 30; i++) {
    deriveFrom
      .withArgs('*suppressed*', `/`, `/44'/20036'/2000/${i}`)
      .returns(`validationRoot${i}`)
    toPublic.withArgs(`validationRoot${i}`).returns(`pubVal${i}`)
  }

  for (let i = 0; i < 30; i++) {
    deriveFrom
      .withArgs(
        '*suppressed*',
        `/44'/20036'/100/10000/1`,
        `/44'/20036'/100/10000/1/${i}`
      )
      .returns(`validationLegacy${i}`)
    toPublic.withArgs(`validationLegacy${i}`).returns(`pubValLegacy${i}`)
  }

  for (let i = 0; i < 50; i++) {
    if (i === 43) {
      deriveFrom
        .withArgs(
          'root',
          `/44'/20036'/100/10000'`,
          `/44'/20036'/100/10000'/1'/${i}`
        )
        .returns(`validation${i}`)
      toPublic
        .withArgs(`validation${i}`)
        .returns(
          `npuba4jaftckeebijwfxqwdyk3nt9bjxek7dq2mx2kjfgpbkq7dmrpa3rep5bsp3362idhqsyaaaaabaff879kt39fvjd7nntqutczzu2hm6u7vr73uutw3gqjxeqvgyjzf2es8ry7fi`
        )
    } else {
      deriveFrom
        .withArgs(
          'root',
          `/44'/20036'/100/10000'`,
          `/44'/20036'/100/10000'/1'/${i}`
        )
        .returns(`validation${i}`)
      toPublic.withArgs(`validation${i}`).returns(`pubVal${i}`)
    }
  }

  for (let i = 0; i < 10; i++) {
    deriveFrom
      .withArgs('root', `/44'/20036'/100/10000`, `/44'/20036'/100/10000/1/${i}`)
      .returns(`validationLegacy3${i}`)
    toPublic.withArgs(`validationLegacy3${i}`).returns(`pubValLegacy3${i}`)
  }

  for (let i = 0; i < 10; i++) {
    deriveFrom
      .withArgs('*suppressed*', `/`, `/44'/20036'/100/10000/1/${i}`)
      .returns(`validationLegacy4${i}`)
    toPublic.withArgs(`validationLegacy4${i}`).returns(`pubValLegacy4${i}`)
  }

  await ValidationKeyMaster.recoveryValidationKey(
    wallet,
    account,
    account.addressData.validationKeys
  )

  expect(wallet.keys['85845653'].privateKey).toBe('validation43')
  expect(wallet.keys['85845653'].path).toBe(`/44'/20036'/100/10000'/1'/43`)
})

test('recoverValidationKeys with a new account', async () => {
  const wallet = JSON.parse(JSON.stringify(testWallet7MP4FVStart))
  const account =
    wallet.accounts['ndafxgxquvuzrmrungp3kgn5jnsgptxd7th67ymxxwsscech']

  for (let i = 0; i < 10; i++) {
    deriveFrom
      .withArgs('*suppressed*', `/`, `/44'/20036'/2000/${i}`)
      .returns(`validationRoot${i}`)
    toPublic.withArgs(`validationRoot${i}`).returns(`pubVal${i}`)
  }

  for (let i = 0; i < 10; i++) {
    deriveFrom
      .withArgs(
        '*suppressed*',
        `/44'/20036'/100/10000/4`,
        `/44'/20036'/100/10000/4/${i}`
      )
      .returns(`validation${i}`)
    toPublic.withArgs(`validation${i}`).returns(`pubVal${i}`)
  }

  for (let i = 0; i < 10; i++) {
    deriveFrom
      .withArgs('root', `/44'/20036'/100/10000`, `/44'/20036'/100/10000/4/${i}`)
      .returns(`validationLegacy3${i}`)
    toPublic.withArgs(`validationLegacy3${i}`).returns(`pubValLegacy3${i}`)
  }

  for (let i = 0; i < 10; i++) {
    deriveFrom
      .withArgs('*suppressed*', `/`, `/44'/20036'/100/10000/4/${i}`)
      .returns(`validationLegacy4${i}`)
    toPublic.withArgs(`validationLegacy4${i}`).returns(`pubValLegacy4${i}`)
  }

  const keyLength = wallet.keys.length

  await ValidationKeyMaster.recoveryValidationKey(
    wallet,
    account,
    account.addressData.validationKeys
  )

  expect(wallet.keys.length).toBe(keyLength)
})

test('recoverValidationKeys with a simple account (only one validation key) finding legacy 2', async () => {
  const wallet = JSON.parse(JSON.stringify(testWallet7MP4FVStart))
  const account =
    wallet.accounts['ndajh3pt3appxib22sjf4ec6deu7mwgqph2jjd26i63iepp3']

  for (let i = 0; i < 10; i++) {
    deriveFrom
      .withArgs('*suppressed*', `/`, `/44'/20036'/2000/${i}`)
      .returns(`validationRoot${i}`)
    toPublic.withArgs(`validationRoot${i}`).returns(`pubValRoot${i}`)
  }

  for (let i = 0; i < 10; i++) {
    if (i === 5) {
      deriveFrom
        .withArgs(
          'root',
          `/44'/20036'/100/10000/3`,
          `/44'/20036'/100/10000/3/${i}`
        )
        .returns(`validation${i}`)
      toPublic
        .withArgs(`validation${i}`)
        .returns(
          `npuba4jaftckeeb4v85jps39h79f8kfw8tnje2mx2b7496e99s5e3dk5mq8fefsfffsfzti4gaaaaaa3k3zqrfz6pe9gde3pa5yxjc9dz6aet25zpuyryy986fybetmgn9u224i4jp5t`
        )
    } else {
      deriveFrom
        .withArgs(
          'root',
          `/44'/20036'/100/10000/3`,
          `/44'/20036'/100/10000/3/${i}`
        )
        .returns(`validation${i}`)
      toPublic.withArgs(`validation${i}`).returns(`pubVal${i}`)
    }
  }

  for (let i = 0; i < 10; i++) {
    deriveFrom
      .withArgs(
        'root',
        `/44'/20036'/100/10000'`,
        `/44'/20036'/100/10000'/3'/${i}`
      )
      .returns(`validationCurrent${i}`)
    toPublic.withArgs(`validationCurrent${i}`).returns(`pubValCurrent${i}`)
  }

  for (let i = 0; i < 10; i++) {
    deriveFrom
      .withArgs('root', `/44'/20036'/100/10000`, `/44'/20036'/100/10000/3/${i}`)
      .returns(`validationLegacy3${i}`)
    toPublic.withArgs(`validationLegacy3${i}`).returns(`pubValLegacy3${i}`)
  }

  for (let i = 0; i < 10; i++) {
    deriveFrom
      .withArgs('*suppressed*', `/`, `/44'/20036'/100/10000/3/${i}`)
      .returns(`validationLegacy4${i}`)
    toPublic.withArgs(`validationLegacy4${i}`).returns(`pubValLegacy4${i}`)
  }

  await ValidationKeyMaster.recoveryValidationKey(
    wallet,
    account,
    account.addressData.validationKeys
  )

  expect(wallet.keys['b837699c'].privateKey).toBe('validation5')
  expect(wallet.keys['b837699c'].path).toBe(`/44'/20036'/100/10000/3/5`)
})

test('recoverValidationKeys with a simple account (only one validation key) finding legacy 3', async () => {
  const wallet = JSON.parse(JSON.stringify(testWallet7MP4FVStart))
  const account =
    wallet.accounts['ndajh3pt3appxib22sjf4ec6deu7mwgqph2jjd26i63iepp3']

  for (let i = 0; i < 10; i++) {
    deriveFrom
      .withArgs('*suppressed*', `/`, `/44'/20036'/2000/${i}`)
      .returns(`validationRoot${i}`)
    toPublic.withArgs(`validationRoot${i}`).returns(`pubValRoot${i}`)
  }

  for (let i = 0; i < 10; i++) {
    deriveFrom
      .withArgs(
        'root',
        `/44'/20036'/100/10000/3`,
        `/44'/20036'/100/10000/3/${i}`
      )
      .returns(`validationLegacy2${i}`)
    toPublic.withArgs(`validationLegacy2${i}`).returns(`pubValLegacy2${i}`)
  }

  for (let i = 0; i < 10; i++) {
    deriveFrom
      .withArgs(
        'root',
        `/44'/20036'/100/10000'`,
        `/44'/20036'/100/10000'/3'/${i}`
      )
      .returns(`validationCurrent${i}`)
    toPublic.withArgs(`validationCurrent${i}`).returns(`pubValCurrent${i}`)
  }

  for (let i = 0; i < 10; i++) {
    if (i === 5) {
      deriveFrom
        .withArgs(
          'root',
          `/44'/20036'/100/10000`,
          `/44'/20036'/100/10000/3/${i}`
        )
        .returns(`validation${i}`)
      toPublic
        .withArgs(`validation${i}`)
        .returns(
          `npuba4jaftckeeb4v85jps39h79f8kfw8tnje2mx2b7496e99s5e3dk5mq8fefsfffsfzti4gaaaaaa3k3zqrfz6pe9gde3pa5yxjc9dz6aet25zpuyryy986fybetmgn9u224i4jp5t`
        )
    } else {
      deriveFrom
        .withArgs(
          'root',
          `/44'/20036'/100/10000`,
          `/44'/20036'/100/10000/3/${i}`
        )
        .returns(`validation${i}`)
      toPublic.withArgs(`validation${i}`).returns(`pubVal${i}`)
    }
  }

  for (let i = 0; i < 10; i++) {
    deriveFrom
      .withArgs('*suppressed*', `/`, `/44'/20036'/100/10000/3/${i}`)
      .returns(`validationLegacy4${i}`)
    toPublic.withArgs(`validationLegacy4${i}`).returns(`pubValLegacy4${i}`)
  }

  await ValidationKeyMaster.recoveryValidationKey(
    wallet,
    account,
    account.addressData.validationKeys
  )

  expect(wallet.keys['b837699c'].privateKey).toBe('validation5')
  expect(wallet.keys['b837699c'].path).toBe(`/44'/20036'/100/10000/3/5`)
})

test('recoverValidationKeys with a simple account (only one validation key) finding legacy 4', async () => {
  const wallet = JSON.parse(JSON.stringify(testWallet7MP4FVStart))
  const account =
    wallet.accounts['ndajh3pt3appxib22sjf4ec6deu7mwgqph2jjd26i63iepp3']

  for (let i = 0; i < 10; i++) {
    deriveFrom
      .withArgs('*suppressed*', `/`, `/44'/20036'/2000/${i}`)
      .returns(`validationRoot${i}`)
    toPublic.withArgs(`validationRoot${i}`).returns(`pubValRoot${i}`)
  }

  for (let i = 0; i < 10; i++) {
    deriveFrom
      .withArgs(
        'root',
        `/44'/20036'/100/10000/3`,
        `/44'/20036'/100/10000/3/${i}`
      )
      .returns(`validationLegacy2${i}`)
    toPublic.withArgs(`validationLegacy2${i}`).returns(`pubValLegacy2${i}`)
  }

  for (let i = 0; i < 10; i++) {
    deriveFrom
      .withArgs(
        'root',
        `/44'/20036'/100/10000'`,
        `/44'/20036'/100/10000'/3'/${i}`
      )
      .returns(`validationCurrent${i}`)
    toPublic.withArgs(`validationCurrent${i}`).returns(`pubValCurrent${i}`)
  }

  for (let i = 0; i < 10; i++) {
    deriveFrom
      .withArgs('root', `/44'/20036'/100/10000`, `/44'/20036'/100/10000/3/${i}`)
      .returns(`validationLegacy3${i}`)
    toPublic.withArgs(`validationLegacy3${i}`).returns(`pubValLegacy3${i}`)
  }

  for (let i = 0; i < 10; i++) {
    if (i === 5) {
      deriveFrom
        .withArgs('*suppressed*', `/`, `/44'/20036'/100/10000/3/${i}`)
        .returns(`validation${i}`)
      toPublic
        .withArgs(`validation${i}`)
        .returns(
          `npuba4jaftckeeb4v85jps39h79f8kfw8tnje2mx2b7496e99s5e3dk5mq8fefsfffsfzti4gaaaaaa3k3zqrfz6pe9gde3pa5yxjc9dz6aet25zpuyryy986fybetmgn9u224i4jp5t`
        )
    } else {
      deriveFrom
        .withArgs('*suppressed*', `/`, `/44'/20036'/100/10000/3/${i}`)
        .returns(`validation${i}`)
      toPublic.withArgs(`validation${i}`).returns(`pubVal${i}`)
    }
  }

  await ValidationKeyMaster.recoveryValidationKey(
    wallet,
    account,
    account.addressData.validationKeys
  )

  // console.log(`HERE: ${JSON.stringify(wallet, null, 2)}`)

  expect(wallet.keys['b837699c'].privateKey).toBe('validation5')
  expect(wallet.keys['b837699c'].path).toBe(
    `/44'/20036'/100/3/44'/20036'/100/10000/3/5`
  )
})

test('recoverValidationKeys with a simple account (only one validation key) finding current', async () => {
  const wallet = JSON.parse(JSON.stringify(testWallet7MP4FVStart))
  const account =
    wallet.accounts['ndajh3pt3appxib22sjf4ec6deu7mwgqph2jjd26i63iepp3']

  for (let i = 0; i < 10; i++) {
    deriveFrom
      .withArgs('*suppressed*', `/`, `/44'/20036'/2000/${i}`)
      .returns(`validationRoot${i}`)
    toPublic.withArgs(`validationRoot${i}`).returns(`pubValRoot${i}`)
  }

  for (let i = 0; i < 10; i++) {
    deriveFrom
      .withArgs(
        'root',
        `/44'/20036'/100/10000/3`,
        `/44'/20036'/100/10000/3/${i}`
      )
      .returns(`validation${i}`)
    toPublic.withArgs(`validation${i}`).returns(`pubVal${i}`)
  }

  for (let i = 0; i < 10; i++) {
    if (i === 5) {
      deriveFrom
        .withArgs(
          'root',
          `/44'/20036'/100/10000'`,
          `/44'/20036'/100/10000'/3'/${i}`
        )
        .returns(`validationCurrent${i}`)
      toPublic
        .withArgs(`validationCurrent${i}`)
        .returns(
          `npuba4jaftckeeb4v85jps39h79f8kfw8tnje2mx2b7496e99s5e3dk5mq8fefsfffsfzti4gaaaaaa3k3zqrfz6pe9gde3pa5yxjc9dz6aet25zpuyryy986fybetmgn9u224i4jp5t`
        )
    } else {
      deriveFrom
        .withArgs(
          'root',
          `/44'/20036'/100/10000'`,
          `/44'/20036'/100/10000'/3'/${i}`
        )
        .returns(`validationCurrent${i}`)
      toPublic.withArgs(`validationCurrent${i}`).returns(`pubValCurrent${i}`)
    }
  }

  await ValidationKeyMaster.recoveryValidationKey(
    wallet,
    account,
    account.addressData.validationKeys
  )

  // IT IS IMPORTANT to note that I used ndsh to check if generation of the
  // new hardened key is the same key we generate, and it is. I ran this:
  //   ndaab5bw9pc2x2xtm463bxquvmmt3vm6a3xmggfjtjdt2gwt (/44'/20036'/100/5):
  // ndsh> show h6
  // ndagxwdab8xcqugwnsyg6nzvvw9faun6ah5fx6w7r7ee98h6 (/44'/20036'/100/6):
  // {
  //   "balance": 195360000,
  //   "validationKeys": [
  //     "npuba4jaftckeebts34fs49p5k9i9nuadgtrimx74ny22hgnmeueenynjq6wbhte842ghgr2qaaaaaa4pmetm8hbj62sr72k5atac2vfr86brc9y5x4y5fgi4c7e76xvuaq5yr6sawc5"
  //   ],
  //   "validationScript": null,
  //   "rewardsTarget": null,
  //   "incomingRewardsFrom": null,
  //   "delegationNode": "ndaq3nqhez3vvxn8rx4m6s6n3kv7k9js8i3xw8hqnwvi2ete",
  //   "lock": null,
  //   "lastEAIUpdate": "2019-06-13T16:17:05Z",
  //   "lastWAAUpdate": "2019-06-13T13:55:18Z",
  //   "weightedAverageAge": "t2h32m57s620523us",
  //   "sequence": 2,
  //   "stake_rules": null,
  //   "costakers": {},
  //   "holds": null,
  //   "recourseSettings": {
  //     "period": "t1h",
  //     "changes_at": null,
  //     "next": null
  //   },
  //   "currencySeatDate": null,
  //   "parent": null,
  //   "progenitor": null
  // }

  // THEN the key generated in the wallet looks like this:
  // '62c75ff6': {
  //     publicKey:
  //     'npuba4jaftckeebts34fs49p5k9i9nuadgtrimx74ny22hgnmeueenynjq6wbhte842ghgr2qaaaaaa4pmetm8hbj62sr72k5atac2vfr86brc9y5x4y5fgi4c7e76xvuaq5yr6sawc5',
  //   privateKey: '*suppressed*',
  //   path: "/44'/20036'/100/10000'/6'/1",
  //   derivedFromRoot: 'yes'
  // },

  expect(wallet.keys['dfda6dc7'].privateKey).toBe('validationCurrent5')
  expect(wallet.keys['dfda6dc7'].path).toBe(`/44'/20036'/100/10000'/3'/5`)
})
