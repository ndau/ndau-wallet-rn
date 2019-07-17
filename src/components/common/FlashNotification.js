import React, { Component } from 'react'
import LogStore from '../../stores/LogStore'
import { showMessage, hideMessage } from 'react-native-flash-message'

const _ = require('lodash')

class FlashNotification extends Component {
  static showError (message, autoHide = true, hideOnPress = true) {
    if (_.isError(message)) {
      const errorMessage = message.message
      showMessage({
        errorMessage,
        autoHide,
        backgroundColor: '#f5d8d1',
        color: '#f75f4b',
        fontSize: 20,
        fontFamily: 'TitilliumWeb-Regular',
        duration: 10000,
        hideOnPress,
        description: autoHide ? 'Please tap to continue...' : '',
        onPress: onPressCallback
      })
      LogStore.error(message)
    } else {
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
