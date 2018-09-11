import { mount } from 'enzyme';
import React from 'react';
import { StyleSheet } from 'react-native';
import SetupEncryptionPassword from '../SetupEncryptionPassword';
import renderer from 'react-test-renderer';

describe('testing SetupEncryptionPassword...', () => {
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
      .create(<SetupEncryptionPassword navigator={navigator} parentStyles={styles} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('render parentStyles', () => {
    const wrapper = mount(<SetupEncryptionPassword navigator={navigator} parentStyles={styles} />);
    expect(wrapper.props('parentStyles')).toBeDefined();
  });

  it('throws an error if click without password', () => {
    const wrapper = mount(<SetupEncryptionPassword navigator={navigator} parentStyles={styles} />);
    const onlyButton = wrapper.find('Button').at(0);
    onlyButton.simulate('click');
    const alert = wrapper.find('Alert').at(0);
    expect(alert).toBeDefined();
  });

  it('throws an error if click without confirm password', () => {
    const wrapper = mount(<SetupEncryptionPassword navigator={navigator} parentStyles={styles} />);
    const onlyButton = wrapper.find('Button').at(0);

    wrapper.find('TextInput').at(0).instance().value = 'foo';

    onlyButton.simulate('click');
    const alert = wrapper.find('Alert').at(0);
    expect(alert).toBeDefined();
  });

  it('you can proceed after both have been populated', () => {
    const wrapper = mount(<SetupEncryptionPassword navigator={navigator} parentStyles={styles} />);
    const onlyButton = wrapper.find('Button').at(0);

    wrapper.find('TextInput').at(0).instance().value = 'foo';
    wrapper.find('TextInput').at(1).instance().value = 'foo';
    wrapper.find('CheckBox').at(0).instance().value = true;

    onlyButton.simulate('click');
    const alert = wrapper.find('Alert').at(0);
    expect(alert);
  });
});
