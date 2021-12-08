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
import {
  View,
  KeyboardAvoidingView,
  Text,
  Linking,
  PixelRatio,
  Platform,
  Keyboard
} from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import RecoveryPhraseHelper from '../helpers/RecoveryPhraseHelper'
import MultiSafeHelper from '../helpers/MultiSafeHelper'
import AppConstants from '../AppConstants'
import SetupStore from '../stores/SetupStore'
import DataFormatHelper from '../helpers/DataFormatHelper'
import WaitingForBlockchainSpinner from '../components/common/WaitingForBlockchainSpinner'
import LogStore from '../stores/LogStore'
import {
  SetupContainer,
  RecoveryPhraseConfirmation,
  RecoveryWordInput
} from '../components/setup'
import FlashNotification from '../components/common/FlashNotification'
import {
  LargeButtons,
  ParagraphText,
  BottomLinkText
} from '../components/common'
import cssStyles from '../css/styles'
import UserStore from '../stores/UserStore'
import { CustomOneButtonAlert } from '../components/alerts'

const DEFAULT_ROW_LENGTH = 4

class SetupGetRecoveryPhrase extends Component {
  constructor (props) {
    super(props)
    this.NORMAL_MODE_TEXT = `Type your 12 word recovery phrase below to recover your wallet.`
    this.PASSWORD_RESET_MODE_TEXT =
      'To reset your password, please verify your ' +
      'twelve-word recovery phrase. Start typing in the box below, then pick the ' +
      'correct suggestion.'
    this.GENESIS_MODE_TEXT =
      `We're almost ready to get you on the ndau blockchain, ` +
      'but we need one last thing from you. \n\nPlease verify your twelve word ' +
      'recovery phrase. Start typing in the box below, then pick the correct suggestion'
    this.NOT_ON_BLOCKCHAIN_MESSAGE =
      'We tried to find matching accounts ' +
      'on the blockchain and found none. Please confirm ' +
      'you entered the correct phrase, and try again.'

    this.state = {
      size: { width: wp('100%'), height: hp('50%') },
      dialogVisible: false,
      recoverPhraseFull: false,
      textColor: '#ffffff',
      confirmationError: false,
      acquisitionError: false,
      stepNumber: 0,
      introductionText: this.NORMAL_MODE_TEXT,
      mode: AppConstants.NORMAL_MODE,
      recoveryIndex: 0,
      disableArrows: true,
      spinner: false,
      keyboardShown: false
    }

    this.index = 0

    // TODO: you can uncomment the below if you need to do some testing
    // on a known phrase that works in testnet/devnet
    this.recoveryPhrase = ['', '', '', '', '', '', '', '', '', '', '', '']
    // this.recoveryPhrase = [
    //   'crouch',
    //   'loan',
    //   'escape',
    //   'idea',
    //   'drop',
    //   'blush',
    //   'silver',
    //   'history',
    //   'gentle',
    //   'pave',
    //   'office',
    //   'ginger'
    // ]

    this.boxWidth = '30%'
    this.boxHeight = '13%'
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
    props.navigation.addListener('didBlur', FlashNotification.hideMessage)
  }

  UNSAFE_componentWillMount () {
    if (Platform.OS === 'ios') {
      this.keyboardWillShowSub = Keyboard.addListener(
        'keyboardWillShow',
        this.keyboardWillShow
      )
      this.keyboardWillHideSub = Keyboard.addListener(
        'keyboardWillHide',
        this.keyboardWillHide
      )
    } else {
      this.keyboardDidShowSub = Keyboard.addListener(
        'keyboardDidShow',
        this.keyboardWillShow
      )
      this.keyboardDidHideSub = Keyboard.addListener(
        'keyboardDidHide',
        this.keyboardWillHide
      )
    }

    const mode = this.props.navigation.getParam(
      'mode',
      AppConstants.NORMAL_MODE
    )
    switch (mode) {
      case AppConstants.GENESIS_MODE:
        introductionText = this.GENESIS_MODE_TEXT
        break
      case AppConstants.PASSWORD_RESET_MODE:
        introductionText = this.PASSWORD_RESET_MODE_TEXT
        break
      default:
        introductionText = this.NORMAL_MODE_TEXT
    }

    this.setState({ mode, introductionText })

    this.fromHamburger = this.props.navigation.getParam('fromHamburger', null)
  }

  componentWillUnmount () {
    if (Platform.OS === 'ios') {
      this.keyboardWillShowSub.remove()
      this.keyboardWillHideSub.remove()
    } else {
      this.keyboardDidShowSub.remove()
      this.keyboardDidHideSub.remove()
    }
  }

  addToRecoveryPhrase = value => {
    this.recoveryPhrase[this.state.recoveryIndex] = value
  }

  noRecoveryPhrase = () => {
    this.setState({ dialogVisible: true })
  }

  sendEmail = () => {
    Linking.openURL(
      'mailto:support@oneiro.freshdesk.com?subject=Lost Recovery Phrase'
    )
  }

  _moveToNextWord = async () => {
    return new Promise(resolve => {
      // this allows a second prevention to move to the next
      // word if there are problems, mainly for when keyboard
      // stays up and user uses return key to progress
      if (this.state.disableArrows) return

      if (this.state.recoveryIndex <= 11) {
        const newRecoveryIndex = this.state.recoveryIndex + 1
        this.setState(
          {
            recoveryIndex: newRecoveryIndex,
            disableArrows: this.recoveryPhrase[newRecoveryIndex] === ''
          },
          () => {
            this.adjustStepNumber(this.state.recoveryIndex)
            resolve(true)
          }
        )
      }
    })
  }

  _moveBackAWord = () => {
    if (this.state.recoveryIndex > 0) {
      const newRecoveryIndex = this.state.recoveryIndex - 1
      this.setState(
        {
          recoveryIndex: newRecoveryIndex,
          disableArrows: false
        },
        () => {
          this.adjustStepNumber(this.state.recoveryIndex)
        }
      )
    }
  }

  _recoverUser = async () => {
    return await RecoveryPhraseHelper.recoverUser(
      DataFormatHelper.convertRecoveryArrayToString(this.recoveryPhrase),
      UserStore.getUser()
    )
  }

  _setDisableArrows = value => {
    this.setState({ disableArrows: value })
  }

  _checkIfArrowsNeedToBeDisabled = (words, textEntered) => {
    const wordsArray = words.split(' ')
    let disableArrows = true

    if (words === textEntered) {
      // if the textEntered matches the full words string then
      // we have an exact match, so we are all done. this happens
      // when someone types the whole word
      disableArrows = false
    } else if (wordsArray.indexOf(textEntered) >= 0) {
      // if we have a word that matches in the array of words
      // then they have typed a word in there which is present
      // 2 times. For example, if someone types in 'pig', you will
      // see 'pig' and 'pigeon' in the list. The word 'pig' is a
      // match, so they can move on...hence we enable the arrows
      disableArrows = false
    }

    this._setDisableArrows(disableArrows)

    return disableArrows
  }

  setAcquisitionError = value => {
    if (value) {
      this.setState({ disableArrows: value })
    }
    this.setState({ acquisitionError: value })
  }

  goBack = () => {
    this.props.navigation.navigate('Dashboard')
  }

  confirm = async () => {
    this.setState({ spinner: true }, async () => {
      try {
        const { navigation } = this.props

        if (this.state.mode === AppConstants.PASSWORD_RESET_MODE) {
          navigation.navigate('SetupEncryptionPassword', {
            user,
            mode: AppConstants.PASSWORD_RESET_MODE,
            recoveryPhraseString: DataFormatHelper.convertRecoveryArrayToString(
              this.recoveryPhrase
            )
          })
          this.setState({ spinner: false })
          return
        }

        const user = await this._recoverUser()
        if (user) {
          if (
            await MultiSafeHelper.recoveryPhraseAlreadyExists(
              user.userId,
              this.recoveryPhrase
            )
          ) {
            FlashNotification.showError(
              'This recovery phrase already exists in the wallet.'
            )
            return
          }

          UserStore.setUser(user)

          SetupStore.recoveryPhrase = this.recoveryPhrase
          navigation.navigate('SetupWalletName')
        } else {
          this.setState({
            textColor: AppConstants.WARNING_ICON_COLOR,
            confirmationError: true
          })
          FlashNotification.showError(this.NOT_ON_BLOCKCHAIN_MESSAGE, true)
        }
      } catch (error) {
        LogStore.log(error)
        this.setState({
          textColor: AppConstants.WARNING_ICON_COLOR,
          confirmationError: true
        })
        FlashNotification.showError(
          !error.message ? this.NOT_ON_BLOCKCHAIN_MESSAGE : error.message,
          true
        )
      }
      this.setState({ spinner: false })
    })
  }

  pushBack = () => {
    this.setState({
      recoverPhraseFull: false,
      confirmationError: false,
      textColor: '#ffffff',
      recoveryIndex: 0,
      stepNumber: 0,
      disableArrows: false
    })
    FlashNotification.hideMessage()
  }

  adjustStepNumber = pageIndex => {
    this.setState({ stepNumber: pageIndex })
    if (pageIndex === this.recoveryPhrase.length) {
      this.setState({ recoverPhraseFull: true })
    }
  }

  keyboardWillShow = () => {
    this.setState({
      keyboardShown: true
    })
  }

  keyboardWillHide = () => {
    this.setState({
      keyboardShown: false
    })
  }

  _renderAcquisition = () => {
    const words = DataFormatHelper.groupArrayIntoRows(
      this.recoveryPhrase,
      this.rowLength
    )
    const styles = {
      rowTextView: {
        height: hp(this.boxHeight),
        width: wp(this.boxWidth)
      },
      textStyle: {
        color: this.state.textColor,
        fontSize: 20,
        fontFamily: 'TitilliumWeb-Regular',
        textAlign: 'center'
      }
    }

    return (
      <SetupContainer
        {...this.props}
        goBack={this.fromHamburger ? this.goBack : null}
        pageNumber={2 + this.state.stepNumber}
      >
        <KeyboardAvoidingView
          keyboardVerticalOffset={Platform.OS === 'ios' ? 150 : 20}
          style={{ flexGrow: 1 }}
          behavior='padding'
        >
          {!this.state.keyboardShown ? (
            <View style={{ flex: 1 }}>
              <ParagraphText>{this.state.introductionText}</ParagraphText>
              <BottomLinkText onPress={this.noRecoveryPhrase}>
                I don't have my recovery phrase
              </BottomLinkText>
            </View>
          ) : (
            <View style={{ flex: 1 }} />
          )}

          <RecoveryWordInput
            recoveryIndex={this.state.recoveryIndex}
            recoveryPhrase={this.recoveryPhrase}
            keyboardShown={this.state.keyboardShown}
            error={this.state.acquisitionError}
            errorText='please enter a valid word'
            moveBackAWord={this._moveBackAWord}
            moveToNextWord={this._moveToNextWord}
            words={words}
            rowTextView={styles.rowTextView}
            addToRecoveryPhrase={this.addToRecoveryPhrase}
            setAcquisitionError={this.setAcquisitionError}
            recoveryWord={this.recoveryPhrase[this.state.recoveryIndex]}
            checkIfArrowsNeedToBeDisabled={this._checkIfArrowsNeedToBeDisabled}
          />
        </KeyboardAvoidingView>
        <CustomOneButtonAlert
          message='Your recovery phrase is necessary to prove ownership of your ndau. Your wallet cannot be restored without it. If you have lost your recovery phrase please contact'
          isVisible={this.state.dialogVisible}
          buttonTitle='Oneiro concierge support'
          buttonHandler={() => {
            this.setState({ dialogVisible: !this.state.dialogVisible })
            this.sendEmail()
          }}
        />
      </SetupContainer>
    )
  }

  _renderConfirmation = () => {
    const words = DataFormatHelper.groupArrayIntoRows(
      this.recoveryPhrase,
      this.rowLength
    )
    const styles = {
      rowTextView: {
        height: hp(this.boxHeight),
        width: wp(this.boxWidth)
      },
      textStyle: {
        color: this.state.textColor,
        fontSize: 20,
        fontFamily: 'TitilliumWeb-Regular',
        textAlign: 'center'
      }
    }

    return (
      <SetupContainer
        {...this.props}
        pageNumber={15}
        goBack={this.fromHamburger ? this.goBack : null}
      >
        <WaitingForBlockchainSpinner spinner={this.state.spinner} />
        <ParagraphText>Please verify your recovery phrase.</ParagraphText>
        <RecoveryPhraseConfirmation
          words={words}
          rowTextView={styles.rowTextView}
        />
        <LargeButtons text='Is this correct?' onPress={() => this.confirm()}>
          Confirm
        </LargeButtons>
        <LargeButtons bottom secondary onPress={() => this.pushBack()}>
          Back
        </LargeButtons>
      </SetupContainer>
    )
  }

  render () {
    return !this.state.recoverPhraseFull
      ? this._renderAcquisition()
      : this._renderConfirmation()
  }
}

export default SetupGetRecoveryPhrase
