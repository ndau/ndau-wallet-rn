import { mount } from 'enzyme';
import React from 'react';
import { StyleSheet } from 'react-native';
import SetupMain from '../SetupMain';
import { Provider } from 'react-redux';
import store from '../../reducers/index';

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
      .create(
        <Provider store={store}>
          <SetupMain parentStyles={styles} navigator={navigator} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('can click the button', () => {
    const wrapper = mount(
      <Provider store={store}>
        <SetupMain navigator={navigator} parentStyles={styles} />
      </Provider>
    );
    const onlyButton = wrapper.find('Button').at(0);
    onlyButton.simulate('click');
  });
});
