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

class IdentityVerificationInfo extends Component {
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
    this.props.navigation.navigate('IdentityMind')
  }

  render () {
    return (
      <SafeAreaView style={cssStyles.safeContainer}>
        <StatusBar barStyle='light-content' backgroundColor='#1c2227' />
        <View style={cssStyles.container}>
          <ScrollView style={cssStyles.contentContainer}>
            <View>
              <Text style={cssStyles.wizardText}>
                To buy ndau, you will need to complete an identity verification
                process. Please have an image of your ID ready.{' '}
                {Platform.OS === 'android' ? '\n' : ''}
              </Text>
            </View>
          </ScrollView>
          <View style={cssStyles.footer}>
            <CommonButton onPress={this.showNextSetup} title='Continue' />
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

export default IdentityVerificationInfo
