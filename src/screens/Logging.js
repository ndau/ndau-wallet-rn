import React, { Component } from 'react'
import { LogView } from 'react-native-device-log'
import { AppContainer, FlashNotification } from '../components/common'
import { DrawerHeader } from '../components/drawer'

class Logging extends Component {
  constructor(props) {
    super(props)
    props.navigation.addListener('didBlur', FlashNotification.hideMessage)
  }
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
