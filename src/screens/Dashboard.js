import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { ScrollView, View, Text } from 'react-native';
import CollapsiblePanel from '../components/CollapsiblePanel';
import AsyncStorageHelper from '../model/AsyncStorageHelper';
import AlertPanel from '../components/AlertPanel';
import cssStyles from '../css/styles';
import UserStore from '../model/UserStore';
import DrawerButton from '../components/DrawerButton';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  // componentWillMount() {}

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

  // handleOnNavigateBack = (user) => {
  //   this.setState({
  //     user
  //   });
  // };

  render() {
    console.log(`rendering Dashboard`);
    // if (Object.keys(UserStore.getUser()).length == 0) {
    //   this.loginOrSetup();
    //   return <SafeAreaView style={cssStyles.safeContainer} />;
    // }
    const user = UserStore.getUser();

    if (Object.keys(user).length > 0) {
      console.debug(`user found is ${JSON.stringify(user, null, 2)}`);
      const { addresses, userId } = user;
      console.debug(`renders addresses: ${addresses}`);
      return addresses ? (
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
      ) : (
        <SafeAreaView style={cssStyles.safeContainer} />
      );
    } else {
      return <SafeAreaView style={cssStyles.safeContainer} />;
    }
  }
}

// const DashboardScreen = ({ navigation }) => <Dashboard navigation={navigation} />;
// DashboardScreen.navigationOptions = ({ navigation }) => ({
//   header: <DrawerButton navigation={navigation} />
// });

// const SettingsScreen = ({ navigation }) => <Settings navigation={navigation} />;
// SettingsScreen.navigationOptions = {
//   header: <DrawerButton navigation={navigation} />
// };

// const DashboardStack = createStackNavigator({
//   Dashboard: { screen: DashboardScreen }
// });

// DashboardStack.navigationOptions = {
//   drawerLabel: 'Dashboard',
//   drawerIcon: ({ tintColor }) => (
//     <MaterialIcons name="drafts" size={24} style={{ color: tintColor }} />
//   )
// };

// const SettingsStack = createStackNavigator({
//   Settings: { screen: SettingsScreen }
// });

// SettingsStack.navigationOptions = {
//   drawerLabel: 'Settings',
//   drawerIcon: ({ tintColor }) => (
//     <MaterialIcons name="move-to-inbox" size={24} style={{ color: tintColor }} />
//   )
// };

// export default createDrawerNavigator(
//   {
//     Dashboard: {
//       path: '/dashboard',
//       screen: DashboardStack
//     },
//     Settings: {
//       path: '/settings',
//       screen: SettingsStack
//     }
//   },
//   {
//     initialRouteName: 'Dashboard',
//     contentOptions: {
//       activeTintColor: '#e91e63'
//     }
//   }
// );

export default Dashboard;
