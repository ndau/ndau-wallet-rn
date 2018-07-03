import React from 'react';
import { StyleSheet } from 'react-native';
import SetupEncryptionPassword from '../SetupEncryptionPassword';

import renderer from 'react-test-renderer';

describe('testing SetupEncryptionPassword...', () => {
  var styles = StyleSheet.create({
    wizardText: {
      color: '#ffffff',
      fontSize: 20
    }
  });

  beforeEach(() => {});
  it('renders correctly', () => {
    const tree = renderer.create(<SetupEncryptionPassword parentStyles={styles} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('render parentStyles', () => {
    const wrapper = shallow(<SetupEncryptionPassword parentStyles={styles} />);
    const render = wrapper.dive();
    render.find('Button').forEach((child) => {
      child.simulate('onPress');
    });
  });
});
