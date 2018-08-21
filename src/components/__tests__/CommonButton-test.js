import { mount } from 'enzyme';
import React from 'react';
import { StyleSheet } from 'react-native';
import CommonButton from '../CommonButton';

import renderer from 'react-test-renderer';

describe('testing CommonButton...', () => {
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
      .create(<CommonButton parentStyles={styles} navigator={navigator} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
