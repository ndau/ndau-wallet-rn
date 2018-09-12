import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { ScrollView, View, Text, StatusBar } from 'react-native';
import CollapsiblePanel from '../components/CollapsiblePanel';
import AsyncStorageHelper from '../model/AsyncStorageHelper';
import AlertPanel from '../components/AlertPanel';
import cssStyles from '../css/styles';
import UserStore from '../model/UserStore';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
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
    this.props.navigation.navigate('Passphrase', {
      onNavigateBack: this.handleOnNavigateBack
    });
  };

  showSetup = () => {
    this.props.navigation.navigate('SetupMain');
  };

  render() {
    console.log(`rendering Dashboard`);
    const user = UserStore.getUser();

    if (Object.keys(user).length > 0) {
      console.debug(`user found is ${JSON.stringify(user, null, 2)}`);
      const { addresses, userId } = user;
      console.debug(`renders addresses: ${addresses}`);
      return addresses ? (
        <SafeAreaView style={cssStyles.safeContainer}>
          <StatusBar barStyle="light-content" backgroundColor="#1c2227" />
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
      ) : (
        <SafeAreaView style={cssStyles.safeContainer} />
      );
    } else {
      return <SafeAreaView style={cssStyles.safeContainer} />;
    }
  }
}

export default Dashboard;
