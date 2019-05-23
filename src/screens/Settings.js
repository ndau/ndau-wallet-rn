import React, { Component } from 'react'
import { SettingsContainer } from '../components/account'
import { ParagraphText, BooleanSetting, FlashNotification } from '../components/common'
import AsyncStorageHelper from '../model/AsyncStorageHelper'

class Settings extends Component {
  constructor (props) {
    super(props)

    this.state = {
      mainnet: true,
      testnet: false,
      devnet: false
    }
    props.navigation.addListener('didBlur', FlashNotification.hideMessage)
  }

  async componentWillMount () {
    const mainnet = await AsyncStorageHelper.isMainNet()
    const devnet = await AsyncStorageHelper.isDevNet()
    const testnet = await AsyncStorageHelper.isTestNet()

    this.setState({ mainnet, devnet, testnet })
  }

  useMainnet = async () => {
    await AsyncStorageHelper.useMainNet()
    this.setState({ testnet: false, mainnet: true, devnet: false })
  }

  useTestnet = async () => {
    await AsyncStorageHelper.useTestNet()
    this.setState({ testnet: true, mainnet: false, devnet: false })
  }

  useDevnet = async () => {
    await AsyncStorageHelper.useDevNet()
    this.setState({ testnet: false, mainnet: false, devnet: true })
  }

  render () {
    return (
      <SettingsContainer {...this.props} title='Settings'>
        <ParagraphText>
          Select which node environment you would like to use.
        </ParagraphText>
        <BooleanSetting
          onValueChange={this.useMainnet}
          title={AsyncStorageHelper.MAIN_NET}
          value={this.state.mainnet}
        />
        <BooleanSetting
          onValueChange={this.useTestnet}
          title={AsyncStorageHelper.TEST_NET}
          value={this.state.testnet}
        />

        <BooleanSetting
          onValueChange={this.useDevnet}
          title={AsyncStorageHelper.DEV_NET}
          value={this.state.devnet}
        />
      </SettingsContainer>
    )
  }
}

export default Settings
