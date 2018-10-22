import { NativeModules } from 'react-native';
import sinon from 'sinon';
import RecoveryPhaseHelper from '../RecoveryPhaseHelper';

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

let recoveryPhraseString =
  'goat amount liar amount expire adjust cage candy arch gather drum buyer';
const userId = 'TAC-3PY';
// const numberOfAccounts = 5;
// const chainId = 'tn';
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

test('checkRecoveryPhrase test', async () => {
  const user = {
    userId: userId,
    addresses: [
      'tnai24puxki6s4zqyy7ebizgcviw2ui9z9x98pmah5n3ynmz',
      'tnarpmwz3yxxyk7fdgiu2irmvatygg5u8nrg735xcu5ezezv'
    ]
  };

  const firstTimeUser = await RecoveryPhaseHelper.checkRecoveryPhrase(recoveryPhraseString, user);

  console.log(`firstTimeUser: ${JSON.stringify(firstTimeUser)}`);

  expect(firstTimeUser).toBeDefined();
  expect(JSON.stringify(firstTimeUser)).toBe(
    `{"userId":"TAC-3PY","accountCreationKey":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx1","accounts":[{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn","addressData":{}},{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn","addressData":{}},{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn","addressData":{}},{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn","addressData":{}},{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn","addressData":{}},{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn","addressData":{}},{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn","addressData":{}},{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn","addressData":{}},{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn","addressData":{}},{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn","addressData":{}},{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn","addressData":{}},{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn","addressData":{}},{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn","addressData":{}},{"address":"tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn","addressData":{}}],"keys":{"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx1":{"key":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx1","path":"/44'/20036'/100/1","derivedFromRoot":"yes"},"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj441":{"key":"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj441","path":"/44'/20036'/100/1","derivedFromRoot":"yes"},"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx2":{"key":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx2","path":"/44'/20036'/100/2","derivedFromRoot":"yes"},"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj442":{"key":"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj442","path":"/44'/20036'/100/2","derivedFromRoot":"yes"},"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx3":{"key":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx3","path":"/44'/20036'/100/3","derivedFromRoot":"yes"},"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj443":{"key":"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj443","path":"/44'/20036'/100/3","derivedFromRoot":"yes"},"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx4":{"key":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx4","path":"/44'/20036'/100/4","derivedFromRoot":"yes"},"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj444":{"key":"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj444","path":"/44'/20036'/100/4","derivedFromRoot":"yes"},"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx5":{"key":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx5","path":"/44'/20036'/100/5","derivedFromRoot":"yes"},"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj445":{"key":"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj445","path":"/44'/20036'/100/5","derivedFromRoot":"yes"},"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx6":{"key":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx6","path":"/44'/20036'/100/6","derivedFromRoot":"yes"},"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj446":{"key":"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj446","path":"/44'/20036'/100/6","derivedFromRoot":"yes"},"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx7":{"key":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx7","path":"/44'/20036'/100/7","derivedFromRoot":"yes"},"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj447":{"key":"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj447","path":"/44'/20036'/100/7","derivedFromRoot":"yes"},"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx8":{"key":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx8","path":"/1","derivedFromRoot":"yes"},"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj448":{"key":"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj448","path":"/1","derivedFromRoot":"yes"},"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx9":{"key":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx9","path":"/2","derivedFromRoot":"yes"},"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj449":{"key":"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj449","path":"/2","derivedFromRoot":"yes"},"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx0":{"key":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx0","path":"/3","derivedFromRoot":"yes"},"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj440":{"key":"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj440","path":"/3","derivedFromRoot":"yes"},"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqxa":{"key":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqxa","path":"/4","derivedFromRoot":"yes"},"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj44a":{"key":"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj44a","path":"/4","derivedFromRoot":"yes"},"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqxb":{"key":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqxb","path":"/5","derivedFromRoot":"yes"},"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj44b":{"key":"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj44b","path":"/5","derivedFromRoot":"yes"},"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqxc":{"key":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqxc","path":"/6","derivedFromRoot":"yes"},"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj44c":{"key":"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj44c","path":"/6","derivedFromRoot":"yes"},"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqxd":{"key":"npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqxd","path":"/7","derivedFromRoot":"yes"},"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj44d":{"key":"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj44d","path":"/7","derivedFromRoot":"yes"}},"addresses":["tnai24puxki6s4zqyy7ebizgcviw2ui9z9x98pmah5n3ynmz","tnarpmwz3yxxyk7fdgiu2irmvatygg5u8nrg735xcu5ezezv","tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn","tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn","tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn","tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn","tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn","tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn","tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn","tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn","tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn","tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn","tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn","tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn","tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn","tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn"]}`
  );
  expect(firstTimeUser.accounts.length).toBe(14);
  expect(firstTimeUser.addresses.length).toBe(16);
});
