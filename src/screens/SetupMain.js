import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  Platform,
  TouchableWithoutFeedback,
  BackHandler
} from 'react-native';
import CommonButton from '../components/CommonButton';
import cssStyles from '../css/styles';
import SetupStore from '../model/SetupStore';

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
        <View style={cssStyles.container}>
          <ScrollView style={cssStyles.contentContainer}>
            <TouchableWithoutFeedback onPress={this.testNetToggler}>
              <View>
                <Text style={cssStyles.wizardText}>
                  Welcome to ndau, a cryptocurrency designed to be a buoyant long-term store of
                  value.
                  {Platform.OS === 'android' ? '\n' : ''}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <View>
              <Text style={cssStyles.wizardText}>
                Currently, ndau is only available to accredited investors. You will need to have
                made your purchase through our site and have your six-character ID code ready in
                order to access this app before launch.{Platform.OS === 'android' ? '\n' : ''}
              </Text>
            </View>
            <View>
              <Text style={cssStyles.wizardText}>
                To get started securely, we will walk you through creating a new wallet. You will
                create a password to access this wallet, and a 12-word recovery passphrase that can
                be used to restore this wallet should you lose access to it (e.g. if you were to
                lose your mobile device).{Platform.OS === 'android' ? '\n' : ''}
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
