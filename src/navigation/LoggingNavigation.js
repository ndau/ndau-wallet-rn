import React from 'react'
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import Logging from '../screens/Logging'
import AppDrawer from './AppDrawer'

const LoggingScreen = ({ navigation }) => <Logging navigation={navigation} />
LoggingScreen.navigationOptions = ({ navigation }) => ({
  header: null
})

const LoggingStack = createStackNavigator({
  Logging: { screen: LoggingScreen }
})

const LoggingNavigation = createDrawerNavigator(
  {
    Logging: {
      path: '/logging',
      screen: LoggingStack
    }
  },
  {
    contentComponent: AppDrawer
  }
)

export default LoggingNavigation
