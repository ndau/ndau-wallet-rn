import { NativeModules } from 'react-native';
import sinon from 'sinon';
import KeyAddrGenManager from '../KeyAddrGenManager';
import User from '../../model/User';
import AppConfig from '../../AppConfig';
import Wallet from '../../model/Wallet';

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
  };
});

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
];
const userId = 'TAC-3PY';
const numberOfAccounts = 5;
const chainId = 'tn';
const errorString = 'Error: you MUST pass recoveryPhrase to this method';
const errorNewAccountUser = `Error: The user's wallet passed in has no accountCreationKey`;
const errorGetRootAddresses = 'Error: you MUST pass recoveryBytes';
const errorGetBIP44Addresses = 'Error: you MUST pass recoveryBytes';
let recoveryPhraseString =
  'goat amount liar amount expire adjust cage candy arch gather drum buyer';
const bytes = 'ZWEQAwQFBgcICQoLDA0ODw==';
const initialPrivateKey =
  'npvt8aaaaaaaaaaaadyj632qv3ip7jhi66dxjzdtbvabf2nrrupjaqignfha5smckbu4nagfhwce3f9gfutkhmk5weuicjwyrsiax8qgq56bnhg5wrb6uwbigqk3bgw3';
const bip44hardenedPrivateKey =
  'npvt8ard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkah8hjr9cnqmrxn4a9rcrzu9yerbyhhykt6nq586kyw8t2g3kkbk5a6m4pa';
const publicKey =
  'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj44';
const childPrivate100 =
  'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx';
const address = 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn';
const keyaddrWordsToBytes = sinon.spy(NativeModules.KeyaddrManager, 'keyaddrWordsToBytes');
keyaddrWordsToBytes.mockReturnValue(bytes);
const newKey = sinon.spy(NativeModules.KeyaddrManager, 'newKey');
newKey.mockReturnValue(initialPrivateKey);

const hardenedChild = sinon.spy(NativeModules.KeyaddrManager, 'hardenedChild');
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
  .mockReturnValueOnce(bip44hardenedPrivateKey + 'h');

const child = sinon.spy(NativeModules.KeyaddrManager, 'child');
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
  .mockReturnValueOnce(childPrivate100 + 'h');

const ndauAddress = sinon.spy(NativeModules.KeyaddrManager, 'ndauAddress');
ndauAddress.mockReturnValue(address);

const deriveFrom = sinon.spy(NativeModules.KeyaddrManager, 'deriveFrom');
deriveFrom
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
  .mockReturnValueOnce(childPrivate100 + 'h');

const toPublic = sinon.spy(NativeModules.KeyaddrManager, 'toPublic');
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
  .mockReturnValueOnce(publicKey + 'h');

test('createFirstTimeUser test', async () => {
  const firstTimeUser = await KeyAddrGenManager.createFirstTimeUser(
    bytes,
    userId,
    chainId,
    numberOfAccounts
  );

  console.log(`firstTimeUser: ${JSON.stringify(firstTimeUser)}`);

  expect(firstTimeUser).toBeDefined();
  expect(JSON.stringify(firstTimeUser)).toBe(
    `{"userId":"TAC-3PY","wallets":{"TAC-3PY":{"walletId":"TAC-3PY","accountCreationKey":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx1","accounts":[{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn","addressData":{},"ownershipKey":"95b8071e","transferKeys":["95b8071e","ba276f55"]},{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn","addressData":{},"ownershipKey":"95b8071e","transferKeys":["20f4d175","afb4eac1"]},{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn","addressData":{},"ownershipKey":"95b8071e","transferKeys":["edef8a85","bfdc7ce5"]},{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn","addressData":{},"ownershipKey":"95b8071e","transferKeys":["90808ebd","56182fea"]},{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn","addressData":{},"ownershipKey":"95b8071e","transferKeys":["d8cc78c1","455265b4"]}],"keys":{"95b8071e":{"key":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx1","path":"/44'/20036'/100","derivedFromRoot":"yes"},"ba276f55":{"key":"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj441","path":"/44'/20036'/100/1","derivedFromRoot":"yes"},"20f4d175":{"key":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx2","path":"/44'/20036'/100/2","derivedFromRoot":"yes"},"afb4eac1":{"key":"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj442","path":"/44'/20036'/100/2","derivedFromRoot":"yes"},"edef8a85":{"key":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx3","path":"/44'/20036'/100/3","derivedFromRoot":"yes"},"bfdc7ce5":{"key":"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj443","path":"/44'/20036'/100/3","derivedFromRoot":"yes"},"90808ebd":{"key":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx4","path":"/44'/20036'/100/4","derivedFromRoot":"yes"},"56182fea":{"key":"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj444","path":"/44'/20036'/100/4","derivedFromRoot":"yes"},"d8cc78c1":{"key":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx5","path":"/44'/20036'/100/5","derivedFromRoot":"yes"},"455265b4":{"key":"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj445","path":"/44'/20036'/100/5","derivedFromRoot":"yes"}}}}}`
  );
});

test('createFirstTimeUser with 0, as this will be possible post Genesis', async () => {
  const firstTimeUser = await KeyAddrGenManager.createFirstTimeUser(
    numberOfAccounts,
    userId,
    bytes,
    chainId
  );

  console.log(`firstTimeUser: ${JSON.stringify(firstTimeUser)}`);

  expect(firstTimeUser).toBeDefined();
  expect(JSON.stringify(firstTimeUser)).toBe(
    `{"userId":"TAC-3PY","wallets":{"TAC-3PY":{"walletId":"TAC-3PY","accountCreationKey":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx2","accounts":[],"keys":{"20f4d175":{"key":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx2","path":"/44'/20036'/100","derivedFromRoot":"yes"}}}}}`
  );
});

test('createFirstTimeUser no bytes', async () => {
  try {
    await KeyAddrGenManager.createFirstTimeUser(null, userId, chainId);
  } catch (error) {
    console.error(error);
    expect(error.toString()).toBe(errorString);
    return;
  }

  console.log(`firstTimeUser: ${firstTimeUser}`);
});

test('createNewAccount test', async () => {
  const firstTimeUser = await KeyAddrGenManager.createFirstTimeUser(
    bytes,
    userId,
    chainId,
    numberOfAccounts
  );

  console.log(`firstTimeUser: ${JSON.stringify(firstTimeUser)}`);

  expect(firstTimeUser).toBeDefined();
  expect(firstTimeUser.wallets[firstTimeUser.userId].accounts.length).toBe(5);

  await KeyAddrGenManager.createNewAccount(firstTimeUser);
  expect(firstTimeUser.wallets[firstTimeUser.userId].accounts.length).toBe(6);
  expect(firstTimeUser.wallets[firstTimeUser.userId].accounts[0].address).toBe(
    'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn'
  );
});

test('createNewAccount has bogus user', async () => {
  try {
    const user = new User();
    user.userId = 'blahblah';
    const wallet = new Wallet();
    user.wallets[user.userId] = wallet;
    await KeyAddrGenManager.createNewAccount(user);
  } catch (error) {
    console.error(error);
    expect(error.toString()).toBe(errorNewAccountUser);
    return;
  }

  console.log(`firstTimeUser: ${firstTimeUser}`);
});

test('test getRootAddresses to make sure we get back one address in the array', async () => {
  const addresses = await KeyAddrGenManager.getRootAddresses(bytes);
  expect(addresses.length).toBe(AppConfig.NUMBER_OF_KEYS_TO_GRAB_ON_RECOVERY);
});

test('getRootAddresses has an error', async () => {
  try {
    await KeyAddrGenManager.getRootAddresses(null);
  } catch (error) {
    console.error(error);
    expect(error.toString()).toBe(errorGetRootAddresses);
    return;
  }

  console.log(`firstTimeUser: ${firstTimeUser}`);
});

test('test getBIP44Addresses to make sure we get back one address in the array', async () => {
  const addresses = await KeyAddrGenManager.getBIP44Addresses(bytes);
  expect(addresses.length).toBe(AppConfig.NUMBER_OF_KEYS_TO_GRAB_ON_RECOVERY);
});

test('getBIP44Addresses has an error', async () => {
  try {
    await KeyAddrGenManager.getBIP44Addresses(null);
  } catch (error) {
    console.error(error);
    expect(error.toString()).toBe(errorGetBIP44Addresses);
    return;
  }

  console.log(`firstTimeUser: ${firstTimeUser}`);
});
