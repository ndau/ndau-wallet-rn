import { mount } from 'enzyme';
import React from 'react';
import { StyleSheet } from 'react-native';
import LockModalDialog from '../LockModalDialog';

import renderer from 'react-test-renderer';

describe('testing LockModalDialog...', () => {
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
      .create(<LockModalDialog parentStyles={styles} navigator={navigator} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
