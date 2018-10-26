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

class SetupMain extends Component {
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
    this.props.navigation.navigate('SetupUserId');
  };

  testNetToggler = () => {
    if (this.state.maxToggle === this.state.toggleCount) {
      this.setState({ toggleCount: 1 });
      SetupStore.toggleAddressType();
    } else {
      this.setState({ toggleCount: this.state.toggleCount + 1 });
    }
    console.log(`this.state.toggleCount is ${this.state.toggleCount}`);
  };

  render() {
    return (
      <SafeAreaView style={cssStyles.safeContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#1c2227" />

        <View style={cssStyles.container}>
          <ScrollView style={cssStyles.contentContainer}>
            <Stepper screenNumber={1} />
            <TouchableWithoutFeedback onPress={this.testNetToggler}>
              <View>
                <Text style={cssStyles.wizardText}>
                  Welcome to ndau, the world’s first buoyant digital currency.
                  {Platform.OS === 'android' ? '\n' : ''}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <View>
              <Text style={cssStyles.wizardText}>
                Currently, ndau is only available to accredited investors who have already made an
                ndau purchase. To access this app, you will need the user ID we gave you.
                {Platform.OS === 'android' ? '\n' : ''}
              </Text>
            </View>
            <View>
              <Text style={cssStyles.wizardText}>
                You will set a password to protect this app, and be given the unique recovery phrase
                which can be used to restore your wallet. Be ready to write both down. If you do
                not, you will lose access to your ndau.
                {Platform.OS === 'android' ? '\n' : ''}
              </Text>
            </View>
          </ScrollView>
          <View style={cssStyles.footer}>
            <CommonButton onPress={this.showNextSetup} title="Create new wallet" />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default SetupMain;
