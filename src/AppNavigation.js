// import React from 'react';
// import { createStackNavigator, createDrawerNavigator, SafeAreaView } from 'react-navigation';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Dashboard from '../screens/Dashboard';
// import DrawerButton from './DrawerButton';

// const MyNavScreen = ({ navigation, banner }) => <Dashboard />;

// const DashboardScreen = ({ navigation }) => <MyNavScreen navigation={navigation} />;
// DashboardScreen.navigationOptions = ({ navigation }) => ({
//   header: <DrawerButton navigation={navigation} />
// });

// const DashboardStack = createStackNavigator({
//   Dashboard: { screen: DashboardScreen }
// });

// DashboardStack.navigationOptions = {
//   drawerLabel: 'Dashboard',
//   drawerIcon: ({ tintColor }) => <MaterialIcons name="drafts" size={24} />
// };

// const Drawer = createDrawerNavigator(
//   {
//     Dashboard: {
//       path: '/',
//       screen: DashboardStack
//     }
//   },
//   {
//     initialRouteName: 'Dashboard',
//     contentOptions: {
//       // activeTintColor: '#e91e63'
//     }
//   }
// );

// export default Drawer;

import React from 'react';
import { YellowBox } from 'react-native';
import { createStackNavigator, createDrawerNavigator, SafeAreaView } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SampleText from './components/SampleText';
import { Button } from './components/ButtonWithMargin';
import { DrawerButton } from './components/DrawerButton';
import Dashboard from './screens/Dashboard';
import SetupMain from './screens/SetupMain';
import Passphrase from './screens/Passphrase';

//TODO: This is temporary until react-native-material-dropdown fixes their code
YellowBox.ignoreWarnings([ 'Warning: isMounted(...) is deprecated', 'Module RCTImageLoader' ]);

const PassphraseScreen = ({ navigation }) => <Passphrase navigation={navigation} />;
PassphraseScreen.navigationOptions = {
  header: null
};

const SetupMainScreen = ({ navigation }) => <SetupMain navigation={navigation} />;
SetupMainScreen.navigationOptions = ({ navigation }) => ({
  header: null
});

const DashboardScreen = ({ navigation }) => <Dashboard navigation={navigation} />;
DashboardScreen.navigationOptions = ({ navigation }) => ({
  header: <DrawerButton navigation={navigation} />
});

// const InboxStack = createStackNavigator({
//   Passphrase: { screen: PassphraseScreen },
//   SetupMain: { screen: SetupMainScreen }
// });

// InboxStack.navigationOptions = {
//   drawerLabel: 'Inbox',
//   drawerIcon: ({ tintColor }) => (
//     <MaterialIcons name="move-to-inbox" size={24} style={{ color: tintColor }} />
//   )
// };

const DashboardStack = createStackNavigator({
  Dashboard: { screen: DashboardScreen },
  SetupMain: { screen: SetupMainScreen },
  Passphrase: { screen: PassphraseScreen }
});

DashboardStack.navigationOptions = {
  drawerLabel: 'Dashboard',
  drawerIcon: ({ tintColor }) => (
    <MaterialIcons name="drafts" size={24} style={{ color: tintColor }} />
  )
};

const AppNavigation = createDrawerNavigator(
  {
    Dashboard: {
      path: '/dashboard',
      screen: DashboardStack
    }
  },
  {
    initialRouteName: 'Dashboard',
    contentOptions: {
      activeTintColor: '#e91e63'
    }
  }
);

export default AppNavigation;
