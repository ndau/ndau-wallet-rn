import { shallow } from 'enzyme';
import React from 'react';
import { StyleSheet, NativeModules } from 'react-native';
import SetupEAINode from '../SetupEAINode';
import sinon from 'sinon';
import renderer from 'react-test-renderer';

jest.mock('NativeModules', () => {
  return {
    KeyaddrManager: {
      KeyaddrWordsToBytes: jest.fn(),
      CreatePublicAddress: jest.fn()
    },
    KeyboardObserver: {}
  };
});

describe('testing SetupEAINode...', () => {
  let seedPhraseArray = [
    'goat',
    'amount',
    'liar',
    'amount',
    'expire',
    'adjust',
    'cage',
    'candy',
    'arch',
    'gather',
    'drum',
    'buyer'
  ];
  let userId = 'TAC-3PY';
  let numberOfAccounts = 5;
  let styles = StyleSheet.create({
    wizardText: {
      color: '#ffffff',
      fontSize: 20
    }
  });
  const bytes = 'ZWEQAwQFBgcICQoLDA0ODw==';
  const KeyaddrWordsToBytes = sinon.spy(NativeModules.KeyaddrManager, 'KeyaddrWordsToBytes');
  KeyaddrWordsToBytes.mockReturnValue(bytes);
  const CreatePublicAddress = sinon.spy(NativeModules.KeyaddrManager, 'CreatePublicAddress');
  CreatePublicAddress.mockReturnValue([]);
  const navigator = {
    setStyle: () => {},
    toggleNavBar: () => {}
  };

  beforeAll(() => {
    this.oldRandom = global.Math.random;
    const mockMathRandom = Object.create(global.Math);
    mockMathRandom.random = () => 0.5;
    global.Math = mockMathRandom;
  });

  afterAll(() => {
    global.Math.random = this.oldRandom;
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <SetupEAINode
          parentStyles={styles}
          seedPhraseArray={seedPhraseArray}
          userId={userId}
          numberOfAccounts={numberOfAccounts}
          navigator={navigator}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('finishes setup successfully', async () => {
    const wrapper = shallow(
      <SetupEAINode
        parentStyles={styles}
        seedPhraseArray={seedPhraseArray}
        userId={userId}
        numberOfAccounts={numberOfAccounts}
        navigator={navigator}
      />
    );
    wrapper.dive();

    expect(KeyaddrWordsToBytes.calledOnce).toBe(false);
    expect(CreatePublicAddress.calledOnce).toBe(false);

    const onlyButton = wrapper.find('#select-and-finish');
    expect(onlyButton.length).toBe(1);
    await onlyButton.simulate('press');

    expect(KeyaddrWordsToBytes.mock.results[0].value).toBe(bytes);
    expect(CreatePublicAddress.mock.results[0].value).toEqual([]);
  });
});
