import { mount } from 'enzyme';
import React from 'react';
import { StyleSheet } from 'react-native';
import Settings from '../Settings';
import { Provider } from 'react-redux';
import store from '../../reducers/index';
import renderer from 'react-test-renderer';

describe('testing Settings...', () => {
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
          <Settings parentStyles={styles} navigator={navigator} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
