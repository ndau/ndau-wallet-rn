import MockAsyncStorage from 'mock-async-storage';

const mock = () => {
  const mockImpl = new MockAsyncStorage();
  jest.mock('AsyncStorage', () => mockImpl);
};

mock();
import AsyncStorageHelper from '../../model/AsyncStorageHelper';
import NdauNodeAPIHelper from '../NdauNodeAPIHelper';

beforeEach(() => {
  console.log('this goes first');
  AsyncStorageHelper.setCurrentUser({
    userId: '7MP-4FV',
    addresses: [
      'tnai24puxki6s4zqyy7ebizgcviw2ui9z9x98pmah5n3ynmz',
      'tnarpmwz3yxxyk7fdgiu2irmvatygg5u8nrg735xcu5ezezv'
    ],
    selectedNode: 'Storrow'
  });
});

test('populateCurrentUserWithLockData populates the UserStore with data from the API', async () => {
  fetch.mockResponseOnce(
    JSON.stringify({
      addressData: [
        {
          Balance: 0,
          TransferKeys: null,
          RewardsTarget: null,
          IncomingRewardsFrom: null,
          DelegationNode: null,
          Lock: {
            NoticePeriod: 123491567000000,
            UnlocksOn: 589991567000000
          },
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

  await NdauNodeAPIHelper.populateCurrentUserWithAddressData();

  const user = await AsyncStorageHelper.getCurrentUser();

  expect(user).toBeDefined();
  expect(user.addressData).toBeDefined();
});
