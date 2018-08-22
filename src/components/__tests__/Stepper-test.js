import { mount } from 'enzyme';
import React from 'react';
import { StyleSheet } from 'react-native';
import Stepper from '../Stepper';

import renderer from 'react-test-renderer';

describe('testing Stepper...', () => {
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
    const tree = renderer.create(<Stepper parentStyles={styles} navigator={navigator} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
