import { mount } from 'enzyme'
import React from 'react'
import { StyleSheet } from 'react-native'
import UnlockModalDialog from '../UnlockModalDialog'

import renderer from 'react-test-renderer'

describe('testing UnlockModalDialog...', () => {
  let styles = StyleSheet.create({
    wizardText: {
      color: '#ffffff',
      fontSize: 20
    }
  })
  const navigator = {
    setStyle: () => {}
  }

  it('renders correctly', () => {
    const tree = renderer
      .create(<UnlockModalDialog parentStyles={styles} navigator={navigator} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
