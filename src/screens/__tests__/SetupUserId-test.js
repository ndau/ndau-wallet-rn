import { mount } from 'enzyme';
import React from 'react';
import { StyleSheet } from 'react-native';
import SetupUserId from '../SetupUserId';

import renderer from 'react-test-renderer';

describe('testing SetupUserId...', () => {
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
      .create(<SetupUserId navigator={navigator} parentStyles={styles} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('throws an error if click without userId', () => {
    const wrapper = mount(<SetupUserId navigator={navigator} parentStyles={styles} />);
    const onlyButton = wrapper.find('Button').at(0);
    onlyButton.simulate('click');
    const alert = wrapper.find('Alert').at(0);
    expect(alert).toBeDefined();
  });

  it('throws an error if click without userId', () => {
    const wrapper = mount(<SetupUserId navigator={navigator} parentStyles={styles} />);
    const onlyButton = wrapper.find('Button').at(0);
    onlyButton.simulate('click');
    const alert = wrapper.find('Alert').at(0);
    expect(alert).toBeDefined();
  });

  it('does not throw an error if user enters text', () => {
    const wrapper = mount(<SetupUserId navigator={navigator} parentStyles={styles} />);
    const onlyButton = wrapper.find('Button').at(0);

    wrapper.find('TextInput').at(0).instance().value = 'foo';
    // expect(wrapper.state('userId')).toEqual('foo');

    onlyButton.simulate('click');
    const alert = wrapper.find('Alert').at(0);
    expect(alert);
  });
});
