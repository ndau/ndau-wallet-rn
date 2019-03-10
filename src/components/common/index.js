import React from 'react'
import {
  View,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Picker,
  Text,
  Image
} from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { Button, Progress, H4, P, Checkbox, Input } from 'nachos-ui'
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro'
import LinearGradient from 'react-native-linear-gradient'
import { SmallParagraphText } from '../setup'
import styles from './styles'
import AppConstants from '../../AppConstants'
import RNQRCodeScanner from 'react-native-qrcode-scanner'
import RNQRCode from 'react-native-qrcode'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

export function LoginContainer ({ children }) {
  return (
    <MainContainer>
      <ImageBackground
        source={require('img/bloom.jpg')}
        style={styles.setupContainerBackgroundImage}
        resizeMode='contain'
      />
      <FullScreenTripColorGradient>
        <View style={styles.loginContainer}>{children}</View>
      </FullScreenTripColorGradient>
    </MainContainer>
  )
}

export function FullScreenTripColorGradient (props) {
  return (
    <LinearGradient
      start={{ x: 0.0, y: 0.2 }}
      end={{ x: 0.5, y: 1.0 }}
      locations={[0, 0.5037, 1.0]}
      colors={[
        AppConstants.FULL_SCREEN_GRADIENT_START_COLOR,
        AppConstants.FULL_SCREEN_GRADIENT_MID_COLOR,
        AppConstants.FULL_SCREEN_GRADIENT_END_COLOR
      ]}
      style={[styles.opaqueOverlay]}
    >
      {props.children}
    </LinearGradient>
  )
}

export function FullScreenDualColorGradient (props) {
  return (
    <LinearGradient
      locations={[0, 1.0]}
      colors={[
        AppConstants.FULL_SCREEN_DUAL_COLOR_GRADIENT_START_COLOR,
        AppConstants.FULL_SCREEN_DUAL_COLOR_GRADIENT_START_COLOR
      ]}
      style={[styles.appContainerOverlay, props.style]}
    >
      {props.children}
    </LinearGradient>
  )
}

export function LargeButtons (props) {
  return (
    <View
      style={
        props.bottom
          ? props.secondary
            ? styles.setupButtonContainerBottom
            : styles.setupButtonContainerBottomNoBorder
          : styles.setupButtonContainerTop
      }
    >
      {props.text ? (
        <SmallParagraphText>{props.text}</SmallParagraphText>
      ) : null}
      <Button
        style={
          props.secondary ? styles.largeButtonSecondary : styles.largeButton
        }
        textStyle={styles.largeButtonText}
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
          ? styles.setupButtonContainerScrollView
          : styles.setupButtonContainerBottomNoBorder
      }
    >
      <Button
        style={[styles.largeButton, props.style]}
        textStyle={[styles.largeButtonText, props.style]}
        uppercase={false}
        {...props}
      >
        {props.children}
      </Button>
    </View>
  )
}

export function LargeBorderButton (props) {
  return (
    <View>
      <Button
        style={[styles.largeBorderButton, props.style]}
        textStyle={[styles.largeButtonText, props.style]}
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
    <View style={[styles.centeredLinkContainer, { left: props.left }]}>
      <H4 {...props} style={styles.centeredLinkText}>
        {props.children}
      </H4>
    </View>
  )
}

export function LinkText (props) {
  return (
    <View style={[styles.linkContainer]}>
      <H4 {...props} style={[styles.linkText]}>
        {props.children}
      </H4>
    </View>
  )
}

export function PasswordLinkText (props) {
  return (
    <View style={[styles.passwordLinkContainer]}>
      <H4 {...props} style={[styles.linkText]}>
        {props.children}
      </H4>
    </View>
  )
}

export function NdauTotal (props) {
  return (
    <View style={[styles.ndauTotalContainer]}>
      <H4 {...props} style={[styles.ndauTotalText]}>
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
    <View style={styles.progressBarContainer}>
      <View style={styles.backArrow}>
        <TouchableOpacity onPress={props.goBack}>
          <FontAwesome5Pro
            size={32}
            name='arrow-left'
            color={AppConstants.ICON_BUTTON_COLOR}
            light
          />
        </TouchableOpacity>
      </View>
      <Progress
        progress={props.pageNumber ? props.pageNumber / SETUP_SCREEN_TOTAL : 0}
        color={AppConstants.PROGRESS_BAR_COLOR}
        style={styles.progressBar}
        width={240}
        height={8}
      />
      <H4 style={[styles.progressNumber]}>
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
    <View style={styles.labelWithIconContainer}>
      <P style={[styles.labelText]}>{props.children}</P>
      <TouchableOpacity {...props}>
        <FontAwesome5Pro
          size={24}
          name={props.fontAwesomeIconName}
          color={AppConstants.ICON_BUTTON_COLOR}
          light
        />
      </TouchableOpacity>
    </View>
  )
}

export function Label (props) {
  return (
    <P style={[styles.labelText]} {...props}>
      {props.children}
    </P>
  )
}

export function CheckBox (props) {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Checkbox
        style={props.scroll ? styles.checkboxInScrollView : styles.checkbox}
        iconColor={AppConstants.TEXT_COLOR}
        {...props}
      >
        {props.children}
      </Checkbox>
      <P style={[styles.checkboxLabel]} {...props}>
        {props.label}
      </P>
    </View>
  )
}

export function LegalText (props) {
  return (
    <P style={[styles.legalText]} {...props}>
      {props.children}
    </P>
  )
}

export function LegalTextHeading (props) {
  return (
    <P style={[styles.legalTextHeading]} {...props}>
      {props.children}
    </P>
  )
}

export function MainLegalTextHeading (props) {
  return (
    <P style={[styles.mainLegalTextHeading]} {...props}>
      {props.children}
    </P>
  )
}

export function LegalTextBold (props) {
  return (
    <P style={[styles.legalTextBold]} {...props}>
      {props.children}
    </P>
  )
}

export function AppContainer (props) {
  return (
    <MainContainer>
      <View style={{ flex: 1 }}>
        <LinearGradient
          start={{ x: 0.0, y: 0.1 }}
          end={{ x: 0.0, y: 1.0 }}
          locations={[0, 0.18]}
          colors={['#0A1724', '#0F2748']}
          style={[styles.appContainerOverlay]}
        >
          <View style={styles.appContainer}>{props.children}</View>
        </LinearGradient>
      </View>
    </MainContainer>
  )
}

export function TextInput (props) {
  return (
    <Input
      style={styles.input}
      placeholderTextColor='#858688'
      autoCapitalize='none'
      {...props}
    />
  )
}

export function BarBorder (props) {
  return <View style={styles.barBorder} />
}

export function Dropdown (props) {
  return (
    <View style={styles.dropdownDetailsTextPanel}>
      <Picker
        itemStyle={styles.dropdownPickerText}
        style={styles.dropdownPicker}
        {...props}
      >
        {Object.keys(props.items)
          .filter(key => key !== props.nickname)
          .map((key, index) => {
            return (
              <Picker.Item key={index} label={key} value={props.items[key]} />
            )
          })}
      </Picker>
    </View>
  )
}

export function OrBorder (props) {
  return (
    <View style={styles.orBorderPanel}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={styles.orBorder} />
        <View>
          <H4 style={styles.orBorderText}>OR</H4>
        </View>
        <View style={styles.orBorder} />
      </View>
    </View>
  )
}

export function MainContainer (props) {
  return (
    <SafeAreaView style={[styles.container, styles.statusBarColor]}>
      <StatusBar barStyle='light-content' backgroundColor='#000000' />
      {props.children}
    </SafeAreaView>
  )
}

export function ContentContainer (props) {
  return (
    <View style={[styles.appContainer, props.style]}>{props.children}</View>
  )
}

export function CloseForBar (props) {
  return (
    <View style={styles.closeForBar}>
      <TouchableOpacity onPress={props.close}>
        <FontAwesome5Pro
          size={36}
          name='times'
          color={AppConstants.ICON_BUTTON_COLOR}
          light
        />
      </TouchableOpacity>
    </View>
  )
}

export function CollapsablePanelText (props) {
  return (
    <Text style={styles.collapsibleTextVerySmallWhite}>{props.children}</Text>
  )
}

const NDAU = require('img/ndau_orange_logo.png')

export function LoginImage (props) {
  return (
    <View style={styles.loginImageView}>
      <Image style={styles.loginImage} resizeMode='contain' source={NDAU} />
    </View>
  )
}

export function TitleBarGradient (props) {
  return (
    <LinearGradient
      start={{ x: 0.0, y: 0.02 }}
      end={{ x: 0.0, y: 1.0 }}
      locations={[0, 0.05]}
      colors={[
        AppConstants.TITLE_BAR_GRADIENT_START_COLOR,
        AppConstants.TITLE_BAR_GRADIENT_END_COLOR
      ]}
      style={[styles.appContainerOverlay]}
    >
      {props.children}
    </LinearGradient>
  )
}

export function ParagraphText (props) {
  return (
    <P style={[styles.paragraphText]} {...props}>
      {props.children}
    </P>
  )
}

export function QRCodeScanner (props) {
  return <RNQRCodeScanner {...props} cameraStyle={styles.fullWidthAndHeight} />
}

export function QRCode (props) {
  return (
    <View style={styles.qrCode}>
      <RNQRCode
        value={props.value}
        size={wp('65%')}
        color='black'
        backgroundColor='white'
      />
    </View>
  )
}
