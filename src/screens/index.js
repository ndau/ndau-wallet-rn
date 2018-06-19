import { Navigation } from 'react-native-navigation';

import SetupMain from './SetupMain';
import Dashboard from './Dashboard';

export function registerScreens() {
  Navigation.registerComponent('ndau.Dashboard', () => Dashboard);
  Navigation.registerComponent('ndau.SetupMain', () => SetupMain);
}
