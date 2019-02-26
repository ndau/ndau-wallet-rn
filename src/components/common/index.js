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
import { Button, Progress, H4, P, Checkbox, Input } from 'nachos-ui'
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro'
import LinearGradient from 'react-native-linear-gradient'
import { ParagraphText, SmallParagraphText } from '../setup'

export function LoginContainer ({ children }) {
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
        <View style={componentStyles.loginContainer}>{children}</View>
      </LinearGradient>
    </SafeAreaView>
  )
}

export function LargeButtons (props) {
  return (
    <View
      style={
        props.bottom
          ? props.secondary
            ? componentStyles.setupButtonContainerBottom
            : componentStyles.setupButtonContainerBottomNoBorder
          : componentStyles.setupButtonContainerTop
      }
    >
      {props.text ? (
        <SmallParagraphText>{props.text}</SmallParagraphText>
      ) : null}
      <Button
        style={
          props.secondary
            ? componentStyles.largeButtonSecondary
            : componentStyles.largeButton
        }
        textStyle={componentStyles.largeButtonText}
        uppercase={false}
        {...props}
      >
        {props.children}
      </Button>
    </View>
  )
}

export function LargeButton (props) {
  return (
    <View
      style={
        props.scroll
          ? componentStyles.setupButtonContainerScrollView
          : componentStyles.setupButtonContainerBottomNoBorder
      }
    >
      <Button
        style={componentStyles.largeButton}
        textStyle={componentStyles.largeButtonText}
        uppercase={false}
        {...props}
      >
        {props.children}
      </Button>
    </View>
  )
}

export function BottomLinkText (props) {
  return (
    <View style={[componentStyles.centeredLinkContainer, { left: props.left }]}>
      <H4 {...props} style={componentStyles.centeredLinkText}>
        {props.children}
      </H4>
    </View>
  )
}

export function LinkText (props) {
  return (
    <View style={[componentStyles.linkContainer]}>
      <H4 {...props} style={[componentStyles.linkText]}>
        {props.children}
      </H4>
    </View>
  )
}

export function PasswordLinkText (props) {
  return (
    <View style={[componentStyles.passwordLinkContainer]}>
      <H4 {...props} style={[componentStyles.linkText]}>
        {props.children}
      </H4>
    </View>
  )
}

export function NdauTotal (props) {
  return (
    <View style={[componentStyles.ndauTotalContainer]}>
      <H4 {...props} style={[componentStyles.ndauTotalText]}>
        {props.children}
      </H4>
    </View>
  )
}

export const NEW_WALLET_SETUP_TYPE = 'new'
export const RECOVERY_WALLET_SETUP_TYPE = 'recovery'

const SETUP_SCREEN_TOTAL = 19

export function ProgressBar (props) {
  return (
    <View style={componentStyles.progressBarContainer}>
      <View style={componentStyles.backArrow}>
        <TouchableOpacity onPress={props.goBack}>
          <FontAwesome5Pro size={28} name='arrow-left' color='#4B9176' light />
        </TouchableOpacity>
      </View>
      <Progress
        progress={props.pageNumber ? props.pageNumber / SETUP_SCREEN_TOTAL : 0}
        color='#4E957A'
        style={componentStyles.progressBar}
        width={240}
        height={8}
      />
      <H4 style={[componentStyles.progressNumber]}>
        {props.pageNumber
          ? Math.round((props.pageNumber / SETUP_SCREEN_TOTAL) * 100)
          : '0'}
        %
      </H4>
    </View>
  )
}

export function LabelWithIcon (props) {
  return (
    <View style={componentStyles.labelWithIconContainer}>
      <P style={[componentStyles.labelText]}>{props.children}</P>
      <TouchableOpacity {...props}>
        <FontAwesome5Pro
          size={24}
          name={props.fontAwesomeIconName}
          color='#4B9176'
          light
        />
      </TouchableOpacity>
    </View>
  )
}

export function Label (props) {
  return (
    <P style={[componentStyles.labelText]} {...props}>
      {props.children}
    </P>
  )
}

export function CheckBox (props) {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Checkbox
        style={
          props.scroll
            ? componentStyles.checkboxInScrollView
            : componentStyles.checkbox
        }
        iconColor='#FFFFFF'
        {...props}
      >
        {props.children}
      </Checkbox>
      <P style={[componentStyles.checkboxLabel]} {...props}>
        {props.label}
      </P>
    </View>
  )
}

export function LegalText (props) {
  return (
    <P style={[componentStyles.legalText]} {...props}>
      {props.children}
    </P>
  )
}

export function LegalTextHeading (props) {
  return (
    <P style={[componentStyles.legalTextHeading]} {...props}>
      {props.children}
    </P>
  )
}

export function MainLegalTextHeading (props) {
  return (
    <P style={[componentStyles.mainLegalTextHeading]} {...props}>
      {props.children}
    </P>
  )
}

export function LegalTextBold (props) {
  return (
    <P style={[componentStyles.legalTextBold]} {...props}>
      {props.children}
    </P>
  )
}

export function AppContainer (props) {
  return (
    <SafeAreaView
      style={[componentStyles.container, componentStyles.statusBarColor]}
    >
      <StatusBar barStyle='light-content' backgroundColor='#000000' />
      <View style={{ flex: 1 }}>
        <LinearGradient
          start={{ x: 0.0, y: 0.1 }}
          end={{ x: 0.0, y: 1.0 }}
          locations={[0, 0.18]}
          colors={['#0A1724', '#0F2748']}
          style={[componentStyles.appContainerOverlay]}
        >
          <View style={componentStyles.appContainer}>{props.children}</View>
        </LinearGradient>
      </View>
    </SafeAreaView>
  )
}

export function TextInput (props) {
  return (
    <Input
      style={componentStyles.input}
      placeholderTextColor='#858688'
      autoCapitalize='none'
      {...props}
    />
  )
}
