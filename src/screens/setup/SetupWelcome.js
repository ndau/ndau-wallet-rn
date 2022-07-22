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
//     try{
//     const client = await WalletConnectClient.init({
//       controller: true,
//       projectId: "0c8a9a722b71919b51bc0975e47c4d7d",
//       relayUrl: "wss://relay.walletconnect.com",
   
//         metadata: {
//           name: 'React Wallet',
//           description: 'React Wallet for WalletConnect',
//           url: 'https://walletconnect.com/',
//           icons: ['https://avatars.githubusercontent.com/u/37784886']
//         },
//         storageOptions: {
//           asyncStorage: AsyncStorage,
//         },
//       })
    
//     console.log(client);
//       const session = await client.pair({uri:"wc:2dc5b95f047583f5635acfd79127cc4d131148ae30c9f0006df38d5053b6a4c6@2?controller=false&publicKey=82a2d8c3773d84fb98defdf030cffabc3b31ad97487ee878bb98588b8534a402&relay=%7B%22protocol%22%3A%22waku%22%7D"})
//       console.log("AWAIS HELLO");
//  console.log(session,33);
//   }
//   catch(e){
//     console.log(e);
//   }



console.log("testing account",'sO/ozAQ04oe8r67Lesc9Pg==');
const rootPrivateKey = await NativeModules.KeyaddrManager.newKey(
  'sO/ozAQ04oe8r67Lesc9Pg=='
)
console.log('accountCreationKey....',rootPrivateKey)
const accountCreationKey = await NativeModules.KeyaddrManager.deriveFrom(
  rootPrivateKey,
  '/',
  KeyPathHelper.accountCreationKeyPath()
)
console.log('accountCreationKey....',accountCreationKey)
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
