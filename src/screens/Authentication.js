import React, { Component } from 'react'
import { Alert, Keyboard } from 'react-native'
import MultiSafeHelper from '../helpers/MultiSafeHelper'
import UserData from '../model/UserData'
import AppConstants from '../AppConstants'
import OrderAPI from '../api/OrderAPI'
import WaitingForBlockchainSpinner from '../components/common/WaitingForBlockchainSpinner'
import LoggingService from '../services/LoggingService'
import {
  LoginContainer,
  LabelWithIcon,
  TextInput,
  PasswordLinkText,
  LargeButton,
  LoginImage,
  FlashNotification
} from '../components/common'
import UserStore from '../stores/UserStore'
import NdauStore from '../stores/NdauStore'
import KeyboardView from '../components/common/KeyboardView'

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
    props.navigation.addListener('didBlur', FlashNotification.hideMessage)
  }

  login = async () => {
    this.setState({ spinner: true }, async () => {
      try {
        let user = await MultiSafeHelper.getDefaultUser(this.state.password)
        if (user) {
          FlashNotification.hideMessage()
          UserStore.setUser(user)

          LoggingService.debug('User in Authentication found is', user)

          // cache the password
          UserStore.setPassword(this.state.password)
          let errorMessage = null

          try {
            await UserData.loadUserData(user)
          } catch (error) {
            FlashNotification.showError(error.message)
            LoggingService.debug(error)
            errorMessage = error.message
          }

          this.setState({ spinner: false }, () => {
            this.props.navigation.navigate('Dashboard', {
              error: errorMessage
            })
          })
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
    this.props.navigation.navigate('SetupWelcome')
  }

  showPasswordReset = user => {
    FlashNotification.hideMessage()
    this.props.navigation.navigate('SetupGetRecoveryPhrase', {
      user: user,
      mode: AppConstants.PASSWORD_RESET_MODE
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
        <KeyboardView>
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
            onSubmitEditing={this.login}
          />
          <PasswordLinkText onPress={this.showPasswordReset}>
            Forgot your password?
          </PasswordLinkText>
          <LargeButton scroll sideMargins onPress={this.login}>
            Login
          </LargeButton>
        </KeyboardView>
      </LoginContainer>
    )
  }
}

export default Authentication
