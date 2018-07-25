import React, { Component } from 'react';

import { StyleSheet, ScrollView, SafeAreaView, Alert } from 'react-native';
import CollapsiblePanel from '../components/CollapsiblePanel';
import ndauApi from '../api/NdauAPI';
import AsyncStorageHelper from '../model/AsyncStorageHelper';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      passPhrase: null,
      loginAttempt: 1
    };

    this.maxLoginAttempts = 10;
  }

  componentDidMount = () => {
    this.loginOrSetup(this.props.encryptionPassword || this.state.passPhrase);
  };

  setPassphrase = (passPhrase) => {
    this.setState({ passPhrase: passPhrase });
    this.loginOrSetup(passPhrase);
  };

  loginOrSetup = (passPhrase) => {
    AsyncStorageHelper.getUser(passPhrase)
      .then((user) => {
        console.debug(`AsyncStorageHelper user is: ${JSON.stringify(user, null, 2)}`);
        if (user === null) {
          //if user is null then they have never been in the app
          this.showSetup();
        } else if (!passPhrase) {
          //else if the user is {} then we don't have a password...so get it
          this.getPassphrase();
        } else if (!user.addresses && this.state.loginAttempt < this.maxLoginAttempts) {
          //if the user {} and password was given then you did not give the right password
          Alert.alert(
            'Error',
            `Login attempt ${this.state.loginAttempt} of ${this.maxLoginAttempts} failed.`,
            [
              {
                text: 'OK',
                onPress: () => {
                  this.getPassphrase();
                  this.setState({ loginAttempt: this.state.loginAttempt + 1 });
                }
              }
            ],
            { cancelable: false }
          );
        }
        if (user) this.setState({ user });
      })
      .catch((error) => {
        console.debug(error);
      });
  };

  getPassphrase = () => {
    this.props.navigator.push({
      screen: 'ndau.Passphrase',
      title: 'Passphrase',
      backButtonHidden: true,
      passProps: {
        parentStyles: styles,
        iconsMap: this.props.iconsMap,
        setPassphrase: this.setPassphrase
      },
      navigatorStyle: {
        drawUnderTabBar: true,
        tabBarHidden: true
      },
      navigationOptions: {
        gesturesEnabled: false
      }
    });
  };

  showSetup = () => {
    this.props.navigator.push({
      screen: 'ndau.SetupMain',
      title: 'Setup',
      backButtonHidden: true,
      passProps: {
        parentStyles: styles,
        iconsMap: this.props.iconsMap
      },
      navigatorStyle: {
        drawUnderTabBar: true,
        tabBarHidden: true,
        disabledBackGesture: true
      }
    });
  };

  render() {
    const { addresses } = this.state.user;
    console.debug(`renders addresses: ${addresses}`);
    return (
      <SafeAreaView style={styles.safeContainer}>
        <ScrollView style={styles.container}>
          {addresses ? (
            addresses.map((address, index) => {
              return <CollapsiblePanel key={index} title={address} />;
            })
          ) : null}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

var styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#1c2227'
  },
  container: {
    flex: 1,
    backgroundColor: '#1c2227'
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'TitilliumWeb-Light'
  },
  textInput: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    paddingLeft: 10,
    color: '#000000',
    backgroundColor: '#ffffff',
    fontSize: 18,
    fontFamily: 'TitilliumWeb-Regular'
  },
  button: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#4d9678',
    backgroundColor: '#4d9678',
    borderRadius: 3,
    fontFamily: 'TitilliumWeb-Light',
    margin: '0.5%',
    padding: '2px',
    borderRadius: 3
  },
  wizardText: {
    color: '#ffffff',
    fontSize: 20
  },
  progress: {
    paddingTop: 8,
    paddingBottom: 8
  },
  errorText: {
    color: '#f75f4b',
    fontSize: 20
  },
  errorContainer: {
    backgroundColor: '#f5d8d1'
  }
});
