import NdauNodeAPIHelper from '../NdauNodeAPIHelper';
import data from '../../api/data';

test('populateWalletWithAddressData populates wallet with data from the API', async () => {
  fetch.mockResponseOnce(JSON.stringify(data.testAddressData));
  const wallet = data.testUser.wallets['7MP-4FV'];

  await NdauNodeAPIHelper.populateWalletWithAddressData(wallet);

  console.log(`WALLET IS ${JSON.stringify(wallet, null, 2)}`);

  expect(wallet).toBeDefined();
  expect(wallet.accounts).toBeDefined();
  expect(wallet.accounts[0].addressData.balance).toBe(42.23);
  expect(wallet.accounts[1].addressData.balance).toBe(200.2);
  expect(wallet.accounts[0].addressData.lock).toBe(null);
  expect(wallet.accounts[1].addressData.lock.noticePeriod).toBe(2592000000000);
  expect(wallet.accounts[2].addressData.lock.unlocksOn).toBe(1585886400000);
  expect(wallet.accounts[0].addressData.rewardsTarget).toBe(null);
  expect(wallet.accounts[0].addressData.incomingRewardsFrom).toBe(
    'ndadyjb9q8q2kjchcmbcpn7bj6gigkdqbqu542dmhz7antp2'
  );
});

test('make sure we can get the amount of ndau per account', async () => {
  fetch.mockResponseOnce(JSON.stringify(data.testAddressData));
  const wallet = data.testUser.wallets['7MP-4FV'];

  await NdauNodeAPIHelper.populateWalletWithAddressData(wallet);

  expect(wallet).toBeDefined();
  expect(NdauNodeAPIHelper.accountNdauAmount(wallet.accounts[0].addressData)).toBe(42.23);
  expect(NdauNodeAPIHelper.accountNdauAmount(wallet.accounts[1].addressData)).toBe(200.2);
});

test('make sure we can get the locked until date of ndau per account', async () => {
  fetch.mockResponseOnce(JSON.stringify(data.testAddressData));
  const wallet = data.testUser.wallets['7MP-4FV'];

  await NdauNodeAPIHelper.populateWalletWithAddressData(wallet);

  expect(wallet).toBeDefined();
  expect(NdauNodeAPIHelper.accountLockedUntil(wallet.accounts[0].addressData)).toBe(null);
  expect(NdauNodeAPIHelper.accountLockedUntil(wallet.accounts[2].addressData)).toContain('/');
});

test('make sure we can get the total amount of ndau for accounts', async () => {
  fetch.mockResponseOnce(JSON.stringify(data.testAddressData));
  const wallet = data.testUser.wallets['7MP-4FV'];

  await NdauNodeAPIHelper.populateWalletWithAddressData(wallet);

  expect(wallet).toBeDefined();
  expect(NdauNodeAPIHelper.accountTotalNdauAmount(wallet.accounts)).toBe('1,759.1');
});

test('make sure we can get the current price of the users ndau', async () => {
  fetch.mockResponseOnce(JSON.stringify(data.testAddressData));
  const wallet = data.testUser.wallets['7MP-4FV'];

  NdauNodeAPIHelper.populateWalletWithAddressData(wallet);
  const totalNdau = await NdauNodeAPIHelper.accountTotalNdauAmount(wallet.accounts, false);

  expect(wallet).toBeDefined();
  expect(NdauNodeAPIHelper.currentPrice(wallet.marketPrice, totalNdau)).toBe('$28,743.69');
});

test('make sure sending EAI has the nickname set correctly', async () => {
  fetch.mockResponseOnce(JSON.stringify(data.testAddressData));
  const wallet = data.testUser.wallets['7MP-4FV'];

  await NdauNodeAPIHelper.populateWalletWithAddressData(wallet);

  expect(wallet).toBeDefined();
  expect(NdauNodeAPIHelper.sendingEAITo(wallet.accounts[3].addressData)).toBe('Account 3');
  expect(NdauNodeAPIHelper.sendingEAITo(wallet.accounts[1].addressData)).toBe('Account 1');
});

test('make sure receiving EAI has the nickname set correctly', async () => {
  fetch.mockResponseOnce(JSON.stringify(data.testAddressData));
  const wallet = data.testUser.wallets['7MP-4FV'];

  await NdauNodeAPIHelper.populateWalletWithAddressData(wallet);

  expect(wallet).toBeDefined();
  expect(NdauNodeAPIHelper.receivingEAIFrom(wallet.accounts[0].addressData)).toBe('Account 2');
  expect(NdauNodeAPIHelper.receivingEAIFrom(wallet.accounts[2].addressData)).toBe('Account 4');
});
