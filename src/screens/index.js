import { Navigation } from 'react-native-navigation';

import SetupMain from './SetupMain';
import Dashboard from './Dashboard';
import SetupUserId from './SetupUserId';
import SetupEncryptionPassword from './SetupEncryptionPassword';
import SetupGetRandom from './SetupGetRandom';
import SetupYourWallet from './SetupYourWallet';
import SetupQRCode from './SetupQRCode';
import SetupSeedPhrase from './SetupSeedPhrase';
import SetupConfirmSeedPhrase from './SetupConfirmSeedPhrase';
import SetupTermsOfService from './SetupTermsOfService';
import SetupEAINode from './SetupEAINode';
import Passphrase from './Passphrase';
import Settings from './Settings';

export function registerScreens(store, Provider) {
  Navigation.registerComponent('ndau.Dashboard', () => Dashboard, store, Provider);
  Navigation.registerComponent('ndau.Passphrase', () => Passphrase, store, Provider);

  Navigation.registerComponent('ndau.SetupMain', () => SetupMain, store, Provider);
  Navigation.registerComponent('ndau.SetupUserId', () => SetupUserId, store, Provider);
  Navigation.registerComponent(
    'ndau.SetupEncryptionPassword',
    () => SetupEncryptionPassword,
    store,
    Provider
  );
  Navigation.registerComponent('ndau.SetupGetRandom', () => SetupGetRandom, store, Provider);
  Navigation.registerComponent('ndau.SetupYourWallet', () => SetupYourWallet, store, Provider);
  Navigation.registerComponent('ndau.SetupSeedPhrase', () => SetupSeedPhrase, store, Provider);
  Navigation.registerComponent(
    'ndau.SetupConfirmSeedPhrase',
    () => SetupConfirmSeedPhrase,
    store,
    Provider
  );
  Navigation.registerComponent('ndau.SetupQRCode', () => SetupQRCode, store, Provider);
  Navigation.registerComponent(
    'ndau.SetupTermsOfService',
    () => SetupTermsOfService,
    store,
    Provider
  );
  Navigation.registerComponent('ndau.SetupEAINode', () => SetupEAINode, store, Provider);
  Navigation.registerComponent('ndau.Settings', () => Settings, store, Provider);
}
