import React, { Component } from 'react';
import { ScrollView, SafeAreaView, Alert, View, Text, BackHandler } from 'react-native';
import CollapsiblePanel from '../components/CollapsiblePanel';
import AsyncStorageHelper from '../model/AsyncStorageHelper';
import AlertPanel from '../components/AlertPanel';
import { connect } from 'react-redux';
import cssStyles from '../css/styles';
import { bindActionCreators } from 'redux';
import { pushSetup, setNavigator } from '../actions/NavigationActions';

function mapStateToProps(state) {
  return {
    userId: state.userId,
    password: state.password
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ pushSetup, setNavigator }, dispatch);
}

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.props.setNavigator(this.props.navigator);

    this.state = {
      user: {},
      passPhrase: null,
      userId: '',
      loginAttempt: 1
    };

    this.maxLoginAttempts = 10;
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

  componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    this.loginOrSetup(this.props.encryptionPassword || this.state.passPhrase);
  };

  loginOrSetup = (userId, passPhrase) => {
    console.debug(`Checking if ${userId} is present...`);
    AsyncStorageHelper.getUser(userId, passPhrase)
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
    this.props.pushSetup('ndau.Passphrase');
  };

  showSetup = () => {
    this.props.pushSetup('ndau.SetupMain');
  };

  render() {
    const { addresses } = this.state.user;
    console.debug(`renders addresses: ${addresses}`);
    return addresses ? (
      <SafeAreaView style={cssStyles.safeContainer}>
        <View style={cssStyles.dashboardTextContainer}>
          <Text style={cssStyles.dashboardTextLarge}>Wallet {this.state.user.userId}</Text>
        </View>
        <AlertPanel alertText="Welcome to the ndau wallet! We are currently verifying your wallet setup. ndau will be
            sent to this app on Genesis Day. Until then, you can continue to view your holdings on
            the online dashboard." />
        <View style={cssStyles.dashboardTextContainer}>
          <Text style={cssStyles.dashboardTextSmall}>{addresses.length} addresses</Text>
        </View>
        <ScrollView style={cssStyles.container}>
          {addresses ? (
            addresses.map((address, index) => {
              const counter = index + 1;
              return (
                <CollapsiblePanel
                  key={index}
                  index={index}
                  title={`Address ${counter}`}
                  address={address}
                >
                  <Text style={cssStyles.text}>{address}</Text>
                </CollapsiblePanel>
              );
            })
          ) : null}
        </ScrollView>
      </SafeAreaView>
    ) : (
      <SafeAreaView style={cssStyles.safeContainer} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
