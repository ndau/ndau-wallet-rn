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
  wallets: {
    '7MP-4FV': {
      walletId: '7MP-4FV',
      accountCreationKey:
        'npvta8jaftcjec4q2p9dj7kcc5vw6xvnw36z438unqqfm3uhjaim2un9xpkvikppsa8bueaaaaaantceu3mfgqgz43swucmnkvsqpt7ndf88xftin3fhyefe3uzp3fqdbirtp6qqi5hg',
      accounts: [
        {
          address: 'ndabherxgf9a6curi3wyf69932pm3ngqpshvqgmdfjvh8ura',
          addressData: {
            nickname: 'Account 1'
          },
          ownershipKey: 'd25e4f17',
          transferKeys: [ '285cff41', '7eeff2f0' ]
        },
        {
          address: 'ndadyjb9q8q2kjchcmbcpn7bj6gigkdqbqu542dmhz7antp2',
          addressData: {
            nickname: 'Account 2'
          },
          ownershipKey: 'd25e4f17',
          transferKeys: [ '29992070', 'c1287590' ]
        },
        {
          address: 'ndaefksscncavwk94demkpwd686hc9xnzdivussx7kapsajt',
          addressData: {
            nickname: 'Account 3'
          },
          ownershipKey: 'd25e4f17',
          transferKeys: [ '285cff41', '7eeff2f0' ]
        },
        {
          address: 'ndacvk992umgjgunwq8acbfwty7pwsn4t6wjww95j5e2v69d',
          addressData: {
            nickname: 'Account 4'
          },
          ownershipKey: 'd25e4f17',
          transferKeys: [ 'f7754634', '12a2af8e' ]
        },
        {
          address: 'ndaqd4vth8e23y7bh5u2t65hcn63yh3y6m6ctjetge3f4w3y',
          addressData: {
            nickname: 'Account 5'
          },
          ownershipKey: 'd25e4f17',
          transferKeys: [ '2772bc1b', '5e7ee872' ]
        },
        {
          address: 'ndae8539xtuvay5g59mkbg7hz3mucs54ji2iw8srj3zmz6s5',
          addressData: {
            nickname: 'Account 6'
          },
          ownershipKey: 'd25e4f17',
          transferKeys: [ 'a20f97e8', '6f516e76' ]
        },
        {
          address: 'ndabq3f66u269y6esrz3anwyds4qrtbv5ukpw8m7x695fkqn',
          addressData: {
            nickname: 'Account 7'
          },
          ownershipKey: 'd25e4f17',
          transferKeys: [ '5c60d714', 'c3ee5cfa' ]
        }
      ],
      keys: {
        '29992070': {
          key:
            'npvta8jaftcjedsf8h89ynw9pmvx7c2mkenw6q3khy693tii6v8jpsgazhkakcyqsbbbimqaaaaaacvdyb4kq6d3gmmfpx4tedux59gjdfkgree898zjp2tengq4ed555ggn7atsabyc',
          path: "/44'/20036'/100/0",
          derivedFromRoot: 'yes'
        },
        d25e4f17: {
          key:
            'npvta8jaftcjec4q2p9dj7kcc5vw6xvnw36z438unqqfm3uhjaim2un9xpkvikppsa8bueaaaaaantceu3mfgqgz43swucmnkvsqpt7ndf88xftin3fhyefe3uzp3fqdbirtp6qqi5hg',
          path: "/44'/20036'/100",
          derivedFromRoot: 'yes'
        },
        '285cff41': {
          key:
            'npvta8jaftcjeaie5h9pp5iyhh3ahubb2ejv52wsc3ypyn2g2hxstp7afjahv87q4bbbimqaaaaaahmq4exepcvjn5rfvefsbshvi8ts2ceupgp6scx79u7utaisacq4t978tbtne4ge',
          path: "/44'/20036'/100/1",
          derivedFromRoot: 'yes'
        },
        '7eeff2f0': {
          key:
            'npuba4jaftckeebpkju3p5pahuyyw5tyyud8kt7sdfd64i9fk7a4z7baj22q2f38giaeefbp2aaaaaa7p5iuwtwkpfvp6ynsyaga8pd4gdaiujw3zuakzz8mykebcaaj5khavhfzvwuz',
          path: "/44'/20036'/100/1",
          derivedFromRoot: 'yes'
        },
        c1287590: {
          key:
            'npuba4jaftckeebxrndte6qsi7rz5ki5zjnybizh82ijcc73s3u2anq8mnjaz2qig9ieefbp2aaaaaaknq2hjj5sre3pnxyzkesqkzr63enxi36sv5947fzcets35isrrrp3irpbuuru',
          path: "/44'/20036'/100/0",
          derivedFromRoot: 'yes'
        },
        f7754634: {
          key:
            'npvta8jaftcjecibwh224yejn7eqww8dwkmsgihp6xxibdhb45k8n4gctv9mbpawkbbbimqaaaaaakxhnfz99m3v9qwzxc7282dwp34jx7nvy6zbb3rj9ihyj5wqkjj3m9qpb4a9mpx4',
          path: "/44'/20036'/100/2",
          derivedFromRoot: 'yes'
        },
        '12a2af8e': {
          key:
            'npuba4jaftckeebpippyb58npy5b3sxbnkdbr3afupdrgbkbgyrkrs8iijaehkfncbseefbp2aaaaabkw7sy997rgr74u8wmzd5aqtzhjgzxuq5u6ehf7h7a83hqt3jfhfr8hyc6qstg',
          path: "/44'/20036'/100/2",
          derivedFromRoot: 'yes'
        },
        '2772bc1b': {
          key:
            'npvta8jaftcjeay4ru5h4ceqsxiadz9eswrtcbbp4wj57jne6fw84v7b4mhgrmq9kbbbimqaaaaaari9vt5fjptqtns4jyewn5w4rva2yue3htfkqk82zr48gbi57hvhxa8999iqusnv',
          path: "/44'/20036'/100/3",
          derivedFromRoot: 'yes'
        },
        '5e7ee872': {
          key:
            'npuba4jaftckeebmikjfjx5ucjzkqi7gee8ch8gj4avip6i4ug8bngvqfpbzuwb84k2eefbp2aaaaab7d8qhnxfyf4fudjg2utvqvj8ndc4ive8exj3m5c79m22fdrw8n8yfmnmx6k4z',
          path: "/44'/20036'/100/3",
          derivedFromRoot: 'yes'
        },
        a20f97e8: {
          key:
            'npvta8jaftcjeb8j4i5359tmq9m8de2wfui5ts5afjgpqbkn9ficeh379ete4a5iqbbbimqaaaaaavdvvc3u2qvy7ujstdddnba2aypycwmjwt8wrwhcf7jekxcik8948d9jrffgehd9',
          path: "/44'/20036'/100/4",
          derivedFromRoot: 'yes'
        },
        '6f516e76': {
          key:
            'npuba4jaftckeebvgq2k5ryyhtp9grdkssgdhvbsdcc5fpzpvtwf5mgc4dz69kxnatieefbp2aaaaacnqqnmgmb4q5yjgcennpsedac3y2ktpguh4t8s6izxetkwjbm59m3i25dpmhud',
          path: "/44'/20036'/100/4",
          derivedFromRoot: 'yes'
        },
        '5c60d714': {
          key:
            'npvta8jaftcjed9a6kv6t29z7xq5mqcask9jh9dfsbqwxxtkkjxna8b9d87jhn8sabbbimqaaaaaaz4na9w67sn7xekd6mp8a68t8ir7ebwy4kmswd4efth6bpt26eyk4ctiygf3k2zg',
          path: "/44'/20036'/100/5",
          derivedFromRoot: 'yes'
        },
        c3ee5cfa: {
          key:
            'npuba4jaftckeebyqyn8av45n656a2arebynzwts9bedkxzzpxwhi9acqpfyczubnbseefbp2aaaaac9jsd8vvybvywtirtpz2dv4h3b9wsgu5jjqcsrisye9sfyhdsu3mmnm4ib9bxx',
          path: "/44'/20036'/100/5",
          derivedFromRoot: 'yes'
        }
      },
      addresses: [],
      marketPrice: 16.34
    }
  }
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
