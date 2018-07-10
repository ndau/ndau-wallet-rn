import React from 'react';
import { StyleSheet } from 'react-native';
import SetupYourWallet from '../SetupYourWallet';

import renderer from 'react-test-renderer';

describe('testing SetupYourWallet...', () => {
  beforeEach(() => {});
  it('renders correctly', () => {
    var styles = StyleSheet.create({
      wizardText: {
        color: '#ffffff',
        fontSize: 20
      }
    });

    const tree = renderer.create(<SetupYourWallet parentStyles={styles} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
