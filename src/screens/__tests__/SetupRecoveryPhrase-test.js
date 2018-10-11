import React from 'react';
import { StyleSheet, NativeModules } from 'react-native';
import SetupRecoveryPhrase from '../SetupRecoveryPhrase';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import SetupStore from '../../model/SetupStore';
import AppConstants from '../../AppConstants';

const mockKeyaddr = () => {
  NativeModules.KeyaddrManager = {
    keyaddrWordsFromBytes: jest.fn((lng, ent) => {
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

const makeComponent = () => <SetupRecoveryPhrase navigator={navigator} parentStyles={styles} />;

describe('testing SetupRecoveryPhrase...', () => {
  it('renders correctly', () => {
    const tree = renderer.create(makeComponent()).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls keyaddrWordsFromBytes as expected', () => {
    mockKeyaddr();
    SetupStore.setEntropy('dGVzdGluZ3dlc3Rpbmdh');
    this.wrapper = mount(makeComponent());
    this.wrapper.update();
    expect(NativeModules.KeyaddrManager.keyaddrWordsFromBytes.mock.calls).toEqual([
      [ AppConstants.APP_LANGUAGE, 'dGVzdGluZ3dlc3Rpbmdh' ]
    ]);
  });
});
