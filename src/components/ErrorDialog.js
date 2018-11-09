import React, { Component } from 'react'

import { Alert } from 'react-native'

class ErrorDialog extends Component {
  static showError (message) {
    Alert.alert(
      'Error',
      `${message}`,
      [
        {
          text: 'OK',
          onPress: () => {}
        }
      ],
      { cancelable: false }
    )
  }
}

export default ErrorDialog
