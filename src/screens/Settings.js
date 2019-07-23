import React, { Component } from 'react'
import { SettingsContainer } from '../components/account'
import FlashNotification from '../components/common/FlashNotification'
import {
  ParagraphText,
  BooleanSetting,
  LoadingSpinner
} from '../components/common'
import { View } from 'react-native'
import acctStyles from '../components/account/styles'
import { LargeButton } from '../components/common'
import LogStore from '../stores/LogStore'

import AsyncStorageHelper from '../model/AsyncStorageHelper'

class Settings extends Component {
  constructor (props) {
    super(props)

    this.state = {
      mainnet: true,
      testnet: false,
      devnet: false,
      spinner: false,
      found: null
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

  accountScan () {
    this.setState({ spinner: true }, async () => {
      try {
        const found = await RecoveryPhraseHelper.accountScan()
        this.setState({ found })
        this.props.navigation.navigate('Dashboard')
      } catch (e) {
        LogStore.error(`Could not recover deleted accounts: ${e}`)
      } finally {
        this.setState({ spinner: false })
      }
    })
  }

  render () {
    const found = this.state.found
    return (
      <SettingsContainer {...this.props} title='Settings'>
        <LoadingSpinner spinner={this.state.spinner} />
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

        <View
          style={[
            acctStyles.accountDetailsPanelBorder,
            acctStyles.accountSideMargins,
            { marginTop: '4%', marginBottom: '4%' }
          ]}
        />

        <LargeButton
          scroll
          sideMargins
          onPress={() => {
            this.accountScan()
          }}
        >
          Scan for my accounts
        </LargeButton>
        {found !== null ? (
          <ParagraphText>
            `${found} accounts found and added to wallet.`
          </ParagraphText>
        ) : null}
      </SettingsContainer>
    )
  }
}

export default Settings
