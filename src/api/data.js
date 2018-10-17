const testAddressData = {
  addressData: [
    {
      balance: 42.23,
      transferKeys: null,
      rewardsTarget: null,
      incomingRewardsFrom: 'ndadyjb9q8q2kjchcmbcpn7bj6gigkdqbqu542dmhz7antp2',
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
      address: 'ndabherxgf9a6curi3wyf69932pm3ngqpshvqgmdfjvh8ura'
    },
    {
      balance: 200.2,
      transferKeys: null,
      rewardsTarget: 'ndabherxgf9a6curi3wyf69932pm3ngqpshvqgmdfjvh8ura',
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
      address: 'ndadyjb9q8q2kjchcmbcpn7bj6gigkdqbqu542dmhz7antp2'
    },
    {
      balance: 400.54,
      transferKeys: null,
      rewardsTarget: null,
      incomingRewardsFrom: 'ndacvk992umgjgunwq8acbfwty7pwsn4t6wjww95j5e2v69d',
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
      address: 'ndaefksscncavwk94demkpwd686hc9xnzdivussx7kapsajt'
    },
    {
      balance: 76.03,
      transferKeys: null,
      rewardsTarget: 'ndaefksscncavwk94demkpwd686hc9xnzdivussx7kapsajt',
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
      address: 'ndacvk992umgjgunwq8acbfwty7pwsn4t6wjww95j5e2v69d'
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
      address: 'ndaqd4vth8e23y7bh5u2t65hcn63yh3y6m6ctjetge3f4w3y'
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
      address: 'ndae8539xtuvay5g59mkbg7hz3mucs54ji2iw8srj3zmz6s5'
    },
    {
      balance: 515.0,
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
      address: 'ndabq3f66u269y6esrz3anwyds4qrtbv5ukpw8m7x695fkqn'
    }
  ]
};

const eaiPercentageRequest = [
  {
    lock: null,
    weightedAverageAge: 0,
    address: 'ndabherxgf9a6curi3wyf69932pm3ngqpshvqgmdfjvh8ura'
  },
  {
    lock: {
      noticePeriod: 2592000000000,
      unlocksOn: null
    },
    weightedAverageAge: 0,
    address: 'ndadyjb9q8q2kjchcmbcpn7bj6gigkdqbqu542dmhz7antp2'
  },
  {
    lock: {
      noticePeriod: null,
      unlocksOn: 1585886400000
    },
    weightedAverageAge: 0,
    address: 'ndaefksscncavwk94demkpwd686hc9xnzdivussx7kapsajt'
  },
  {
    lock: {
      noticePeriod: null,
      unlocksOn: 1585886400000
    },
    weightedAverageAge: 0,
    address: 'ndacvk992umgjgunwq8acbfwty7pwsn4t6wjww95j5e2v69d'
  },
  {
    lock: null,
    weightedAverageAge: 0,
    address: 'ndaqd4vth8e23y7bh5u2t65hcn63yh3y6m6ctjetge3f4w3y'
  },
  {
    lock: {
      noticePeriod: 7776000000000,
      unlocksOn: null
    },
    weightedAverageAge: 0,
    address: 'ndae8539xtuvay5g59mkbg7hz3mucs54ji2iw8srj3zmz6s5'
  }
];

const eaiPercentageResponse = [
  {
    eaiPercentage: null,
    address: 'ndabherxgf9a6curi3wyf69932pm3ngqpshvqgmdfjvh8ura'
  },
  {
    eaiPercentage: 14,
    address: 'ndadyjb9q8q2kjchcmbcpn7bj6gigkdqbqu542dmhz7antp2'
  },
  {
    eaiPercentage: 20,
    address: 'ndaefksscncavwk94demkpwd686hc9xnzdivussx7kapsajt'
  },
  {
    eaiPercentage: 30,
    address: 'ndacvk992umgjgunwq8acbfwty7pwsn4t6wjww95j5e2v69d'
  },
  {
    eaiPercentage: null,
    address: 'ndaqd4vth8e23y7bh5u2t65hcn63yh3y6m6ctjetge3f4w3y'
  },
  {
    eaiPercentage: 14,
    address: 'ndae8539xtuvay5g59mkbg7hz3mucs54ji2iw8srj3zmz6s5'
  }
];

const testMarketPrice = {
  marketPrice: 16.34
};

const testUser = {
  userId: '7MP-4FV',
  addresses: [
    'ndabherxgf9a6curi3wyf69932pm3ngqpshvqgmdfjvh8ura',
    'ndadyjb9q8q2kjchcmbcpn7bj6gigkdqbqu542dmhz7antp2',
    'ndaefksscncavwk94demkpwd686hc9xnzdivussx7kapsajt',
    'ndacvk992umgjgunwq8acbfwty7pwsn4t6wjww95j5e2v69d',
    'ndaqd4vth8e23y7bh5u2t65hcn63yh3y6m6ctjetge3f4w3y',
    'ndae8539xtuvay5g59mkbg7hz3mucs54ji2iw8srj3zmz6s5'
  ],
  selectedNode: 'Storrow'
};

const nodeStatus = {
  node_info: {
    id: '',
    listen_addr: '',
    network: 'ndau mainnet',
    version: '',
    channels: '',
    moniker: '',
    other: null
  },
  sync_info: {
    latest_block_hash: '',
    latest_app_hash: '',
    latest_block_height: 0,
    latest_block_time: '0001-01-01T00:00:00Z',
    catching_up: false
  },
  validator_info: {
    address: '',
    pub_key: null,
    voting_power: 0
  }
};

export default {
  testAddressData,
  testMarketPrice,
  testUser,
  eaiPercentageResponse,
  nodeStatus
};
