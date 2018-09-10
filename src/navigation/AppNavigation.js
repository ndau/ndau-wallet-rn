import React from 'react';
import { YellowBox } from 'react-native';
import {
  createStackNavigator,
  // createDrawerNavigator,
  createSwitchNavigator
} from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { DrawerButton } from '../components/DrawerButton';
import Dashboard from '../screens/Dashboard';
import DashboardNavigation from './DashboardNavigation';
import SetupMain from '../screens/SetupMain';
import SetupEncryptionPassword from '../screens/SetupEncryptionPassword';
import SetupConfirmSeedPhrase from '../screens/SetupConfirmSeedPhrase';
import SetupEAINode from '../screens/SetupEAINode';
import SetupGetRandom from '../screens/SetupGetRandom';
import SetupQRCode from '../screens/SetupQRCode';
import SetupSeedPhrase from '../screens/SetupSeedPhrase';
import SetupTermsOfService from '../screens/SetupTermsOfService';
import SetupUserId from '../screens/SetupUserId';
import SetupYourWallet from '../screens/SetupYourWallet';
import Passphrase from '../screens/Passphrase';
// import Settings from '../screens/Settings';
import AuthLoading from './AuthLoading';

//TODO: This is temporary until react-native-material-dropdown fixes their code
YellowBox.ignoreWarnings([ 'Warning: isMounted(...) is deprecated', 'Module RCTImageLoader' ]);
YellowBox.ignoreWarnings([ 'Class RCTCxxModule' ]);

const PassphraseScreen = ({ navigation }) => <Passphrase navigation={navigation} />;
PassphraseScreen.navigationOptions = {
  header: null
};

// const SettingsScreen = ({ navigation }) => <Settings navigation={navigation} />;
// SettingsScreen.navigationOptions = {
//   header: null
// };

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

const SetupConfirmSeedPhraseScreen = ({ navigation }) => (
  <SetupConfirmSeedPhrase navigation={navigation} />
);
SetupConfirmSeedPhraseScreen.navigationOptions = ({ navigation }) => ({
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

const SetupSeedPhraseScreen = ({ navigation }) => <SetupSeedPhrase navigation={navigation} />;
SetupSeedPhraseScreen.navigationOptions = ({ navigation }) => ({
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

// const SettingsStack = createStackNavigator({
//   Settings: { screen: SettingsScreen },
//   Passphrase: { screen: PassphraseScreen },
//   SetupMain: { screen: SetupMainScreen },
//   SetupUserId: { screen: SetupUserIdScreen },
//   SetupEncryptionPassword: { screen: SetupEncryptionPasswordScreen },
//   SetupConfirmSeedPhrase: { screen: SetupConfirmSeedPhraseScreen },
//   SetupGetRandom: { screen: SetupGetRandomScreen },
//   SetupEAINode: { screen: SetupEAINodeScreen },
//   SetupQRCode: { screen: SetupQRCodeScreen },
//   SetupSeedPhrase: { screen: SetupSeedPhraseScreen },
//   SetupTermsOfService: { screen: SetupTermsOfServiceScreen },
//   SetupYourWallet: { screen: SetupYourWalletScreen }
// });

// SettingsStack.navigationOptions = {
//   drawerLabel: 'Settings',
//   drawerIcon: ({ tintColor }) => (
//     <MaterialIcons name="move-to-inbox" size={24} style={{ color: tintColor }} />
//   )
// };

// const DashboardStack = createStackNavigator({
//   Dashboard: { screen: DashboardScreen },
//   Passphrase: { screen: PassphraseScreen },
//   SetupMain: { screen: SetupMainScreen },
//   SetupUserId: { screen: SetupUserIdScreen },
//   SetupEncryptionPassword: { screen: SetupEncryptionPasswordScreen },
//   SetupConfirmSeedPhrase: { screen: SetupConfirmSeedPhraseScreen },
//   SetupGetRandom: { screen: SetupGetRandomScreen },
//   SetupEAINode: { screen: SetupEAINodeScreen },
//   SetupQRCode: { screen: SetupQRCodeScreen },
//   SetupSeedPhrase: { screen: SetupSeedPhraseScreen },
//   SetupTermsOfService: { screen: SetupTermsOfServiceScreen }
// });

// const AppStack = createStackNavigator({
//   Dashboard: DashboardNavigation
// Passphrase: { screen: PassphraseScreen },
// SetupMain: { screen: SetupMainScreen },
// SetupUserId: { screen: SetupUserIdScreen },
// SetupEncryptionPassword: { screen: SetupEncryptionPasswordScreen },
// SetupConfirmSeedPhrase: { screen: SetupConfirmSeedPhraseScreen },
// SetupGetRandom: { screen: SetupGetRandomScreen },
// SetupEAINode: { screen: SetupEAINodeScreen },
// SetupQRCode: { screen: SetupQRCodeScreen },
// SetupSeedPhrase: { screen: SetupSeedPhraseScreen },
// SetupTermsOfService: { screen: SetupTermsOfServiceScreen }
// });

const AuthStack = createStackNavigator({
  // Dashboard: { screen: DashboardScreen },
  Passphrase: { screen: PassphraseScreen }
  // SetupMain: { screen: SetupMainScreen },
  // SetupUserId: { screen: SetupUserIdScreen },
  // SetupEncryptionPassword: { screen: SetupEncryptionPasswordScreen },
  // SetupConfirmSeedPhrase: { screen: SetupConfirmSeedPhraseScreen },
  // SetupGetRandom: { screen: SetupGetRandomScreen },
  // SetupEAINode: { screen: SetupEAINodeScreen },
  // SetupQRCode: { screen: SetupQRCodeScreen },
  // SetupSeedPhrase: { screen: SetupSeedPhraseScreen },
  // SetupTermsOfService: { screen: SetupTermsOfServiceScreen }
});

const SetupStack = createStackNavigator({
  // Dashboard: { screen: DashboardScreen },
  // Passphrase: { screen: PassphraseScreen },
  SetupMain: { screen: SetupMainScreen },
  SetupUserId: { screen: SetupUserIdScreen },
  SetupEncryptionPassword: { screen: SetupEncryptionPasswordScreen },
  SetupConfirmSeedPhrase: { screen: SetupConfirmSeedPhraseScreen },
  SetupGetRandom: { screen: SetupGetRandomScreen },
  SetupEAINode: { screen: SetupEAINodeScreen },
  SetupQRCode: { screen: SetupQRCodeScreen },
  SetupSeedPhrase: { screen: SetupSeedPhraseScreen },
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

// DashboardStack.navigationOptions = {
//   drawerLabel: 'Dashboard',
//   drawerIcon: ({ tintColor }) => (
//     <MaterialIcons name="drafts" size={24} style={{ color: tintColor }} />
//   )
// };

// const AppNavigation = createDrawerNavigator(
//   {
//     Dashboard: {
//       path: '/dashboard',
//       screen: DashboardStack
//     },
//     Settings: {
//       path: '/settings',
//       screen: SettingsStack
//     }
//   },
//   {
//     initialRouteName: 'Dashboard',
//     contentOptions: {
//       activeTintColor: '#e91e63'
//     }
//   }
// );

// export default AppNavigation;
