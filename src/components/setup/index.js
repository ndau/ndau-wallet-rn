import React from 'react'
import { View, ScrollView, StatusBar, ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import componentStyles from '../../css/componentStyles'
import LinearGradient from 'react-native-linear-gradient'
import { H4, Progress, P } from 'nachos-ui'
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
        locations={[0, 0.3, 0.5, 1.0]}
        colors={['#0F2748', '#4E957A', '#293E63', '#0F2748']}
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

export function RecoveryPhraseConfirmation (props) {
  console.log(props.rowTextView)
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
