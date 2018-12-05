import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  Alert
} from 'react-native'
import CommonButton from '../components/CommonButton'
import SetupProgressBar from '../components/SetupProgressBar'
import cssStyles from '../css/styles'
import SetupStore from '../model/SetupStore'
import { SafeAreaView } from 'react-navigation'
import DataFormatHelper from '../helpers/DataFormatHelper'
import AsyncStorageHelper from '../model/AsyncStorageHelper'
import Padding from '../components/Padding'
import FlashNotification from '../components/FlashNotification'

class SetupEncryptionPassword extends Component {
  constructor (props) {
    super(props)

    this.state = {
      nameEntered: false
    }
    this.walletCount = 1
  }

  componentWillMount = () => {
    const user = this.props.navigation.getParam('user', null)
    if (user) {
      this.walletCount = Object.keys(user.wallets).length
    }
    SetupStore.walletId = `Wallet ${this.walletCount}`
  }

  checkIfWalletAlreadyExists = user => {
    if (
      DataFormatHelper.checkIfWalletAlreadyExists(user, SetupStore.walletId)
    ) {
      FlashNotification.showError(
        `There is already a wallet named "${SetupStore.walletId}". Please choose another name.`
      )
      return true
    }

    return false
  }

  showNextSetup = async () => {
    const { navigation } = this.props
    const user = navigation.getParam('user', null)

    if (this.checkIfWalletAlreadyExists(user)) {
      return
    }

    if (user) {
      // get it out of AppConstants.TEMP_USER if we have to
      // and into the new walletId
      DataFormatHelper.moveTempUserToWalletName(user, SetupStore.walletId)
    }

    // if we have an application password in
    // AsyncStorage then there is no need to show
    // this screen, so go to terms & conditions
    const password = await AsyncStorageHelper.getApplicationPassword()
    if (password) {
      SetupStore.encryptionPassword = password
      this.props.navigation.navigate('SetupTermsOfService', {
        user,
        walletSetupType: this.props.navigation.state.params &&
          this.props.navigation.state.params.walletSetupType
      })
    } else {
      if (user) {
        if (!user.userId) {
          user.userId = SetupStore.walletId
        }
        if (!user.wallets) {
          user.wallets = [{ walletId: SetupStore.walletId }]
        }
      }

      navigation.navigate('SetupEncryptionPassword', {
        user,
        walletSetupType: navigation.state.params &&
          navigation.state.params.walletSetupType
      })
    }
  }

  render () {
    return (
      <SafeAreaView style={cssStyles.safeContainer}>
        <View style={cssStyles.container}>
          <ScrollView style={cssStyles.contentContainer}>
            <SetupProgressBar navigation={this.props.navigation} />
            <Padding top={0}>
              <Text style={cssStyles.wizardText} onPress={this.showInformation}>
                Give this wallet a name.
              </Text>
            </Padding>

            <Padding>
              <TextInput
                style={cssStyles.textInput}
                onChangeText={value => {
                  this.setState({ nameEntered: true })
                  SetupStore.walletId = value
                }}
                // value={(value) => {
                //   SetupStore.walletId = value;
                // }}
                placeholder={`Wallet ${SetupStore.walletId}`}
                placeholderTextColor='#333'
                autoCapitalize='none'
              />
            </Padding>
          </ScrollView>
          <View style={cssStyles.footer}>
            <CommonButton
              onPress={this.showNextSetup}
              title='Next'
              // disabled={!this.state.nameEntered}
            />
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  textContainer: {
    marginBottom: 8
  },
  infoParagraph: {
    flexDirection: 'row'
  }
})

export default SetupEncryptionPassword
