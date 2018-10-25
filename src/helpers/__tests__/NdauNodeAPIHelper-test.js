import NdauNodeAPIHelper from '../NdauNodeAPIHelper';
import data from '../../api/data';

test('populateWalletWithAddressData populates wallet with data from the API', async () => {
  fetch.mockResponseOnce(JSON.stringify(data.testAddressData));
  const wallet = data.testUser.wallets['7MP-4FV'];

  console.log(`WALLET IS ${JSON.stringify(wallet, null, 2)}`);

  await NdauNodeAPIHelper.populateWalletWithAddressData(wallet);

  console.log(`WALLET IS ${JSON.stringify(wallet, null, 2)}`);

  expect(wallet).toBeDefined();
  expect(wallet.accounts).toBeDefined();
  expect(
    wallet.accounts['ndabherxgf9a6curi3wyf69932pm3ngqpshvqgmdfjvh8ura'].addressData.balance
  ).toBe(42.23);
  expect(
    wallet.accounts['ndadyjb9q8q2kjchcmbcpn7bj6gigkdqbqu542dmhz7antp2'].addressData.balance
  ).toBe(200.2);
  expect(wallet.accounts['ndabherxgf9a6curi3wyf69932pm3ngqpshvqgmdfjvh8ura'].addressData.lock).toBe(
    null
  );
  expect(
    wallet.accounts['ndadyjb9q8q2kjchcmbcpn7bj6gigkdqbqu542dmhz7antp2'].addressData.lock
      .noticePeriod
  ).toBe(2592000000000);
  expect(
    wallet.accounts['ndaefksscncavwk94demkpwd686hc9xnzdivussx7kapsajt'].addressData.lock.unlocksOn
  ).toBe(1585886400000);
  expect(
    wallet.accounts['ndabherxgf9a6curi3wyf69932pm3ngqpshvqgmdfjvh8ura'].addressData.rewardsTarget
  ).toBe(null);
  expect(
    wallet.accounts['ndabherxgf9a6curi3wyf69932pm3ngqpshvqgmdfjvh8ura'].addressData
      .incomingRewardsFrom
  ).toBe('ndadyjb9q8q2kjchcmbcpn7bj6gigkdqbqu542dmhz7antp2');
});

test('make sure we can get the amount of ndau per account', async () => {
  fetch.mockResponseOnce(JSON.stringify(data.testAddressData));
  const wallet = data.testUser.wallets['7MP-4FV'];

  await NdauNodeAPIHelper.populateWalletWithAddressData(wallet);

  expect(wallet).toBeDefined();
  expect(
    NdauNodeAPIHelper.accountNdauAmount(
      wallet.accounts['ndabherxgf9a6curi3wyf69932pm3ngqpshvqgmdfjvh8ura'].addressData
    )
  ).toBe(42.23);
  expect(
    NdauNodeAPIHelper.accountNdauAmount(
      wallet.accounts['ndadyjb9q8q2kjchcmbcpn7bj6gigkdqbqu542dmhz7antp2'].addressData
    )
  ).toBe(200.2);
});

test('make sure we can get the locked until date of ndau per account', async () => {
  fetch.mockResponseOnce(JSON.stringify(data.testAddressData));
  const wallet = data.testUser.wallets['7MP-4FV'];

  await NdauNodeAPIHelper.populateWalletWithAddressData(wallet);

  expect(wallet).toBeDefined();
  expect(
    NdauNodeAPIHelper.accountLockedUntil(
      wallet.accounts['ndabherxgf9a6curi3wyf69932pm3ngqpshvqgmdfjvh8ura'].addressData
    )
  ).toBe(null);
  expect(
    NdauNodeAPIHelper.accountLockedUntil(
      wallet.accounts['ndaefksscncavwk94demkpwd686hc9xnzdivussx7kapsajt'].addressData
    )
  ).toContain('/');
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
  expect(
    NdauNodeAPIHelper.sendingEAITo(
      wallet.accounts['ndacvk992umgjgunwq8acbfwty7pwsn4t6wjww95j5e2v69d'].addressData
    )
  ).toBe('Account 3');
  expect(
    NdauNodeAPIHelper.sendingEAITo(
      wallet.accounts['ndadyjb9q8q2kjchcmbcpn7bj6gigkdqbqu542dmhz7antp2'].addressData
    )
  ).toBe('Account 1');
});

test('make sure receiving EAI has the nickname set correctly', async () => {
  fetch.mockResponseOnce(JSON.stringify(data.testAddressData));
  const wallet = data.testUser.wallets['7MP-4FV'];

  await NdauNodeAPIHelper.populateWalletWithAddressData(wallet);

  expect(wallet).toBeDefined();
  expect(
    NdauNodeAPIHelper.receivingEAIFrom(
      wallet.accounts['ndabherxgf9a6curi3wyf69932pm3ngqpshvqgmdfjvh8ura'].addressData
    )
  ).toBe('Account 2');
  expect(
    NdauNodeAPIHelper.receivingEAIFrom(
      wallet.accounts['ndaefksscncavwk94demkpwd686hc9xnzdivussx7kapsajt'].addressData
    )
  ).toBe('Account 4');
});
