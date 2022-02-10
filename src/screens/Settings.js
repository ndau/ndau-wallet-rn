/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

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
import RecoveryPhraseHelper from '../helpers/RecoveryPhraseHelper'
import SettingsStore, { TEST_NET, MAIN_NET, DEV_NET } from '../stores/SettingsStore'
import QueryBlockchain from '../services/QueryBlockchain'

class Settings extends Component {
  constructor (props) {
    super(props)

    this.state = {
      mainnet: true,
      testnet: false,
      devnet: false,
      notifications: false,
      spinner: false,
      found: null
    }
    props.navigation.addListener('didBlur', FlashNotification.hideMessage)
  }

  async componentDidMount () {
    const mainnet = await SettingsStore.isMainNet()
    const devnet = await SettingsStore.isDevNet()
    const testnet = await SettingsStore.isTestNet()
    const notifications = await SettingsStore.getNotificationSettings()

    this.setState({ mainnet, devnet, testnet, notifications})
  }

  useMainnet = async () => {
    await SettingsStore.useMainNet()
    this.setState({ testnet: false, mainnet: true, devnet: false })
  }

  useTestnet = async () => {
    await SettingsStore.useTestNet()
    this.setState({ testnet: true, mainnet: false, devnet: false })
  }

  useDevnet = async () => {
    await SettingsStore.useDevNet()
    this.setState({ testnet: false, mainnet: false, devnet: true })
  }

  accountScan () {
    this.setState({ spinner: true }, async () => {
      try {
        const found = await RecoveryPhraseHelper.accountScan()
        this.setState({ found })
      } catch (e) {
        LogStore.log(`Could not recover deleted accounts: ${e}`)
      } finally {
        this.setState({ spinner: false })
      }
    })
  }

  enableNotifications = async (isEnabled) => {
    this.setState({notifications: isEnabled})
    SettingsStore.setNotificationSettings(!this.state.notifications)
    if (isEnabled) {
      await QueryBlockchain.start()
    } else {
      await QueryBlockchain.stop()
    }
  }

  render () {
    const found = this.state.found
    return (
      <SettingsContainer {...this.props} title='Settings'>

        <ParagraphText textStyle={{ marginVertical: '4%' }}>
          Select which node environment you would like to use.
        </ParagraphText>
        <BooleanSetting
          onValueChange={this.useMainnet}
          title={MAIN_NET}
          value={this.state.mainnet}
        />
        <BooleanSetting
          onValueChange={this.useTestnet}
          title={TEST_NET}
          value={this.state.testnet}
        />

        <BooleanSetting
          onValueChange={this.useDevnet}
          title={DEV_NET}
          value={this.state.devnet}
        />

        <View
          style={[
            acctStyles.accountDetailsPanelBorder,
            acctStyles.accountSideMargins,
            { marginBottom: '4%' }
          ]}
        />

        <ParagraphText textStyle={{ marginBottom: '4%' }}>
          Allow ndau to send you notifications regarding transactions.
        </ParagraphText>
        <BooleanSetting
          title='Enable'
          value={this.state.notifications}
          onValueChange={this.enableNotifications}
        />

        <View
          style={[
            acctStyles.accountDetailsPanelBorder,
            acctStyles.accountSideMargins,
            { marginBottom: '4%' }
          ]}
        />

        <LargeButton
          scroll
          sideMargins
          buttonStyle={{ marginBottom: '12%' }}
          onPress={() => {
            this.accountScan()
          }}
        >
          Scan for my accounts
        </LargeButton>
        {found !== null ? (
          <ParagraphText>
            {found} accounts were found and added to your wallet.
          </ParagraphText>
        ) : null}
        <LoadingSpinner
          spinner={this.state.spinner}
          text='Scanning blockchain...'
        />
      </SettingsContainer>
    )
  }
}

export default Settings
