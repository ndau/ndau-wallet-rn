import React from 'react'
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import Dashboard from '../screens/Dashboard'
import AppDrawer from './AppDrawer'
import StyleConstants from '../css/styleConstants'

const DashboardScreen = ({ navigation }) => (
  <Dashboard navigation={navigation} />
)
DashboardScreen.navigationOptions = ({ navigation }) => ({
  header: null
})

const DashboardStack = createStackNavigator({
  Dashboard: { screen: DashboardScreen }
})

const DashboardNavigation = createDrawerNavigator(
  {
    Dashboard: {
      path: '/dashboard',
      screen: DashboardStack
    }
  },
  {
    contentComponent: AppDrawer
  }
)

export default DashboardNavigation
