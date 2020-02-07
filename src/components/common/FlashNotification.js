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

const _ = require('lodash')

class FlashNotification extends Component {
  static showError (message, autoHide = true, hideOnPress = true) {
    if (_.isError(message) && message.message) {
      const errorMessage = message.message
      showMessage({
        errorMessage,
        autoHide,
        backgroundColor: '#f5d8d1',
        color: '#f75f4b',
        fontSize: 20,
        fontFamily: 'TitilliumWeb-Regular',
        duration: 10000,
        hideOnPress
      })
      LogStore.error(message)
    } else if (message) {
      showMessage({
        message,
        autoHide,
        backgroundColor: '#f5d8d1',
        color: '#f75f4b',
        fontSize: 20,
        fontFamily: 'TitilliumWeb-Regular',
        duration: 10000,
        hideOnPress
      })
      LogStore.log(message)
    }
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
      hideOnPress
    })
  }

  static hideMessage () {
    hideMessage()
  }
}

export default FlashNotification
