/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

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
    this.unsubscribe = NetInfo.addEventListener(this.handleConnectivityChange)
  }

  componentWillUnmount () {
    this.unsubscribe()
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
