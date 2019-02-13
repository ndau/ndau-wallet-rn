import React from 'react'
import { createStackNavigator, createSwitchNavigator } from 'react-navigation'
import DashboardNavigation from './DashboardNavigation'
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
import Passphrase from '../screens/Passphrase'
import AuthLoading from './AuthLoading'
import IdentityMind from '../screens/IdentityMind'
import IdentityVerificationIntro from '../screens/IdentityVerificationIntro'
import IdentityVerificationSuccess from '../screens/IdentityVerificationSuccess'

const PassphraseScreen = ({ navigation }) => (
  <Passphrase navigation={navigation} />
)
PassphraseScreen.navigationOptions = {
  header: null
}

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

const LoggingNavigationScreen = ({ navigation }) => (
  <LoggingNavigation navigation={navigation} />
)
LoggingNavigationScreen.navigationOptions = ({ navigation }) => ({
  header: null
})

const AuthStack = createStackNavigator({
  Passphrase: { screen: PassphraseScreen }
})

const SetupStack = createStackNavigator({
  SetupWelcome: { screen: SetupWelcomeScreen },
  SetupWalletName: { screen: SetupWalletNameScreen },
  SetupNewOrRecovery: { screen: SetupNewOrRecoveryScreen },
  SetupEncryptionPassword: { screen: SetupEncryptionPasswordScreen },
  SetupConfirmRecoveryPhrase: { screen: SetupConfirmRecoveryPhraseScreen },
  SetupRecoveryPhrase: { screen: SetupRecoveryPhraseScreen },
  SetupGetRecoveryPhrase: { screen: SetupGetRecoveryPhraseScreen },
  SetupTermsOfService: { screen: SetupTermsOfServiceScreen },
  SetupYourWallet: { screen: SetupYourWalletScreen },
  IdentityMind: { screen: IdentityMindScreen },
  IdentityVerificationIntro: { screen: IdentityVerificationIntroScreen },
  IdentityVerificationSuccess: { screen: IdentityVerificationSuccessScreen }
})

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    App: DashboardNavigation,
    Logging: LoggingNavigation,
    Auth: AuthStack,
    Setup: SetupStack
  },
  {
    initialRouteName: 'AuthLoading',
    headerMode: 'node'
  }
)
