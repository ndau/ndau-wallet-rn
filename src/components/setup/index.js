import React from 'react'
import {
  View,
  ScrollView,
  StatusBar,
  ImageBackground,
  TouchableOpacity
} from 'react-native'
import { SafeAreaView } from 'react-navigation'
import componentStyles from '../../css/componentStyles'
import LinearGradient from 'react-native-linear-gradient'
import { H4, Progress, P, Input } from 'nachos-ui'
import { ProgressBar } from '../common'

export function SetupWelcomeContainer ({ children }) {
  return (
    <SafeAreaView
      style={[componentStyles.container, componentStyles.statusBarColor]}
    >
      <StatusBar barStyle='light-content' backgroundColor='#000000' />
      <ImageBackground
        source={require('img/bloom.jpg')}
        style={componentStyles.setupContainerBackgroundImage}
        resizeMode='contain'
      />
      <LinearGradient
        start={{ x: 0.0, y: 0.2 }}
        end={{ x: 0.5, y: 1.0 }}
        locations={[0, 0.5037, 1.0]}
        colors={['#0F2748', '#293E63', '#0F2748']}
        style={[componentStyles.opaqueOverlay]}
      >
        <View style={componentStyles.setupWelcomeContainer}>{children}</View>
      </LinearGradient>
    </SafeAreaView>
  )
}

export function SetupContainer (props) {
  goBack = () => {
    props.navigation.goBack()
  }
  return (
    <SafeAreaView
      style={[componentStyles.container, componentStyles.statusBarColor]}
    >
      <StatusBar barStyle='light-content' backgroundColor='#000000' />
      <View style={{ flex: 1 }}>
        <ProgressBar goBack={() => goBack()} pageNumber={props.pageNumber} />
        <LinearGradient
          locations={[0, 1.0]}
          colors={['#0F2748', '#293E63']}
          style={[componentStyles.setupContainerOverlay]}
        >
          <View style={componentStyles.setupContainer}>{props.children}</View>
        </LinearGradient>
      </View>
    </SafeAreaView>
  )
}

export function SetupContainerWithScrollView (props) {
  goBack = () => {
    props.navigation.goBack()
  }
  return (
    <SafeAreaView
      style={[componentStyles.container, componentStyles.statusBarColor]}
    >
      <StatusBar barStyle='light-content' backgroundColor='#000000' />
      <View style={{ flex: 1 }}>
        <ProgressBar goBack={() => goBack()} pageNumber={props.pageNumber} />
        <LinearGradient
          locations={[0, 1.0]}
          colors={['#0F2748', '#293E63']}
          style={[componentStyles.setupContainerOverlay]}
        >
          <ScrollView style={componentStyles.setupContainerWithScrollView}>
            {props.children}
          </ScrollView>
        </LinearGradient>
      </View>
    </SafeAreaView>
  )
}

export function LargeText ({ children }) {
  return <H4 style={[componentStyles.largeText]}>{children}</H4>
}

export function UnderlineDivider ({ children }) {
  return <Progress style={componentStyles.underline} />
}

export function ParagraphText (props) {
  return (
    <P style={[componentStyles.paragraphText]} {...props}>
      {props.children}
    </P>
  )
}

export function SmallParagraphText (props) {
  return (
    <P style={[componentStyles.smallParagraphText]} {...props}>
      {props.children}
    </P>
  )
}

export function RecoveryConfirmationText (props) {
  return (
    <P style={[componentStyles.recoveryConfirmationText]} {...props}>
      {props.children}
    </P>
  )
}

export function RecoveryConfirmationTextOnly (props) {
  return (
    <P style={[componentStyles.recoveryConfirmationTextOnly]} {...props}>
      {props.children}
    </P>
  )
}

export function RecoveryPhraseConfirmation (props) {
  return (
    <View style={componentStyles.recoveryConfirmationContainer}>
      {props.words.map((row, rowIndex) => {
        return (
          <View
            key={rowIndex}
            style={componentStyles.recoveryConfirmationRowView}
          >
            {row.map((item, index) => {
              return (
                <View
                  key={index}
                  style={[componentStyles.recoveryConfirmationBox]}
                >
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

export function RecoveryPhraseConfirmationButtons (props) {
  return (
    <View style={componentStyles.recoveryConfirmationButtonContainer}>
      {props.words.map((row, rowIndex) => {
        return (
          <View
            key={rowIndex}
            style={componentStyles.recoveryConfirmationRowView}
          >
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
  let bgColor = '#4e957a'
  if (props.error) {
    bgColor = '#f05123'
  } else if (props.selected) {
    bgColor = '#A0CFBD'
  }
  return (
    <View
      style={[
        componentStyles.recoveryConfirmationButtonBox,
        { backgroundColor: bgColor }
      ]}
    >
      {props.children}
    </View>
  )
}

export function RecoveryPhraseConfirmationTextOnly (props) {
  return (
    <View style={componentStyles.recoveryConfirmationContainerTextOnly}>
      {props.words.map((row, rowIndex) => {
        return (
          <View
            key={rowIndex}
            style={componentStyles.recoveryConfirmationRowViewTextOnly}
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
