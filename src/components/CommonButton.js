import React, { Component } from 'react';

import { StyleSheet } from 'react-native';
import { TextButton } from 'react-native-material-buttons';

class CommonButton extends Component {
  render() {
    return <TextButton style={styles.button} color="#4d9678" onPress={this.onPushAnother} />;
  }
}

var styles = StyleSheet.create({
  button: {
    backgroundColor: '#f5d8d1',
    borderWidth: 2,
    borderColor: '#f75f4b',
    borderRadius: 3
  }
});

export default CommonButton;
