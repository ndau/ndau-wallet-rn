import { shallow } from 'enzyme';
import React from 'react';
import { NativeModules } from 'react-native';
import SetupEAINode from '../SetupEAINode';
import sinon from 'sinon';
import renderer from 'react-test-renderer';
import SetupStore from '../../model/SetupStore';

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
  let recoveryPhraseArray = [
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
  const bytes = 'ZWEQAwQFBgcICQoLDA0ODw==';
  const KeyaddrWordsToBytes = sinon.spy(NativeModules.KeyaddrManager, 'KeyaddrWordsToBytes');
  KeyaddrWordsToBytes.mockReturnValue(bytes);
  const CreatePublicAddress = sinon.spy(NativeModules.KeyaddrManager, 'CreatePublicAddress');
  CreatePublicAddress.mockReturnValue([]);
  const navigation = {
    navigate: () => {}
  };
  SetupStore.setRecoveryPhrase(recoveryPhraseArray);
  SetupStore.setUserId(userId);
  SetupStore.setNumberOfAccounts(numberOfAccounts);
  SetupStore.setQRCode(bytes);

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
          recoveryPhraseArray={recoveryPhraseArray}
          userId={userId}
          numberOfAccounts={numberOfAccounts}
          navigation
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('finishes setup successfully', async () => {
    const wrapper = shallow(
      <SetupEAINode
        recoveryPhraseArray={recoveryPhraseArray}
        userId={userId}
        numberOfAccounts={numberOfAccounts}
        navigation
      />
    );

    expect(KeyaddrWordsToBytes.calledOnce).toBe(false);
    expect(CreatePublicAddress.calledOnce).toBe(false);

    const onlyButton = wrapper.find('#select-and-finish');
    console.log(`onlyButton is: ${JSON.stringify(onlyButton)}`);
    expect(onlyButton.length).toBe(1);
    await onlyButton.simulate('press');

    console.log(`stuff: ${JSON.stringify(KeyaddrWordsToBytes.mock, null, 2)}`);

    expect(KeyaddrWordsToBytes.mock.results[0].value).toBe(bytes);
    expect(CreatePublicAddress.mock.results[0].value).toEqual([]);
  });
});
