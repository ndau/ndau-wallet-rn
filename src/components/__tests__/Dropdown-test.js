import { mount } from 'enzyme';
import React from 'react';
import { StyleSheet } from 'react-native';
import Dropdown from '../Dropdown';

import renderer from 'react-test-renderer';

describe('testing Dropdown...', () => {
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
    const tree = renderer.create(<Dropdown parentStyles={styles} navigator={navigator} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
