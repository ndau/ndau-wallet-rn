import React from 'react';
import { StyleSheet } from 'react-native';
import SetupEAINode from '../SetupEAINode';

import renderer from 'react-test-renderer';

describe('testing SetupEAINode...', () => {
  let seedPhraseArray = [
    'goat',
    'amount',
    'liar',
    'amount',
    'expire',
    'adjust',
    'cage',
    'candy',
    'arch',
    'gather',
    'drum',
    'buyer'
  ];
  let styles = StyleSheet.create({
    wizardText: {
      color: '#ffffff',
      fontSize: 20
    }
  });

  beforeEach(() => {});

  it('renders correctly', () => {
    const tree = renderer.create(<SetupEAINode parentStyles={styles} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
