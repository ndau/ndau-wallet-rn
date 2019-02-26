import React from 'react'
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import WalletOverview from '../screens/WalletOverview'
import AppDrawer from './AppDrawer'
import StyleConstants from '../css/styleConstants'
import AccountDetails from '../screens/AccountDetails'

const WalletOverviewScreen = ({ navigation }) => (
  <WalletOverview navigation={navigation} />
)
WalletOverviewScreen.navigationOptions = ({ navigation }) => ({
  header: null
})

const AccountDetailsScreen = ({ navigation }) => (
  <AccountDetails navigation={navigation} />
)
AccountDetailsScreen.navigationOptions = ({ navigation }) => ({
  header: null
})

const WalletOverviewStack = createStackNavigator({
  WalletOverview: { screen: WalletOverviewScreen },
  AccountDetails: { screen: AccountDetailsScreen }
})

const WalletOverviewNavigation = createDrawerNavigator(
  {
    WalletOverview: {
      path: '/walletoverview',
      screen: WalletOverviewStack
    }
  },
  {
    contentComponent: AppDrawer
  }
)

export default WalletOverviewNavigation
