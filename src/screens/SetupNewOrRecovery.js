/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import React, { Component } from 'react'
import { BackHandler, View } from 'react-native'
import AppConstants from '../AppConstants'
import UserStore from '../stores/UserStore'
import MultiSafeHelper from '../helpers/MultiSafeHelper'
import { SetupContainer } from '../components/setup'
import FlashNotification from '../components/common/FlashNotification'
import { LargeButtons, ParagraphText } from '../components/common'

class SetupNewOrRecovery extends Component {
  constructor (props) {
    super(props)
    props.navigation.addListener('didBlur', FlashNotification.hideMessage)
  }
  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)
  }

  handleBackButton () {
    return true
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)
  }

  showNewWallet = async () => {
    const password = await UserStore.getPassword()
    const user = await MultiSafeHelper.getDefaultUser(password)

    this.props.navigation.navigate('SetupYourWallet', {
      user
    })
  }

  showUseExistingRecovery = async () => {
    const password = await UserStore.getPassword()
    const user = await MultiSafeHelper.getDefaultUser(password)

    this.props.navigation.navigate('SetupGetRecoveryPhrase', {
      mode: AppConstants.NORMAL_MODE,
      user
    })
  }

  render () {
    return (
      <SetupContainer {...this.props} pageNumber={1}>
        <ParagraphText>How do you want to setup your wallet?</ParagraphText>
        <LargeButtons onPress={() => this.showNewWallet()}>
          New wallet
        </LargeButtons>
        <LargeButtons
          bottom
          secondary
          onPress={() => this.showUseExistingRecovery()}
        >
          Recover a wallet
        </LargeButtons>
      </SetupContainer>
    )
  }
}

export default SetupNewOrRecovery
