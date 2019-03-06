import React from 'react'
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import WalletOverview from '../screens/WalletOverview'
import AppDrawer from './AppDrawer'
import AccountDetails from '../screens/AccountDetails'
import AccountLock from '../screens/AccountLock'
import AccountHistory from '../screens/AccountHistory'
import AccountLockConfirmation from '../screens/AccountLockConfirmation'
import IdentityMind from '../screens/IdentityMind'
import IdentityVerificationIntro from '../screens/IdentityVerificationIntro'
import IdentityVerificationSuccess from '../screens/IdentityVerificationSuccess'

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

const AccountLockScreen = ({ navigation }) => (
  <AccountLock navigation={navigation} />
)
AccountLockScreen.navigationOptions = ({ navigation }) => ({
  header: null
})

const AccountHistoryScreen = ({ navigation }) => (
  <AccountHistory navigation={navigation} />
)
AccountHistoryScreen.navigationOptions = ({ navigation }) => ({
  header: null
})

const AccountLockConfirmationScreen = ({ navigation }) => (
  <AccountLockConfirmation navigation={navigation} />
)
AccountLockConfirmationScreen.navigationOptions = ({ navigation }) => ({
  header: null
})

const IdentityMindScreen = ({ navigation }) => (
  <IdentityMind navigation={navigation} />
)
IdentityMindScreen.navigationOptions = {
  header: null
}

const IdentityVerificationIntroScreen = ({ navigation }) => (
  <IdentityVerificationIntro navigation={navigation} />
)
IdentityVerificationIntroScreen.navigationOptions = {
  header: null
}

const IdentityVerificationSuccessScreen = ({ navigation }) => (
  <IdentityVerificationSuccess navigation={navigation} />
)
IdentityVerificationSuccessScreen.navigationOptions = {
  header: null
}

const WalletOverviewStack = createStackNavigator({
  WalletOverview: { screen: WalletOverviewScreen },
  AccountDetails: { screen: AccountDetailsScreen },
  AccountLock: { screen: AccountLockScreen },
  AccountHistory: { screen: AccountHistoryScreen },
  AccountLockConfirmation: { screen: AccountLockConfirmationScreen },
  IdentityMind: { screen: IdentityMindScreen },
  IdentityVerificationIntro: { screen: IdentityVerificationIntroScreen },
  IdentityVerificationSuccess: { screen: IdentityVerificationSuccessScreen }
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
