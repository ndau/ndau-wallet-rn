import { mount } from 'enzyme'
import React from 'react'
import { StyleSheet } from 'react-native'
import ErrorPanel from '../ErrorPanel'

import renderer from 'react-test-renderer'

describe('testing ErrorPanel...', () => {
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
      .create(<ErrorPanel parentStyles={styles} navigator={navigator} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
