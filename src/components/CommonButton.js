import React, { Component } from 'react';

import { StyleSheet } from 'react-native';
import { TextButton } from 'react-native-material-buttons';

class CommonButton extends Component {
  render() {
    return (
      <TextButton
        titleStyle={styles.text}
        color="#ffffff"
        titleColor="#0a1724"
        disabledColor="#696969"
        {...this.props}
      />
    );
  }
}

var styles = StyleSheet.create({
  text: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'TitilliumWeb-Regular'
    // padding: '4%'
  }
});

export default CommonButton;
