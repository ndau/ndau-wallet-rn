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

  // if (Platform.OS === 'android') {
  //   tabs.push({
  //     label: 'Transitions',
  //     screen: 'example.Transitions',
  //     icon: require('../img/transform.png'),
  //     title: 'Navigation Transitions'
  //   });
  // }

  // this will start our app
  Navigation.startTabBasedApp({
    tabs,
    animationType: Platform.OS === 'ios' ? 'slide-down' : 'fade',
    tabsStyle: {
      tabBarBackgroundColor: '#333333',
      tabBarButtonColor: '#ffffff',
      tabBarSelectedButtonColor: '#ff505c',
      tabFontFamily: 'TitilliumWeb-Regular'
    },
    appStyle: {
      tabBarBackgroundColor: '#333333',
      navBarButtonColor: '#ffffff',
      tabBarButtonColor: '#ffffff',
      navBarTextColor: '#ffffff',
      tabBarSelectedButtonColor: '#ff505c',
      navigationBarColor: '#333333',
      navBarBackgroundColor: '#333333',
      statusBarColor: '#333333',
      tabFontFamily: 'TitilliumWeb-Regular'
    }
  });
}
