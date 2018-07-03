import React from 'react';
import { StyleSheet } from 'react-native';
import SetupEAINode from '../SetupEAINode';

import renderer from 'react-test-renderer';

describe('testing SetupEAINode...', () => {
  beforeEach(() => {});
  it('renders correctly', () => {
    var styles = StyleSheet.create({
      wizardText: {
        color: '#ffffff',
        fontSize: 20
      }
    });

    const tree = renderer.create(<SetupEAINode parentStyles={styles} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
