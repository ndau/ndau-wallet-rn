import { mount } from 'enzyme';
import React from 'react';
import { StyleSheet } from 'react-native';
import Dashboard from '../Dashboard';
import renderer from 'react-test-renderer';

describe('testing Dashboard...', () => {
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

  it('renders correctly', () => {
    const tree = renderer
      .create(<Dashboard parentStyles={styles} navigator={navigator} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
