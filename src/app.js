import { Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';
import { iconsMap, iconsLoaded } from './app-icons';
import { Provider } from 'react-redux';
import store from './reducers/index';

registerScreens(store, Provider);

iconsLoaded.then(() => {
  startApp();
});

function startApp() {
  const constants = require('./app-constants');

  const { tabs, animationType, tabsStyle, appStyle } = constants;

  // this will start our app
  Navigation.startTabBasedApp({
    tabs,
    animationType,
    tabsStyle,
    appStyle
  });
}
