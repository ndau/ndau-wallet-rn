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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeModules } from 'react-native';
import { BackHandler,Button } from 'react-native'
import KeyPathHelper from '../../helpers/KeyPathHelper';
import SettingsStore from '../../stores/SettingsStore'

import {
  SetupWelcomeContainer,
  LargeText,
  UnderlineDivider
} from '../../components/setup'
import FlashNotification from '../../components/common/FlashNotification'
import { LargeButton, ParagraphText } from '../../components/common'


class SetupWelcome extends Component {
  constructor (props) {
    super(props)

    this.state = {
      toggleCount: 1,
      maxToggle: 10
    }
    props.navigation.addListener('blur', FlashNotification.hideMessage)
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)
  }

  handleBackButton () {
    return true
  }

  componentDidMount = async () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)
    await SettingsStore.useMainNet()


  }

  showNextSetup = () => {
        // this.props.navigation.navigate("Blockchain Explorer", {screen: 'Explore'});
        // this.props.navigation.navigate('SetupTermsOfService')
    this.props.navigation.navigate('SetupNewOrRecovery')
  }


  render () {
    return (
      <SetupWelcomeContainer>
        <LargeText>Welcome to ndau</LargeText>
        <UnderlineDivider />
        <ParagraphText>
          ndau is a cryptocurrency designed to be a buoyant long-term store of
          value.
        </ParagraphText>
        <ParagraphText>
          To get you started securely, you will create a new wallet, protect it
          with a password, and create a recovery phrase which you will need in
          order to restore your wallet if you lose access to it.
        </ParagraphText>
     
        <LargeButton sideMargins onPress={this.showNextSetup}>
          Get started
        </LargeButton>
      </SetupWelcomeContainer>
    )
  }
}

export default SetupWelcome
