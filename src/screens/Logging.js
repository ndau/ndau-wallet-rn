import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { LogView } from 'react-native-device-log'
import cssStyles from '../css/styles'
import { DrawerHeader } from '../components/common'

class Logging extends Component {
  render () {
    return (
      <SafeAreaView style={cssStyles.safeContainer}>
        <StatusBar barStyle='light-content' backgroundColor='#1c2227' />
        <DrawerHeader {...this.props} />
        <LogView inverted={false} multiExpanded timeStampFormat='HH:mm:ss' />
      </SafeAreaView>
    )
  }
}

export default Logging
