import React, { PureComponent } from 'react'
import NetInfo from '@react-native-community/netinfo'
import FlashNotification from './FlashNotification'
import LogStore from '../../stores/LogStore'
import DeviceStore from '../../stores/DeviceStore'

class OfflineMessage extends PureComponent {
  componentDidMount () {
    NetInfo.fetch().then(isConnected => {
      this.handleConnectivityChange(isConnected)
    })
    NetInfo.addEventListener('connectionChange', this.handleConnectivityChange)
  }

  componentWillUnmount () {
    NetInfo.removeEventListener(
      'connectionChange',
      this.handleConnectivityChange
    )
  }

  handleConnectivityChange = async isConnected => {
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
