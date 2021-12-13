/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import React from 'react'
import { ActivityIndicator, Alert, View } from 'react-native'
import cssStyles from '../styles/styles'
import AsyncStorageHelper from '../model/AsyncStorageHelper'
import MultiSafe from '../model/MultiSafe'
import FlashNotification from '../components/common/FlashNotification'
import AppConstants from '../AppConstants'

class AuthLoadingScreen extends React.Component {
  constructor (props) {
    super(props)

    this._bootstrapAsync()
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    try {
      const userIds = await AsyncStorageHelper.getAllKeys()
      const multiSafes = await MultiSafe.isAMultiSafePresent()
      // const userIds = ['one']
      // const multiSafes = false
      if (userIds.length > 0 && !multiSafes) {
        // time for recovery as we need to create real account object for you
        // this is only done for users < 1.8, after 1.8 this should not happen
        // again as you will have a MultiSafe
        this.props.navigation.navigate('SetupGetRecoveryPhrase', {
          mode: AppConstants.GENESIS_MODE
        })
      } else if (multiSafes) {
        this.props.navigation.navigate('Authentication')
      } else {
        this.props.navigation.navigate('SetupWelcome')
      }
    } catch (error) {
      FlashNotification.showError(`Problem encountered: ${error.message}`)
    }
  }

  // Render any loading content that you like here
  render () {
    return (
      <View style={cssStyles.container}>
        <ActivityIndicator />
      </View>
    )
  }
}

export default AuthLoadingScreen
