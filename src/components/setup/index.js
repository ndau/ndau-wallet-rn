import React from 'react'
import {
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Text
} from 'react-native'
import { Progress } from 'nachos-ui'
import {
  ProgressBar,
  MainContainer,
  FullScreenTripColorGradient,
  FullScreenDualColorGradient,
  TextInput
} from '../common'
import styles from './styles'
import AppConstants from '../../AppConstants'
import Icon from 'react-native-fontawesome-pro'
import cssStyles from '../../css/styles'

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

export function RecoveryWords (props) {
  return (
    <View style={styles.recoveryConfirmationContainer}>
      {props.words.map((row, rowIndex) => {
        return (
          <View key={rowIndex} style={styles.recoveryConfirmationRowView}>
            {row.map((item, index) => {
              return (
                <View key={index} style={[styles.recoveryConfirmationBox]}>
                  <RecoveryWordsText>{item}</RecoveryWordsText>
                </View>
              )
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

export const RecoveryWordInput = props => {
  return (
    <View style={{ flex: 2, justifyContent: 'flex-end' }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text style={cssStyles.wizardText}>{props.recoveryIndex + 1}</Text>
        <Text style={cssStyles.wizardText}>{' of '}</Text>
        <Text style={cssStyles.wizardText}>{props.recoveryPhrase.length}</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          margin: '4%'
        }}
      >
        <Icon
          name='arrow-square-left'
          color={AppConstants.ICON_BUTTON_COLOR}
          size={48}
          type='light'
        />
        <TextInput
          style={{ marginLeft: '4%', marginRight: '4%', flexGrow: 1 }}
        />
        <Icon
          name='arrow-square-right'
          color={AppConstants.ICON_BUTTON_COLOR}
          size={48}
          type='light'
        />
      </View>
      {props.keyboardShown ? <RecoveryWords words={[]} /> : null}
    </View>
  )
}
