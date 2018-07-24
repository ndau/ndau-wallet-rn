import { Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';
import { iconsMap, iconsLoaded } from './app-icons';

// screen related book keeping
registerScreens();

iconsLoaded.then(() => {
  startApp();
});

function startApp() {
  const tabs = [
    {
      label: 'Dashboard',
      screen: 'ndau.Dashboard',
      icon: iconsMap['ndau-icon'],
      title: 'Dashboard'
    }
  ];

  // this will start our app
  Navigation.startTabBasedApp({
    tabs,
    animationType: Platform.OS === 'ios' ? 'slide-down' : 'fade',
    tabsStyle: {
      tabBarBackgroundColor: '#1c2227',
      tabBarButtonColor: '#1c2227',
      tabBarSelectedButtonColor: '#4d9678',
      tabFontFamily: 'TitilliumWeb-Light'
    },
    appStyle: {
      tabBarBackgroundColor: '#1c2227',
      navBarButtonColor: '#1c2227',
      tabBarButtonColor: '#1c2227',
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
