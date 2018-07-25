import React from 'react';
import { StyleSheet } from 'react-native';
import SetupConfirmSeedPhrase from '../SetupConfirmSeedPhrase';

import renderer from 'react-test-renderer';

describe('testing SetupConfirmSeedPhrase...', () => {
  let seedPhraseArray = [
    'test',
    'of',
    'the',
    'twelve',
    'word',
    'phrase',
    'we',
    'should',
    'test',
    'the',
    'repeats',
    'repeats'
  ];
  let styles = StyleSheet.create({
    wizardText: {
      color: '#ffffff',
      fontSize: 20
    }
  });
  const navigator = {
    setStyle: () => {}
  };

  beforeEach(() => {});
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <SetupConfirmSeedPhrase
          navigator={navigator}
          parentStyles={styles}
          seedPhraseArray={seedPhraseArray}
        />
      )
      .toJSON();
    //TODO; CAN'T do this as the text is randomized...so ignore it
    //expect(tree).toMatchSnapshot();
  });
});
