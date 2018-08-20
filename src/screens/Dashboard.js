import React, { Component } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, Alert, View, Text, Linking } from 'react-native';
import CollapsiblePanel from '../components/CollapsiblePanel';
import AsyncStorageHelper from '../model/AsyncStorageHelper';
import ndauApi from '../api/NdauAPI';
import AlertPanel from '../components/AlertPanel';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      passPhrase: null,
      loginAttempt: 1,
      newsLinks: [
        {
          _id: '5b593b4d3823e9a563447b94',
          linkTitle: 'Your ndau Dashboard',
          linkTarget: 'https://ndaudashboard.ndau.tech'
        },
        {
          _id: '5b593b4d3823e9a563447b95',
          linkTitle: "Please check Oneiro's site for ndau information",
          linkTarget: 'https://oneiro.io'
        }
      ]
    };

    this.maxLoginAttempts = 10;
  }

  componentDidMount = () => {
    ndauApi
      .getNdauNewsLinks()
      .then((links) => {
        this.setState({ newsLinks: links });
      })
      .catch((error) => {
        console.debug(error);
      });
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
      passProps: {
        parentStyles: styles,
        iconsMap: this.props.iconsMap
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
    const { addresses } = this.state.user;
    console.debug(`renders addresses: ${addresses}`);
    return addresses ? (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.dashboardTextContainer}>
          <Text style={styles.dashboardTextLarge}>Wallet {this.state.user.userId}</Text>
        </View>
        <AlertPanel alertText="Welcome to the ndau wallet! We are currently verifying your wallet setup. ndau will be
            sent to this app on Genesis Day. Until then, you can continue to view your holdings on
            the online dashboard." />
        <View style={styles.dashboardTextContainer}>
          <Text style={styles.dashboardTextSmall}>{addresses.length} addresses</Text>
        </View>
        <ScrollView style={styles.container}>
          {addresses ? (
            addresses.map((address, index) => {
              return <CollapsiblePanel key={index} title={`Address ${index}`} address={address} />;
            })
          ) : null}
        </ScrollView>
      </SafeAreaView>
    ) : null;
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
    fontSize: 20,
    fontFamily: 'TitilliumWeb-Regular'
  },
  progress: {
    paddingTop: 8,
    paddingBottom: 8
  },
  dashboardTextContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  dashboardTextLarge: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffffff',
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 28,
    paddingBottom: 10
  },
  dashboardTextSmall: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#4d9678',
    fontFamily: 'TitilliumWeb-Light',
    fontSize: 22,
    shadowOpacity: 0.2,
    shadowColor: '#4e957a',
    shadowRadius: 3,
    paddingBottom: 10,
    paddingTop: 10
  },
  linkText: {
    color: '#dea85a',
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 15,
    textDecorationLine: 'underline',
    shadowOpacity: 0.5,
    shadowColor: '#dea85a',
    shadowRadius: 3
  },
  linkContainer: {
    paddingBottom: 10,
    paddingLeft: 50,
    paddingRight: 50
  },
  checkbox: { flex: 1, padding: 10 },
  stepper: {
    width: 30,
    height: 25,
    backgroundColor: 'transparent'
  }
});
