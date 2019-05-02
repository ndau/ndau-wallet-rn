import React, { Component } from 'react'
import { Switch, View } from 'react-native'
import { SettingsContainer } from '../components/account'
import { ParagraphText, BooleanSetting } from '../components/common'

class Settings extends Component {
  constructor (props) {
    super(props)

    this.state = {
      mainnet: true,
      testnet: false,
      devnet: false
    }
  }

  useMainnet = () => {
    this.setState({ testnet: false, mainnet: true, devnet: false })
  }

  useTestnet = () => {
    this.setState({ testnet: true, mainnet: false, devnet: false })
  }

  useDevnet = () => {
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
          title='mainnet'
          value={this.state.mainnet}
        />
        <BooleanSetting
          onValueChange={this.useTestnet}
          title='testnet'
          value={this.state.testnet}
        />

        <BooleanSetting
          onValueChange={this.useDevnet}
          title='devnet'
          value={this.state.devnet}
        />
      </SettingsContainer>
    )
  }
}

export default Settings
