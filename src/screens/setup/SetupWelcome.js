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
import { BackHandler,Button } from 'react-native'
import SettingsStore from '../../stores/SettingsStore'
import WalletConnectClient from '@walletconnect/client/dist/umd/index.min';
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
    try{
    const client = await WalletConnectClient.init({
      controller: true,
      projectId: "0c8a9a722b71919b51bc0975e47c4d7d",
      relayUrl: "wss://relay.walletconnect.com",
      metadata: {
        name: "Test Wallet",
        description: "Test Wallet",
        url: "#",
        icons: ["https://walletconnect.com/walletconnect-logo.png"],
      },
    });
    console.log(client.pair.toString());
    
    const a=await client.pair({ uri:"wc:0e6bf046ec54ecfafa3fe4187da17e9e0784c5e233134f0581aacea10c59b59a@2?controller=false&publicKey=c450a8344419da6a046eb3b0a6656c89a965ed8b5a5155b007e312c8b46efd4b&relay=%7B%22protocol%22%3A%22waku%22%7D" });
    alert(a);
  }
  catch(e){
    console.log(e);
  }
  }

  showNextSetup = () => {
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
