import React from 'react'
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import Settings from '../screens/Settings'
import AppDrawer from './AppDrawer'

const SettingsScreen = ({ navigation }) => <Settings navigation={navigation} />
SettingsScreen.navigationOptions = ({ navigation }) => ({
  header: null
})

const SettingsStack = createStackNavigator({
  Settings: { screen: SettingsScreen }
})

const SettingsNavigation = createDrawerNavigator(
  {
    Settings: {
      path: '/dashboard',
      screen: SettingsStack
    }
  },
  {
    contentComponent: AppDrawer
  }
)

export default SettingsNavigation
