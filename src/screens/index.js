import { Navigation } from 'react-native-navigation';

import SetupMain from './SetupMain';
import Dashboard from './Dashboard';
import SetupUserId from './SetupUserId';
import SetupEncryptionPassword from './SetupEncryptionPassword';

export function registerScreens() {
  Navigation.registerComponent('ndau.Dashboard', () => Dashboard);
  Navigation.registerComponent('ndau.SetupMain', () => SetupMain);
  Navigation.registerComponent('ndau.SetupUserId', () => SetupUserId);
  Navigation.registerComponent('ndau.SetupEncryptionPassword', () => SetupEncryptionPassword);
}
