import React from 'react';
import { StyleSheet } from 'react-native';
import SetupGetRandom from '../SetupGetRandom';

import renderer from 'react-test-renderer';

describe('testing SetupGetRandom...', () => {
  beforeEach(() => {});
  it('renders correctly', () => {
    var styles = StyleSheet.create({
      wizardText: {
        color: '#ffffff',
        fontSize: 20
      }
    });

    const tree = renderer.create(<SetupGetRandom parentStyles={styles} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
