import React, { Component } from 'react';
import { ScrollView, SafeAreaView, Alert, View, Text, BackHandler } from 'react-native';
import CollapsiblePanel from '../components/CollapsiblePanel';
import AsyncStorageHelper from '../model/AsyncStorageHelper';
import AlertPanel from '../components/AlertPanel';
import { connect } from 'react-redux';
import cssStyles from '../css/styles';
import { bindActionCreators } from 'redux';
import { pushSetup, setNavigator } from '../actions/NavigationActions';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    console.log(`props are ${JSON.stringify(this.props)}`);

    this.props.setNavigator(this.props.navigator);

    this.state = {};
  }

  static navigatorStyle = {
    topBarElevationShadowEnabled: false,
    disabledBackGesture: true
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

  componentWillMount() {
    if (!this.props.reduxProps) {
      this.loginOrSetup();
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  loginOrSetup = () => {
    AsyncStorageHelper.getAllKeys()
      .then((userIds) => {
        console.debug(`userIds is ${userIds}`);

        if (userIds.length > 0) {
          this.getPassphrase();
        } else {
          this.showSetup();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  getPassphrase = () => {
    this.props.pushSetup('ndau.Passphrase');
  };

  showSetup = () => {
    this.props.pushSetup('ndau.SetupMain');
  };

  render() {
    if (this.props.reduxProps) {
      console.debug(`user found is ${JSON.stringify(this.props.reduxProps.user, null, 2)}`);
      const { addresses, userId } = this.props.reduxProps.user ? this.props.reduxProps.user : [];
      console.debug(`renders addresses: ${addresses}`);
      return (
        <SafeAreaView style={cssStyles.safeContainer}>
          <View style={cssStyles.dashboardTextContainer}>
            <Text style={cssStyles.dashboardTextLarge}>Wallet {userId}</Text>
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
      );
    } else {
      return <SafeAreaView style={cssStyles.safeContainer} />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
    encryptionPassword: state.encryptionPassword,
    user: state.user
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ pushSetup, setNavigator }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
