import { mount } from 'enzyme';
import React from 'react';
import { StyleSheet } from 'react-native';
import Settings from '../Settings';

import renderer from 'react-test-renderer';

describe('testing Settings...', () => {
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
    const tree = renderer.create(<Settings parentStyles={styles} navigator={navigator} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
