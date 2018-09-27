import { NativeModules } from 'react-native';
import sinon from 'sinon';
import KeyAddrGenManager from '../KeyAddrGenManager';

jest.mock('NativeModules', () => {
  return {
    KeyaddrManager: {
      keyaddrWordsToBytes: jest.fn(),
      newKey: jest.fn(),
      child: jest.fn(),
      hardenedChild: jest.fn(),
      ndauAddress: jest.fn()
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
const errorString =
  'Error: you MUST pass userId, numberOfAccounts, recoveryPhrase and chainId to this method';
const bytes = 'ZWEQAwQFBgcICQoLDA0ODw==';
const initialPrivateKey =
  'npvt8aaaaaaaaaaaadyj632qv3ip7jhi66dxjzdtbvabf2nrrupjaqignfha5smckbu4nagfhwce3f9gfutkhmk5weuicjwyrsiax8qgq56bnhg5wrb6uwbigqk3bgw3';
const bip44hardenedPrivateKey =
  'npvt8ard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkah8hjr9cnqmrxn4a9rcrzu9yerbyhhykt6nq586kyw8t2g3kkbk5a6m4par';
const hardenedKeyNdauConstant =
  'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqxm';
const childPrivate100 =
  'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqxm';
const address = 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn';
const keyaddrWordsToBytes = sinon.spy(NativeModules.KeyaddrManager, 'keyaddrWordsToBytes');
keyaddrWordsToBytes.mockReturnValue(bytes);
const newKey = sinon.spy(NativeModules.KeyaddrManager, 'newKey');
newKey.mockReturnValue(initialPrivateKey);
const hardenedChild = sinon.spy(NativeModules.KeyaddrManager, 'hardenedChild');
hardenedChild.mockReturnValue(bip44hardenedPrivateKey);
const child = sinon.spy(NativeModules.KeyaddrManager, 'child');
child.mockReturnValue(childPrivate100);
const ndauAddress = sinon.spy(NativeModules.KeyaddrManager, 'ndauAddress');
ndauAddress.mockReturnValue(address);

test('createFirstTimeUser test', async () => {
  const firstTimeUser = await KeyAddrGenManager.createFirstTimeUser(
    userId,
    numberOfAccounts,
    bytes,
    chainId
  );

  console.log(`firstTimeUser: ${JSON.stringify(firstTimeUser)}`);

  expect(firstTimeUser).toBeDefined();
  expect(JSON.stringify(firstTimeUser)).toBe(
    `{"userId":"TAC-3PY","accountCreationKey":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqxm","accounts":[{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn","accountData":{}},{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn","accountData":{}},{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn","accountData":{}},{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn","accountData":{}},{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn","accountData":{}}],"keys":{"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqxm":{"key":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqxm","path":"/44'/200'/100","derivedFromRoot":"yes"}}}`
  );
});

test('createFirstTimeUser no userId', async () => {
  try {
    const firstTimeUser = await KeyAddrGenManager.createFirstTimeUser(
      null,
      numberOfAccounts,
      bytes,
      chainId
    );
  } catch (error) {
    console.error(error);
    expect(error.toString()).toBe(errorString);
    return;
  }

  console.log(`firstTimeUser: ${firstTimeUser}`);
});

test('createFirstTimeUser no numberOfAccounts', async () => {
  try {
    await KeyAddrGenManager.createFirstTimeUser(userId, undefined, bytes, chainId);
  } catch (error) {
    console.error(error);
    expect(error.toString()).toBe(errorString);
    return;
  }

  console.log(`firstTimeUser: ${firstTimeUser}`);
});

test('createFirstTimeUser no bytes', async () => {
  try {
    await KeyAddrGenManager.createFirstTimeUser(userId, numberOfAccounts, null, chainId);
  } catch (error) {
    console.error(error);
    expect(error.toString()).toBe(errorString);
    return;
  }

  console.log(`firstTimeUser: ${firstTimeUser}`);
});

test('createFirstTimeUser no chainId', async () => {
  try {
    const firstTimeUser = await KeyAddrGenManager.createFirstTimeUser(
      userId,
      numberOfAccounts,
      bytes
    );
  } catch (error) {
    console.error(error);
    expect(error.toString()).toBe(errorString);
    return;
  }

  console.log(`firstTimeUser: ${firstTimeUser}`);
});
