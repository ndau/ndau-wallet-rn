import React from 'react';
import { StyleSheet } from 'react-native';
import SetupTermsOfService from '../SetupTermsOfService';

import renderer from 'react-test-renderer';

describe('testing SetupTermsOfService...', () => {
  beforeEach(() => {});
  it('renders correctly', () => {
    var styles = StyleSheet.create({
      wizardText: {
        color: '#ffffff',
        fontSize: 20
      }
    });

    const tree = renderer.create(<SetupTermsOfService parentStyles={styles} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
