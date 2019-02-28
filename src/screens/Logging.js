import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { LogView } from 'react-native-device-log'
import cssStyles from '../css/styles'
import { AppContainer } from '../components/common'
import { DrawerHeader } from '../components/drawer'

class Logging extends Component {
  render () {
    return (
      <AppContainer>
        <DrawerHeader {...this.props} />
        <LogView
          style={{ backgroundColor: 'transparent' }}
          inverted={false}
          multiExpanded
          timeStampFormat='HH:mm:ss'
        />
      </AppContainer>
    )
  }
}

export default Logging
