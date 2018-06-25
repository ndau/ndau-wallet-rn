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
      tabBarBackgroundColor: '#333333',
      tabBarButtonColor: '#ffffff',
      tabBarSelectedButtonColor: '#4d9678',
      tabFontFamily: 'TitilliumWeb-Regular'
    },
    appStyle: {
      tabBarBackgroundColor: '#333333',
      navBarButtonColor: '#ffffff',
      tabBarButtonColor: '#ffffff',
      navBarTextColor: '#ffffff',
      tabBarSelectedButtonColor: '#4d9678',
      navigationBarColor: '#333333',
      navBarBackgroundColor: '#333333',
      statusBarColor: '#333333',
      tabFontFamily: 'TitilliumWeb-Regular'
    }
  });
}
