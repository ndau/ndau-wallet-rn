import { Navigation } from 'react-native-navigation';

import SetupMain from './SetupMain';
import Dashboard from './Dashboard';
import SetupUserId from './SetupUserId';
import SetupEncryptionPassword from './SetupEncryptionPassword';
import SetupGetRandom from './SetupGetRandom';
import SetupYourWallet from './SetupYourWallet';
import SetupTwelveWordPhrase from './SetupTwelveWordPhrase';
import SetupConfirmTwelveWordPhrase from './SetupConfirmTwelveWordPhrase';
import SetupTermsOfService from './SetupTermsOfService';
import SetupEAINode from './SetupEAINode';

export function registerScreens() {
  Navigation.registerComponent('ndau.Dashboard', () => Dashboard);

  Navigation.registerComponent('ndau.SetupMain', () => SetupMain);
  Navigation.registerComponent('ndau.SetupUserId', () => SetupUserId);
  Navigation.registerComponent('ndau.SetupEncryptionPassword', () => SetupEncryptionPassword);
  Navigation.registerComponent('ndau.SetupGetRandom', () => SetupGetRandom);
  Navigation.registerComponent('ndau.SetupYourWallet', () => SetupYourWallet);
  Navigation.registerComponent('ndau.SetupTwelveWordPhrase', () => SetupTwelveWordPhrase);
  Navigation.registerComponent(
    'ndau.SetupConfirmTwelveWordPhrase',
    () => SetupConfirmTwelveWordPhrase
  );
  Navigation.registerComponent('ndau.SetupEAINode', () => SetupEAINode);
  Navigation.registerComponent('ndau.SetupTermsOfService', () => SetupTermsOfService);
}
