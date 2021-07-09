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
import AccountDetails from '../screens/AccountDetails'
import AccountLock from '../screens/AccountLock'
import AccountEAIType from '../screens/AccountEAIType'
import AccountLockChooseAccount from '../screens/AccountLockChooseAccount'
import AccountUnlock from '../screens/AccountUnlock'
import AccountSend from '../screens/AccountSend'
import AccountReceive from '../screens/AccountReceive'
import AccountSendConfirmation from '../screens/AccountSendConfirmation'
import AccountHistory from '../screens/AccountHistory'
import AccountLockConfirmation from '../screens/AccountLockConfirmation'
import AccountSetEAIConfirmation from '../screens/AccountSetEAIConfirmation'

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

const AccountEAITypeScreen = ({ navigation }) => (
  <AccountEAIType navigation={navigation} />
)
AccountEAITypeScreen.navigationOptions = ({ navigation }) => ({
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
  
const AccountSetEAIConfirmationScreen = ({ navigation }) => (
    <AccountSetEAIConfirmation navigation={navigation} />
)
AccountSetEAIConfirmationScreen.navigationOptions = ({ navigation }) => ({
    headerShown: false
})
  
const WalletOverviewStack = createStackNavigator({
  WalletOverview: { screen: WalletOverviewScreen },
  AccountDetails: { screen: AccountDetailsScreen },
  AccountLock: { screen: AccountLockScreen },
  AccountEAIType: { screen: AccountEAITypeScreen },
  AccountLockChooseAccount: { screen: AccountLockChooseAccountScreen },
  AccountUnlock: { screen: AccountUnlockScreen },
  AccountSend: { screen: AccountSendScreen },
  AccountReceive: { screen: AccountReceiveScreen },
  AccountSendConfirmation: { screen: AccountSendConfirmationScreen },
  AccountHistory: { screen: AccountHistoryScreen },
  AccountLockConfirmation: { screen: AccountLockConfirmationScreen },
  AccountSetEAIConfirmation: { screen: AccountSetEAIConfirmationScreen }
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
