import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  Platform,
  TouchableWithoutFeedback,
  BackHandler,
  StatusBar
} from 'react-native';
import CommonButton from '../components/CommonButton';
import cssStyles from '../css/styles';
import SetupStore from '../model/SetupStore';
import { SafeAreaView } from 'react-navigation';
import Stepper from '../components/SetupProgressBar';

class SetupWelcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleCount: 1,
      maxToggle: 10
    };
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  showNextSetup = () => {
    this.props.navigation.navigate('SetupNewOrRecovery');
  };

  render() {
    return (
      <SafeAreaView style={cssStyles.safeContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#1c2227" />

        <View style={cssStyles.container}>
          <ScrollView style={cssStyles.contentContainer}>
            <Stepper screenNumber={1} />
            <View>
              <Text style={cssStyles.wizardText}>
                Welcome to ndau, a cryptocurrency designed to be a buoyant long-term store of value.{' '}
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
            <CommonButton onPress={this.showNextSetup} title="Start" />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default SetupWelcome;
