import React from 'react'
import { YellowBox } from 'react-native'
import AppNavigation from './navigation/AppNavigation'

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader'
])
YellowBox.ignoreWarnings(['Class RCTCxxModule'])

export default class App extends React.Component {
  render () {
    return <AppNavigation />
  }
}
