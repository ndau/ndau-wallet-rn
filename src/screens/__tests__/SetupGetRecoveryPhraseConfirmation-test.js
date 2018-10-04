import { mount } from 'enzyme';
import React from 'react';
import { StyleSheet } from 'react-native';
import SetupGetRecoveryPhraseConfirmation from '../SetupGetRecoveryPhraseConfirmation';

import renderer from 'react-test-renderer';

describe('testing SetupGetRecoveryPhraseConfirmation...', () => {
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

  const makeWords = () => {
    return 'zero one two three four five six seven eight nine ten eleven'.split(' ');
  };

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <SetupGetRecoveryPhraseConfirmation
          parentStyles={styles}
          navigator={navigator}
          recoveryPhrase={makeWords()}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('can click the button', () => {
    const wrapper = mount(
      <SetupGetRecoveryPhraseConfirmation
        navigator={navigator}
        parentStyles={styles}
        recoveryPhrase={makeWords()}
      />
    );
    const onlyButton = wrapper.find('Button').at(0);
    onlyButton.simulate('click');
  });
});
