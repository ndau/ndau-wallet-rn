import React from 'react';
import AppNavigation from './navigation/AppNavigation';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([ 'Warning: isMounted(...) is deprecated', 'Module RCTImageLoader' ]);
YellowBox.ignoreWarnings([ 'Class RCTCxxModule' ]);

export default class App extends React.Component {
  render() {
    return <AppNavigation />;
  }
}
