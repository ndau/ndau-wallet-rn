/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import React, { Component } from 'react'
import LogStore from '../../stores/LogStore'
import { showMessage, hideMessage } from 'react-native-flash-message'
import AppConstants from '../../AppConstants'
import OfflineError from '../../errors/OfflineError'
import DeviceStore from '../../stores/DeviceStore'

const _ = require('lodash')

class FlashNotification extends Component {
  static showError (message, autoHide = true, hideOnPress = true) {
    if (message instanceof OfflineError && message.shouldDisplayOffline && !DeviceStore.online()) {
      this.showOfflineError()
      LogStore.error(message)
    } else if (message) {
      this.showErrorMessage((_.isError(message) && message.message) ? message.message : message, autoHide, hideOnPress)
      LogStore.log(message)
    }
  }

  static showErrorMessage(message, autoHide = true, hideOnPress = true) {
    showMessage({
      message,
      autoHide,
      backgroundColor: AppConstants.FLASH_MESSAGE_ERROR_BACKGROUND_COLOR,
      color: AppConstants.FLASH_MESSAGE_ERROR_COLOR,
      fontSize: 20,
      fontFamily: 'TitilliumWeb-Regular',
      duration: 10000,
      hideOnPress,
      onHide: this.onHide
    })
  }

  static showInformation (message, autoHide = true, hideOnPress = true) {
    showMessage({
      message,
      autoHide,
      backgroundColor: AppConstants.FLASH_MESSAGE_BACKGROUND_COLOR,
      color: AppConstants.FLASH_MESSAGE_COLOR,
      fontSize: 20,
      fontFamily: 'TitilliumWeb-Regular',
      duration: 10000,
      hideOnPress,
      onHide: this.onHide
    })
  }

  static showOfflineError () {
    this.showErrorMessage('Cannot connect to the internet. Please check your internet connection and try again.', false, false)
  }

  static hideMessage () {
    hideMessage()
  }

  static onHide() {
    if (!DeviceStore.online()) {
      FlashNotification.showOfflineError()
    }
  }
}

export default FlashNotification
