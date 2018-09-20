import React from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import DashboardNavigation from './DashboardNavigation';
import SetupMain from '../screens/SetupMain';
import SetupEncryptionPassword from '../screens/SetupEncryptionPassword';
import SetupConfirmRecoveryPhrase from '../screens/SetupConfirmRecoveryPhrase';
import SetupEAINode from '../screens/SetupEAINode';
import SetupGetRandom from '../screens/SetupGetRandom';
import SetupQRCode from '../screens/SetupQRCode';
import SetupRecoveryPhrase from '../screens/SetupRecoveryPhrase';
import SetupTermsOfService from '../screens/SetupTermsOfService';
import SetupUserId from '../screens/SetupUserId';
import SetupYourWallet from '../screens/SetupYourWallet';
import Passphrase from '../screens/Passphrase';
import AuthLoading from './AuthLoading';

const PassphraseScreen = ({ navigation }) => <Passphrase navigation={navigation} />;
PassphraseScreen.navigationOptions = {
  header: null
};

const SetupMainScreen = ({ navigation }) => <SetupMain navigation={navigation} />;
SetupMainScreen.navigationOptions = ({ navigation }) => ({
  header: null
});

const SetupUserIdScreen = ({ navigation }) => <SetupUserId navigation={navigation} />;
SetupUserIdScreen.navigationOptions = ({ navigation }) => ({
  header: null
});

const SetupEncryptionPasswordScreen = ({ navigation }) => (
  <SetupEncryptionPassword navigation={navigation} />
);
SetupEncryptionPasswordScreen.navigationOptions = ({ navigation }) => ({
  header: null
});

const SetupConfirmRecoveryPhraseScreen = ({ navigation }) => (
  <SetupConfirmRecoveryPhrase navigation={navigation} />
);
SetupConfirmRecoveryPhraseScreen.navigationOptions = ({ navigation }) => ({
  header: null
});

const SetupGetRandomScreen = ({ navigation }) => <SetupGetRandom navigation={navigation} />;
SetupGetRandomScreen.navigationOptions = ({ navigation }) => ({
  header: null
});

const SetupEAINodeScreen = ({ navigation }) => <SetupEAINode navigation={navigation} />;
SetupEAINodeScreen.navigationOptions = ({ navigation }) => ({
  header: null
});

const SetupQRCodeScreen = ({ navigation }) => <SetupQRCode navigation={navigation} />;
SetupQRCodeScreen.navigationOptions = ({ navigation }) => ({
  header: null
});

const SetupRecoveryPhraseScreen = ({ navigation }) => (
  <SetupRecoveryPhrase navigation={navigation} />
);
SetupRecoveryPhraseScreen.navigationOptions = ({ navigation }) => ({
  header: null
});

const SetupTermsOfServiceScreen = ({ navigation }) => (
  <SetupTermsOfService navigation={navigation} />
);
SetupTermsOfServiceScreen.navigationOptions = ({ navigation }) => ({
  header: null
});

const SetupYourWalletScreen = ({ navigation }) => <SetupYourWallet navigation={navigation} />;
SetupYourWalletScreen.navigationOptions = ({ navigation }) => ({
  header: null
});

const DashboardNavigationScreen = ({ navigation }) => (
  <DashboardNavigation navigation={navigation} />
);
DashboardNavigationScreen.navigationOptions = ({ navigation }) => ({
  header: null
});

const AuthStack = createStackNavigator({
  Passphrase: { screen: PassphraseScreen }
});

const SetupStack = createStackNavigator({
  SetupMain: { screen: SetupMainScreen },
  SetupUserId: { screen: SetupUserIdScreen },
  SetupEncryptionPassword: { screen: SetupEncryptionPasswordScreen },
  SetupConfirmRecoveryPhrase: { screen: SetupConfirmRecoveryPhraseScreen },
  SetupGetRandom: { screen: SetupGetRandomScreen },
  SetupEAINode: { screen: SetupEAINodeScreen },
  SetupQRCode: { screen: SetupQRCodeScreen },
  SetupRecoveryPhrase: { screen: SetupRecoveryPhraseScreen },
  SetupTermsOfService: { screen: SetupTermsOfServiceScreen },
  SetupYourWallet: { screen: SetupYourWalletScreen }
});

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    App: DashboardNavigation,
    Auth: AuthStack,
    Setup: SetupStack
  },
  {
    initialRouteName: 'AuthLoading',
    headerMode: 'node'
  }
);
