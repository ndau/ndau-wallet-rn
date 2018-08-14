import React, { Component } from 'react';

import { StyleSheet, Text, View } from 'react-native';

class AlertPanel extends Component {
  render() {
    return (
      <View style={styles.alertOuterContainer}>
        <View style={styles.alertContainer}>
          <Text style={styles.alertText}>{this.props.alertText}</Text>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  alertText: {
    color: '#4e957a',
    fontSize: 20,
    fontFamily: 'TitilliumWeb-Regular',
    padding: '4%'
  },
  alertContainer: {
    backgroundColor: '#c7f3e2',
    borderWidth: 2,
    borderColor: '#4e957a',
    borderRadius: 3
  },
  alertOuterContainer: {
    backgroundColor: '#c7f3e2',
    borderWidth: 1,
    borderColor: '#c7f3e2',
    borderRadius: 3
  }
});

export default AlertPanel;
