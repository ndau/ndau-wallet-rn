const testAddressData = {
  addressData: [
    {
      balance: 42.23,
      transferKeys: null,
      rewardsTarget: null,
      incomingRewardsFrom: 'tnar02wz3yxxyk7fdgiu2irmvatygg5u8nrg735xcu5ezezv',
      delegationNode: null,
      lock: null,
      stake: null,
      lastEAIUpdate: 589991567000000,
      lastWAAUpdate: 589991567000000,
      weightedAverageAge: 0,
      sequence: 0,
      settlements: null,
      settlementSettings: { period: 0, changesAt: null, next: null },
      validationScript: null,
      address: 'tnai01puxki6s4zqyy7ebizgcviw2ui9z9x98pmah5n3ynmz'
    },
    {
      balance: 200.2,
      transferKeys: null,
      rewardsTarget: 'tnai01puxki6s4zqyy7ebizgcviw2ui9z9x98pmah5n3ynmz',
      incomingRewardsFrom: null,
      delegationNode: null,
      lock: {
        noticePeriod: 2592000000000,
        unlocksOn: null
      },
      stake: null,
      lastEAIUpdate: 589991567000000,
      lastWAAUpdate: 589991567000000,
      weightedAverageAge: 0,
      sequence: 0,
      settlements: null,
      settlementSettings: { period: 0, changesAt: null, next: null },
      validationScript: null,
      address: 'tnar02wz3yxxyk7fdgiu2irmvatygg5u8nrg735xcu5ezezv'
    },
    {
      balance: 400.54,
      transferKeys: null,
      rewardsTarget: null,
      incomingRewardsFrom: 'tnar04wz3yxxyk7fdgiu2irmvatygg5u8nrg735xcu5ezezv',
      delegationNode: null,
      lock: {
        noticePeriod: null,
        unlocksOn: 1585886400000
      },
      stake: null,
      lastEAIUpdate: 589991567000000,
      lastWAAUpdate: 589991567000000,
      weightedAverageAge: 0,
      sequence: 0,
      settlements: null,
      settlementSettings: { period: 0, changesAt: null, next: null },
      validationScript: null,
      address: 'tnai03puxki6s4zqyy7ebizgcviw2ui9z9x98pmah5n3ynmz'
    },
    {
      balance: 76.03,
      transferKeys: null,
      rewardsTarget: 'tnai03puxki6s4zqyy7ebizgcviw2ui9z9x98pmah5n3ynmz',
      incomingRewardsFrom: null,
      delegationNode: null,
      lock: {
        noticePeriod: null,
        unlocksOn: 1585886400000
      },
      stake: null,
      lastEAIUpdate: 589991567000000,
      lastWAAUpdate: 589991567000000,
      weightedAverageAge: 0,
      sequence: 0,
      settlements: null,
      settlementSettings: { period: 0, changesAt: null, next: null },
      validationScript: null,
      address: 'tnar04wz3yxxyk7fdgiu2irmvatygg5u8nrg735xcu5ezezv'
    },
    {
      balance: 400.87,
      transferKeys: null,
      rewardsTarget: null,
      incomingRewardsFrom: null,
      delegationNode: null,
      lock: null,
      stake: null,
      lastEAIUpdate: 589991567000000,
      lastWAAUpdate: 589991567000000,
      weightedAverageAge: 0,
      sequence: 0,
      settlements: null,
      settlementSettings: { period: 0, changesAt: null, next: null },
      validationScript: null,
      address: 'tnai05puxki6s4zqyy7ebizgcviw2ui9z9x98pmah5n3ynmz'
    },
    {
      balance: 124.23,
      transferKeys: null,
      rewardsTarget: null,
      incomingRewardsFrom: null,
      delegationNode: null,
      lock: {
        noticePeriod: 7776000000000,
        unlocksOn: null
      },
      stake: null,
      lastEAIUpdate: 589991567000000,
      lastWAAUpdate: 589991567000000,
      weightedAverageAge: 0,
      sequence: 0,
      settlements: null,
      settlementSettings: { period: 0, changesAt: null, next: null },
      validationScript: null,
      address: 'tnar06wz3yxxyk7fdgiu2irmvatygg5u8nrg735xcu5ezezv'
    }
  ]
};

const eaiPercentageRequest = [
  {
    lock: null,
    weightedAverageAge: 0,
    address: 'tnai01puxki6s4zqyy7ebizgcviw2ui9z9x98pmah5n3ynmz'
  },
  {
    lock: {
      noticePeriod: 2592000000000,
      unlocksOn: null
    },
    weightedAverageAge: 0,
    address: 'tnar02wz3yxxyk7fdgiu2irmvatygg5u8nrg735xcu5ezezv'
  },
  {
    lock: {
      noticePeriod: null,
      unlocksOn: 1585886400000
    },
    weightedAverageAge: 0,
    address: 'tnai03puxki6s4zqyy7ebizgcviw2ui9z9x98pmah5n3ynmz'
  },
  {
    lock: {
      noticePeriod: null,
      unlocksOn: 1585886400000
    },
    weightedAverageAge: 0,
    address: 'tnar04wz3yxxyk7fdgiu2irmvatygg5u8nrg735xcu5ezezv'
  },
  {
    lock: null,
    weightedAverageAge: 0,
    address: 'tnai05puxki6s4zqyy7ebizgcviw2ui9z9x98pmah5n3ynmz'
  },
  {
    lock: {
      noticePeriod: 7776000000000,
      unlocksOn: null
    },
    weightedAverageAge: 0,
    address: 'tnar06wz3yxxyk7fdgiu2irmvatygg5u8nrg735xcu5ezezv'
  }
];

const eaiPercentageResponse = [
  {
    eaiPercentage: null,
    address: 'tnai01puxki6s4zqyy7ebizgcviw2ui9z9x98pmah5n3ynmz'
  },
  {
    eaiPercentage: 14,
    address: 'tnar02wz3yxxyk7fdgiu2irmvatygg5u8nrg735xcu5ezezv'
  },
  {
    eaiPercentage: 20,
    address: 'tnai03puxki6s4zqyy7ebizgcviw2ui9z9x98pmah5n3ynmz'
  },
  {
    eaiPercentage: 30,
    address: 'tnar04wz3yxxyk7fdgiu2irmvatygg5u8nrg735xcu5ezezv'
  },
  {
    eaiPercentage: null,
    address: 'tnai05puxki6s4zqyy7ebizgcviw2ui9z9x98pmah5n3ynmz'
  },
  {
    eaiPercentage: 14,
    address: 'tnar06wz3yxxyk7fdgiu2irmvatygg5u8nrg735xcu5ezezv'
  }
];

const testMarketPrice = {
  marketPrice: 16.34
};

const testUser = {
  userId: '7MP-4FV',
  addresses: [
    'tnai01puxki6s4zqyy7ebizgcviw2ui9z9x98pmah5n3ynmz',
    'tnar02wz3yxxyk7fdgiu2irmvatygg5u8nrg735xcu5ezezv',
    'tnai03puxki6s4zqyy7ebizgcviw2ui9z9x98pmah5n3ynmz',
    'tnar04wz3yxxyk7fdgiu2irmvatygg5u8nrg735xcu5ezezv',
    'tnai05puxki6s4zqyy7ebizgcviw2ui9z9x98pmah5n3ynmz',
    'tnar06wz3yxxyk7fdgiu2irmvatygg5u8nrg735xcu5ezezv'
  ],
  selectedNode: 'Storrow'
};

export default {
  testAddressData,
  testMarketPrice,
  testUser,
  eaiPercentageResponse
};
