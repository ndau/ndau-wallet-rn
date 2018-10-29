import { mount } from 'enzyme';
import React from 'react';
import { StyleSheet } from 'react-native';
import ModalDialog from '../ModalDialog';

import renderer from 'react-test-renderer';

describe('testing ModalDialog...', () => {
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
      .create(<ModalDialog parentStyles={styles} navigator={navigator} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
