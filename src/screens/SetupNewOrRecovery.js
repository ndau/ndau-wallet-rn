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

  showUseExistingRecovery = () => {
    this.props.navigation.navigate('SetupGetRecoveryPhrase', {
      walletSetupType: 'recovery',
      mode: AppConstants.NORMAL_MODE,
      walletSetupType: RECOVERY_WALLET_SETUP_TYPE
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
                Welcome to ndau, a cryptocurrency designed to be a buoyant long-term store of value.
                {' '}
                {Platform.OS === 'android' ? '\n' : ''}
              </Text>
            </View>
            <View>
              <Text style={cssStyles.wizardText}>
                To get started securely, you will create a new wallet, protect it with a password,
                and create a recovery phrase which you will need in order to restore your wallet if
                you lose access to it.
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
