import NdauNodeAPIHelper from '../NdauNodeAPIHelper';
import addressData from '../../api/addressData';

fetch.mockResponseOnce(JSON.stringify(addressData.testAddressData));
const user = addressData.testUser;

test('populateCurrentUserWithLockData populates user with data from the API', async () => {
  const updatedUser = await NdauNodeAPIHelper.populateCurrentUserWithAddressData(user);

  expect(updatedUser).toBeDefined();
  expect(updatedUser.addressData).toBeDefined();
  expect(updatedUser.addressData[0].balance).toBe(42.23);
  expect(updatedUser.addressData[1].balance).toBe(200.2);
  expect(updatedUser.addressData[0].lock).toBe(null);
  expect(updatedUser.addressData[1].lock.noticePeriod).toBe(2592000000000);
  expect(updatedUser.addressData[2].lock.unlocksOn).toBe(1585886400000);
  expect(updatedUser.addressData[0].rewardsTarget).toBe(null);
  expect(updatedUser.addressData[0].incomingRewardsFrom).toBe(
    'tnar02wz3yxxyk7fdgiu2irmvatygg5u8nrg735xcu5ezezv'
  );
});

test('make sure we can get the amount of ndau per account', async () => {
  const updatedUser = await NdauNodeAPIHelper.populateCurrentUserWithAddressData(user);

  expect(updatedUser).toBeDefined();
  expect(NdauNodeAPIHelper.accountNdauAmount(updatedUser.addressData[0])).toBe(42.23);
  expect(NdauNodeAPIHelper.accountNdauAmount(updatedUser.addressData[1])).toBe(200.2);
});

test('make sure we can get the locked until date of ndau per account', async () => {
  const updatedUser = await NdauNodeAPIHelper.populateCurrentUserWithAddressData(user);

  expect(updatedUser).toBeDefined();
  expect(NdauNodeAPIHelper.accountLockedUntil(updatedUser.addressData[0])).toBe(null);
  expect(NdauNodeAPIHelper.accountLockedUntil(updatedUser.addressData[2])).toContain('/');
});

test('make sure we can get the total amount of ndau for accounts', async () => {
  const updatedUser = await NdauNodeAPIHelper.populateCurrentUserWithAddressData(user);

  expect(updatedUser).toBeDefined();
  expect(NdauNodeAPIHelper.accountTotalNdauAmount(updatedUser.addressData)).toBe('1,244.1');
});

test('make sure we can get the current price of the users ndau', async () => {
  let updatedUser = await NdauNodeAPIHelper.populateCurrentUserWithAddressData(user);

  expect(updatedUser).toBeDefined();
  expect(NdauNodeAPIHelper.currentPrice(updatedUser)).toBe('$20,328.59');
});

test('make sure sending EAI has the nickname set correctly', async () => {
  const updatedUser = await NdauNodeAPIHelper.populateCurrentUserWithAddressData(user);

  expect(updatedUser).toBeDefined();
  expect(NdauNodeAPIHelper.sendingEAITo(updatedUser.addressData[3])).toBe('Account 3');
  expect(NdauNodeAPIHelper.sendingEAITo(updatedUser.addressData[1])).toBe('Account 1');
});

test('make sure receiving EAI has the nickname set correctly', async () => {
  const updatedUser = await NdauNodeAPIHelper.populateCurrentUserWithAddressData(user);
  console.log(`${JSON.stringify(updatedUser, null, 2)}`);

  expect(updatedUser).toBeDefined();
  expect(NdauNodeAPIHelper.receivingEAIFrom(updatedUser.addressData[0])).toBe('Account 2');
  expect(NdauNodeAPIHelper.receivingEAIFrom(updatedUser.addressData[2])).toBe('Account 4');
});
