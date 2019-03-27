import React, { Component } from 'react'

import { showMessage, hideMessage } from 'react-native-flash-message'

class FlashNotification extends Component {
  static showError (message, autoHide = true, hideOnPress = true) {
    showMessage({
      message: message,
      autoHide,
      backgroundColor: '#f5d8d1',
      color: '#f75f4b',
      fontSize: 20,
      fontFamily: 'TitilliumWeb-Regular',
      duration: 10000,
      hideOnPress
    })
  }

  static showInformation (message, autoHide = true, hideOnPress = true) {
    showMessage({
      message: message,
      autoHide,
      backgroundColor: '#c7f3e2',
      color: '#4e957a',
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
