import React, { useState } from 'react'
import {
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Text,
  NativeModules,
  LayoutAnimation
} from 'react-native'
import { Progress } from 'nachos-ui'
import {
  ProgressBar,
  MainContainer,
  FullScreenTripColorGradient,
  FullScreenDualColorGradient,
  TextInput,
  FullBarBorder,
  ParagraphText
} from '../common'
import styles from './styles'
import AppConstants from '../../AppConstants'
import Icon from 'react-native-fontawesome-pro'
import cssStyles from '../../css/styles'
import DataFormatHelper from '../../helpers/DataFormatHelper'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

export function SetupWelcomeContainer ({ children }) {
  return (
    <MainContainer>
      <ImageBackground
        source={require('img/bloom.png')}
        style={styles.setupContainerBackgroundImage}
        resizeMode='contain'
      />
      <FullScreenTripColorGradient>
        <View style={styles.setupWelcomeContainer}>{children}</View>
      </FullScreenTripColorGradient>
    </MainContainer>
  )
}

export function SetupContainer (props) {
  goBack = () => {
    if (props.goBack) {
      props.goBack()
    } else {
      props.navigation.goBack()
    }
  }
  return (
    <MainContainer>
      <View style={{ flex: 1 }}>
        <ProgressBar goBack={goBack} pageNumber={props.pageNumber} />

        <FullScreenDualColorGradient style={styles.setupContainerOverlay}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps='always'
          >
            <View style={styles.setupContainer}>{props.children}</View>
          </ScrollView>
        </FullScreenDualColorGradient>
      </View>
    </MainContainer>
  )
}

export function SetupContainerWithScrollView (props) {
  goBack = () => {
    props.navigation.goBack()
  }
  return (
    <MainContainer>
      <View style={{ flex: 1 }}>
        <ProgressBar goBack={() => goBack()} pageNumber={props.pageNumber} />
        <FullScreenDualColorGradient style={styles.setupContainerOverlay}>
          <ScrollView
            keyboardShouldPersistTaps='always'
            style={styles.setupContainerWithScrollView}
          >
            {props.children}
          </ScrollView>
        </FullScreenDualColorGradient>
      </View>
    </MainContainer>
  )
}

export function LargeText ({ children }) {
  return <Text style={[styles.largeText]}>{children}</Text>
}

export function UnderlineDivider ({ children }) {
  return <Progress style={styles.underline} />
}

export function RecoveryConfirmationText (props) {
  return (
    <Text style={[styles.recoveryConfirmationText]} {...props}>
      {props.children}
    </Text>
  )
}

export function RecoveryWordsText (props) {
  return (
    <Text style={[styles.recoveryConfirmationText]} {...props}>
      {props.children}
    </Text>
  )
}

export function RecoveryConfirmationTextOnly (props) {
  return (
    <Text style={[styles.recoveryConfirmationTextOnly]} {...props}>
      {props.children}
    </Text>
  )
}

export function RecoveryPhraseConfirmation (props) {
  return (
    <View style={styles.recoveryConfirmationContainer}>
      {props.words.map((row, rowIndex) => {
        return (
          <View key={rowIndex} style={styles.recoveryConfirmationRowView}>
            {row.map((item, index) => {
              return (
                <View key={index} style={[styles.recoveryConfirmationBox]}>
                  <RecoveryConfirmationText>{item}</RecoveryConfirmationText>
                </View>
              )
            })}
          </View>
        )
      })}
    </View>
  )
}

export function RecoveryPhraseAcqusition (props) {
  return (
    <View style={styles.recoveryWordsContainer}>
      {props.words.map((row, rowIndex) => {
        return (
          <View key={rowIndex} style={styles.recoveryAcquisitionRowView}>
            {row.map((item, index) => {
              return item !== '' ? (
                <TouchableOpacity
                  key={index}
                  onPress={() => props.handleWordClick(item)}
                >
                  <View style={[styles.recoveryConfirmationBox]}>
                    <RecoveryConfirmationText>{item}</RecoveryConfirmationText>
                  </View>
                </TouchableOpacity>
              ) : null
            })}
          </View>
        )
      })}
    </View>
  )
}

export function RecoveryPhraseConfirmationButtons (props) {
  return (
    <View style={styles.recoveryConfirmationButtonContainer}>
      {props.words.map((row, rowIndex) => {
        return (
          <View key={rowIndex} style={styles.recoveryConfirmationRowView}>
            {row.map((item, index) => {
              const i = index + row.length * rowIndex
              return (
                <TouchableOpacity
                  key={index}
                  onPress={event => props.handleClick(i, event)}
                >
                  <RecoveryPhraseConfirmationButton
                    error={props.errorWord == i}
                    selected={props.selected[i]}
                  >
                    <RecoveryConfirmationText>{item}</RecoveryConfirmationText>
                  </RecoveryPhraseConfirmationButton>
                </TouchableOpacity>
              )
            })}
          </View>
        )
      })}
    </View>
  )
}

export function RecoveryPhraseConfirmationButton (props) {
  let bgColor = AppConstants.SQUARE_BUTTON_COLOR
  if (props.error) {
    bgColor = AppConstants.WARNING_ICON_COLOR
  } else if (props.selected) {
    bgColor = '#A0CFBD'
  }
  return (
    <View
      style={[
        styles.recoveryConfirmationButtonBox,
        { backgroundColor: bgColor }
      ]}
    >
      {props.children}
    </View>
  )
}

export function RecoveryPhraseConfirmationTextOnly (props) {
  return (
    <View style={styles.recoveryConfirmationContainerTextOnly}>
      {props.words.map((row, rowIndex) => {
        return (
          <View
            key={rowIndex}
            style={styles.recoveryConfirmationRowViewTextOnly}
          >
            {row.map((item, index) => {
              return (
                <RecoveryConfirmationTextOnly key={index}>
                  {' '}
                  {item}{' '}
                </RecoveryConfirmationTextOnly>
              )
            })}
          </View>
        )
      })}
    </View>
  )
}

export function RecoveryWords (props) {
  return (
    <View style={styles.recoveryWordsContainer}>
      <ParagraphText noPaddingOrMargin textStyle={{ marginLeft: wp('6%') }}>
        Suggested words
      </ParagraphText>
      <FullBarBorder marginBottom />
      <RecoveryPhraseAcqusition {...props} />
    </View>
  )
}

export const RecoveryWordInput = props => {
  const [input, setInput] = useState('')
  const [wordsArray, setWordsArray] = useState([])

  const nextWord = async () => {
    LayoutAnimation.easeInEaseOut()
    if (await props.moveToNextWord()) {
      setInput('')
      setWordsArray([])
    }
  }

  const prevWord = () => {
    LayoutAnimation.easeInEaseOut()
    props.moveBackAWord()
    setInput('')
    setWordsArray([])
  }

  const handleWords = async text => {
    const words =
      text !== ''
        ? await NativeModules.KeyaddrManager.keyaddrWordsFromPrefix(
          AppConstants.APP_LANGUAGE,
          text,
          6
        )
        : ' '
    setWordsArray(DataFormatHelper.groupArrayIntoRows(words.split(/\s+/g), 3))

    props.checkIfArrowsNeedToBeDisabled(words, text)
    props.setAcquisitionError(!words.length)
    props.addToRecoveryPhrase(text)
  }

  const handleWordClick = async text => {
    LayoutAnimation.easeInEaseOut()
    const words = await NativeModules.KeyaddrManager.keyaddrWordsFromPrefix(
      AppConstants.APP_LANGUAGE,
      text,
      6
    )

    setInput(text)

    props.checkIfArrowsNeedToBeDisabled(words, text)
    props.addToRecoveryPhrase(text)
    nextWord()
  }

  return (
    <View style={{ flexGrow: 1, justifyContent: 'flex-end' }}>
      {props.keyboardShown ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text style={cssStyles.wizardText}>{props.recoveryIndex + 1}</Text>
          <Text style={cssStyles.wizardText}>{' of '}</Text>
          <Text style={cssStyles.wizardText}>
            {props.recoveryPhrase.length}
          </Text>
        </View>
      ) : null}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          margin: wp('6%')
        }}
      >
        <Icon
          name='arrow-square-left'
          color={AppConstants.ICON_BUTTON_COLOR}
          size={48}
          type='light'
          onPress={prevWord}
        />
        <View
          style={{
            flex: 3,
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <View>
            <TextInput
              style={{
                marginLeft: wp('4%'),
                marginRight: wp('4%'),
                flexGrow: 1
              }}
              autoCapitalize='none'
              error={props.error}
              onChangeText={text => {
                LayoutAnimation.easeInEaseOut()
                handleWords(text)
                setInput(text)
              }}
              value={input || props.recoveryWord}
              blurOnSubmit={false}
              onSubmitEditing={nextWord}
              autoCorrect={false}
            />
          </View>
          <View>
            {props.error ? (
              <Text style={[styles.smallErrorText]}>{props.errorText}</Text>
            ) : null}
          </View>
        </View>
        <Icon
          name='arrow-square-right'
          color={AppConstants.ICON_BUTTON_COLOR}
          size={48}
          type='light'
          onPress={nextWord}
        />
      </View>
      {props.keyboardShown ? (
        <RecoveryWords words={wordsArray} handleWordClick={handleWordClick} />
      ) : null}
    </View>
  )
}
