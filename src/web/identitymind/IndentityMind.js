import React, { Component } from 'react'
import { WebView, View, StyleSheet } from 'react-native'

const identityMindHtml = require('./identitymind.html')

class IdentityMind extends Component {
  render () {
    return (
      <View style={styles.container}>
        <WebView
          source={{ uri: 'https://www.youtube.com/embed/MhkGQAoc7bc' }}
          style={styles.video}
        />
        <WebView
          source={{ uri: 'https://www.youtube.com/embed/PGUMRVowdv8' }}
          style={styles.video}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  video: {
    marginTop: 20,
    maxHeight: 200,
    width: 320,
    flex: 1
  }
})

export default IdentityMind
