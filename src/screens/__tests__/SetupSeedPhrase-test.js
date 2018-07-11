import React from 'react';
import { StyleSheet } from 'react-native';
import SetupSeedPhrase from '../SetupSeedPhrase';

import renderer from 'react-test-renderer';

describe('testing SetupSeedPhrase...', () => {
  beforeEach(() => {});
  it('renders correctly', () => {
    var styles = StyleSheet.create({
      wizardText: {
        color: '#ffffff',
        fontSize: 20
      }
    });
    const tree = renderer.create(<SetupSeedPhrase parentStyles={styles} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
