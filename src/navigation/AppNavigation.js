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
import {
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import DashboardNavigation from './DashboardNavigation'
import ContactSupportNavigation from './ContactSupportNavigation'
import WalletOverviewNavigation from './WalletOverviewNavigation'
import SetupWelcome from '../screens/SetupWelcome'
import SetupWalletName from '../screens/SetupWalletName'
import SetupNewOrRecovery from '../screens/SetupNewOrRecovery'
import SetupEncryptionPassword from '../screens/SetupEncryptionPassword'
import SetupConfirmRecoveryPhrase from '../screens/SetupConfirmRecoveryPhrase'
import SetupRecoveryPhrase from '../screens/SetupRecoveryPhrase'
import SetupGetRecoveryPhrase from '../screens/SetupGetRecoveryPhrase'
import SetupTermsOfService from '../screens/SetupTermsOfService'
import SetupYourWallet from '../screens/SetupYourWallet'
import Authentication from '../screens/Authentication'
import AuthLoading from './AuthLoading'
import SettingsNavigation from './SettingsNavigation'
import ContactSupport from '../screens/ContactSupport'

const ContactSupportScreen = ({ navigation }) => (
  <ContactSupport navigation={navigation} />
)
ContactSupportScreen.navigationOptions = {
    headerShown: false
}

const AuthenticationScreen = ({ navigation }) => (
  <Authentication navigation={navigation} />
)
AuthenticationScreen.navigationOptions = {
    headerShown: false
}

const SetupWelcomeScreen = ({ navigation }) => (
  <SetupWelcome navigation={navigation} />
)
SetupWelcomeScreen.navigationOptions = ({ navigation }) => ({
    headerShown: false
})

const SetupWalletNameScreen = ({ navigation }) => (
  <SetupWalletName navigation={navigation} />
)
SetupWalletNameScreen.navigationOptions = ({ navigation }) => ({
    headerShown: false
})

const SetupNewOrRecoveryScreen = ({ navigation }) => (
  <SetupNewOrRecovery navigation={navigation} />
)
SetupNewOrRecoveryScreen.navigationOptions = ({ navigation }) => ({
    headerShown: false
})

const SetupEncryptionPasswordScreen = ({ navigation }) => (
  <SetupEncryptionPassword navigation={navigation} />
)
SetupEncryptionPasswordScreen.navigationOptions = ({ navigation }) => ({
    headerShown: false
})

const SetupConfirmRecoveryPhraseScreen = ({ navigation }) => (
  <SetupConfirmRecoveryPhrase navigation={navigation} />
)
SetupConfirmRecoveryPhraseScreen.navigationOptions = ({ navigation }) => ({
    headerShown: false
})

const SetupRecoveryPhraseScreen = ({ navigation }) => (
  <SetupRecoveryPhrase navigation={navigation} />
)
SetupRecoveryPhraseScreen.navigationOptions = ({ navigation }) => ({
    headerShown: false
})

const SetupGetRecoveryPhraseScreen = ({ navigation }) => (
  <SetupGetRecoveryPhrase navigation={navigation} />
)
SetupGetRecoveryPhraseScreen.navigationOptions = ({ navigation }) => ({
    headerShown: false
})

const SetupTermsOfServiceScreen = ({ navigation }) => (
  <SetupTermsOfService navigation={navigation} />
)
SetupTermsOfServiceScreen.navigationOptions = ({ navigation }) => ({
    headerShown: false
})

const SetupYourWalletScreen = ({ navigation }) => (
  <SetupYourWallet navigation={navigation} />
)
SetupYourWalletScreen.navigationOptions = ({ navigation }) => ({
    headerShown: false
})

const DashboardNavigationScreen = ({ navigation }) => (
  <DashboardNavigation navigation={navigation} />
)
DashboardNavigationScreen.navigationOptions = ({ navigation }) => ({
    headerShown: false
})

const WalletOverviewNavigationScreen = ({ navigation }) => (
  <WalletOverviewNavigation navigation={navigation} />
)
WalletOverviewNavigationScreen.navigationOptions = ({ navigation }) => ({
    headerShown: false
})

const SetupStack = createStackNavigator({
  Authentication: { screen: AuthenticationScreen },
  ContactSupport: { screen: ContactSupportScreen },
  SetupWelcome: { screen: SetupWelcomeScreen },
  SetupWalletName: { screen: SetupWalletNameScreen },
  SetupNewOrRecovery: { screen: SetupNewOrRecoveryScreen },
  SetupEncryptionPassword: { screen: SetupEncryptionPasswordScreen },
  SetupConfirmRecoveryPhrase: { screen: SetupConfirmRecoveryPhraseScreen },
  SetupRecoveryPhrase: { screen: SetupRecoveryPhraseScreen },
  SetupGetRecoveryPhrase: { screen: SetupGetRecoveryPhraseScreen },
  SetupTermsOfService: { screen: SetupTermsOfServiceScreen },
  SetupYourWallet: { screen: SetupYourWalletScreen }
})

const SwitchNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    App: DashboardNavigation,

    ContactSupport: ContactSupportNavigation,
    WalletOverview: WalletOverviewNavigation,
    Setup: SetupStack,
    Settings: SettingsNavigation
  },
  {
    initialRouteName: 'AuthLoading',
    headerMode: 'node'
  }
)

export default createAppContainer(SwitchNavigator)
