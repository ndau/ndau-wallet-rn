import React, { Component } from 'react'

import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableWithoutFeedback
} from 'react-native'
import CommonButton from '../components/CommonButton'
import SetupProgressBar from '../components/SetupProgressBar'
import cssStyles from '../css/styles'
import { SafeAreaView } from 'react-navigation'
import EntropyHelper from '../helpers/EntropyHelper'

class SetupYourWallet extends Component {
  showNextSetup = async () => {
    const user = this.props.navigation.getParam('user', {})

    await EntropyHelper.generateEntropy()
    this.props.navigation.navigate('SetupRecoveryPhrase', {
      walletSetupType:
        this.props.navigation.state.params &&
        this.props.navigation.state.params.walletSetupType,
      user
    })
  }

  testNetToggler = () => {
    if (this.state.maxToggle === this.state.toggleCount) {
      this.setState({ toggleCount: 1 })
      SetupStore.toggleAddressType()
    } else {
      this.setState({ toggleCount: this.state.toggleCount + 1 })
    }
    console.log(`this.state.toggleCount is ${this.state.toggleCount}`)
  }

  render () {
    return (
      <SafeAreaView style={cssStyles.safeContainer}>
        <View style={cssStyles.container}>
          <ScrollView style={cssStyles.contentContainer}>
            <SetupProgressBar navigation={this.props.navigation} />
            <TouchableWithoutFeedback onPress={this.testNetToggler}>
              <View>
                <Text style={cssStyles.wizardText}>
                  Next we will give you a recovery phrase. This is critical to
                  restoring your wallet. You risk losing access to your funds if
                  you do not WRITE IT DOWN and store it in a secure location. Do
                  not save this phrase on your device or in the cloud. Do not do
                  this step in a public place where someone looking over your
                  shoulder could see this phrase.
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
          <View style={cssStyles.footer}>
            <CommonButton
              onPress={this.showNextSetup}
              title='Get my recovery phrase'
            />
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#ffffff',
    fontSize: 22,
    fontFamily: 'TitilliumWeb-Regular'
  }
})

export default SetupYourWallet
