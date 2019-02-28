import React from 'react'
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import { DrawerHeader } from '../components/common'
import Logging from '../screens/Logging'
import AppDrawer from './AppDrawer'
import StyleConstants from '../css/styleConstants'

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
