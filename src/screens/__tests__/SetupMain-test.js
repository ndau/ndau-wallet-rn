import React from 'react';
import { StyleSheet } from 'react-native';
import SetupMain from '../SetupMain';

import renderer from 'react-test-renderer';

describe('testing SetupMain...', () => {
  beforeEach(() => {});
  it('renders correctly', () => {
    var styles = StyleSheet.create({
      wizardText: {
        color: '#ffffff',
        fontSize: 20
      }
    });

    const tree = renderer.create(<SetupMain parentStyles={styles} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
