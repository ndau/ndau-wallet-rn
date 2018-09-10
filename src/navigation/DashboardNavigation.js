import React from 'react';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { DrawerButton } from '../components/DrawerButton';
import Dashboard from '../screens/Dashboard';
import DashboardDrawer from './DashboardDrawer';
import * as cssStyleConstants from '../css/styleConstants';

const DashboardScreen = ({ navigation }) => <Dashboard navigation={navigation} />;
DashboardScreen.navigationOptions = ({ navigation }) => ({
  header: <DrawerButton navigation={navigation} />
});

const DashboardStack = createStackNavigator({
  Dashboard: { screen: DashboardScreen }
});

const DashboardNavigation = createDrawerNavigator(
  {
    Dashboard: {
      path: '/dashboard',
      screen: DashboardStack
    }
  },
  {
    initialRouteName: 'Dashboard',
    contentComponent: DashboardDrawer,
    headerMode: 'node',
    drawerBackgroundColor: cssStyleConstants.DRAWER_BACKGROUND_COLOR
  }
);

export default DashboardNavigation;
