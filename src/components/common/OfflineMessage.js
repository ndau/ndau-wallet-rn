import React, { PureComponent } from 'react'
import { NetInfo } from 'react-native'
import FlashNotification from './FlashNotification'
import LoggingService from '../../services/LoggingService'
import DeviceStore from '../../stores/DeviceStore'

class OfflineMessage extends PureComponent {
  componentDidMount () {
    NetInfo.isConnected.fetch().then(isConnected => {
      this.handleConnectivityChange(isConnected)
    })
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleConnectivityChange
    )
  }

  componentWillUnmount () {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.handleConnectivityChange
    )
  }

  handleConnectivityChange = async isConnected => {
    LoggingService.debug(`Connectivity changed: ${isConnected}`)
    if (isConnected) {
      FlashNotification.hideMessage()
      DeviceStore.setOnline(true)
    } else {
      FlashNotification.showError(
        `Cannot connect to the internet. Please check your internet connection and try again.`,
        false,
        false
      )
      DeviceStore.setOnline(false)
    }
  }

  render () {
    return null
  }
}

export default OfflineMessage
