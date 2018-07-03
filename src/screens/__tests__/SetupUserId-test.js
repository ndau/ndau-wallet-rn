import React from 'react';
import { StyleSheet } from 'react-native';
import SetupUserId from '../SetupUserId';

import renderer from 'react-test-renderer';

describe('testing SetupUserId...', () => {
  beforeEach(() => {});
  it('renders correctly', () => {
    var styles = StyleSheet.create({
      wizardText: {
        color: '#ffffff',
        fontSize: 20
      }
    });

    const tree = renderer.create(<SetupUserId parentStyles={styles} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
