import '../../../shim.js';
import React from 'react';
import { StyleSheet } from 'react-native';
// import SetupTwelveWordPhrase from '../SetupTwelveWordPhrase';

import renderer from 'react-test-renderer';

describe('testing SetupTwelveWordPhrase...', () => {
  beforeEach(() => {});
  //TODO: this is being commented out as we need to bring in
  //TODO: node primitive libraries for this to work. HOWEVER
  //TODO: the way we do 12 word is changing, so more to come
  it('renders correctly', () => {
    //   var styles = StyleSheet.create({
    //     wizardText: {
    //       color: '#ffffff',
    //       fontSize: 20
    //     }
    //   });
    //   const tree = renderer.create(<SetupTwelveWordPhrase parentStyles={styles} />).toJSON();
    //   expect(tree).toMatchSnapshot();
  });
});
