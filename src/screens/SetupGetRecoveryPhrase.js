import React, { Component } from 'react'
import {
  View,
  KeyboardAvoidingView,
  Text,
  Linking,
  PixelRatio,
  Platform,
  TouchableOpacity,
  Keyboard
} from 'react-native'
import groupIntoRows from '../helpers/groupIntoRows'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import RecoveryDropdown from '../components/common/RecoveryDropdown'
import { Dialog } from 'react-native-simple-dialogs'
import RecoveryPhaseHelper from '../helpers/RecoveryPhaseHelper'
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
import NdauStore from '../stores/NdauStore'

const DEFAULT_ROW_LENGTH = 4
const _ = require('lodash')

const ANDROID_SHRINK_SIZE = '15%'
const ANDROID_NORMAL_SIZE = '62%'
const IOS_SHRINK_SIZE = '28%'
const IOS_NORMAL_SIZE = '55%'

class SetupGetRecoveryPhrase extends Component {
  constructor (props) {
    super(props)
    this.NORMAL_MODE_TEXT = `Type your 12 word recovery phrase below to recovery your wallet.`
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
      // recoverPhraseFull: true,
      textColor: '#ffffff',
      confirmationError: false,
      acquisitionError: false,
      stepNumber: 0,
      introductionText: this.NORMAL_MODE_TEXT,
      mode: AppConstants.NORMAL_MODE,
      recoveryIndex: 0,
      disableArrows: true,
      spinner: false,
      lowerHeightAndroid: ANDROID_NORMAL_SIZE,
      lowerHeightIOS: IOS_NORMAL_SIZE,
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
    this.recoveryDropdownRef = null
    props.navigation.addListener('didBlur', FlashNotification.hideMessage)
  }

  componentWillMount () {
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

  _moveToNextWord = () => {
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
          if (this.recoveryDropdownRef) {
            this.recoveryDropdownRef.clearWord()
            this.recoveryDropdownRef.focus()
          }
        }
      )
    }
    FlashNotification.hideMessage()
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
          if (this.recoveryDropdownRef) {
            this.recoveryDropdownRef.clearWord()
            this.recoveryDropdownRef.focus()
          }
        }
      )
    }
    FlashNotification.hideMessage()
  }

  _recoverUser = async () => {
    return await RecoveryPhaseHelper.recoverUser(
      DataFormatHelper.convertRecoveryArrayToString(this.recoveryPhrase),
      UserStore.getUser()
    )
  }

  setDisableArrows = value => {
    this.setState({ disableArrows: value })
  }

  setAcquisitionError = value => {
    if (value) {
      FlashNotification.showError('Please select a valid word.', true)
      this.setState({ disableArrows: value })
    } else {
      FlashNotification.hideMessage()
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

  _getDuration = event => {
    if (event) {
      this.eventDuration = event.duration
    }
    return event ? event.duration : this.eventDuration
  }

  keyboardWillShow = event => {
    this.setState({
      keyboardShown: true
    })
  }

  keyboardWillHide = event => {
    this.setState({
      keyboardShown: false
    })
  }

  _renderAcquisition = () => {
    return (
      <SetupContainer
        {...this.props}
        goBack={this.fromHamburger ? this.goBack : null}
        pageNumber={2 + this.state.stepNumber}
      >
        <KeyboardAvoidingView
          keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
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
          />
        </KeyboardAvoidingView>
        <Dialog
          style={{
            fontSize: 18,
            fontFamily: 'TitilliumWeb-Regular'
          }}
          visible={this.state.dialogVisible}
          onTouchOutside={() => this.setState({ dialogVisible: false })}
        >
          <View>
            <Text style={cssStyles.blackDialogText}>
              Your recovery phrase is necessary to prove ownership of your ndau.
              Your wallet cannot be restored without it. If you have lost your
              recovery phrase please contact{' '}
            </Text>
            <Text onPress={this.sendEmail} style={[cssStyles.blueLinkText]}>
              Oneiro concierge support.
            </Text>
          </View>
        </Dialog>
      </SetupContainer>
    )
  }

  _renderConfirmation = () => {
    const words = groupIntoRows(this.recoveryPhrase, this.rowLength)
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
    let count = 1

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
