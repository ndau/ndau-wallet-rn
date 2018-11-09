import { mount } from 'enzyme'
import React from 'react'
import { StyleSheet } from 'react-native'
import SetupGetRecoveryPhrase from '../SetupGetRecoveryPhrase'

import renderer from 'react-test-renderer'

describe('testing SetupGetRecoveryPhrase...', () => {
  let styles = StyleSheet.create({
    wizardText: {
      color: '#ffffff',
      fontSize: 20
    }
  })
  const navigation = {
    navigate: jest.fn(),
    getParam: jest.fn(),
    routeName: ''
  }

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <SetupGetRecoveryPhrase parentStyles={styles} navigation={navigation} />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
