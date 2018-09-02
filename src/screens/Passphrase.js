import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  SafeAreaView,
  Alert,
  Image,
  TouchableOpacity,
  Text
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CommonButton from '../components/CommonButton';
import { Dropdown } from 'react-native-material-dropdown';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  pushSetup,
  push,
  setEncryptionPassword,
  setUserId,
  setNavigator,
  setUser,
  startTabBasedApp
} from '../actions/NavigationActions';
import cssStyles from '../css/styles';
import AsyncStorageHelper from '../model/AsyncStorageHelper';
import RNExitApp from 'react-native-exit-app';

class Passphrase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      showErrorText: false,
      userIds: [],
      userId: '',
      loginAttempt: 1
    };

    this.maxLoginAttempts = 10;
  }

  componentWillMount = async () => {
    const userIds = await AsyncStorageHelper.getAllKeys();
    let userIdsForDropdown = userIds.map((userId) => {
      return { value: userId };
    });
    this.setState({ userIds: userIdsForDropdown });
  };

  login = () => {
    AsyncStorageHelper.getUser(this.state.userId, this.state.password)
      .then((user) => {
        if (user) {
          this.props.setUser(user);
          this.props.startTabBasedApp();
        } else {
          this.showLoginError();
        }
      })
      .catch((error) => {
        this.showLoginError();
      });
  };

  showExitApp() {
    Alert.alert(
      '',
      `You have hit the maximum amount of login attempts.`,
      [
        {
          text: 'Exit app',
          onPress: () => {
            RNExitApp.exitApp();
          }
        }
      ],
      { cancelable: false }
    );
  }

  showLoginError = () => {
    if (this.state.loginAttempt === this.maxLoginAttempts) {
      this.showExitApp();
    }
    Alert.alert(
      'Error',
      `Login attempt ${this.state.loginAttempt} of ${this.maxLoginAttempts} failed.`,
      [
        {
          text: 'OK',
          onPress: () => {
            this.props.setUser(null);
            this.setState({ loginAttempt: this.state.loginAttempt + 1 });
          }
        }
      ],
      { cancelable: false }
    );
  };

  showInformation = () => {
    Alert.alert(
      'Information',
      'Please enter the password you chose to encrypt this app. ' +
        'This is not the same thing as your six-character ID or key ' +
        'seed phrase.',
      [ { text: 'OK', onPress: () => {} } ],
      { cancelable: false }
    );
  };

  showSetup = () => {
    this.props.pushSetup('ndau.SetupMain', this.props.navigator);
  };

  render() {
    console.log(`rendering Passphrase`);
    const { textInputColor } = this.state;
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <ScrollView style={styles.contentContainer}>
            <View style={styles.imageView}>
              <Image style={styles.image} source={require('../../img/n_icon_ko.png')} />
            </View>
            <View style={styles.footer}>
              <Dropdown
                label="Please choose a User ID"
                data={this.state.userIds}
                baseColor="#ffffff"
                selectedItemColor="#000000"
                textColor="#ffffff"
                itemTextStyle={styles.text}
                fontSize={18}
                labelFontSize={14}
                // value={this.state.userId}
                onChangeText={(userId) => this.setState({ userId })}
              />
            </View>
            <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10 }}>
              <TextInput
                style={{
                  height: 45,
                  width: '93%',
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
                placeholder="Enter your app password"
                placeholderTextColor="#333"
                secureTextEntry={!this.state.showPasswords}
              />
              <TouchableOpacity onPress={this.showInformation}>
                <FontAwesome name="info" color="#ffffff" size={20} style={styles.infoIcon} />
              </TouchableOpacity>
            </View>
            {this.state.showErrorText ? (
              <View style={styles.errorContainer}>
                <Text style={cssStyles.errorText}>
                  Please enter the passphrase you chose to decrypt this app.{' '}
                </Text>
              </View>
            ) : null}
          </ScrollView>
          <View style={styles.footer}>
            <View style={styles.textContainer}>
              <Text onPress={this.showSetup} style={styles.linkText}>
                Create a new user
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>or</Text>
            </View>
            <CommonButton onPress={this.login} title="Login" />
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
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  text: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'TitilliumWeb-Regular'
  },
  contentContainer: {
    flex: 1 // pushes the footer to the end of the screen
  },
  footer: {
    justifyContent: 'flex-end',
    margin: 10
  },
  imageView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40
  },
  image: {
    tintColor: '#4e957a'
  },
  infoIcon: {
    marginLeft: 12,
    marginTop: 20
  },
  linkText: {
    color: '#dea85a',
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 18,
    textDecorationLine: 'underline'
  }
});

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { pushSetup, push, setEncryptionPassword, setUserId, setNavigator, setUser, startTabBasedApp },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Passphrase);
