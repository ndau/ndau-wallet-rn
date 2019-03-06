import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Text,
  Platform,
  BackHandler,
  StatusBar
} from 'react-native'
import CommonButton from '../components/common/CommonButton'
import cssStyles from '../css/styles'
import { SafeAreaView } from 'react-navigation'
import AsyncStorageHelper from '../model/AsyncStorageHelper'
import FlashNotification from '../components/common/FlashNotification'

class IdentityVerificationSuccess extends Component {
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

  componentDidMount = async () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)
    await AsyncStorageHelper.useMainNet()
  }

  showNextSetup = () => {
    this.props.navigation.navigate('SetupTermsOfService')
  }

  render () {
    const error = this.props.navigation.getParam('error', null)
    if (error) {
      FlashNotification.showError(error)
    }

    return (
      <SafeAreaView style={cssStyles.safeContainer}>
        <StatusBar barStyle='light-content' backgroundColor='#1c2227' />
        <View style={cssStyles.container}>
          <ScrollView style={cssStyles.contentContainer}>
            <View>
              <Text style={cssStyles.wizardText}>
                Congratulations you have been successfully verified.{' '}
                {Platform.OS === 'android' ? '\n' : ''}
              </Text>
            </View>
          </ScrollView>
          <View style={cssStyles.footer}>
            <CommonButton onPress={this.showNextSetup} title='Buy ndau' />
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

export default IdentityVerificationSuccess
