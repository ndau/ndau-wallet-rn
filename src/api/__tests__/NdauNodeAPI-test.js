import MockAsyncStorage from 'mock-async-storage';

const mock = () => {
  const mockImpl = new MockAsyncStorage();
  jest.mock('AsyncStorage', () => mockImpl);
};

mock();
import NdauNodeAPI from '../NdauNodeAPI';
import AsyncStorageHelper from '../../model/AsyncStorageHelper';

beforeEach(() => {
  AsyncStorageHelper.setCurrentUser({
    userId: '7MP-4FV',
    addresses: [
      'tnai24puxki6s4zqyy7ebizgcviw2ui9z9x98pmah5n3ynmz',
      'tnarpmwz3yxxyk7fdgiu2irmvatygg5u8nrg735xcu5ezezv'
    ],
    selectedNode: 'Storrow'
  });
});

test('getAddressData should return something back', async () => {
  fetch.mockResponseOnce(
    JSON.stringify({
      addressData: [
        {
          Balance: 0,
          TransferKeys: null,
          RewardsTarget: null,
          IncomingRewardsFrom: null,
          DelegationNode: null,
          Lock: null,
          Stake: null,
          LastEAIUpdate: 589991567000000,
          LastWAAUpdate: 589991567000000,
          WeightedAverageAge: 0,
          Sequence: 0,
          Settlements: null,
          SettlementSettings: { Period: 0, ChangesAt: null, Next: null },
          ValidationScript: null
        }
      ]
    })
  );

  const ndau = await NdauNodeAPI.getAddressData({
    addresses: [ 'ndabbqv2rm9w6regasrdk4qvbhkktqsrp6ckj8zdpir57phy' ]
  });

  console.log(`getAddressData returns to ${JSON.stringify(ndau, null, 2)}`);

  expect(ndau).toBeDefined();
});
