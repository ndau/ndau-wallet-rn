import React from 'react'
import {
  YellowBox,
  View,
  NetInfo,
  PushNotificationIOS,
  Platform,
  AppState
} from 'react-native'
import AppNavigation from './navigation/AppNavigation'
import FlashMessage from 'react-native-flash-message'
import OfflineMessage from './components/OfflineMessage'
import BackgroundTasks from './services/BackgroundTasks'

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader'
])
YellowBox.ignoreWarnings(['Class RCTCxxModule'])

export default class App extends React.Component {
  state = {
    appState: AppState.currentState
  }

  componentWillUnmount () {
    AppState.removeEventListener('change', this._handleAppStateChange)
  }

  componentDidMount () {
    AppState.addEventListener('change', this._handleAppStateChange)
    BackgroundTasks.initialize()
  }

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!')
    }
    this.setState({ appState: nextAppState })
  }

  render () {
    return (
      <View style={{ flex: 1 }}>
        <AppNavigation />
        <FlashMessage position='top' />
        <OfflineMessage />
      </View>
    )
  }
}
