import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  Alert
} from 'react-native'
import CheckBox from 'react-native-check-box'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import CommonButton from '../components/CommonButton'
import SetupProgressBar from '../components/SetupProgressBar'
import cssStyles from '../css/styles'
import SetupStore from '../model/SetupStore'
import { SafeAreaView } from 'react-navigation'
import MultiSafeHelper from '../helpers/MultiSafeHelper'
import AppConstants from '../AppConstants'

class SetupEncryptionPassword extends Component {
  static PASSWORD_RESET_MODE = 'password-reset'
  static NEW_PASSWORD_MODE = 'new-password'
  static MINIMUM_PASSWORD_LENGTH = 8


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
      instructionText: this.NEW_PASSWORD_MODE_TEXT
    }
  }

  componentWillMount () {
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

  checkPasswordsExist = () => {
    return this.state.password === this.state.confirmPassword
  }

  checkPasswordsLength = () => {
    return (
      this.state.password.length >= this.MINIMUM_PASSWORD_LENGTH && 
      this.state.confirmPassword.length >= this.MINIMUM_PASSWORD_LENGTH
    )
  }

  showNextSetup = async () => {
    this.checkedProgress();

    if (!this.checkPasswordsExist()) {
      Alert.alert(
        'Error',
        'The passwords entered do not match.',
        [{ text: 'OK', onPress: () => {} }],
        { cancelable: false }
      )
      this.setState({ textInputColor: '#ff0000' })
      return
    }
    if (!this.checkPasswordsLength()) {
      Alert.alert(
        'Error',
        'The password must be at least 8 characters',
        [{ text: 'OK', onPress: () => {} }],
        { cancelable: false }
      )
      this.setState({ textInputColor: '#ff0000' })
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
    const user = this.props.navigation.getParam('user', null)
    this.props.navigation.navigate('SetupTermsOfService', {
      user,
      walletSetupType: this.props.navigation.state.params &&
        this.props.navigation.state.params.walletSetupType
    })
  }

  resetPassword = async () => {
    const recoveryPhraseString = this.props.navigation.getParam(
      'recoveryPhraseString',
      null
    )
    await MultiSafeHelper.resetPassword(
      recoveryPhraseString,
      this.state.password
    )
    const user = await MultiSafeHelper.getDefaultUser(recoveryPhraseString)
    this.props.navigation.navigate('Dashboard', {
      user,
      encryptionPassword: this.state.password,
      walletSetupType: null
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
        'recovery phrase, which codes for the key to your wallet. We ' +
        'recommend you use a strong password which you do not use anywhere else.',
      [{ text: 'OK', onPress: () => {} }],
      { cancelable: false }
    )
  }

  render () {
    const { textInputColor, progress } = this.state
    // debugger
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={cssStyles.container}>
          <ScrollView style={styles.contentContainer}>
            <SetupProgressBar navigation={this.props.navigation} />
            <View style={styles.textContainer}>
              <Text style={cssStyles.wizardText} onPress={this.showInformation}>
                {this.state.instructionText}{'  '}
                <FontAwesome
                  name='info'
                  color='#ffffff'
                  size={20}
                  style={{ marginBottom: 3 }}
                />
              </Text>
            </View>
            <TextInput
              style={cssStyles.textInput}
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
              placeholder='Enter a password'
              placeholderTextColor='#333'
              secureTextEntry={!this.state.showPasswords}
              autoCapitalize='none'
            />
            <TextInput
              style={cssStyles.textInput}
              onChangeText={this.updateComfirmPassword}
              value={this.state.confirmPassword}
              placeholder='Confirm your password'
              placeholderTextColor='#333'
              secureTextEntry={!this.state.showPasswords}
              autoCapitalize='none'
            />
            <View>
              <CheckBox
                style={cssStyles.checkbox}
                onClick={this.checkedShowPasswords}
                isChecked={this.state.showPasswords}
                rightText='Show passwords'
                rightTextStyle={{
                  color: '#ffffff',
                  fontSize: 20,
                  fontFamily: 'TitilliumWeb-Regular'
                }}
                checkBoxColor='#ffffff'
              />
            </View>
          </ScrollView>
          <View style={styles.footer}>
            <CommonButton
              onPress={this.showNextSetup}
              title='Next'
              disabled={!progress}
            />
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#1c2227'
  },
  button: {
    marginTop: 0
  },
  textContainer: {
    marginBottom: 8
  },
  contentContainer: {
    flex: 1 // pushes the footer to the end of the screen
  },
  footer: {
    justifyContent: 'flex-end'
  },
  progress: {
    paddingTop: 15,
    paddingBottom: 15
  },
  infoParagraph: {
    flexDirection: 'row'
  }
})

export default SetupEncryptionPassword
