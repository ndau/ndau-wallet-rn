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
  TextInput,
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
      label: 'SetupTwelveWordPhrase',
      screen: 'ndau.SetupTwelveWordPhrase',
      passProps: { props: this.props }
    });
  };

  checkedShowPasswords = () => {
    this.setState({ showPasswords: !this.state.showPasswords });
  };

  checkedProgress = () => {
    this.setState({ progress: !this.state.progress });
  };

  render() {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <ScrollView style={styles.contentContainer}>
            <View>
              <Text style={styles.text}>Setup your wallet</Text>
            </View>
            <View>
              {Platform.OS === 'android' ? (
                <ProgressBarAndroid
                  styleAttr="Horizontal"
                  progress={0.125}
                  style={styles.progress}
                />
              ) : (
                <ProgressViewIOS
                  trackTintColor="#4d9678"
                  progressTintColor="#dea85a"
                  progress={0.125}
                  style={styles.progress}
                />
              )}
            </View>
            <View>
              <Text style={styles.text}>
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
    backgroundColor: '#333333'
  },
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,

    backgroundColor: '#333333'
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
    paddingTop: 10
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    paddingLeft: 10,
    color: '#ffffff',
    fontSize: 22,
    fontFamily: 'TitilliumWeb-Regular'
  },
  checkbox: { flex: 1, padding: 10 }
});

export default SetupYourWallet;
