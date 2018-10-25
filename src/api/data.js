const testAddressData = {
  addressData: [
    {
      balance: 42.23,
      validationKeys: null,
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
      validationKeys: null,
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
      validationKeys: null,
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
      validationKeys: null,
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
      validationKeys: null,
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
      validationKeys: null,
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
      validationKeys: null,
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
      accountCreationKey: 'e58b438d',
      accounts: {
        ndabherxgf9a6curi3wyf69932pm3ngqpshvqgmdfjvh8ura: {
          address: 'ndabherxgf9a6curi3wyf69932pm3ngqpshvqgmdfjvh8ura',
          addressData: {
            nickname: 'Account 1'
          },
          ownershipKey: 'b32d1dfb',
          validationKeys: []
        },
        ndadyjb9q8q2kjchcmbcpn7bj6gigkdqbqu542dmhz7antp2: {
          address: 'ndadyjb9q8q2kjchcmbcpn7bj6gigkdqbqu542dmhz7antp2',
          addressData: {
            nickname: 'Account 2'
          },
          ownershipKey: 'e54b7ece',
          validationKeys: []
        },
        ndaefksscncavwk94demkpwd686hc9xnzdivussx7kapsajt: {
          address: 'ndaefksscncavwk94demkpwd686hc9xnzdivussx7kapsajt',
          addressData: {
            nickname: 'Account 3'
          },
          ownershipKey: '3fcd79f1',
          validationKeys: []
        },
        ndacvk992umgjgunwq8acbfwty7pwsn4t6wjww95j5e2v69d: {
          address: 'ndacvk992umgjgunwq8acbfwty7pwsn4t6wjww95j5e2v69d',
          addressData: {
            nickname: 'Account 4'
          },
          ownershipKey: '2d4a67b0',
          validationKeys: []
        },
        ndaqd4vth8e23y7bh5u2t65hcn63yh3y6m6ctjetge3f4w3y: {
          address: 'ndaqd4vth8e23y7bh5u2t65hcn63yh3y6m6ctjetge3f4w3y',
          addressData: {
            nickname: 'Account 5'
          },
          ownershipKey: '3a7d2974',
          validationKeys: []
        },
        ndae8539xtuvay5g59mkbg7hz3mucs54ji2iw8srj3zmz6s5: {
          address: 'ndae8539xtuvay5g59mkbg7hz3mucs54ji2iw8srj3zmz6s5',
          addressData: {
            nickname: 'Account 6'
          },
          ownershipKey: '84f010f1',
          validationKeys: []
        },
        ndabq3f66u269y6esrz3anwyds4qrtbv5ukpw8m7x695fkqn: {
          address: 'ndabq3f66u269y6esrz3anwyds4qrtbv5ukpw8m7x695fkqn',
          addressData: {
            nickname: 'Account 7'
          },
          ownershipKey: '7bc381ff',
          validationKeys: []
        }
      },
      keys: {
        e58b438d: {
          publicKey: '',
          privateKey:
            'npvta8jaftcjed7stf8bkz3nnipyqahdau5vexjr52ez4wvcuusgimc7fjac52pbwa4fdissaaaanv2qizmsubdetvqmqys8fwvj4pw2b9vg9jire7cd3xm9cg74sc75yu44tbkhh23s',
          path: "/44'/20036'/100",
          derivedFromRoot: 'yes'
        },
        b32d1dfb: {
          publicKey:
            'npuba4jaftckeeb8m2xih7dbwsqndrt2hzz6k6xxvn3k48kss87uwuta2rbaj2dz7tie4nw4waaaaaahwni9kfku8detab44b4mqenf3qx4skffjxzfmgev5pipapeiaeqqbqsvdzkit',
          privateKey:
            'npvta8jaftcjed2vzrknnzf8fj83q6bsfqnf72q7pr4b4evxzgfgn24tznve5gcfkbgvfgxaaaaaab7dch4tkwzs3eiaqysqu5tdbqmxqwctjkpp3k3te85kdidjcabdu6fkrqkq356k',
          path: "/44'/20036'/100/0",
          derivedFromRoot: 'yes'
        },
        e54b7ece: {
          publicKey:
            'npuba4jaftckeebbfznxrdsdk893xn64axz3fv5ayg8ygip6grpgeudqkfyij9kjbm2e4nw4waaaaaa6pmfcm6tvpiar9xgi3udqbbarv2g7i5dei6rj5ppw76zdjkyf5bqigdtzb36x',
          privateKey:
            'npvta8jaftcjeai6tm5yy3j4ruh6tc9c2qgyt8jhijns3j9ib8i5jdhfvcpkj52tgbgvfgxaaaaaahdk3iu9en5kad97jugns5siid68bzkg23chd4q5mphrf24kxtq2mwu775a2cky7',
          path: "/44'/20036'/100/1",
          derivedFromRoot: 'yes'
        },
        '3fcd79f1': {
          publicKey:
            'npuba4jaftckeebsfgvpt2agx6pf7i5k233d4bcetgpx9vfp9wcp7pwkbtzufqu4ktse4nw4waaaaabf92p46hd6zi322kjg7f46vfdi4xs5agy3nn24b386mwprk9hjzgx8yckunvtz',
          privateKey:
            'npvta8jaftcjec3htae7jzmrbbrtxyw5e8nmg3yuahca77rqm2y2cyzw4nuevcbeabgvfgxaaaaaajr8dqzb29f4gqgcujzjqze3i4gxng2bxymdggsqrzc7dm4z34p3x7igz6vthnjt',
          path: "/44'/20036'/100/2",
          derivedFromRoot: 'yes'
        },
        '2d4a67b0': {
          publicKey:
            'npuba4jaftckeeb5w22tqagu2cx336uh43w22y3na8ztf24367div8u84zd29xpbf22e4nw4waaaaabuqsax6t9yj9nb9phjjjjurtg3yk8wbie5q6hcj72dq7xxdffd2jr2cdgxti9h',
          privateKey:
            'npvta8jaftcjea6ks77rbjv8zgtwyjqnbyckgmp49crrwks2mspepfhjcwwa5a3csbgvfgxaaaaaanvwafrer7ur5ar5j4kkknv6jypuzxakbg5zb2urqa5zppi3ji8cmm6c4ivbhmnc',
          path: "/44'/20036'/100/3",
          derivedFromRoot: 'yes'
        },
        '3a7d2974': {
          publicKey:
            'npuba4jaftckeebjixrgdscppt7n4x672zshxgz28x8zqxetrmeh4gknysgg6umwfg2e4nw4waaaaacgpdrebq9f68njadaf379r42vyrsdigieaw77554qz8b4xbnner6x7zg259mdz',
          privateKey:
            'npvta8jaftcjedv4znk8s5egwmmcc2tcyhi8uiqjqaip5zvxurj7skjrixt7gyr6ubgvfgxaaaaaatvi53amz3rhvcia2bqrr58ye7v6a4bubafhrq88vx9sqximdbd9fh8mnhrker2m',
          path: "/44'/20036'/100/4",
          derivedFromRoot: 'yes'
        },
        '84f010f1': {
          publicKey:
            'npuba4jaftckeebj42zrwgkib944y62gm3qxw9pru2gi46fg7d7iebssysx8ppfdujie4nw4waaaaac4jvnbjc8sisi234mrsfr5ztdsv87gcduwz8ustszgy33urys2s3e4c83eiqyk',
          privateKey:
            'npvta8jaftcjeburqvbt33rse4gjrcep2sgwb5uex9gqbc6v59wyz8se8n3ix668sbgvfgxaaaaaayun5akizwcecggqu56bm876i6e9zjss6xf9wwenf3xyqnv7wgegjqyk56z3ii33',
          path: "/44'/20036'/100/5",
          derivedFromRoot: 'yes'
        },
        '7bc381ff': {
          publicKey:
            'npuba4jaftckeeb487azwikysx3dg3gmzp2ai64jfkb95mncqt3ny7eg93ziv2wkbf2e4nw4waaaaadd8rtspfv6wyifrp8ibpf8tu5j57p6rkggg8rsc9zfripujnbmyaiq4htq9jz8',
          privateKey:
            'npvta8jaftcjeb2vezpkjfv9g82qpqwu5r7g57cb6ws2udp74xpcgb752kgq88ncibgvfgxaaaaaa29v6ndjn9ffubm5ruamjrwny4q9mrd4tttzv6az73m4dnumak7sdxgkkuyxzbm6',
          path: "/44'/20036'/100/6",
          derivedFromRoot: 'yes'
        }
      },
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
