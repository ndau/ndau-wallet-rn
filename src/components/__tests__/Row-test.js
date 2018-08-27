import { mount } from 'enzyme';
import React from 'react';
import { StyleSheet } from 'react-native';
import Row from '../Row';

import renderer from 'react-test-renderer';

describe('testing Row...', () => {
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
    const tree = renderer.create(<Row parentStyles={styles} navigator={navigator} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
