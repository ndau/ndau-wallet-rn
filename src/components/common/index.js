import React from 'react'
import {
  View,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Text,
  Image,
  ScrollView
} from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { Button, Progress, H4, P, Checkbox, Input, RadioGroup } from 'nachos-ui'
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro'
import LinearGradient from 'react-native-linear-gradient'
import { SmallParagraphText } from '../setup'
import styles from './styles'
import AppConstants from '../../AppConstants'
import { RNCamera } from 'react-native-camera'
import BarcodeMask from 'react-native-barcode-mask'
import { QRCode } from 'react-native-custom-qr-codes'
import Spinner from 'react-native-loading-spinner-overlay'

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
        <ScrollView>
          <View style={styles.loginContainer}>{children}</View>
        </ScrollView>
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
  let sideMargins = {}
  if (props.sideMargins) {
    sideMargins = styles.largeButtonMargin
  }
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
          props.secondary
            ? [styles.largeButtonSecondary, sideMargins]
            : [styles.largeButton, sideMargins]
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
  let sideMargins = {}
  if (props.sideMargins) {
    sideMargins = styles.largeButtonMargin
  }
  return (
    <View
      style={
        props.scroll
          ? styles.setupButtonContainerScrollView
          : styles.setupButtonContainerBottomNoBorder
      }
    >
      <Button
        style={[styles.largeButton, sideMargins, props.style]}
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
    <Button
      style={[styles.largeBorderButton, props.style]}
      textStyle={[styles.largeButtonText, props.style]}
      uppercase={false}
      {...props}
    >
      {props.children}
    </Button>
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
      <P style={styles.ndauLarge}>n</P>
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
  let margin = {}
  if (!props.noMargin) {
    margin = styles.labelTextMarginRight
  }
  return (
    <View style={styles.labelWithIconContainer}>
      <P style={[styles.labelText, margin]}>{props.children}</P>
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
  let margin = {}
  if (!props.noMargin) {
    margin = styles.labelTextMarginRight
  }
  return (
    <P style={[styles.labelText, margin]} {...props}>
      {props.children}
    </P>
  )
}

/**
 * This is a homegrown button as opposed to using nachosui. The reason
 * here is that they way nachosui inserts Icon objects does not allow
 * customization. You can change the fontset but the button doesn't call
 * the Icon correctly to pass in the name of the icon. It uses a hardcoded
 * map of name to unicode characters. These unicode characters do not line
 * up to the FontAwesomePro5 set.
 *
 * @param {Object} props
 */
export function CheckBox (props) {
  const {
    activeOpacity,
    disabled,
    checkComponent,
    checked,
    onValueChange
  } = props

  const isChecked = checked || false
  return (
    <View style={[{ flexDirection: 'row' }, disabled ? disabledStyle : {}]}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={props.scroll ? styles.checkboxInScrollView : styles.checkbox}
        onPress={() => onValueChange(!checked)}
        {...props}
      >
        {isChecked && !checkComponent && (
          <FontAwesome5Pro
            color={AppConstants.TEXT_COLOR}
            name='check'
            size={18}
            light
          />
        )}
        {isChecked && checkComponent}
      </TouchableOpacity>
      <P style={[styles.checkboxLabel]} {...props}>
        {props.label}
      </P>
    </View>
  )
}

export function RadioButton (props) {
  return (
    <RadioGroup
      style={styles.radioButton}
      textStyle={styles.checkboxLabel}
      direction='column'
      {...props}
    />
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
  const stylesArray = [styles.input]
  if (!props.noBottomMargin) {
    stylesArray.push(styles.inputBottomMargin)
  }
  if (!props.noSideMargins) {
    stylesArray.push(styles.inputSideMargins)
  }
  if (props.error) {
    stylesArray.push(styles.inputErrorBorder)
  }
  return (
    <Input
      style={stylesArray}
      placeholderTextColor='#858688'
      autoCapitalize='none'
      {...props}
    />
  )
}

export function BarBorder (props) {
  return <View style={styles.barBorder} />
}

export function FullBarBorder (props) {
  return <View style={styles.fullBarBorder} />
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

export function AccountDetailsTitleBarGradient (props) {
  return (
    <LinearGradient
      start={{ x: 0.0, y: 0.05 }}
      end={{ x: 0.0, y: 1.0 }}
      locations={[0, 0.08]}
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

export function NdauQRCodeScanner (props) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000'
      }}
    >
      <RNCamera
        style={{
          flex: 1
        }}
        {...props}
      >
        <BarcodeMask width={250} height={250} showAnimatedLine={false} />
        {props.children}
      </RNCamera>
    </View>
  )
}

export function NdauQRCode (props) {
  return (
    <View style={styles.qrCode}>
      <QRCode content={props.value} ecl='Q' />
    </View>
  )
}

export function LoadingSpinner (props) {
  return (
    <Spinner
      visible={props.spinner}
      textContent={'Loading...'}
      textStyle={{
        color: '#ffffff',
        fontSize: 20,
        fontFamily: 'TitilliumWeb-Light'
      }}
      animation='fade'
      overlayColor='rgba(0, 0, 0, 0.7)'
    />
  )
}
