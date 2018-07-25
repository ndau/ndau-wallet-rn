import React, { Component } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, Alert, View, Text, Linking } from 'react-native';
import CollapsiblePanel from '../components/CollapsiblePanel';
import AsyncStorageHelper from '../model/AsyncStorageHelper';
import ndauApi from '../api/NdauAPI';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      passPhrase: null,
      loginAttempt: 1,
      newsLinks: [
        { linkTitle: `The ndau Dashboard`, linkTarget: 'https://ndaudashboard.ndau.tech' },
        { linkTitle: `Check Oneiro's site for ndau information`, linkTarget: 'https://oneiro.io' }
      ]
    };

    this.maxLoginAttempts = 10;
  }

  componentDidMount = () => {
    ndauApi
      .getNdauNewsLinks()
      .then((links) => {
        this.setState({ newsLinks: link });
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
      }
    });
  };

  render() {
    const { addresses } = this.state.user;
    console.debug(`renders addresses: ${addresses}`);
    return addresses ? (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.dashboardTextContainer}>
          <Text style={styles.dashboardTextLarge}>User {this.state.user.userId}</Text>
          <Text style={styles.dashboardTextSmall}>{addresses.length} addresses</Text>
        </View>
        <View style={styles.greenAlertContainer}>
          <Text style={styles.greenAlertText}>
            Welcome to the ndau wallet! We are currently verifying your wallet setup. ndau will be
            sent to this app on Genesis Day. Until then, you can continue to view your holdings on
            the online dashboard.
          </Text>
        </View>
        <View style={styles.dashboardTextContainer}>
          <Text style={styles.dashboardTextSmall}>News</Text>
        </View>
        <View style={styles.whiteLinksContainer}>
          {this.state.newsLinks.map((link, index) => {
            return (
              <Text
                key={index}
                style={styles.whiteLinkText}
                onPress={() => Linking.openURL(link.linkTarget)}
              >
                - {link.linkTitle}
              </Text>
            );
          })}
        </View>
        <ScrollView style={styles.container}>
          {addresses ? (
            addresses.map((address, index) => {
              return <CollapsiblePanel key={index} title={address} />;
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
  },
  dashboardTextContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  dashboardTextLarge: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#4d9678',
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 40,
    shadowOpacity: 0.5,
    shadowColor: '#4e957a',
    shadowRadius: 3
  },
  dashboardTextSmall: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#4d9678',
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 30,
    shadowOpacity: 0.5,
    shadowColor: '#4e957a',
    shadowRadius: 3,
    paddingBottom: 10
  },
  greenAlertContainer: {
    backgroundColor: '#c7f3e2',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#4d9678',
    borderRadius: 3,
    padding: 5,
    borderRadius: 3
  },
  greenAlertText: {
    color: '#4e957a',
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 20
  },
  whiteLinkText: {
    color: '#fff',
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 15
  },
  whiteLinksContainer: {
    paddingBottom: 10,
    paddingLeft: 50,
    paddingRight: 50
  }
});
