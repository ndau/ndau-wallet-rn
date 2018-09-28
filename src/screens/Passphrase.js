import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
  Text,
  StatusBar,
  Platform
} from 'react-native';
import CommonButton from '../components/CommonButton';
import cssStyles from '../css/styles';
import AsyncStorageHelper from '../model/AsyncStorageHelper';
import RNExitApp from 'react-native-exit-app';
import { SafeAreaView } from 'react-navigation';
import StyleConstants from '../css/styleConstants';
import NdauNodeAPIHelper from '../helpers/NdauNodeAPIHelper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Dropdown from '../components/Dropdown';

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
    try {
      const userIds = await AsyncStorageHelper.getAllKeys();
      this.setState({ userIds });
    } catch (error) {
      console.error(error);
    }
  };

  login = async () => {
    try {
      const user = await AsyncStorageHelper.unlockUser(this.state.userId, this.state.password);
      // .then((user) => {
      if (user) {
        console.log(`user in Passphrase found is ${JSON.stringify(user, null, 2)}`);

        const userWithData = await NdauNodeAPIHelper.populateCurrentUserWithAddressData(user);

        this.props.navigation.navigate('Dashboard', { user: userWithData });
      } else {
        this.showLoginError();
      }
      // })
    } catch (error) {
      console.error(error);
      this.showLoginError();
    }
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
        'recovery phrase.',
      [ { text: 'OK', onPress: () => {} } ],
      { cancelable: false }
    );
  };

  showSetup = () => {
    this.props.navigation.navigate('Setup');
  };

  dropDownSelected = (index, value) => {
    console.log(`index: ${index} and value is ${value}`);
    this.setState({
      userId: value
    });
  };

  render() {
    console.log(`rendering Passphrase`);
    const { textInputColor } = this.state;
    return (
      <SafeAreaView style={cssStyles.safeContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#1c2227" />
        <View style={cssStyles.container}>
          <ScrollView style={cssStyles.contentContainer}>
            <View style={styles.imageView}>
              <Image style={styles.image} source={require('../../img/n_icon_ko.png')} />
            </View>
            <View style={styles.footer}>
              <Dropdown
                defaultValue="User ID..."
                defaultIndex={1}
                options={this.state.userIds}
                onSelect={this.dropDownSelected}
                full={false}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TextInput
                style={{
                  height: hp('7%'),
                  width: wp('100%'),
                  borderColor: 'gray',
                  borderWidth: 1,
                  borderRadius: 3,
                  marginTop: hp('1%'),
                  paddingLeft: wp('1%'),
                  color: '#000000',
                  backgroundColor: '#ffffff',
                  fontSize: 18,
                  fontFamily: 'TitilliumWeb-Regular'
                }}
                onChangeText={(password) => this.setState({ password })}
                value={this.state.password}
                placeholder="App Password"
                placeholderTextColor="#333"
                secureTextEntry={!this.state.showPasswords}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.imageView}>
              <TouchableOpacity onPress={this.showInformation}>
                <Image
                  style={{ width: 35, height: 38, marginTop: hp('1%') }}
                  source={require('../../img/info_icon_gold.png')}
                />
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
            <View style={{ marginTop: 10 }}>
              <CommonButton onPress={this.login} title="Login" />
            </View>
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
    justifyContent: 'flex-end'
    // margin: 10
  },
  imageView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: hp('4%')
  },
  image: {
    tintColor: '#4e957a',
    ...Platform.select({
      ios: {
        marginTop: hp('3%')
      },
      android: {
        marginTop: hp('2%')
      }
    })
  },
  infoIcon: {
    marginLeft: 12,
    marginTop: 20
  },
  linkText: {
    color: StyleConstants.LINK_ORANGE,
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 18,
    textDecorationLine: 'underline'
  }
});

export default Passphrase;
