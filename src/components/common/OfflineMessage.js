/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import { PureComponent } from 'react'
import NetInfo from '@react-native-community/netinfo'
import FlashNotification from './FlashNotification'
import DeviceStore from '../../stores/DeviceStore'
import OfflineError from '../../errors/OfflineError'

class OfflineMessage extends PureComponent {
  componentDidMount () {
    NetInfo.fetch().then(state => {
      this.handleConnectivityChange(state)
    })
    this.unsubscribe = NetInfo.addEventListener(this.handleConnectivityChange)
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  handleConnectivityChange = async state => {
    if (state.isConnected && state.isInternetReachable) {
      DeviceStore.setOnline(true)
      FlashNotification.hideMessage()
    } else {
      DeviceStore.setOnline(false)
      FlashNotification.showError(new OfflineError())
    }
  }

  render () {
    return null
  }
}

export default OfflineMessage
