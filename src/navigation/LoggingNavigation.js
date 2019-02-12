import React from 'react'
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import { DrawerButton } from '../components/DrawerButton'
import Logging from '../screens/Logging'
import DashboardDrawer from './DashboardDrawer'
import StyleConstants from '../css/styleConstants'

const LoggingScreen = ({ navigation }) => <Logging navigation={navigation} />
LoggingScreen.navigationOptions = ({ navigation }) => ({
  header: <DrawerButton navigation={navigation} />
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
    initialRouteName: 'Logging',
    contentComponent: DashboardDrawer,
    headerMode: 'node',
    drawerBackgroundColor: StyleConstants.DRAWER_BACKGROUND_COLOR
  }
)

export default LoggingNavigation
