import React from 'react'
import { YellowBox, View, NetInfo } from 'react-native'
import AppNavigation from './navigation/AppNavigation'
import FlashMessage from 'react-native-flash-message'

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader'
])
YellowBox.ignoreWarnings(['Class RCTCxxModule'])

export default class App extends React.Component {
  render () {
    return (
      <View style={{ flex: 1 }}>
        <AppNavigation />
        <FlashMessage position='top' />
      </View>
    )
  }
}
