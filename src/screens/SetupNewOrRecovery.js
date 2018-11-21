import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Text,
  Platform,
  TouchableWithoutFeedback,
  BackHandler,
  StatusBar
} from 'react-native'
import CommonButton from '../components/CommonButton'
import cssStyles from '../css/styles'
import SetupStore from '../model/SetupStore'
import { SafeAreaView } from 'react-navigation'
import SetupProgressBar, {
  NEW_WALLET_SETUP_TYPE,
  RECOVERY_WALLET_SETUP_TYPE
} from '../components/SetupProgressBar'
import SetupGetRecoveryPhrase from '../screens/SetupGetRecoveryPhrase'
import AppConstants from '../AppConstants'
import AsyncStorageHelper from '../model/AsyncStorageHelper'
import MultiSafeHelper from '../helpers/MultiSafeHelper'

class SetupNewOrRecovery extends Component {
  constructor (props) {
    super(props)

    this.state = {
      toggleCount: 1,
      maxToggle: 10
    }
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)
  }

  handleBackButton () {
    return true
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)
  }

  showNewWallet = () => {
    this.props.navigation.navigate('SetupYourWallet', {
      walletSetupType: 'new'
    })
  }

  showUseExistingRecovery = async () => {
    const password = await AsyncStorageHelper.getApplicationPassword()
    // let user = null
    // if (password) {
    const user = await MultiSafeHelper.getDefaultUser(password)
    // }

    this.props.navigation.navigate('SetupGetRecoveryPhrase', {
      walletSetupType: 'recovery',
      mode: AppConstants.NORMAL_MODE,
      walletSetupType: RECOVERY_WALLET_SETUP_TYPE,
      user
    })
  }

  render () {
    return (
      <SafeAreaView style={cssStyles.safeContainer}>
        <StatusBar barStyle='light-content' backgroundColor='#1c2227' />
        <View style={cssStyles.container}>
          <ScrollView style={cssStyles.contentContainer}>
            <SetupProgressBar navigation={this.props.navigation} />
            <View>
              <Text style={cssStyles.wizardText}>
                How do you want to setup your wallet? Choose one of the options below
                {' '}
                {Platform.OS === 'android' ? '\n' : ''}
              </Text>
            </View>
          </ScrollView>
          <View style={cssStyles.footer}>
            <View style={cssStyles.navButtonWrapper}>
              <CommonButton
                onPress={() => this.showUseExistingRecovery()}
                title='Recover a wallet (less common)'
              />
            </View>
            <View style={cssStyles.navButtonWrapper}>
              <CommonButton
                onPress={() => this.showNewWallet()}
                title='New wallet'
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

export default SetupNewOrRecovery
