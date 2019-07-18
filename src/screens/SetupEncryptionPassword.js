import React, { Component } from 'react'
import {
  Alert,
  KeyboardAvoidingView,
  View,
  Platform,
  Keyboard,
  ScrollView
} from 'react-native'
import SetupStore from '../stores/SetupStore'
import MultiSafeHelper from '../helpers/MultiSafeHelper'
import AppConstants from '../AppConstants'
import UserData from '../model/UserData'
import UserStore from '../stores/UserStore'
import { SetupContainer } from '../components/setup'
import FlashNotification from '../components/common/FlashNotification'
import {
  LargeButton,
  Label,
  CheckBox,
  TextInput,
  ParagraphText,
  KeyboardScroller
} from '../components/common'
import LogStore from '../stores/LogStore'

class SetupEncryptionPassword extends Component {
  static MINIMUM_PASSWORD_LENGTH = 8
  static TEXT_HEIGHT_NO_KEYBOARD = '30%'

  constructor (props) {
    super(props)

    this.NEW_PASSWORD_MODE_TEXT =
      'Set a password. This password applies to this ' +
      'app only. Ndau will not have access to it. We cannot help you reset this ' +
      'password, so you should write it down.'
    this.PASSWORD_RESET_MODE_TEXT = 'Please select a new password.'

    this.state = {
      password: '',
      confirmPassword: '',
      showPasswords: false,
      progress: false,
      textInputColor: '#000000',
      mode: AppConstants.NEW_PASSWORD_MODE,
      instructionText: this.NEW_PASSWORD_MODE_TEXT,
      upperHeight: SetupEncryptionPassword.TEXT_HEIGHT_NO_KEYBOARD
    }
    props.navigation.addListener('didBlur', FlashNotification.hideMessage)
  }

  componentWillUnmount () {
    if (Platform.OS === 'ios') {
      this.keyboardWillShowSub.remove()
      this.keyboardWillHideSub.remove()
    } else {
      this.keyboardDidShowSub.remove()
      this.keyboardDidHideSub.remove()
    }
  }

  _getDuration = event => {
    if (event) {
      this.eventDuration = event.duration
    }
    return event ? event.duration : this.eventDuration
  }

  keyboardWillShow = event => {
    this.setState({
      ...Platform.select({
        ios: {
          upperHeight: '0%'
        },
        android: {
          upperHeight: '8%'
        }
      })
    })
  }

  keyboardWillHide = event => {
    this.setState({
      upperHeight: SetupEncryptionPassword.TEXT_HEIGHT_NO_KEYBOARD
    })
  }

  componentWillMount () {
    if (Platform.OS === 'ios') {
      this.keyboardWillShowSub = Keyboard.addListener(
        'keyboardWillShow',
        this.keyboardWillShow
      )
      this.keyboardWillHideSub = Keyboard.addListener(
        'keyboardWillHide',
        this.keyboardWillHide
      )
    } else {
      this.keyboardDidShowSub = Keyboard.addListener(
        'keyboardDidShow',
        this.keyboardWillShow
      )
      this.keyboardDidHideSub = Keyboard.addListener(
        'keyboardDidHide',
        this.keyboardWillHide
      )
    }

    const mode = this.props.navigation.getParam(
      'mode',
      AppConstants.NEW_PASSWORD_MODE
    )
    let instructionText = this.NEW_PASSWORD_MODE_TEXT
    if (mode === AppConstants.PASSWORD_RESET_MODE) {
      instructionText = this.PASSWORD_RESET_MODE_TEXT
    }

    this.setState({ mode, instructionText })
  }

  usePassword (event) {
    this.onPushAnother(event)
  }

  checkPasswordsMatch = () => {
    return this.state.password === this.state.confirmPassword
  }

  checkPasswordLength = () => {
    return (
      this.state.password.length >=
      SetupEncryptionPassword.MINIMUM_PASSWORD_LENGTH
    )
  }

  showNextSetup = async () => {
    if (!this.checkPasswordsMatch()) {
      Alert.alert(
        'Error',
        'The passwords entered do not match.',
        [{ text: 'OK', onPress: () => {} }],
        { cancelable: false }
      )
      this.setState({ textInputColor: AppConstants.WARNING_ICON_COLOR })
      return
    }
    if (!this.checkPasswordLength()) {
      Alert.alert(
        'Error',
        'The password must be at least 8 characters',
        [{ text: 'OK', onPress: () => {} }],
        { cancelable: false }
      )
      this.setState({ textInputColor: AppConstants.WARNING_ICON_COLOR })
      return
    }

    switch (this.state.mode) {
      case AppConstants.NEW_PASSWORD_MODE: {
        this.finishSetup()
        break
      }
      case AppConstants.PASSWORD_RESET_MODE: {
        await this.resetPassword()
        break
      }
    }
  }

  finishSetup = () => {
    SetupStore.encryptionPassword = this.state.password
    UserStore.setPassword(this.state.password)
    this.props.navigation.navigate('SetupTermsOfService')
  }

  resetPassword = async () => {
    this.setState({ spinner: true }, async () => {
      const recoveryPhraseString = this.props.navigation.getParam(
        'recoveryPhraseString',
        null
      )

      try {
        await MultiSafeHelper.resetPassword(
          recoveryPhraseString,
          this.state.password
        )
        const user = await MultiSafeHelper.getDefaultUser(recoveryPhraseString)
        await UserStore.setPassword(this.state.password)

        await UserData.loadUserData(user)

        this.props.navigation.navigate('Dashboard')
      } catch (error) {
        LogStore.error(error)
        FlashNotification.showError(error.message, false, false)
      }
      this.setState({ spinner: false })
    })
  }

  checkedShowPasswords = () => {
    this.setState({ showPasswords: !this.state.showPasswords })
  }

  updateComfirmPassword = confirmPassword => {
    this.setState({
      confirmPassword,
      progress: confirmPassword.length > 0
    })
  }

  showInformation = () => {
    Alert.alert(
      'Information',
      'We use encryption to protect your data. This password protects ' +
        'this app on your mobile only. This is not the same thing as your ' +
        'recovery phrase, which is the key to your wallet. We ' +
        'recommend you use a strong password which you do not use anywhere else.',
      [{ text: 'OK', onPress: () => {} }],
      { cancelable: false }
    )
  }

  render () {
    const { progress } = this.state
    // debugger
    return (
      <SetupContainer {...this.props} pageNumber={17}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -200}
          behavior={Platform.OS === 'ios' ? 'height' : 'position'}
        >
          <View style={{ overflow: 'hidden', height: this.state.upperHeight }}>
            <ParagraphText>{this.state.instructionText}</ParagraphText>
          </View>
          <View style={{ height: '70%', alignSelf: 'baseline' }}>
            <Label>Password</Label>
            <TextInput
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
              placeholder='Enter a password...'
              secureTextEntry={!this.state.showPasswords}
              autoCapitalize='none'
            />
            <Label>Confirm Password</Label>
            <TextInput
              onChangeText={this.updateComfirmPassword}
              value={this.state.confirmPassword}
              placeholder='Confirm your password...'
              secureTextEntry={!this.state.showPasswords}
              autoCapitalize='none'
              onSubmitEditing={this.showNextSetup}
            />

            <CheckBox
              onValueChange={this.checkedShowPasswords}
              checked={this.state.showPasswords}
              label='Hide/show passwords'
            />

            <LargeButton
              sideMargins
              scroll
              onPress={() => this.showNextSetup()}
              disabled={!progress}
            >
              Next
            </LargeButton>
          </View>
        </KeyboardAvoidingView>
      </SetupContainer>
    )
  }
}

export default SetupEncryptionPassword
