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
  const tabs = [
    {
      label: 'Dashboard',
      screen: 'ndau.CounterApp',
      icon: iconsMap['ndau-icon'],
      title: 'Dashboard'
    },
    {
      label: 'Settings',
      screen: 'ndau.Settings',
      icon: iconsMap['cog'],
      title: 'Settings'
    }
  ];

  // this will start our app
  Navigation.startTabBasedApp({
    tabs,
    animationType: Platform.OS === 'ios' ? 'slide-down' : 'fade',
    tabsStyle: {
      tabBarBackgroundColor: '#1c2227',
      tabBarButtonColor: '#80C9AB',
      tabBarSelectedButtonColor: '#4d9678',
      tabFontFamily: 'TitilliumWeb-Light'
    },
    appStyle: {
      tabBarBackgroundColor: '#1c2227',
      navBarButtonColor: '#80C9AB',
      tabBarButtonColor: '#80C9AB',
      navBarTextColor: '#1c2227',
      tabBarSelectedButtonColor: '#4d9678',
      navigationBarColor: '#1c2227',
      navBarBackgroundColor: '#1c2227',
      statusBarColor: '#1c2227',
      tabFontFamily: 'TitilliumWeb-Light'
    },
    passProps: {
      iconsMap: iconsMap
    }
  });
}
