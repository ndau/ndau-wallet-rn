import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Text, Alert } from 'react-native'
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import CommonButton from '../components/CommonButton'
import SetupProgressBar from '../components/SetupProgressBar'
import cssStyles from '../css/styles'
import SetupStore from '../model/SetupStore'
import { SafeAreaView } from 'react-navigation'
import MultiSafeHelper from '../helpers/MultiSafeHelper'
import AppConstants from '../AppConstants'
import OrderAPI from '../api/OrderAPI'
import UserData from '../model/UserData'
import Padding from '../components/Padding'
import FlashNotification from '../components/FlashNotification'
import AsyncStorageHelper from '../model/AsyncStorageHelper'
import { SetupContainer, ParagraphText, SetupInput } from '../components/setup'
import { LargeButtons, Label, CheckBox } from '../components/common'

class SetupEncryptionPassword extends Component {
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
      this.state.password.length >=
        SetupEncryptionPassword.MINIMUM_PASSWORD_LENGTH &&
      this.state.confirmPassword.length >=
        SetupEncryptionPassword.MINIMUM_PASSWORD_LENGTH
    )
  }

  showNextSetup = async () => {
    if (!this.checkPasswordsExist()) {
      Alert.alert(
        'Error',
        'The passwords entered do not match.',
        [{ text: 'OK', onPress: () => {} }],
        { cancelable: false }
      )
      this.setState({ textInputColor: '#f05123' })
      return
    }
    if (!this.checkPasswordsLength()) {
      Alert.alert(
        'Error',
        'The password must be at least 8 characters',
        [{ text: 'OK', onPress: () => {} }],
        { cancelable: false }
      )
      this.setState({ textInputColor: '#f05123' })
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
      walletSetupType:
        this.props.navigation.state.params &&
        this.props.navigation.state.params.walletSetupType
    })
  }

  resetPassword = async () => {
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
      await AsyncStorageHelper.setApplicationPassword(this.state.password)

      await UserData.loadData(user)
      const marketPrice = await OrderAPI.getMarketPrice()

      this.props.navigation.navigate('Dashboard', {
        user,
        encryptionPassword: this.state.password,
        walletSetupType: null,
        marketPrice
      })
    } catch (error) {
      LoggingService.error(error)
      FlashNotification.showError(error.message, false, false)
    }
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
    const { textInputColor, progress } = this.state
    // debugger
    return (
      <SetupContainer {...this.props} pageNumber={17}>
        <ParagraphText>{this.state.instructionText}</ParagraphText>
        <Label>Password</Label>
        <SetupInput
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          placeholder='Enter a password...'
          secureTextEntry={!this.state.showPasswords}
          autoCapitalize='none'
        />
        <Label>Confirm Password</Label>
        <SetupInput
          onChangeText={this.updateComfirmPassword}
          value={this.state.confirmPassword}
          placeholder='Confirm your password...'
          secureTextEntry={!this.state.showPasswords}
          autoCapitalize='none'
        />

        <CheckBox
          onValueChange={this.checkedShowPasswords}
          checked={this.state.showPasswords}
          label='Hide/show passwords'
        />
        <LargeButtons
          bottom
          onPress={() => this.showNextSetup()}
          disabled={!progress}
        >
          Next
        </LargeButtons>
      </SetupContainer>
      // <SafeAreaView style={cssStyles.safeContainer}>
      //   <View style={cssStyles.container}>
      //     <ScrollView style={cssStyles.contentContainer}>
      //       <SetupProgressBar navigation={this.props.navigation} />

    //       <Padding top={0} bottom={0}>
    //         <View style={styles.textContainer}>
    //           <Text
    //             style={cssStyles.wizardText}
    //             onPress={this.showInformation}
    //           >
    //             {this.state.instructionText}
    //             {'  '}
    //             <FontAwesome5Pro
    //               name='info'
    //               color='#ffffff'
    //               size={20}
    //               style={{ marginBottom: 3 }}
    //               light
    //             />
    //           </Text>
    //         </View>
    //       </Padding>

    //       <Padding top={2}>
    //         <TextInput
    //           onChangeText={password => this.setState({ password })}
    //           value={this.state.password}
    //           placeholder='Enter a password'
    //           secureTextEntry={!this.state.showPasswords}
    //           autoCapitalize='none'
    //         />
    //       </Padding>

    //       <Padding>
    //         <TextInput
    //           onChangeText={this.updateComfirmPassword}
    //           value={this.state.confirmPassword}
    //           placeholder='Confirm your password'
    //           secureTextEntry={!this.state.showPasswords}
    //           autoCapitalize='none'
    //         />
    //       </Padding>

    //       <Padding>
    //         <CheckBox
    //           style={cssStyles.checkbox}
    //           onClick={this.checkedShowPasswords}
    //           isChecked={this.state.showPasswords}
    //           rightText='Show passwords'
    //           rightTextStyle={{
    //             color: '#ffffff',
    //             fontSize: 20,
    //             fontFamily: 'TitilliumWeb-Regular'
    //           }}
    //           checkBoxColor='#ffffff'
    //         />
    //       </Padding>
    //     </ScrollView>

    //     <View style={cssStyles.footer}>
    //       <CommonButton
    //         onPress={this.showNextSetup}
    //         title='Next'
    //         disabled={!progress}
    //       />
    //     </View>
    //   </View>
    // </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  infoParagraph: {
    flexDirection: 'row'
  }
})

export default SetupEncryptionPassword
