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
    console.log(
      `Message from webview: ${JSON.stringify(event.nativeEvent.data, null, 2)}`
    )
    alert(JSON.stringify(event.nativeEvent.data, null, 2))
    // handle response jwtresponse here
    // A simple example below:
    // const array = jwtresponse.split('.');
    // const header = JSON.parse(atob(array[0]));
    // const response = JSON.parse(atob(array[1]));
    // const signature = array[2];
    // alert("Result from Identitymind: " + response.kyc_result);
  }

  render () {
    let kycUrl = 'https://ntrd.io/kyc/'
    // if (__DEV__) {
    kycUrl = 'https://staging.ntrd.io/kyc/'
    // }
    console.log(kycUrl)
    return (
      <SafeAreaView style={cssStyles.safeContainer}>
        <View style={cssStyles.container}>
          <WebView
            ref={ref => (this.webview = ref)}
            source={{ uri: kycUrl }}
            javaScriptEnabled
            // domStorageEnabled
            startInLoadingState
            style={{
              flex: 1,
              backgroundColor: styleConstants.APP_BACKGROUND_COLOR
            }}
            onLoadProgress={e => console.log(e.nativeEvent.progress)}
            onMessage={this.handleMessage}
            bounces={false}
            userAgent='Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1'
          />
        </View>
      </SafeAreaView>
    )
  }
}

export default IdentityMind
