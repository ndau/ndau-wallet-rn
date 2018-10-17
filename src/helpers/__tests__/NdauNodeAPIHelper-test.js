import NdauNodeAPIHelper from '../NdauNodeAPIHelper';
import addressData from '../../api/data';
import DataFormatHelper from '../../helpers/DataFormatHelper';

test('populateCurrentUserWithLockData populates user with data from the API', async () => {
  fetch.mockResponseOnce(JSON.stringify(addressData.testAddressData));
  const user = addressData.testUser;

  DataFormatHelper.createAccountsFromAddresses(user);
  await NdauNodeAPIHelper.populateCurrentUserWithAddressData(user);

  expect(user).toBeDefined();
  expect(user.accounts).toBeDefined();
  expect(user.accounts[0].addressData.balance).toBe(42.23);
  expect(user.accounts[1].addressData.balance).toBe(200.2);
  expect(user.accounts[0].addressData.lock).toBe(null);
  expect(user.accounts[1].addressData.lock.noticePeriod).toBe(2592000000000);
  expect(user.accounts[2].addressData.lock.unlocksOn).toBe(1585886400000);
  expect(user.accounts[0].addressData.rewardsTarget).toBe(null);
  expect(user.accounts[0].addressData.incomingRewardsFrom).toBe(
    'ndadyjb9q8q2kjchcmbcpn7bj6gigkdqbqu542dmhz7antp2'
  );
});

test('make sure we can get the amount of ndau per account', async () => {
  fetch.mockResponseOnce(JSON.stringify(addressData.testAddressData));
  const user = addressData.testUser;

  DataFormatHelper.createAccountsFromAddresses(user);
  await NdauNodeAPIHelper.populateCurrentUserWithAddressData(user);

  expect(user).toBeDefined();
  expect(NdauNodeAPIHelper.accountNdauAmount(user.accounts[0].addressData)).toBe(42.23);
  expect(NdauNodeAPIHelper.accountNdauAmount(user.accounts[1].addressData)).toBe(200.2);
});

test('make sure we can get the locked until date of ndau per account', async () => {
  fetch.mockResponseOnce(JSON.stringify(addressData.testAddressData));
  const user = addressData.testUser;

  DataFormatHelper.createAccountsFromAddresses(user);
  await NdauNodeAPIHelper.populateCurrentUserWithAddressData(user);

  expect(user).toBeDefined();
  expect(NdauNodeAPIHelper.accountLockedUntil(user.accounts[0].addressData)).toBe(null);
  expect(NdauNodeAPIHelper.accountLockedUntil(user.accounts[2].addressData)).toContain('/');
});

test('make sure we can get the total amount of ndau for accounts', async () => {
  fetch.mockResponseOnce(JSON.stringify(addressData.testAddressData));
  const user = addressData.testUser;

  DataFormatHelper.createAccountsFromAddresses(user);
  await NdauNodeAPIHelper.populateCurrentUserWithAddressData(user);

  expect(user).toBeDefined();
  expect(NdauNodeAPIHelper.accountTotalNdauAmount(user.accounts)).toBe('1,244.1');
});

test('make sure we can get the current price of the users ndau', async () => {
  fetch.mockResponseOnce(JSON.stringify(addressData.testAddressData));
  const user = addressData.testUser;

  DataFormatHelper.createAccountsFromAddresses(user);
  NdauNodeAPIHelper.populateCurrentUserWithAddressData(user);
  const totalNdau = await NdauNodeAPIHelper.accountTotalNdauAmount(user.accounts, false);

  expect(user).toBeDefined();
  expect(NdauNodeAPIHelper.currentPrice(user.marketPrice, totalNdau)).toBe('$20,328.59');
});

test('make sure sending EAI has the nickname set correctly', async () => {
  fetch.mockResponseOnce(JSON.stringify(addressData.testAddressData));
  const user = addressData.testUser;

  DataFormatHelper.createAccountsFromAddresses(user);
  await NdauNodeAPIHelper.populateCurrentUserWithAddressData(user);

  expect(user).toBeDefined();
  expect(NdauNodeAPIHelper.sendingEAITo(user.accounts[3].addressData)).toBe('Account 3');
  expect(NdauNodeAPIHelper.sendingEAITo(user.accounts[1].addressData)).toBe('Account 1');
});

test('make sure receiving EAI has the nickname set correctly', async () => {
  fetch.mockResponseOnce(JSON.stringify(addressData.testAddressData));
  const user = addressData.testUser;

  DataFormatHelper.createAccountsFromAddresses(user);
  await NdauNodeAPIHelper.populateCurrentUserWithAddressData(user);

  expect(user).toBeDefined();
  expect(NdauNodeAPIHelper.receivingEAIFrom(user.accounts[0].addressData)).toBe('Account 2');
  expect(NdauNodeAPIHelper.receivingEAIFrom(user.accounts[2].addressData)).toBe('Account 4');
});
