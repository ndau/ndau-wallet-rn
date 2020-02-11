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
      } catch (e) {
        LogStore.log(`Could not recover deleted accounts: ${e}`)
      } finally {
        this.setState({ spinner: false })
      }
    })
  }

  render () {
    const found = this.state.found
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
