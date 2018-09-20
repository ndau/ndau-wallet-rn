import { mount } from 'enzyme';
import React from 'react';
import { StyleSheet } from 'react-native';
import CollapsiblePanel from '../CollapsiblePanel';

import renderer from 'react-test-renderer';

describe('testing CollapsiblePanel...', () => {
  let styles = StyleSheet.create({
    wizardText: {
      color: '#ffffff',
      fontSize: 20
    }
  });
  const navigation = {
    navigate: () => {}
  };
  const account = {
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
  };

  it('renders correctly', () => {
    const tree = renderer
      .create(<CollapsiblePanel parentStyles={styles} navigation={navigation} account={account} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
