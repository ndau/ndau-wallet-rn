import React from 'react';
import AppNavigation from './AppNavigation';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([ 'Warning: isMounted(...) is deprecated', 'Module RCTImageLoader' ]);

export default class App extends React.Component {
  render() {
    return <AppNavigation />;
  }
}
