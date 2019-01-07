import React, { Component } from 'react'
import { WebView } from 'react-native-webview'
import { SafeAreaView } from 'react-navigation'
import { View, Button } from 'react-native'
import cssStyles from '../css/styles'
import styleConstants from '../css/styleConstants'

class IdentityMind extends Component {
  constructor (props) {
    super(props)
  }

  handleMessage = event => {
    console.log(`Message from webview: ${event.nativeEvent.data}`)
    // handle response jwtresponse here
    // A simple example below:
    // const array = jwtresponse.split('.');
    // const header = JSON.parse(atob(array[0]));
    // const response = JSON.parse(atob(array[1]));
    // const signature = array[2];
    // alert("Result from Identitymind: " + response.kyc_result);
  }

  render () {
    return (
      <SafeAreaView style={cssStyles.safeContainer}>
        <View style={cssStyles.container}>
          <WebView
            ref={ref => (this.webview = ref)}
            source={{ uri: 'https://ntrd.io/kyc/' }}
            javaScriptEnabled
            domStorageEnabled
            startInLoadingState
            style={{
              flex: 1,
              backgroundColor: styleConstants.APP_BACKGROUND_COLOR
            }}
            onLoadProgress={e => console.log(e.nativeEvent.progress)}
            onMessage={this.handleMessage}
          />
        </View>
      </SafeAreaView>
    )
  }
}

export default IdentityMind
