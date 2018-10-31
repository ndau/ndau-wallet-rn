import { mount } from 'enzyme';
import React from 'react';
import { StyleSheet } from 'react-native';
import RecoveryDropdown from '../RecoveryDropdown';

import renderer from 'react-test-renderer';

describe('testing RecoveryDropdown...', () => {
  let styles = StyleSheet.create({
    wizardText: {
      color: '#ffffff',
      fontSize: 20
    }
  });
  const navigator = {
    setStyle: () => {}
  };

  it('renders correctly', () => {
    const tree = renderer
      .create(<RecoveryDropdown recoveryPhrase={''} parentStyles={styles} navigator={navigator} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
