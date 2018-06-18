import { Navigation, ScreenVisibilityListener } from 'react-native-navigation';

import Dashboard from './Dashboard';

export function registerScreens() {
  Navigation.registerComponent('ndau.Dashboard', () => Dashboard);
}
