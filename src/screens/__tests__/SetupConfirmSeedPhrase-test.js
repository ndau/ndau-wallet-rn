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

  beforeEach(() => {});
  it('renders correctly', () => {
    var styles = StyleSheet.create({
      wizardText: {
        color: '#ffffff',
        fontSize: 20
      }
    });

    const tree = renderer
      .create(<SetupConfirmSeedPhrase parentStyles={styles} seedPhraseArray={seedPhraseArray} />)
      .toJSON();
    //TODO; CAN'T do this as the text is randomized...so ignore it
    //expect(tree).toMatchSnapshot();
  });
});
