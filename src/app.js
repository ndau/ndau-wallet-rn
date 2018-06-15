import { Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { registerScreens, registerScreenVisibilityListener } from './screens';
import { iconsMap, iconsLoaded } from './app-icons';

// screen related book keeping
registerScreens();
registerScreenVisibilityListener();

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
    },
    {
      label: 'Navigation',
      screen: 'ndau.Types',
      icon: require('../img/list.png'),
      title: 'Navigation Types'
    },
    {
      label: 'Actions',
      screen: 'example.Actions',
      icon: require('../img/swap.png'),
      title: 'Navigation Actions'
    }
  ];

  if (Platform.OS === 'android') {
    tabs.push({
      label: 'Transitions',
      screen: 'example.Transitions',
      icon: require('../img/transform.png'),
      title: 'Navigation Transitions'
    });
  }

  // this will start our app
  Navigation.startTabBasedApp({
    tabs,
    animationType: Platform.OS === 'ios' ? 'slide-down' : 'fade',
    tabsStyle: {
      tabBarBackgroundColor: '#333333',
      tabBarButtonColor: '#ffffff',
      tabBarSelectedButtonColor: '#ff505c',
      tabFontFamily: 'BioRhyme-Bold'
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
    },
    drawer: {
      left: {
        screen: 'ndau.Types.Drawer'
      }
    }
  });
}
