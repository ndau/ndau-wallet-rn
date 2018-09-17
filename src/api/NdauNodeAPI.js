import NodeAddressHelper from '../helpers/NodeAddressHelper';

const getAddressData = (user) => {
  //TODO: this is TEMP code
  if (__DEV__) {
    return {
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
    };
  }

  const accountAPI = NodeAddressHelper.getAccountAPIAddress(user);
  console.log(`Sending ${JSON.stringify(user.addresses, null, 2)} to ${accountAPI}`);
  return fetch(accountAPI, {
    method: 'POST',
    headers: {
      // Authentication: `qr-token ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      addresses: user.addresses
    })
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.info(`getAddressData responseJson ${JSON.stringify(responseJson, null, 2)}`);
      return responseJson;
    });
};

export default {
  getAddressData
};
