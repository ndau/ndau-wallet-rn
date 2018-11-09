import React from 'react'
import { StyleSheet } from 'react-native'
import SetupYourWallet from '../SetupYourWallet'
import renderer from 'react-test-renderer'

describe('testing SetupYourWallet...', () => {
  it('renders correctly', () => {
    var styles = StyleSheet.create({
      wizardText: {
        color: '#ffffff',
        fontSize: 20
      }
    })
    const navigator = {
      setStyle: () => {},
      toggleNavBar: () => {}
    }

    const tree = renderer
      .create(<SetupYourWallet navigator={navigator} parentStyles={styles} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
