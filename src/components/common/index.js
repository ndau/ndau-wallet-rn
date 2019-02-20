import React from 'react'
import {
  View,
  ScrollView,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Text
} from 'react-native'
import { SafeAreaView } from 'react-navigation'
import componentStyles from '../../css/componentStyles'
import { Button, Progress, H4, P, Checkbox } from 'nachos-ui'
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro'
import LinearGradient from 'react-native-linear-gradient'
import { ParagraphText, SmallParagraphText } from '../setup'

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
      <Text {...props} style={componentStyles.centeredLinkText}>
        {props.children}
      </Text>
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

export function DrawerContainer (props) {
  return (
    <SafeAreaView
      style={[componentStyles.container, componentStyles.statusBarColor]}
    >
      <StatusBar barStyle='light-content' backgroundColor='#000000' />
      <View style={componentStyles.outerDrawerContainer}>
        <LinearGradient
          locations={[0, 1.0]}
          colors={['#0F2748', '#293E63']}
          style={[componentStyles.drawerContainerOverlay]}
        >
          <View style={componentStyles.drawerContainer}>{props.children}</View>
          <DrawerEntryItem
            bottom
            onPress={props.logoutHandler}
            fontAwesomeIconName='user-circle'
          >
            Logout
          </DrawerEntryItem>
        </LinearGradient>
      </View>
    </SafeAreaView>
  )
}

export function DrawerExit (props) {
  return (
    <View style={componentStyles.drawerExit}>
      <TouchableOpacity {...props}>
        <FontAwesome5Pro size={36} name='times' color='#ffffff' light />
      </TouchableOpacity>
    </View>
  )
}

export function DrawerEntryItem (props) {
  return (
    <View
      style={
        props.bottom
          ? componentStyles.drawerEntryBottom
          : componentStyles.drawerEntry
      }
    >
      <TouchableOpacity {...props}>
        <FontAwesome5Pro
          size={22}
          name={props.fontAwesomeIconName}
          color='#4B9176'
          light
        />
      </TouchableOpacity>
      <TouchableOpacity {...props}>
        <H4
          style={
            props.bottom
              ? componentStyles.drawerTextBottom
              : componentStyles.drawerText
          }
        >
          {props.children}
        </H4>
      </TouchableOpacity>
    </View>
  )
}

export const DrawerHeader = props => {
  return (
    <View style={componentStyles.drawerHeaderContainer}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.openDrawer()
        }}
      >
        <FontAwesome5Pro
          name='bars'
          size={32}
          color='#fff'
          style={componentStyles.drawerButton}
          light
        />
      </TouchableOpacity>
      <H4 style={componentStyles.drawerHeaderText}>{props.children}</H4>
    </View>
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
          locations={[0, 1.0]}
          colors={['#0F2748', '#293E63']}
          style={[componentStyles.appContainerOverlay]}
        >
          <View style={componentStyles.appContainer}>{props.children}</View>
        </LinearGradient>
      </View>
    </SafeAreaView>
  )
}
