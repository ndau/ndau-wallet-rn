import { iconsMap } from './app-icons';
import { Platform } from 'react-native';

export const tabs = [
  {
    label: 'Dashboard',
    screen: 'ndau.Dashboard',
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

export const animationType = Platform.OS === 'ios' ? 'slide-down' : 'fade';

export const tabsStyle = {
  tabBarBackgroundColor: '#1c2227',
  tabBarButtonColor: '#80C9AB',
  tabBarSelectedButtonColor: '#4d9678',
  tabFontFamily: 'TitilliumWeb-Light'
};

export const appStyle = {
  tabBarBackgroundColor: '#1c2227',
  navBarButtonColor: '#80C9AB',
  tabBarButtonColor: '#80C9AB',
  navBarTextColor: '#1c2227',
  tabBarSelectedButtonColor: '#4d9678',
  navigationBarColor: '#1c2227',
  navBarBackgroundColor: '#1c2227',
  statusBarColor: '#1c2227',
  tabFontFamily: 'TitilliumWeb-Light'
};
