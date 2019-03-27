import AccountAPIHelper from '../AccountAPIHelper'
import data from '../../api/data'
import MockHelper from '../MockHelper'
import { NativeModules } from 'react-native'
import KeyMaster from '../KeyMaster'
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

const deriveFromKey =
  'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6sq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmid3kjbfrw628y7c5zit8vcz6x7hjuxgfeu4kasdf'

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

test('populateWalletWithAddressData populates wallet with data from the API', async () => {
  const wallet = data.testUser.wallets['7MP-4FV']

  await AccountAPIHelper.populateWalletWithAddressData(wallet)

  expect(wallet).toBeDefined()
  expect(wallet.accounts).toBeDefined()
  expect(
    wallet.accounts['ndarc8etbkidm5ewytxhvzida94sgg9mvr3aswufbty8zcun']
      .addressData.balance
  ).toBe(4200000000.23)
  expect(
    wallet.accounts['ndaiap4q2me85dtnp5naifa5d8xtmrimm4b997hr9mcm38vz']
      .addressData.balance
  ).toBe(20000000000.2)
  expect(
    wallet.accounts['ndarc8etbkidm5ewytxhvzida94sgg9mvr3aswufbty8zcun']
      .addressData.lock
  ).toBe(null)
  expect(
    wallet.accounts['ndaiap4q2me85dtnp5naifa5d8xtmrimm4b997hr9mcm38vz']
      .addressData.lock.noticePeriod
  ).toBe(2592000000000)
  expect(
    wallet.accounts['ndamm8kxzf9754axd24wrkh3agvj2cidx75wdfhjiufcjf55']
      .addressData.lock.unlocksOn
  ).toBe(1585886400000)
  expect(
    wallet.accounts['ndarc8etbkidm5ewytxhvzida94sgg9mvr3aswufbty8zcun']
      .addressData.rewardsTarget
  ).toBe(null)
  expect(
    wallet.accounts['ndarc8etbkidm5ewytxhvzida94sgg9mvr3aswufbty8zcun']
      .addressData.incomingRewardsFrom
  ).toEqual(['ndaiap4q2me85dtnp5naifa5d8xtmrimm4b997hr9mcm38vz'])
})

test('make sure we can get the amount of ndau per account', async () => {
  const wallet = data.testUser.wallets['7MP-4FV']

  await AccountAPIHelper.populateWalletWithAddressData(wallet)

  expect(wallet).toBeDefined()
  expect(
    AccountAPIHelper.accountNdauAmount(
      wallet.accounts['ndarc8etbkidm5ewytxhvzida94sgg9mvr3aswufbty8zcun']
        .addressData
    )
  ).toBe('42.000')
  expect(
    AccountAPIHelper.accountNdauAmount(
      wallet.accounts['ndaiap4q2me85dtnp5naifa5d8xtmrimm4b997hr9mcm38vz']
        .addressData
    )
  ).toBe('200.000')
})

test('make sure we can get the locked until date of ndau per account', async () => {
  const wallet = data.testUser.wallets['7MP-4FV']

  await AccountAPIHelper.populateWalletWithAddressData(wallet)

  expect(wallet).toBeDefined()
  expect(
    AccountAPIHelper.accountLockedUntil(
      wallet.accounts['ndarc8etbkidm5ewytxhvzida94sgg9mvr3aswufbty8zcun']
        .addressData
    )
  ).toBe(null)
  expect(
    AccountAPIHelper.accountLockedUntil(
      wallet.accounts['ndamm8kxzf9754axd24wrkh3agvj2cidx75wdfhjiufcjf55']
        .addressData
    )
  ).toContain(' ')
})

test('make sure we can get the total amount of ndau for accounts', async () => {
  const wallet = data.testUser.wallets['7MP-4FV']

  await AccountAPIHelper.populateWalletWithAddressData(wallet)

  expect(wallet).toBeDefined()
  expect(AccountAPIHelper.accountTotalNdauAmount(wallet.accounts)).toBe(
    '1,757.000'
  )
})

test('make sure we can get the current price of the users ndau', async () => {
  const wallet = data.testUser.wallets['7MP-4FV']

  await AccountAPIHelper.populateWalletWithAddressData(wallet)
  const totalNdau = await AccountAPIHelper.accountTotalNdauAmount(
    wallet.accounts,
    false
  )

  expect(wallet).toBeDefined()
  expect(AccountAPIHelper.currentPrice(wallet.marketPrice, totalNdau)).toBe(
    '$29,736.04'
  )
})

test('make sure sending EAI has the nickname set correctly', async () => {
  const wallet = data.testUser.wallets['7MP-4FV']

  await AccountAPIHelper.populateWalletWithAddressData(wallet)

  expect(wallet).toBeDefined()
  expect(
    AccountAPIHelper.sendingEAITo(
      wallet.accounts['ndanhgm5avd68gj9ufiwq7ttcsshxciupgz5i7nnzk68f67g']
        .addressData
    )
  ).toBe('Account 3')
  expect(
    AccountAPIHelper.sendingEAITo(
      wallet.accounts['ndaiap4q2me85dtnp5naifa5d8xtmrimm4b997hr9mcm38vz']
        .addressData
    )
  ).toBe('Account 1')
})

test('make sure receiving EAI has the nickname set correctly', async () => {
  const wallet = data.testUser.wallets['7MP-4FV']

  await AccountAPIHelper.populateWalletWithAddressData(wallet)

  expect(wallet).toBeDefined()
  expect(
    AccountAPIHelper.receivingEAIFrom(
      wallet.accounts['ndarc8etbkidm5ewytxhvzida94sgg9mvr3aswufbty8zcun']
        .addressData
    )
  ).toBe('Account 2 ')
  expect(
    AccountAPIHelper.receivingEAIFrom(
      wallet.accounts['ndamm8kxzf9754axd24wrkh3agvj2cidx75wdfhjiufcjf55']
        .addressData
    )
  ).toBe('Account 4 ')
})

test('if we can get the correct EAI rate from what comes back, make sure we round it', async () => {
  const account = {
    eaiValueForDisplay: 74200000000
  }

  expect(AccountAPIHelper.eaiValueForDisplay(account)).toBe(7)
})

test('if we can get the correct EAI rate from what comes back, rate a bit higher and rounds up', async () => {
  const account = {
    eaiValueForDisplay: 126460000000
  }

  expect(AccountAPIHelper.eaiValueForDisplay(account)).toBe(13)
})

test('if we can get a null if not present', async () => {
  const account = {}

  expect(AccountAPIHelper.eaiValueForDisplay(account)).toBeFalsy()
})

test('make sure we can populate validation keys if not present', async () => {
  const keyMaster = jest.spyOn(KeyMaster, 'getValidationKeys')
  keyMaster.mockReturnValue({
    npuba4jaftckeebijwfxqwdyk3nt9bjxek7dq2mx2kjfgpbkq7dmrpa3rep5bsp3362idhqsyaaaaabaff879kt39fvjd7nntqutczzu2hm6u7vr73uutw3gqjxeqvgyjzf2es8ry7fi:
      'pvtblah',
    npuba4jaftckeebijwfxqwdyk3nt9bjxek7dq2mx2kjfgpbkq7dmrpa3rep5bsp3362idhqsyaaaaabaff879kt39fvjd7nntqutczzu2hm6u7vr73uutw3gqjxeqvgyjzf2es8ry123:
      'pvtnope'
  })
  MockHelper.mockAccountsAPI(data.test7MP4FVAddressData)
  MockHelper.mockAccountAPI()
  const wallet = data.test7MP4FVUserData.wallets['2c963f83']

  await AccountAPIHelper.populateWalletWithAddressData(wallet)

  const validationKeys =
    wallet.accounts['ndae2m6h32eee2qci9fjhzmfxtpni6pizmks839npbqz8yq4']
      .validationKeys
  expect(wallet).toBeDefined()
  expect(validationKeys.length).toBe(1)
  expect(wallet.keys[validationKeys[0]].publicKey).toBe(
    'npuba4jaftckeebijwfxqwdyk3nt9bjxek7dq2mx2kjfgpbkq7dmrpa3rep5bsp3362idhqsyaaaaabaff879kt39fvjd7nntqutczzu2hm6u7vr73uutw3gqjxeqvgyjzf2es8ry7fi'
  )
  expect(wallet.keys[validationKeys[0]].privateKey).toBe('pvtblah')
})

test('make sure that lockBonusEAI sends back the correct percentage', async () => {
  expect(AccountAPIHelper.lockBonusEAI(45)).toBe(0)
  expect(AccountAPIHelper.lockBonusEAI(91)).toBe(1)
  expect(AccountAPIHelper.lockBonusEAI(199)).toBe(2)
  expect(AccountAPIHelper.lockBonusEAI(390)).toBe(3)
  expect(AccountAPIHelper.lockBonusEAI(734)).toBe(4)
  expect(AccountAPIHelper.lockBonusEAI(1098)).toBe(5)
})
