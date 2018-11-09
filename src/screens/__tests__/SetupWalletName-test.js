import { mount } from 'enzyme'
import React from 'react'
import { StyleSheet } from 'react-native'
import SetupWalletName from '../SetupWalletName'

import renderer from 'react-test-renderer'

describe('testing SetupWalletName...', () => {
  let styles = StyleSheet.create({
    wizardText: {
      color: '#ffffff',
      fontSize: 20
    }
  })
  const navigator = {
    setStyle: () => {},
    toggleNavBar: () => {}
  }

  it('renders correctly', () => {
    const tree = renderer
      .create(<SetupWalletName parentStyles={styles} navigator={navigator} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('can click the button', () => {
    const wrapper = mount(
      <SetupWalletName navigator={navigator} parentStyles={styles} />
    )
    const onlyButton = wrapper.find('Button').at(0)
    onlyButton.simulate('click')
  })
})
