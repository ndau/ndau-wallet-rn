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
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import WalletOverview from '../screens/WalletOverview'
import AppDrawer from './AppDrawer'
import AccountDetails from '../screens/AccountDetails'
import AccountLock from '../screens/AccountLock'
import AccountLockType from '../screens/AccountLockType'
import AccountLockChooseAccount from '../screens/AccountLockChooseAccount'
import AccountUnlock from '../screens/AccountUnlock'
import AccountSend from '../screens/AccountSend'
import AccountReceive from '../screens/AccountReceive'
import AccountSendConfirmation from '../screens/AccountSendConfirmation'
import AccountHistory from '../screens/AccountHistory'
import AccountLockConfirmation from '../screens/AccountLockConfirmation'

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

const AccountLockTypeScreen = ({ navigation }) => (
  <AccountLockType navigation={navigation} />
)
AccountLockTypeScreen.navigationOptions = ({ navigation }) => ({
  header: null
})

const AccountLockChooseAccountScreen = ({ navigation }) => (
  <AccountLockChooseAccount navigation={navigation} />
)
AccountLockChooseAccountScreen.navigationOptions = ({ navigation }) => ({
  header: null
})

const AccountUnlockScreen = ({ navigation }) => (
  <AccountUnlock navigation={navigation} />
)
AccountUnlockScreen.navigationOptions = ({ navigation }) => ({
  header: null
})

const AccountSendScreen = ({ navigation }) => (
  <AccountSend navigation={navigation} />
)
AccountSendScreen.navigationOptions = ({ navigation }) => ({
  header: null
})

const AccountReceiveScreen = ({ navigation }) => (
  <AccountReceive navigation={navigation} />
)
AccountReceiveScreen.navigationOptions = ({ navigation }) => ({
  header: null
})

const AccountSendConfirmationScreen = ({ navigation }) => (
  <AccountSendConfirmation navigation={navigation} />
)
AccountSendConfirmationScreen.navigationOptions = ({ navigation }) => ({
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
