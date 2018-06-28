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
  SafeAreaView,
  Alert,
  TouchableHighlight,
  Image
} from 'react-native';
import CheckBox from 'react-native-check-box';
import AsyncStorageHelper from '../model/AsyncStorageHelper';

class SetupEncryptionPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
      showPasswords: false,
      progress: false,
      textInputColor: '#000000'
    };
  }

  usePassword(event) {
    this.onPushAnother(event);
  }

  checkPasswords = () => {
    return this.state.password === this.state.confirmPassword;
  };

  onPushAnother = async () => {
    if (this.checkPasswords()) {
      this.setState({ textInputColor: '#ffffff' });
      const user = await AsyncStorageHelper.getUser(this.state.password);
      // user.password = this.state.password;
      user.setupStep = 'ndau.SetupGetRandom';
      await AsyncStorageHelper.setUser(user, this.state.password);
    } else {
      Alert.alert(
        'Error',
        'The passwords entered do not match.',
        [ { text: 'OK', onPress: () => console.log('OK Pressed') } ],
        { cancelable: false }
      );
      this.setState({ textInputColor: '#ff0000' });
      return;
    }

    this.props.navigator.push({
      label: 'SetupGetRandom',
      screen: 'ndau.SetupGetRandom',
      passProps: {
        encryptionPassword: this.state.password,
        userId: this.props.userId,
        parentStyles: this.props.parentStyles
      }
    });
  };

  checkedShowPasswords = () => {
    this.setState({ showPasswords: !this.state.showPasswords });
  };

  checkedProgress = () => {
    this.setState({ progress: !this.state.progress });
  };

  showInformation = () => {
    Alert.alert(
      'Information',
      'We use encryption to protect your data. This password protects ' +
        'this app on your mobile only. This is not the same thing as your ' +
        'twelve-word phrase, which codes for the key to your wallet. We ' +
        'recommend you use a strong password which you do not use anywhere else.',
      [ { text: 'OK', onPress: () => console.log('OK Pressed') } ],
      { cancelable: false }
    );
  };

  render() {
    const { textInputColor } = this.state;
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <ScrollView style={styles.contentContainer}>
            <View>
              <Text style={styles.text}>Encrypt your data</Text>
            </View>
            <View>
              {Platform.OS === 'android' ? (
                <ProgressBarAndroid
                  styleAttr="Horizontal"
                  progress={0.25}
                  style={this.props.parentStyles.progress}
                  indeterminate={false}
                />
              ) : (
                <ProgressViewIOS progress={0.25} style={this.props.parentStyles.progress} />
              )}
            </View>
            <View>
              <Text style={styles.text}>
                Data in this app will be encrypted to protect your ndau. You will need to enter a
                password to decrypt it whenever you are in this app.
              </Text>
              <View>
                <TouchableHighlight onPress={this.showInformation}>
                  <Image style={styles.infoIcon} source={require('../../img/info.png')} />
                </TouchableHighlight>
              </View>
            </View>
            <TextInput
              style={{
                height: 45,
                borderColor: 'gray',
                borderWidth: 1,
                marginBottom: 10,
                marginTop: 10,
                paddingLeft: 10,
                color: textInputColor,
                backgroundColor: '#ffffff',
                fontSize: 18,
                fontFamily: 'TitilliumWeb-Regular'
              }}
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
              placeholder="Enter a password"
              placeholderTextColor="#333"
              secureTextEntry={!this.state.showPasswords}
            />
            <TextInput
              style={{
                height: 45,
                borderColor: 'gray',
                borderWidth: 1,
                marginBottom: 10,
                marginTop: 10,
                paddingLeft: 10,
                color: textInputColor,
                backgroundColor: '#ffffff',
                fontSize: 18,
                fontFamily: 'TitilliumWeb-Regular'
              }}
              onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
              value={this.state.confirmPassword}
              placeholder="Confirm your password"
              placeholderTextColor="#333"
              secureTextEntry={!this.state.showPasswords}
            />
            <View>
              <CheckBox
                style={styles.checkbox}
                onClick={() => this.checkedShowPasswords()}
                isChecked={this.state.showPasswords}
                rightText="Show passwords"
                rightTextStyle={{
                  color: '#ffffff',
                  fontSize: 20,
                  fontFamily: 'TitilliumWeb-Regular'
                }}
              />
            </View>
            <View>
              <CheckBox
                style={styles.checkbox}
                onClick={() => this.checkedProgress()}
                isChecked={this.state.progress}
                rightText="I understand that ndau cannot help me recover my passphrase.
              To increase security, ndau does not store or have access to my passphrase"
                rightTextStyle={{
                  color: '#ffffff',
                  fontSize: 20,
                  fontFamily: 'TitilliumWeb-Regular'
                }}
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
  },
  checkbox: { flex: 1, padding: 10 },
  infoParagraph: {
    flexDirection: 'row'
  },
  infoIcon: {
    // marginLeft: 8,
    // marginBottom: 3
  }
});

export default SetupEncryptionPassword;
