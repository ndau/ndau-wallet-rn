import React from 'react';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { DrawerButton } from '../components/DrawerButton';
import Dashboard from '../screens/Dashboard';
import DashboardDrawer from './DashboardDrawer';
import * as cssStyleConstants from '../css/styleConstants';
import cssStyles from '../css/styles';

// const SettingsScreen = ({ navigation }) => <Settings navigation={navigation} />;
// SettingsScreen.navigationOptions = ({ navigation }) => ({
//   header: <DrawerButton navigation={navigation} />
// });

const DashboardScreen = ({ navigation }) => <Dashboard navigation={navigation} />;
DashboardScreen.navigationOptions = ({ navigation }) => ({
  header: <DrawerButton navigation={navigation} />
});

// const SettingsStack = createStackNavigator({
//   Settings: { screen: SettingsScreen }
// });

// SettingsStack.navigationOptions = {
//   drawerLabel: 'Settings',
//   drawerIcon: ({ tintColor }) => (
//     <MaterialIcons name="move-to-inbox" size={24} style={{ color: tintColor }} />
//   )
// };

const DashboardStack = createStackNavigator({
  Dashboard: { screen: DashboardScreen }
});

// DashboardStack.navigationOptions = {
//   drawerLabel: 'Dashboard',
//   drawerIcon: ({ tintColor }) => (
//     <MaterialIcons name="drafts" size={24} style={{ color: tintColor }} />
//   )
// };

const DashboardNavigation = createDrawerNavigator(
  {
    Dashboard: {
      path: '/dashboard',
      screen: DashboardStack
    }
    // Settings: {
    //   path: '/settings',
    //   screen: SettingsStack
    // }
  },
  {
    initialRouteName: 'Dashboard',
    // contentOptions: {
    //   itemsContainerStyle: cssStyles.drawerStyle,
    //   labelStyle: cssStyles.drawerLabels,
    //   activeTintColor: cssStyleConstants.LINK_ORANGE,
    //   inactiveTintColor: 'white'
    // },
    contentComponent: DashboardDrawer,
    headerMode: 'node',
    drawerBackgroundColor: cssStyleConstants.DRAWER_BACKGROUND_COLOR
  }
);

export default DashboardNavigation;
