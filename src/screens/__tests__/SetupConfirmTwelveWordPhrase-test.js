import React from 'react';
import { StyleSheet } from 'react-native';
import SetupConfirmTwelveWordPhrase from '../SetupConfirmTwelveWordPhrase';

import renderer from 'react-test-renderer';

describe('testing SetupConfirmTwelveWordPhrase...', () => {
  let twelveWordPhraseArray = [
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
      .create(
        <SetupConfirmTwelveWordPhrase
          parentStyles={styles}
          twelveWordPhraseArray={twelveWordPhraseArray}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
