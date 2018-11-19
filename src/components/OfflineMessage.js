import React, { PureComponent } from 'react'
import { NetInfo } from 'react-native'
import FlashNotification from '../components/FlashNotification'

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

  handleConnectivityChange = isConnected => {
    console.log(`Connectivity changed: ${isConnected}`)
    if (isConnected) {
      FlashNotification.hideMessage()
    } else {
      FlashNotification.showError(
        `Cannot connect to the internet. Please check your internet connection and try again.`,
        false,
        false
      )
    }
  }

  render () {
    return null
  }
}

export default OfflineMessage
