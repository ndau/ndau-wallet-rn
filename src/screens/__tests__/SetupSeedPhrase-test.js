import React from 'react';
import { StyleSheet, NativeModules } from 'react-native';
import SetupSeedPhrase from '../SetupSeedPhrase';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import store from '../../reducers/index';

const mockKeyaddr = () => {
  NativeModules.KeyaddrManager = {
    KeyaddrWordsFromBytes: jest.fn((lng, ent) => {
      const lorem = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'.split(
        ' '
      );
      const Base64 = require('base-64');
      const data = Base64.decode(ent);
      // not a Serious Hash™
      let hash = data.split('').reduce((a, c, i) => {
        a += c.charCodeAt(0);
        return a;
      }, 1);
      const start = hash % lorem.length;
      return lorem.slice(start, start + Math.floor(data.length * 0.8));
    })
  };
};

const styles = StyleSheet.create({
  wizardText: {
    color: '#ffffff',
    fontSize: 20
  }
});

const navigator = {
  setStyle: () => {},
  toggleNavBar: () => {}
};

const makeComponent = () => (
  <Provider store={store}>
    <SetupSeedPhrase navigator={navigator} parentStyles={styles} entropy={'dGVzdGluZ3dlc3Rpbmdh'} />
  </Provider>
);

describe('testing SetupSeedPhrase...', () => {
  it('renders correctly', () => {
    const tree = renderer.create(makeComponent()).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls KeyaddrWordsFromBytes as expected', () => {
    mockKeyaddr();
    this.wrapper = mount(makeComponent());
    this.wrapper.update();
    expect(NativeModules.KeyaddrManager.KeyaddrWordsFromBytes.mock.calls).toEqual([
      [ 'en', 'dGVzdGluZ3dlc3Rpbmdh' ]
    ]);
  });
});
