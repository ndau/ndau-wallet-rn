import React, { Component } from 'react'
import {
  PixelRatio,
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight
} from 'react-native'
import { SafeAreaView } from 'react-navigation'
import groupIntoRows from '../helpers/groupIntoRows'
import CommonButton from '../components/CommonButton'
import SetupProgressBar from '../components/SetupProgressBar'
import cssStyles from '../css/styles'
import SetupStore from '../model/SetupStore'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import EntropyHelper from '../helpers/EntropyHelper'
import AccountAPIHelper from '../helpers/AccountAPIHelper'
import FlashNotification from '../components/FlashNotification'
import Padding from '../components/Padding'
import MultiSafeHelper from '../helpers/MultiSafeHelper'
import DataFormatHelper from '../helpers/DataFormatHelper'
import AsyncStorageHelper from '../model/AsyncStorageHelper'
import AppConstants from '../AppConstants'
import LoggingService from '../services/LoggingService'

var _ = require('lodash')

const MAX_ERRORS = 4 // 4 strikes and you're out
const DEFAULT_ROW_LENGTH = 3 // 3 items per row

let boxWidth = '25%'
let boxHeight = '10%'

class SetupConfirmRecoveryPhrase extends Component {
  constructor (props) {
    super(props)
    this.state = {
      textColor: '#ffffff',
      inError: false,
      mustRetry: false,
      errorCount: 0,
      match: false,
      selected: []
    }

    // chop the words into DEFAULT_ROW_LENGTH-tuples
    this.rowLength = DEFAULT_ROW_LENGTH
    if (PixelRatio.getFontScale() > 2) {
      this.rowLength = 1
      boxWidth = '100%'
      boxHeight = '15%'
    }
  }

  showNextSetup = async () => {
    let user = this.props.navigation.getParam('user', {})
    if (user) {
      // if a user is present then we have wallets and can assume
      // they are logged in, so we get the password setup
      const password = await AsyncStorageHelper.getApplicationPassword()
      user = await MultiSafeHelper.addNewWallet(
        user,
        DataFormatHelper.convertRecoveryArrayToString(
          SetupStore.recoveryPhrase
        ),
        AppConstants.TEMP_ID,
        user.userId,
        SetupStore.numberOfAccounts,
        password
      )
    }

    LoggingService.debug(
      `user going into SetupWalletName: ${JSON.stringify(user, null, 2)}`
    )

    this.props.navigation.navigate('SetupWalletName', { user })
  }

  pushBack = async () => {
    const user = this.props.navigation.getParam('user', {})

    await EntropyHelper.generateEntropy()
    this.props.navigation.navigate('SetupYourWallet', { user })
    FlashNotification.hideMessage()
  }

  render () {
    const shuffledWords = SetupStore.shuffledWords
    const words = groupIntoRows(shuffledWords, this.rowLength)

    // lookup table for word highlights
    const selected = this.state.selected.reduce((arr, cur) => {
      arr[cur] = true
      return arr
    }, {})

    return (
      <SafeAreaView style={cssStyles.safeContainer}>
        <View style={cssStyles.container}>
          <ScrollView style={cssStyles.contentContainer}>
            <SetupProgressBar navigation={this.props.navigation} />
            <Padding top={0} bottom={1}>
              <Text style={cssStyles.wizardText}>
                To confirm that you recorded the phrase, tap the words below in
                order.{' '}
              </Text>
            </Padding>

            {words.map((row, rowIndex) => {
              return (
                <View key={rowIndex} style={styles.rowView}>
                  {row.map((item, index) => {
                    const i = index + row.length * rowIndex
                    return (
                      <Word
                        key={index}
                        error={this.state.errorWord == i}
                        selected={selected[i]}
                        onPress={event => this.handleClick(i, event)}
                      >
                        {item}
                      </Word>
                    )
                  })}
                </View>
              )
            })}
          </ScrollView>
          <View style={cssStyles.footer}>
            <View style={cssStyles.navButtonWrapper}>
              <CommonButton
                onPress={() => this.pushBack()}
                title='Back (resets phrase)'
                bottomPadding={0}
              />
            </View>
            <View style={cssStyles.navButtonWrapper}>
              <CommonButton
                onPress={() => this.showNextSetup()}
                title='Next'
                disabled={!this.state.match}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    )
  }

  compare (correctSoFar, selected) {
    if (_.isEqual(correctSoFar, selected)) {
      return true
    } else {
      // compare strings
      const recoveryPhrase = SetupStore.shuffledWords

      return correctSoFar.every(index => {
        const correctIndex = correctSoFar[index]
        const selectedIndex = selected[index]
        const correctWord = recoveryPhrase[correctIndex]
        const selectedWord = recoveryPhrase[selectedIndex]
        const wordsMatch =
          correctWord && correctWord.length > 0 && correctWord === selectedWord

        return wordsMatch
      })
    }
  }

  checkMistakes () {
    const { selected } = this.state
    const correctSoFar = SetupStore.shuffledMap.slice(
      0,
      this.state.selected.length
    )

    if (!this.compare(correctSoFar, selected)) {
      const errorText = this.state.mustRetry
        ? 'Please click the Back button to generate a new recovery phrase. Write down your phrase instead of memorizing it, or you may lose access to your ndau.'
        : 'Please enter the words in the correct order. De-select the last word to continue.'
      FlashNotification.showError(errorText)

      let errorCount = this.state.errorCount + 1
      this.setState({
        inError: true,
        mustRetry: errorCount >= MAX_ERRORS,
        errorCount: errorCount,
        errorWord: this.state.selected[this.state.selected.length - 1]
      })
    } else {
      this.setState({
        inError: false,
        errorWord: null
      })
      FlashNotification.hideMessage()
    }
  }

  checkDone () {
    if (_(this.state.selected).isEqual(SetupStore.shuffledMap)) {
      this.setState({ match: true })
    }
  }

  handleClick (index) {
    const selected = this.state.selected.slice()
    const foundIndex = selected.indexOf(index)
    if (foundIndex !== -1) {
      // already selected item was clicked
      selected.splice(foundIndex, 1)
      this.setState({ selected }, this.afterClick)
    } else if (!this.state.inError) {
      selected.push(index)
      this.setState({ selected }, this.afterClick)
    }
  }
  afterClick () {
    this.checkMistakes()
    this.checkDone()
  }
}

function Word (props) {
  let bgColor = 'transparent'
  if (props.error) {
    bgColor = '#f05123'
  } else if (props.selected) {
    bgColor = '#4e957a'
  }

  return (
    <TouchableHighlight onPress={props.onPress}>
      <View
        style={{
          height: hp(boxHeight),
          width: wp(boxWidth),
          backgroundColor: bgColor,
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          borderRadius: 3,
          marginTop: hp('1%'),
          marginBottom: hp('1%'),
          marginLeft: wp('1%'),
          marginRight: wp('1%')
        }}
      >
        <Text
          style={{
            color: '#ffffff',
            fontSize: 20,
            fontFamily: 'TitilliumWeb-Regular',
            textAlign: 'center'
          }}
        >
          {props.children}
        </Text>
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  navButtons: {
    width: wp('40%')
  },
  rowView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
})

export default SetupConfirmRecoveryPhrase
