import React, { Component } from 'react'
import { WebView } from 'react-native-webview'
import { SafeAreaView } from 'react-navigation'
import { View, Button } from 'react-native'
import cssStyles from '../css/styles'
import styleConstants from '../css/styleConstants'
import AppConstants from '../AppConstants'
import LoggingService from '../services/LoggingService'

class IdentityMind extends Component {
  constructor (props) {
    super(props)
  }

  handleMessage = event => {
    LoggingService.debug(
      `Message from webview: ${JSON.stringify(event.nativeEvent.data, null, 2)}`
    )
    if (event.nativeEvent.data === AppConstants.KYC_ACCEPTED) {
      this.props.navigation.navigate('IdentityVerificationSuccess')
    } else if (event.nativeEvent.data === AppConstants.KYC_MANUAL_REVIEW) {
      this.props.navigation.navigate('IdentityVerificationSuccess', {
        error:
          'Please note that your verification is in manual review at this time. You can ' +
          'however proceed in the purchase of ndau'
      })
    } else {
      this.props.navigation.navigate('Dashboard', {
        error:
          'We apologize but your customer verification was not approved. If you feel ' +
          'this decision was made in error please contact support@oneiro.freshdesk.com.'
      })
    }
  }

  render () {
    let kycUrl = 'https://ntrd.io/kyc/'
    if (__DEV__) {
      kycUrl = 'https://staging.ntrd.io/kyc/'
    }
    LoggingService.debug(kycUrl)
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
            onLoadProgress={e => LoggingService.debug(e.nativeEvent.progress)}
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
