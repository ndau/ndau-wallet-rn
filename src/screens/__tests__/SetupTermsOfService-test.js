import React from 'react';
import { StyleSheet } from 'react-native';
import SetupTermsOfService from '../SetupTermsOfService';
import renderer from 'react-test-renderer';

describe('testing SetupTermsOfService...', () => {
  it('renders correctly', () => {
    let styles = StyleSheet.create({
      wizardText: {
        color: '#ffffff',
        fontSize: 20
      }
    });
    const navigator = {
      setStyle: () => {},
      toggleNavBar: () => {}
    };

    const tree = renderer
      .create(<SetupTermsOfService navigator={navigator} parentStyles={styles} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
