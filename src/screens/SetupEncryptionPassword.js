import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  ProgressViewIOS,
  Platform,
  ProgressBarAndroid,
  TextInput,
  SafeAreaView,
  Alert
} from 'react-native';
import CheckBox from 'react-native-check-box';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CommonButton from '../components/CommonButton';
import Randal from '../helpers/randal.js';

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

  componentDidMount = () => {
    this.props.navigator.setStyle({
      drawUnderTabBar: true,
      tabBarHidden: true
    });
  };

  usePassword(event) {
    this.onPushAnother(event);
  }

  checkPasswords = () => {
    return this.state.password === this.state.confirmPassword;
  };

  onPushAnother = async () => {
    if (!this.checkPasswords()) {
      Alert.alert(
        'Error',
        'The passwords entered do not match.',
        [ { text: 'OK', onPress: () => {} } ],
        { cancelable: false }
      );
      this.setState({ textInputColor: '#ff0000' });
      return;
    }

    newRandal = new Randal();
    newRandal.init().then(() => {
      this.props.navigator.push({
        label: 'SetupGetRandom',
        screen: 'ndau.SetupGetRandom',
        passProps: {
          randal: newRandal,
          encryptionPassword: this.state.password,
          userId: this.props.userId,
          parentStyles: this.props.parentStyles,
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
      [ { text: 'OK', onPress: () => {} } ],
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
              <Text style={styles.text}>Create an app password</Text>
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
              <Text style={styles.text} onPress={this.showInformation}>
                Data in this app will be encrypted to protect your ndau. You will need to enter a
                password to decrypt it whenever you open this app.{'  '}
                <FontAwesome name="info" color="#ffffff" size={20} style={{ marginBottom: 3 }} />
              </Text>
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
                style={this.props.parentStyles.checkbox}
                onClick={() => this.checkedShowPasswords()}
                isChecked={this.state.showPasswords}
                rightText="Show passwords"
                rightTextStyle={{
                  color: '#ffffff',
                  fontSize: 20,
                  fontFamily: 'TitilliumWeb-Regular'
                }}
                checkBoxColor="#ffffff"
              />
            </View>
            <View>
              <CheckBox
                style={this.props.parentStyles.checkbox}
                onClick={() => this.checkedProgress()}
                isChecked={this.state.progress}
                rightText="I understand that ndau cannot help me recover my password.
              To increase security, ndau does not store or have access to my password"
                rightTextStyle={{
                  color: '#ffffff',
                  fontSize: 20,
                  fontFamily: 'TitilliumWeb-Regular'
                }}
                checkBoxColor="#ffffff"
              />
            </View>
          </ScrollView>
          <View style={styles.footer}>
            <CommonButton
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
  infoParagraph: {
    flexDirection: 'row'
  }
});

export default SetupEncryptionPassword;
