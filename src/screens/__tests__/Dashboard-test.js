import React from 'react';
import { StyleSheet } from 'react-native';
import Dashboard from '../Dashboard';
import renderer from 'react-test-renderer';
import { getTodaysDate } from '../../helpers/DateHelper';

jest.mock('../../helpers/DateHelper', () => ({
  getTodaysDate: jest.fn()
}));

describe('testing Dashboard...', () => {
  getTodaysDate.mockImplementation(() => {
    return '09/27/2018';
  });
  let styles = StyleSheet.create({
    wizardText: {
      color: '#ffffff',
      fontSize: 20
    }
  });
  const navigation = {
    getParam: () => {
      return {
        userId: '7MP-4FV',
        addresses: [
          'tnai24puxki6s4zqyy7ebizgcviw2ui9z9x98pmah5n3ynmz',
          'tnarpmwz3yxxyk7fdgiu2irmvatygg5u8nrg735xcu5ezezv'
        ],
        selectedNode: 'Storrow',
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
            SettlementSettings: {
              Period: 0,
              ChangesAt: null,
              Next: null
            },
            ValidationScript: null
          }
        ]
      };
    }
  };

  it('renders correctly', () => {
    const tree = renderer
      .create(<Dashboard parentStyles={styles} navigation={navigation} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
