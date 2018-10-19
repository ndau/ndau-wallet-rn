import { mount } from 'enzyme';
import React from 'react';
import { StyleSheet } from 'react-native';
import SetupWelcome from '../SetupWelcome';

import renderer from 'react-test-renderer';

describe('testing SetupMain...', () => {
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
      .create(<SetupWelcome parentStyles={styles} navigator={navigator} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('can click the button', () => {
    const wrapper = mount(<SetupWelcome navigator={navigator} parentStyles={styles} />);
    const onlyButton = wrapper.find('Button').at(0);
    onlyButton.simulate('click');
  });
});
