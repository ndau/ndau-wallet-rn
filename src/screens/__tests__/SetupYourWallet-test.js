import React from 'react';
import { StyleSheet } from 'react-native';
import SetupYourWallet from '../SetupYourWallet';
import { Provider } from 'react-redux';
import store from '../../reducers/index';
import renderer from 'react-test-renderer';

describe('testing SetupYourWallet...', () => {
  it('renders correctly', () => {
    var styles = StyleSheet.create({
      wizardText: {
        color: '#ffffff',
        fontSize: 20
      }
    });
    const navigator = {
      setStyle: () => {},
      toggleNavBar: () => {}
    };

    const tree = renderer
      .create(
        <Provider store={store}>
          <SetupYourWallet navigator={navigator} parentStyles={styles} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
