import React, { Component } from 'react'
import {
  PixelRatio,
  StyleSheet,
  View,
  ScrollView,
  Text,
  NativeModules,
  Alert
} from 'react-native'
import groupIntoRows from '../helpers/groupIntoRows'
import CommonButton from '../components/CommonButton'
import SetupProgressBar from '../components/SetupProgressBar'
import RNExitApp from 'react-native-exit-app'
import cssStyles from '../css/styles'
import SetupStore from '../model/SetupStore'
import { SafeAreaView } from 'react-navigation'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import AppConstants from '../AppConstants'
import Padding from '../components/Padding'
import LoggingService from '../services/LoggingService'
import {
  SetupContainer,
  ParagraphText,
  RecoveryPhraseConfirmation,
  RecoveryPhraseConfirmationTextOnly
} from '../components/setup'
import { LargeButtons } from '../components/common'

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
    LoggingService.debug(
      `PixelRatio.getFontScale is ${PixelRatio.getFontScale()}`
    )
    if (PixelRatio.getFontScale() > 2) {
      this.rowLength = 1
      this.boxWidth = '100%'
      this.boxHeight = '30%'
      LoggingService.debug(
        `boxWidth: ${this.boxWidth} and boxHeight: ${this.boxHeight}`
      )
    }
  }

  componentDidMount = () => {
    this.generateRecoveryPhrase()
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
    const KeyaddrManager = NativeModules.KeyaddrManager
    const seeds = await KeyaddrManager.keyaddrWordsFromBytes(
      AppConstants.APP_LANGUAGE,
      SetupStore.entropy
    )
    const seedBytes = await KeyaddrManager.keyaddrWordsToBytes(
      AppConstants.APP_LANGUAGE,
      seeds
    )
    if (!_(seedBytes).isEqual(SetupStore.entropy)) {
      this.showExitApp()
    } else {
      LoggingService.debug(`${seedBytes} and ${SetupStore.entropy} are equal.`)
    }
    LoggingService.debug(`keyaddr's seed words are: ${seeds}`)
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

  showNextSetup = () => {
    const user = this.props.navigation.getParam('user', {})
    SetupStore.recoveryPhrase = this.state.recoveryPhrase
    SetupStore.shuffledMap = this.shuffleMap
    SetupStore.shuffledWords = this.shuffledWords

    const { navigation } = this.props
    navigation.navigate('SetupConfirmRecoveryPhrase', {
      walletSetupType:
        navigation.state.params && navigation.state.params.walletSetupType,
      user
    })
  }

  render () {
    // chop the words into DEFAULT_ROW_LENGTH-tuples
    const words = groupIntoRows(this.state.recoveryPhrase, this.rowLength)
    const styles = {
      rowTextView: {
        height: hp(this.boxHeight),
        width: wp(this.boxWidth)
      }
    }

    let count = 1
    return (
      <SetupContainer {...this.props} pageNumber={15}>
        <ParagraphText>
          Write this 12-word phrase down and store it in a secure.
        </ParagraphText>
        <RecoveryPhraseConfirmationTextOnly
          words={words}
          rowTextView={styles.rowTextView}
        />
        <LargeButtons
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
