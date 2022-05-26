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
import { PixelRatio, NativeModules, Alert } from 'react-native'
import SetupStore from '../../stores/SetupStore'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import AppConstants from '../../AppConstants'
import LogStore from '../../stores/LogStore'
import {
  SetupContainer,
  RecoveryPhraseConfirmationTextOnly
} from '../../components/setup'
import FlashNotification from '../../components/common/FlashNotification'
import { LargeButtons, ParagraphText } from '../../components/common'
import DataFormatHelper from '../../helpers/DataFormatHelper'

var _ = require('lodash')

const DEFAULT_ROW_LENGTH = 4

class SetupRecoveryPhrase extends Component {
  constructor (props) {
    super(props)
    this.state = {
      recoveryPhrase: []
    }

    this.boxWidth = '30%'
    this.boxHeight = '14%'
    this.rowLength = DEFAULT_ROW_LENGTH
    // if someone has cranked up the font use 1 row instead
    LogStore.log(`PixelRatio.getFontScale is ${PixelRatio.getFontScale()}`)
    if (PixelRatio.getFontScale() > 2) {
      this.rowLength = 1
      this.boxWidth = '100%'
      this.boxHeight = '30%'
      LogStore.log(
        `boxWidth: ${this.boxWidth} and boxHeight: ${this.boxHeight}`
      )
    }
    props.navigation.addListener('blur', FlashNotification.hideMessage)
  }

  componentDidMount = () => {
    try{
    this.generateRecoveryPhrase()
    }
    catch(e){
      console.log(e);
    }
  }

  showExitApp () {
    Alert.alert(
      '',
      `Problem occurred validating the phrase, please contact Oneiro.`,
      [
        {
          text: 'Exit app',
          onPress: () => {
            RNExitApp.exitApp()
          }
        }
      ],
      { cancelable: false }
    )
  }

  generateRecoveryPhrase = async () => {
    try{
    console.log(SetupStore.entropy,"Setup Entropy");
    
    const KeyaddrManager = NativeModules.KeyaddrManager;
console.log({KeyaddrManager});

    const seeds = await KeyaddrManager.keyaddrWordsFromBytes(
      AppConstants.APP_LANGUAGE,
      SetupStore.entropy
    )

 console.log(seeds);

    const seedBytes = await KeyaddrManager.keyaddrWordsToBytes(
      AppConstants.APP_LANGUAGE,
      seeds
    )
    if (!_(seedBytes).isEqual(SetupStore.entropy)) {
      this.showExitApp()
    } else {
      LogStore.log(`the seedBytes and entropy are equal.`)
    }
    const recoveryPhrase = seeds.split(/\s+/g)
    this.setState({ recoveryPhrase: recoveryPhrase })

    // Shuffle the deck with a Fisher-Yates shuffle algorithm;
    // walks through the array backwards once, exchanging each value
    // with a random element from the remainder of the array
    let map = recoveryPhrase.map((e, i) => i)
    let arr = recoveryPhrase.slice()
    for (let i = arr.length - 1; i >= 0; i--) {
      let r = Math.floor(Math.random() * i)
      ;[map[i], map[r]] = [map[r], map[i]]
      ;[arr[i], arr[r]] = [arr[r], arr[i]]
    }
    this.shuffledWords = arr
    // turn array inside out
    this.shuffleMap = map.reduce((a, c, i) => {
      a[c] = i
      return a
    }, [])
  }
  catch(e){
    alert(e);
  }
  }

  showNextSetup = () => {
    SetupStore.recoveryPhrase = this.state.recoveryPhrase
    SetupStore.shuffledMap = this.shuffleMap
    SetupStore.shuffledWords = this.shuffledWords

    const { navigation } = this.props
    navigation.navigate('SetupConfirmRecoveryPhrase')
  }

  render () {
    // chop the words into DEFAULT_ROW_LENGTH-tuples
    const words = DataFormatHelper.groupArrayIntoRows(
      this.state.recoveryPhrase,
      this.rowLength
    )
    const styles = {
      rowTextView: {
        height: hp(this.boxHeight),
        width: wp(this.boxWidth)
      }
    }

    return (
      <SetupContainer {...this.props} pageNumber={15}>
        <ParagraphText>
          Please write down this phrase, in this exact order, and plan to store
          it in a secure location.
        </ParagraphText>
        <RecoveryPhraseConfirmationTextOnly
          words={words}
          rowTextView={styles.rowTextView}
        />
        <LargeButtons
          sideMargins
          bottom
          onPress={() => this.showNextSetup()}
          text='We will confirm on the next screen.'
        >
          I wrote it down
        </LargeButtons>
      </SetupContainer>
    )
  }
}

export default SetupRecoveryPhrase
