import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, SafeAreaView } from 'react-native';
import CommonButton from '../components/CommonButton';
import Stepper from '../components/Stepper';

class SetupYourWallet extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    this.props.navigator.setStyle({
      drawUnderTabBar: true,
      tabBarHidden: true
    });
  };

  onPushAnother = () => {
    this.props.navigator.push({
      label: 'SetupSeedPhrase',
      screen: 'ndau.SetupSeedPhrase',
      passProps: {
        encryptionPassword: this.props.encryptionPassword,
        qrToken: this.props.qrToken,
        userId: this.props.userId,
        parentStyles: this.props.parentStyles,
        entropy: this.props.entropy,
        iconsMap: this.props.iconsMap,
        numberOfAccounts: this.props.numberOfAccounts
      },
      navigatorStyle: {
        drawUnderTabBar: true,
        tabBarHidden: true,
        disabledBackGesture: true
      },
      backButtonHidden: true
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={this.props.parentStyles.container}>
          <ScrollView style={styles.contentContainer}>
            <Stepper screenNumber={4} />

            <View>
              <Text style={this.props.parentStyles.wizardText}>
                Next we will give you a seed phrase which is the key to restoring your wallet. You
                must WRITE IT DOWN and store it in a secure location or risk losing access to your
                funds. Do not save this phrase on your device or in the cloud. Do not do this step
                in a public place.
              </Text>
            </View>
          </ScrollView>
          <View style={styles.footer}>
            <CommonButton onPress={this.onPushAnother} title="Get my seed phrase" />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#1c2227'
  },
  button: {
    marginTop: 0
  },
  text: {
    color: '#ffffff',
    fontSize: 22,
    fontFamily: 'TitilliumWeb-Regular'
  },
  contentContainer: {
    flex: 1 // pushes the footer to the end of the screen
  },
  footer: {
    justifyContent: 'flex-end'
  },
  progress: {
    paddingTop: 15,
    paddingBottom: 15
  }
});

export default SetupYourWallet;
