import React, { Component } from 'react'
import { BackHandler } from 'react-native'
import AppConstants from '../AppConstants'
import UserStore from '../stores/UserStore'
import MultiSafeHelper from '../helpers/MultiSafeHelper'
import { SetupContainer } from '../components/setup'
import {
  ProgressBar,
  LargeButtons,
  NEW_WALLET_SETUP_TYPE,
  RECOVERY_WALLET_SETUP_TYPE,
  ParagraphText
} from '../components/common'

class SetupNewOrRecovery extends Component {
  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)
  }

  handleBackButton () {
    return true
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)
  }

  showNewWallet = async () => {
    const password = await UserStore.getPassword()
    const user = await MultiSafeHelper.getDefaultUser(password)

    this.props.navigation.navigate('SetupYourWallet', {
      walletSetupType: 'new',
      user
    })
  }

  showUseExistingRecovery = async () => {
    const password = await UserStore.getPassword()
    const user = await MultiSafeHelper.getDefaultUser(password)

    this.props.navigation.navigate('SetupGetRecoveryPhrase', {
      walletSetupType: 'recovery',
      mode: AppConstants.NORMAL_MODE,
      walletSetupType: RECOVERY_WALLET_SETUP_TYPE,
      user
    })
  }

  render () {
    return (
      <SetupContainer {...this.props} pageNumber={1}>
        <ParagraphText>How do you want to setup your wallet?</ParagraphText>
        <LargeButtons onPress={() => this.showNewWallet()}>
          New wallet
        </LargeButtons>
        <LargeButtons
          bottom
          secondary
          onPress={() => this.showUseExistingRecovery()}
        >
          Recover a wallet
        </LargeButtons>
      </SetupContainer>
    )
  }
}

export default SetupNewOrRecovery
