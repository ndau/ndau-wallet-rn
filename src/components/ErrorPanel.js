import React, { Component } from 'react'

import { StyleSheet, Text, View } from 'react-native'

class ErrorPanel extends Component {
  render () {
    return (
      <View style={styles.errorOuterContainer}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{this.props.errorText}</Text>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  errorText: {
    color: '#f75f4b',
    fontSize: 20,
    fontFamily: 'TitilliumWeb-Regular',
    padding: '4%'
  },
  errorContainer: {
    backgroundColor: '#f5d8d1',
    borderWidth: 2,
    borderColor: '#f75f4b',
    borderRadius: 3
  },
  errorOuterContainer: {
    backgroundColor: '#f5d8d1',
    borderWidth: 1,
    borderColor: '#f5d8d1',
    borderRadius: 3
  }
})

export default ErrorPanel
