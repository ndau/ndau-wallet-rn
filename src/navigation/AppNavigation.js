import React from 'react'
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation'
import DashboardNavigation from './DashboardNavigation'
import ContactSupportNavigation from './ContactSupportNavigation'
import WalletOverviewNavigation from './WalletOverviewNavigation'
import LoggingNavigation from './LoggingNavigation'
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

const AuthenticationScreen = ({ navigation }) => (
  <Authentication navigation={navigation} />
)
AuthenticationScreen.navigationOptions = {
  header: null
}

const SetupWelcomeScreen = ({ navigation }) => (
  <SetupWelcome navigation={navigation} />
)
SetupWelcomeScreen.navigationOptions = ({ navigation }) => ({
  header: null
})

const SetupWalletNameScreen = ({ navigation }) => (
  <SetupWalletName navigation={navigation} />
)
SetupWalletNameScreen.navigationOptions = ({ navigation }) => ({
  header: null
})

const SetupNewOrRecoveryScreen = ({ navigation }) => (
  <SetupNewOrRecovery navigation={navigation} />
)
SetupNewOrRecoveryScreen.navigationOptions = ({ navigation }) => ({
  header: null
})

const SetupEncryptionPasswordScreen = ({ navigation }) => (
  <SetupEncryptionPassword navigation={navigation} />
)
SetupEncryptionPasswordScreen.navigationOptions = ({ navigation }) => ({
  header: null
})

const SetupConfirmRecoveryPhraseScreen = ({ navigation }) => (
  <SetupConfirmRecoveryPhrase navigation={navigation} />
)
SetupConfirmRecoveryPhraseScreen.navigationOptions = ({ navigation }) => ({
  header: null
})

const SetupRecoveryPhraseScreen = ({ navigation }) => (
  <SetupRecoveryPhrase navigation={navigation} />
)
SetupRecoveryPhraseScreen.navigationOptions = ({ navigation }) => ({
  header: null
})

const SetupGetRecoveryPhraseScreen = ({ navigation }) => (
  <SetupGetRecoveryPhrase navigation={navigation} />
)
SetupGetRecoveryPhraseScreen.navigationOptions = ({ navigation }) => ({
  header: null
})

const SetupTermsOfServiceScreen = ({ navigation }) => (
  <SetupTermsOfService navigation={navigation} />
)
SetupTermsOfServiceScreen.navigationOptions = ({ navigation }) => ({
  header: null
})

const SetupYourWalletScreen = ({ navigation }) => (
  <SetupYourWallet navigation={navigation} />
)
SetupYourWalletScreen.navigationOptions = ({ navigation }) => ({
  header: null
})

const DashboardNavigationScreen = ({ navigation }) => (
  <DashboardNavigation navigation={navigation} />
)
DashboardNavigationScreen.navigationOptions = ({ navigation }) => ({
  header: null
})

const WalletOverviewNavigationScreen = ({ navigation }) => (
  <WalletOverviewNavigation navigation={navigation} />
)
WalletOverviewNavigationScreen.navigationOptions = ({ navigation }) => ({
  header: null
})

const LoggingNavigationScreen = ({ navigation }) => (
  <LoggingNavigation navigation={navigation} />
)
LoggingNavigationScreen.navigationOptions = ({ navigation }) => ({
  header: null
})

const ContactSupportScreen = ({ navigation }) => (
  <ContactSupport navigation={navigation} />
)
ContactSupportScreen.navigationOptions = ({ navigation }) => ({
  header: null
})

const SetupStack = createStackNavigator({
  Authentication: { screen: AuthenticationScreen },
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
    Logging: LoggingNavigation,
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
