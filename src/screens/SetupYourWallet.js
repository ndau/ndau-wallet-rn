import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Button,
  ProgressViewIOS,
  Platform,
  ProgressBarAndroid,
  SafeAreaView
} from 'react-native';
import CheckBox from 'react-native-check-box';

class SetupYourWallet extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPushAnother = () => {
    this.props.navigator.push({
      label: 'SetupSeedPhrase',
      screen: 'ndau.SetupSeedPhrase',
      passProps: {
        encryptionPassword: this.props.password,
        userId: this.props.userId,
        parentStyles: this.props.parentStyles,
        entropy: this.props.entropy,
        iconsMap: this.props.iconsMap,
        numberOfAccounts: this.state.numberOfAccounts
      }
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <ScrollView style={styles.contentContainer}>
            <View>
              <Text style={this.props.parentStyles.wizardText}>Setup your wallet</Text>
            </View>
            <View>
              {Platform.OS === 'android' ? (
                <ProgressBarAndroid
                  styleAttr="Horizontal"
                  progress={0.5}
                  style={this.props.parentStyles.progress}
                  indeterminate={false}
                />
              ) : (
                <ProgressViewIOS progress={0.5} style={this.props.parentStyles.progress} />
              )}
            </View>
            <View>
              <Text style={this.props.parentStyles.wizardText}>
                Next we will give you a twelve-word phrase which is the key to restoring your
                wallet. You must WRITE IT DOWN and store it in a secure location or risk losing
                access to your funds. Do not save this phrase on your device or in the cloud.
              </Text>
            </View>
          </ScrollView>
          <View style={styles.footer}>
            <Button
              color="#4d9678"
              onPress={this.onPushAnother}
              title="Get my twelve-word phrase"
            />
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
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,

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
