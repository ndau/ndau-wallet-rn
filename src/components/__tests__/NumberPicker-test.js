import { mount } from 'enzyme';
import React from 'react';
import { StyleSheet } from 'react-native';
import NumberPicker from '../NumberPicker';

import renderer from 'react-test-renderer';

describe('testing NumberPicker...', () => {
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
      .create(<NumberPicker parentStyles={styles} navigator={navigator} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
