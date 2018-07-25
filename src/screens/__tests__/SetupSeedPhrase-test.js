import React from 'react';
import { StyleSheet, NativeModules } from 'react-native';
import SetupSeedPhrase from '../SetupSeedPhrase';
import { shallow } from 'enzyme';
import sinon from 'sinon';

jest.mock('NativeModules', () => {
  return {
    KeyaddrManager: {
      KeyaddrWordsFromBytes: jest.fn()
    },
    KeyboardObserver: {}
  };
});

describe('testing SetupSeedPhrase...', () => {
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

  const wrapper = shallow(<SetupSeedPhrase navigator={navigator} parentStyles={styles} />);
  const render = wrapper.dive();

  it('renders correctly', () => {
    expect(render).toMatchSnapshot();
  });

  const KeyaddrWordsFromBytes = sinon.spy(NativeModules.KeyaddrManager, 'KeyaddrWordsFromBytes');

  it('calls KeyaddrWordsFromBytes as expected', () => {
    const wrapper = shallow(<SetupSeedPhrase navigator={navigator} parentStyles={styles} />);
    wrapper.dive();
    expect(KeyaddrWordsFromBytes.calledOnce).toBe(true);
  });
});
