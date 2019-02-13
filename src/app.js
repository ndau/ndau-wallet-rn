import React from 'react'
import {
  YellowBox,
  View,
  NetInfo,
  PushNotificationIOS,
  Platform
} from 'react-native'
import AppNavigation from './navigation/AppNavigation'
import FlashMessage from 'react-native-flash-message'
import OfflineMessage from './components/OfflineMessage'
import BackgroundTasks from './services/BackgroundTasks'
import LoggingService from './services/LoggingService'

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader'
])
YellowBox.ignoreWarnings(['Class RCTCxxModule'])

export default class App extends React.Component {
  constructor (props) {
    super(props)

    BackgroundTasks.initialize()
    LoggingService.initialize()
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
