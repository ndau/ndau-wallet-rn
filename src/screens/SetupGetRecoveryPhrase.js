import React, { Component } from 'react'
import { View, ScrollView, Text, Linking, PixelRatio, Platform } from 'react-native'
import groupIntoRows from '../helpers/groupIntoRows'
import CommonButton from '../components/CommonButton'
import cssStyles from '../css/styles'
import { SafeAreaView } from 'react-navigation'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import RecoveryDropdown from '../components/RecoveryDropdown'
import Carousel from 'react-native-looped-carousel'
import { Dialog } from 'react-native-simple-dialogs'
import ErrorPanel from '../components/ErrorPanel'
import SetupProgressBar from '../components/SetupProgressBar'
import RecoveryPhaseHelper from '../helpers/RecoveryPhaseHelper'
import MultiSafeHelper from '../helpers/MultiSafeHelper'
import UserData from '../model/UserData'
import AppConstants from '../AppConstants'
import SetupStore from '../model/SetupStore'

const DEFAULT_ROW_LENGTH = 3 // 3 items per row
const _ = require('lodash')

class SetupGetRecoveryPhrase extends Component {
  constructor (props) {
    super(props)
    this.NORMAL_MODE_TEXT =
      `To verify your account please verify your twelve-word recovery` +
      `phrase below. Start typing in the box below, then pick the correct suggestion.`
    this.PASSWORD_RESET_MODE_TEXT =
      'To reset your password, please verify your ' +
      'twelve-word recovery phrase. Start typing in the box below, then pick the ' +
      'correct suggestion'
    this.GENESIS_MODE_TEXT =
      `We're almost ready to get you on the ndau blockchain, ` +
      'but we need one last thing from you. \n\nPlease verify your twelve word ' +
      'recovery phrase. Start typing in the box below, then pick the correct suggestion'

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
      mode: AppConstants.NORMAL_MODE
    }

    // TODO: you can uncomment the below if you need to do some testing
    // on a known phrase that works in testnet/devnet
    this.recoveryPhrase = ['', '', '', '', '', '', '', '', '', '', '', '']
    // this.recoveryPhrase = [
    //   'deal',
    //   'perfect',
    //   'success',
    //   'good',
    //   'noodle',
    //   'reason',
    //   'sunset',
    //   'method',
    //   'grid',
    //   'credit',
    //   'evoke',
    //   'segment'
    // ]
    // this.recoveryPhrase = [
    //   'goat',
    //   'amount',
    //   'liar',
    //   'amount',
    //   'expire',
    //   'adjust',
    //   'cage',
    //   'candy',
    //   'arch',
    //   'gather',
    //   'drum',
    //   'buyer'
    // ]

    this.boxWidth = '30%'
    this.boxHeight = '13%'
    this.rowLength = DEFAULT_ROW_LENGTH
    // if someone has cranked up the font use 1 row instead
    console.log(`PixelRatio.getFontScale is ${PixelRatio.getFontScale()}`)
    if (PixelRatio.getFontScale() > 2) {
      this.rowLength = 1
      this.boxWidth = '100%'
      this.boxHeight = '30%'
      console.log(`boxWidth: ${this.boxWidth} and boxHeight: ${this.boxHeight}`)
    }
  }

  componentWillMount () {
    const mode = this.props.navigation.getParam('mode', AppConstants.NORMAL_MODE)
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
  }

  addToRecoveryPhrase = (value, index) => {
    this.recoveryPhrase[index] = value
  }

  noRecoveryPhrase = () => {
    this.setState({ dialogVisible: true })
  }

  sendEmail = () => {
    Linking.openURL('mailto:support@oneiro.freshdesk.com?subject=Lost Recovery Phrase')
  }

  _onLayoutDidChange = e => {
    const layout = e.nativeEvent.layout
    this.setState({ size: { width: layout.width, height: layout.height } })
  }

  _generatePage = index => {
    const style = [this.state.size, cssStyles.recoveryPageView]
    if (index === 0) {
      style.push({
        ...Platform.select({
          android: {
            marginLeft: wp('14%')
          }
        })
      })
    }
    return (
      <View style={style} key={index}>
        <Text style={[cssStyles.wizardText, { marginTop: hp('1%'), marginRight: wp('2%') }]}>
          {index + 1}.
        </Text>
        <RecoveryDropdown
          addToRecoveryPhrase={this.addToRecoveryPhrase}
          index={index}
          setAcquisitionError={this.setAcquisitionError}
          recoveryPhrase={this.recoveryPhrase}
        />
      </View>
    )
  }

  _generatePages = () => {
    const pages = this.recoveryPhrase.map((phrase, i) => {
      return this._generatePage(i)
    })

    // add one more page to facilitate the carousel functionality
    pages.push(this._generatePage(pages.length))

    return pages
  }

  _checkRecoveryPhrase = async () => {
    return await RecoveryPhaseHelper.checkRecoveryPhrase(
      this.recoveryPhrase.join().replace(/,/g, ' '),
      this.props.navigation.getParam('user', null)
    )
  }

  setAcquisitionError = value => {
    this.setState({ acquisitionError: value })
  }

  confirm = async () => {
    try {
      const { navigation } = this.props

      if (this.state.mode === AppConstants.PASSWORD_RESET_MODE) {
        navigation.navigate('SetupEncryptionPassword', {
          user,
          walletSetupType: navigation.state.params && navigation.state.params.walletSetupType,
          mode: AppConstants.PASSWORD_RESET_MODE,
          recoveryPhraseString: this.recoveryPhrase.join().replace(/,/g, ' ')
        })
        return
      }

      const user = await this._checkRecoveryPhrase()
      if (user) {
        const encryptionPassword = navigation.getParam('encryptionPassword', null)
        // IF we have a password we are fixing up an account from a 1.6 user here
        // so we fixed it up...now save it...and go back to Dashboard
        if (encryptionPassword) {
          await UserData.loadData(user)

          await MultiSafeHelper.saveUser(user, encryptionPassword)

          this.props.navigation.navigate('Dashboard', {
            user,
            encryptionPassword,
            walletSetupType: navigation.state.params && navigation.state.params.walletSetupType
          })
        } else {
          SetupStore.recoveryPhrase = this.recoveryPhrase
          navigation.navigate('SetupWalletName', {
            user,
            walletSetupType: navigation.state.params && navigation.state.params.walletSetupType
          })
        }
      } else {
        this.setState({
          textColor: '#ff0000',
          confirmationError: true
        })
      }
    } catch (error) {
      console.error(error)
      this.setState({
        textColor: '#ff0000',
        confirmationError: true
      })
    }
  }

  pushBack = () => {
    this.setState({
      recoverPhraseFull: false,
      confirmationError: false,
      textColor: '#ffffff'
    })
  }

  adjustStepNumber = pageIndex => {
    this.setState({ stepNumber: pageIndex })
    if (pageIndex === this.recoveryPhrase.length) {
      this.setState({ recoverPhraseFull: true })
    }
  }

  checkIfDone = pageIndex => {}

  _renderAcquisition = () => {
    const pages = this._generatePages()

    return (
      <SafeAreaView style={cssStyles.safeContainer}>
        <View style={cssStyles.container}>
          <ScrollView style={cssStyles.contentContainer} keyboardShouldPersistTaps='always'>
            <SetupProgressBar
              stepNumber={this.state.stepNumber}
              navigation={this.props.navigation}
            />
            <View style={{ marginBottom: 10 }}>
              <Text style={cssStyles.wizardText}>
                {this.state.introductionText}
              </Text>
            </View>
            <View style={{ flex: 1 }} onLayout={this._onLayoutDidChange}>
              <Carousel
                style={this.state.size}
                leftArrowText={'＜'}
                leftArrowStyle={cssStyles.carouselArrows}
                rightArrowText={'＞'}
                rightArrowStyle={cssStyles.carouselArrows}
                pageInfo
                pageInfoTextStyle={cssStyles.smallWhiteText}
                // bullets
                arrows
                isLooped={false}
                autoplay={false}
                onAnimateNextPage={this.adjustStepNumber}
                onPageBeingChanged={this.checkIfDone}
              >
                {pages}
              </Carousel>
            </View>
            {this.state.acquisitionError
              ? <ErrorPanel errorText={'Please select a valid word.'} />
              : null}
          </ScrollView>
          <View style={cssStyles.footer}>
            <Text
              onPress={this.noRecoveryPhrase}
              style={[cssStyles.linkText, { textAlign: 'center' }]}
            >
              I don't have my recovery phrase
            </Text>
          </View>
        </View>
        <Dialog
          style={{
            fontSize: 18,
            fontFamily: 'TitilliumWeb-Regular'
          }}
          visible={this.state.dialogVisible}
          // title="Missing Recovery Phrase"
          onTouchOutside={() => this.setState({ dialogVisible: false })}
        >
          <View>
            <Text style={cssStyles.blackDialogText}>
              Your recovery phrase is necessary to prove ownership of your ndau. Your wallet cannot
              be restored without it. If you have lost your recovery phrase please contact{' '}
            </Text>
            <Text onPress={this.sendEmail} style={[cssStyles.blueLinkText]}>
              Oneiro concierge support.
            </Text>
          </View>
        </Dialog>
      </SafeAreaView>
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
      <SafeAreaView style={cssStyles.safeContainer}>
        <View style={cssStyles.container}>
          <ScrollView style={cssStyles.contentContainer} keyboardShouldPersistTaps='always'>
            <SetupProgressBar
              stepNumber={this.state.stepNumber}
              navigation={this.props.navigation}
            />
            <View style={{ marginBottom: 10 }}>
              <Text style={cssStyles.wizardText}>Is this the correct recovery phrase? </Text>
            </View>
            {words.map((row, rowIndex) => {
              return (
                <View key={rowIndex} style={cssStyles.rowView}>
                  {row.map((item, index) => {
                    return (
                      <View key={index} style={styles.rowTextView}>
                        <Text style={styles.textStyle}>
                          {count++}.{'\n'}
                          {item}
                        </Text>
                      </View>
                    )
                  })}
                </View>
              )
            })}
            {this.state.confirmationError
              ? <ErrorPanel
                errorText={'Is this the correct recovery phrase? Please correct any errors.'}
                />
              : null}
          </ScrollView>
          <View style={cssStyles.footer}>
            <View style={cssStyles.navButtonWrapper}>
              <CommonButton onPress={() => this.pushBack()} title='Back' />
            </View>
            <View style={cssStyles.navButtonWrapper}>
              <CommonButton onPress={() => this.confirm()} title='Confirm' />
            </View>
          </View>
        </View>
      </SafeAreaView>
    )
  }

  render () {
    console.log(`recoverPhrase is now: ${this.recoveryPhrase}`)

    return !this.state.recoverPhraseFull ? this._renderAcquisition() : this._renderConfirmation()
  }
}

export default SetupGetRecoveryPhrase
