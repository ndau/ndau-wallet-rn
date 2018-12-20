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
import SetupProgressBar from '../components/SetupProgressBar'
import AsyncStorageHelper from '../model/AsyncStorageHelper'
import FlashNotification from '../components/FlashNotification'
import Padding from '../components/Padding'
import { WebView } from 'react-native-webview'

class SetupWelcome extends Component {
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
    this.props.navigation.navigate('SetupNewOrRecovery')
  }

  testNetToggler = async () => {
    if (this.state.maxToggle === this.state.toggleCount) {
      if (await AsyncStorageHelper.isMainNet()) {
        await AsyncStorageHelper.useTestNet()
        FlashNotification.showInformation(
          'You have successfully switched to TestNet!'
        )
      } else {
        await AsyncStorageHelper.useMainNet()
        FlashNotification.showInformation(
          'You have successfully switched to MainNet!'
        )
      }
      this.setState({ toggleCount: 1 })
    } else {
      this.setState({ toggleCount: this.state.toggleCount + 1 })
    }
    console.log(`this.state.toggleCount is ${this.state.toggleCount}`)
  }

  render () {
    return (
      <SafeAreaView style={cssStyles.safeContainer}>
        <StatusBar barStyle='light-content' backgroundColor='#1c2227' />
        {/* <View style={cssStyles.container}>
          <ScrollView style={cssStyles.contentContainer}>
            <SetupProgressBar navigation={this.props.navigation} />
            <TouchableWithoutFeedback onPress={this.testNetToggler}>
              <View>
                <Text style={cssStyles.wizardText}>
                  Welcome to ndau, a cryptocurrency designed to be a buoyant
                  long-term store of value.{' '}
                  {Platform.OS === 'android' ? '\n' : ''}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <Padding bottom={1}>
              <Text style={cssStyles.wizardText}>
                To get started securely, you will create a new wallet, protect
                it with a password, and create a recovery phrase which you will
                need in order to restore your wallet if you lose access to it.
                {Platform.OS === 'android' ? '\n' : ''}
              </Text>
            </Padding>

          </ScrollView>
          <View style={cssStyles.footer}>
            <CommonButton onPress={this.showNextSetup} title='Start' />
          </View>
        </View> */}
        <WebView
          source={{ uri: 'https://infinite.red/react-native' }}
          style={{ marginTop: 20 }}
          onLoadProgress={e => console.log(e.nativeEvent.progress)}
        />
      </SafeAreaView>
    )
  }
}

export default SetupWelcome
