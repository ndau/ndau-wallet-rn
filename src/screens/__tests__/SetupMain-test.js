import { mount } from 'enzyme';
import React from 'react';
import { StyleSheet } from 'react-native';
import SetupMain from '../SetupMain';

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
      .create(<SetupMain parentStyles={styles} navigator={navigator} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('can click the button', () => {
    const wrapper = mount(<SetupMain navigator={navigator} parentStyles={styles} />);
    const onlyButton = wrapper.find('Button').at(0);
    onlyButton.simulate('click');
  });
});
