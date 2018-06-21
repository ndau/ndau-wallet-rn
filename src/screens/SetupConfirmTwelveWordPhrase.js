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

class SetupConfirmTwelveWordPhrase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
      showPasswords: false,
      progress: false
    };
  }

  onPushAnother = () => {
    this.props.navigator.push({
      label: 'SetupTermsOfService',
      screen: 'ndau.SetupTermsOfService',
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
              <Text style={styles.text}>Config twelve-word phrase</Text>
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
                Demonstrate that you wrote the phrase down by tapping them in order.
              </Text>
            </View>
            <TextInput
              style={styles.textInput}
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
              placeholder="Enter a password"
              placeholderTextColor="#f9f1f1"
              secureTextEntry={!this.state.showPasswords}
            />
            <TextInput
              style={styles.textInput}
              onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
              value={this.state.confirmPassword}
              placeholder="Confirm your password"
              placeholderTextColor="#f9f1f1"
              secureTextEntry={!this.state.showPasswords}
            />
            <View>
              <CheckBox
                style={styles.checkbox}
                onClick={() => this.checkedShowPasswords()}
                isChecked={this.state.showPasswords}
                rightText="Show passwords"
                rightTextStyle={styles.text}
              />
            </View>
            <View>
              <CheckBox
                style={styles.checkbox}
                onClick={() => this.checkedProgress()}
                isChecked={this.state.progress}
                rightText="I understand that ndau cannot help me recover my passphrase.
              To increase security, ndau does not store or have access to my passphrase"
                rightTextStyle={styles.text}
              />
            </View>
          </ScrollView>
          <View style={styles.footer}>
            <Button
              color="#4d9678"
              onPress={this.onPushAnother}
              title="Next"
              disabled={!this.state.progress}
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

export default SetupConfirmTwelveWordPhrase;
