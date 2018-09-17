import NdauNodeAPIHelper from '../NdauNodeAPIHelper';

fetch.mockResponseOnce(
  JSON.stringify({
    addressData: [
      {
        Balance: 300,
        TransferKeys: null,
        RewardsTarget: null,
        IncomingRewardsFrom: 'tnarpmwz3yxxyk7fdgiu2irmvatygg5u8nrg735xcu5ezezv',
        DelegationNode: null,
        Lock: {
          NoticePeriod: 123491567000000,
          UnlocksOn: 1583211600000
        },
        Stake: null,
        LastEAIUpdate: 589991567000000,
        LastWAAUpdate: 589991567000000,
        WeightedAverageAge: 0,
        Sequence: 0,
        Settlements: null,
        SettlementSettings: { Period: 0, ChangesAt: null, Next: null },
        ValidationScript: null
      },
      {
        Balance: 200.0,
        TransferKeys: null,
        RewardsTarget: 'tnai24puxki6s4zqyy7ebizgcviw2ui9z9x98pmah5n3ynmz',
        IncomingRewardsFrom: null,
        DelegationNode: null,
        Lock: {
          NoticePeriod: 123491567000001,
          UnlocksOn: 1585886400000
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
const user = {
  userId: '7MP-4FV',
  addresses: [
    'tnai24puxki6s4zqyy7ebizgcviw2ui9z9x98pmah5n3ynmz',
    'tnarpmwz3yxxyk7fdgiu2irmvatygg5u8nrg735xcu5ezezv'
  ],
  selectedNode: 'Storrow'
};

test('populateCurrentUserWithLockData populates user with data from the API', async () => {
  const updatedUser = await NdauNodeAPIHelper.populateCurrentUserWithAddressData(user);

  expect(updatedUser).toBeDefined();
  expect(updatedUser.addressData).toBeDefined();
  expect(updatedUser.addressData[0].Balance).toBe(300);
  expect(updatedUser.addressData[1].Balance).toBe(200.0);
  expect(updatedUser.addressData[0].Lock.NoticePeriod).toBe(123491567000000);
  expect(updatedUser.addressData[0].Lock.UnlocksOn).toBe(1583211600000);
  expect(updatedUser.addressData[1].Lock.NoticePeriod).toBe(123491567000001);
  expect(updatedUser.addressData[1].Lock.UnlocksOn).toBe(1585886400000);
  expect(updatedUser.addressData[0].RewardsTarget).toBe(null);
  expect(updatedUser.addressData[1].RewardsTarget).toBe(
    'tnai24puxki6s4zqyy7ebizgcviw2ui9z9x98pmah5n3ynmz'
  );
  expect(updatedUser.addressData[0].IncomingRewardsFrom).toBe(
    'tnarpmwz3yxxyk7fdgiu2irmvatygg5u8nrg735xcu5ezezv'
  );
  expect(updatedUser.addressData[1].IncomingRewardsFrom).toBe(null);
});

test('make sure we can get the amount of ndau per account', async () => {
  const updatedUser = await NdauNodeAPIHelper.populateCurrentUserWithAddressData(user);

  expect(updatedUser).toBeDefined();
  expect(NdauNodeAPIHelper.accountNdauAmount(updatedUser.addressData[0])).toBe(300);
  expect(NdauNodeAPIHelper.accountNdauAmount(updatedUser.addressData[1])).toBe(200.0);
});

test('make sure we can get the locked until date of ndau per account', async () => {
  const updatedUser = await NdauNodeAPIHelper.populateCurrentUserWithAddressData(user);

  expect(updatedUser).toBeDefined();
  expect(NdauNodeAPIHelper.accountLockedUntil(updatedUser.addressData[0])).toBe('11/17/2068');
  expect(NdauNodeAPIHelper.accountLockedUntil(updatedUser.addressData[1])).toBe('12/18/2068');
});
