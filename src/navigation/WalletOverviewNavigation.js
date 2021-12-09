/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import React from 'react'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createStackNavigator } from 'react-navigation-stack'
import WalletOverview from '../screens/WalletOverview'
import AppDrawer from './AppDrawer'
import AccountDetails from '../screens/account/AccountDetails'
import AccountLock from '../screens/account/AccountLock'
import AccountLockType from '../screens/account/AccountLockType'
import AccountLockChooseAccount from '../screens/account/AccountLockChooseAccount'
import AccountUnlock from '../screens/account/AccountUnlock'
import AccountSend from '../screens/account/AccountSend'
import AccountReceive from '../screens/account/AccountReceive'
import AccountSendConfirmation from '../screens/account/AccountSendConfirmation'
import AccountHistory from '../screens/account/AccountHistory'
import AccountLockConfirmation from '../screens/account/AccountLockConfirmation'

const WalletOverviewScreen = ({ navigation }) => (
  <WalletOverview navigation={navigation} />
)
WalletOverviewScreen.navigationOptions = ({ navigation }) => ({
    headerShown: false
})

const AccountDetailsScreen = ({ navigation }) => (
  <AccountDetails navigation={navigation} />
)
AccountDetailsScreen.navigationOptions = ({ navigation }) => ({
    headerShown: false
})

const AccountLockScreen = ({ navigation }) => (
  <AccountLock navigation={navigation} />
)
AccountLockScreen.navigationOptions = ({ navigation }) => ({
    headerShown: false
})

const AccountLockTypeScreen = ({ navigation }) => (
  <AccountLockType navigation={navigation} />
)
AccountLockTypeScreen.navigationOptions = ({ navigation }) => ({
    headerShown: false
})

const AccountLockChooseAccountScreen = ({ navigation }) => (
  <AccountLockChooseAccount navigation={navigation} />
)
AccountLockChooseAccountScreen.navigationOptions = ({ navigation }) => ({
    headerShown: false
})

const AccountUnlockScreen = ({ navigation }) => (
  <AccountUnlock navigation={navigation} />
)
AccountUnlockScreen.navigationOptions = ({ navigation }) => ({
    headerShown: false
})

const AccountSendScreen = ({ navigation }) => (
  <AccountSend navigation={navigation} />
)
AccountSendScreen.navigationOptions = ({ navigation }) => ({
    headerShown: false
})

const AccountReceiveScreen = ({ navigation }) => (
  <AccountReceive navigation={navigation} />
)
AccountReceiveScreen.navigationOptions = ({ navigation }) => ({
    headerShown: false
})

const AccountSendConfirmationScreen = ({ navigation }) => (
  <AccountSendConfirmation navigation={navigation} />
)
AccountSendConfirmationScreen.navigationOptions = ({ navigation }) => ({
    headerShown: false
})

const AccountHistoryScreen = ({ navigation }) => (
  <AccountHistory navigation={navigation} />
)
AccountHistoryScreen.navigationOptions = ({ navigation }) => ({
    headerShown: false
})

const AccountLockConfirmationScreen = ({ navigation }) => (
  <AccountLockConfirmation navigation={navigation} />
)
AccountLockConfirmationScreen.navigationOptions = ({ navigation }) => ({
    headerShown: false
})

const WalletOverviewStack = createStackNavigator({
  WalletOverview: { screen: WalletOverviewScreen },
  AccountDetails: { screen: AccountDetailsScreen },
  AccountLock: { screen: AccountLockScreen },
  AccountLockType: { screen: AccountLockTypeScreen },
  AccountLockChooseAccount: { screen: AccountLockChooseAccountScreen },
  AccountUnlock: { screen: AccountUnlockScreen },
  AccountSend: { screen: AccountSendScreen },
  AccountReceive: { screen: AccountReceiveScreen },
  AccountSendConfirmation: { screen: AccountSendConfirmationScreen },
  AccountHistory: { screen: AccountHistoryScreen },
  AccountLockConfirmation: { screen: AccountLockConfirmationScreen }
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
