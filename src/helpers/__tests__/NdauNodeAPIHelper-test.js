import NdauNodeAPIHelper from '../NdauNodeAPIHelper'
import data from '../../api/data'
import services from '../../api/services-dev.json'

test('populateWalletWithAddressData populates wallet with data from the API', async () => {
  mockFetchStuff()
  const wallet = data.testUser.wallets['7MP-4FV']

  await NdauNodeAPIHelper.populateWalletWithAddressData(wallet)

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
  ).toBe('ndaiap4q2me85dtnp5naifa5d8xtmrimm4b997hr9mcm38vz')
})

test('make sure we can get the amount of ndau per account', async () => {
  mockFetchStuff()
  const wallet = data.testUser.wallets['7MP-4FV']

  await NdauNodeAPIHelper.populateWalletWithAddressData(wallet)

  expect(wallet).toBeDefined()
  expect(
    NdauNodeAPIHelper.accountNdauAmount(
      wallet.accounts['ndarc8etbkidm5ewytxhvzida94sgg9mvr3aswufbty8zcun']
        .addressData
    )
  ).toBe(42.0000000023)
  expect(
    NdauNodeAPIHelper.accountNdauAmount(
      wallet.accounts['ndaiap4q2me85dtnp5naifa5d8xtmrimm4b997hr9mcm38vz']
        .addressData
    )
  ).toBe(200.000000002)
})

test('make sure we can get the locked until date of ndau per account', async () => {
  mockFetchStuff()
  const wallet = data.testUser.wallets['7MP-4FV']

  await NdauNodeAPIHelper.populateWalletWithAddressData(wallet)

  expect(wallet).toBeDefined()
  expect(
    NdauNodeAPIHelper.accountLockedUntil(
      wallet.accounts['ndarc8etbkidm5ewytxhvzida94sgg9mvr3aswufbty8zcun']
        .addressData
    )
  ).toBe(null)
  expect(
    NdauNodeAPIHelper.accountLockedUntil(
      wallet.accounts['ndamm8kxzf9754axd24wrkh3agvj2cidx75wdfhjiufcjf55']
        .addressData
    )
  ).toContain('/')
})

test('make sure we can get the total amount of ndau for accounts', async () => {
  mockFetchStuff()
  const wallet = data.testUser.wallets['7MP-4FV']

  await NdauNodeAPIHelper.populateWalletWithAddressData(wallet)

  expect(wallet).toBeDefined()
  expect(NdauNodeAPIHelper.accountTotalNdauAmount(wallet.accounts)).toBe(
    '1,757'
  )
})

test('make sure we can get the current price of the users ndau', async () => {
  mockFetchStuff()
  const wallet = data.testUser.wallets['7MP-4FV']

  await NdauNodeAPIHelper.populateWalletWithAddressData(wallet)
  const totalNdau = await NdauNodeAPIHelper.accountTotalNdauAmount(
    wallet.accounts,
    false
  )

  expect(wallet).toBeDefined()
  expect(NdauNodeAPIHelper.currentPrice(wallet.marketPrice, totalNdau)).toBe(
    '$28,709.38'
  )
})

test('make sure sending EAI has the nickname set correctly', async () => {
  mockFetchStuff()
  const wallet = data.testUser.wallets['7MP-4FV']

  await NdauNodeAPIHelper.populateWalletWithAddressData(wallet)

  expect(wallet).toBeDefined()
  expect(
    NdauNodeAPIHelper.sendingEAITo(
      wallet.accounts['ndanhgm5avd68gj9ufiwq7ttcsshxciupgz5i7nnzk68f67g']
        .addressData
    )
  ).toBe('Account 3')
  expect(
    NdauNodeAPIHelper.sendingEAITo(
      wallet.accounts['ndaiap4q2me85dtnp5naifa5d8xtmrimm4b997hr9mcm38vz']
        .addressData
    )
  ).toBe('Account 1')
})

test('make sure receiving EAI has the nickname set correctly', async () => {
  mockFetchStuff()
  const wallet = data.testUser.wallets['7MP-4FV']

  await NdauNodeAPIHelper.populateWalletWithAddressData(wallet)

  expect(wallet).toBeDefined()
  expect(
    NdauNodeAPIHelper.receivingEAIFrom(
      wallet.accounts['ndarc8etbkidm5ewytxhvzida94sgg9mvr3aswufbty8zcun']
        .addressData
    )
  ).toBe('Account 2')
  expect(
    NdauNodeAPIHelper.receivingEAIFrom(
      wallet.accounts['ndamm8kxzf9754axd24wrkh3agvj2cidx75wdfhjiufcjf55']
        .addressData
    )
  ).toBe('Account 4')
})

const mockFetchStuff = () => {
  fetch.resetMocks()

  fetch.mockResponses(
    [services],
    [data.testAddressData],
    [services],
    [data.eaiPercentageResponse],
    [services],
    [data.testMarketPrice]
  )
}
