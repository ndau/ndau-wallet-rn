import React, { Component } from 'react'
import { Alert } from 'react-native'
import MultiSafeHelper from '../helpers/MultiSafeHelper'
import RNExitApp from 'react-native-exit-app'
import UserData from '../model/UserData'
import AppConstants from '../AppConstants'
import FlashNotification from '../components/common/FlashNotification'
import OrderAPI from '../api/OrderAPI'
import WaitingForBlockchainSpinner from '../components/common/WaitingForBlockchainSpinner'
import LoggingService from '../services/LoggingService'
import {
  NEW_WALLET_SETUP_TYPE,
  RECOVERY_WALLET_SETUP_TYPE,
  LoginContainer,
  LabelWithIcon,
  TextInput,
  PasswordLinkText,
  LargeButton,
  LoginImage
} from '../components/common'
import UserStore from '../stores/UserStore'
import NdauStore from '../stores/NdauStore'
import WalletStore from '../stores/WalletStore'

class Authentication extends Component {
  constructor (props) {
    super(props)

    this.state = {
      password: '',
      showErrorText: false,
      loginAttempt: 1,
      spinner: false
    }

    this.maxLoginAttempts = 10
  }

  login = async () => {
    this.setState({ spinner: true }, async () => {
      try {
        let user = await MultiSafeHelper.getDefaultUser(this.state.password)
        let marketPrice = 0
        if (user) {
          FlashNotification.hideMessage()

          LoggingService.debug(
            'user in Authentication found is',
            JSON.stringify(user)
          )

          // cache the password
          await UserStore.setPassword(this.state.password)
          let errorMessage = null

          try {
            await UserData.loadUserData(user)
            marketPrice = await OrderAPI.getMarketPrice()
          } catch (error) {
            FlashNotification.showError(error.message)
            LoggingService.debug(error)
            errorMessage = error.message
          }

          UserStore.setUser(user)
          NdauStore.setMarketPrice(marketPrice)

          if (Object.keys(user.wallets).length > 1) {
            this.setState({ spinner: false }, () => {
              this.props.navigation.navigate('Dashboard', {
                error: errorMessage
              })
            })
          } else {
            WalletStore.setWallet(user.wallets[Object.keys(user.wallets)[0]])
            this.setState({ spinner: false }, () => {
              this.props.navigation.navigate('WalletOverview', {
                error: errorMessage
              })
            })
          }
        } else {
          this.showLoginError()
          this.setState({ spinner: false })
        }
      } catch (error) {
        LoggingService.debug(error)
        this.showLoginError()
        this.setState({ spinner: false })
      }
    })
  }

  showExitApp () {
    Alert.alert(
      '',
      `You have hit the maximum amount of login attempts.`,
      [
        {
          text: 'Exit app',
          onPress: () => {
            RNExitApp.exitApp()
          }
        }
      ],
      { cancelable: false }
    )
  }

  showLoginError = () => {
    if (this.state.loginAttempt === this.maxLoginAttempts) {
      this.showExitApp()
    }
    FlashNotification.showError(
      `Login attempt ${this.state.loginAttempt} of ${
        this.maxLoginAttempts
      } failed.`
    )
    this.setState({ loginAttempt: this.state.loginAttempt + 1 })
  }

  showInformation = () => {
    Alert.alert(
      'Information',
      'Please enter the password you chose to encrypt this app. ' +
        'This is not the same thing as your six-character ID or key ' +
        'recovery phrase.',
      [{ text: 'OK', onPress: () => {} }],
      { cancelable: false }
    )
  }

  showSetup = async () => {
    FlashNotification.hideMessage()
    this.props.navigation.navigate('SetupWelcome', {
      walletSetupType: NEW_WALLET_SETUP_TYPE
    })
  }

  showPasswordReset = user => {
    FlashNotification.hideMessage()
    this.props.navigation.navigate('SetupGetRecoveryPhrase', {
      user: user,
      mode: AppConstants.PASSWORD_RESET_MODE,
      walletSetupType: RECOVERY_WALLET_SETUP_TYPE
    })
  }

  dropDownSelected = (index, value) => {
    this.setState({
      userId: value
    })
  }

  render () {
    const { textInputColor } = this.state
    return (
      <LoginContainer>
        <WaitingForBlockchainSpinner spinner={this.state.spinner} />
        <LoginImage />
        <LabelWithIcon
          onPress={this.showInformation}
          fontAwesomeIconName='info-circle'
        >
          Password
        </LabelWithIcon>
        <TextInput
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          placeholder='Enter your password...'
          secureTextEntry
          autoCapitalize='none'
        />
        <PasswordLinkText onPress={this.showPasswordReset}>
          Forgot your password?
        </PasswordLinkText>
        <LargeButton sideMargins onPress={this.login}>
          Login
        </LargeButton>
      </LoginContainer>
    )
  }
}

export default Authentication
