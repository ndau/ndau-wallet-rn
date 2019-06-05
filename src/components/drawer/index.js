import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import styles from './styles'
import { H4 } from 'nachos-ui'
import Icon from 'react-native-fontawesome-pro'
import LinearGradient from 'react-native-linear-gradient'
import { MainContainer, FullScreenDualColorGradient } from '../common'
import AppConstants from '../../AppConstants'

export function DrawerContainer (props) {
  return (
    <MainContainer>
      <View style={styles.outerDrawerContainer}>
        <LinearGradient
          locations={[0, 1.0]}
          colors={['#0F2748', '#293E63']}
          style={[styles.drawerContainerOverlay]}
        >
          <View style={styles.drawerContainer}>{props.children}</View>
        </LinearGradient>
      </View>
    </MainContainer>
  )
}

export function DrawerExit (props) {
  return (
    <View style={styles.drawerExit}>
      <TouchableOpacity {...props}>
        <Icon size={36} name='times' color='#ffffff' type='light' />
      </TouchableOpacity>
    </View>
  )
}

export function DrawerEntryItem (props) {
  return (
    <View style={styles.drawerEntry}>
      <TouchableOpacity {...props}>
        <Icon
          size={22}
          name={props.fontAwesomeIconName}
          color={AppConstants.ICON_BUTTON_COLOR}
          type='light'
        />
      </TouchableOpacity>
      <TouchableOpacity {...props}>
        <H4 style={styles.drawerText}>{props.children}</H4>
      </TouchableOpacity>
    </View>
  )
}

export function DrawerEntryVersionItem (props) {
  return (
    <View style={styles.drawerVersionEntry}>
      <TouchableOpacity {...props}>
        <Icon
          size={22}
          name={props.fontAwesomeIconName}
          color={AppConstants.ICON_BUTTON_COLOR}
          type='light'
        />
      </TouchableOpacity>
      <TouchableOpacity {...props}>
        <H4 style={styles.drawerText}>{props.children}</H4>
      </TouchableOpacity>
    </View>
  )
}

export const DrawerHeader = props => {
  return (
    <View style={styles.drawerHeaderContainer}>
      <Icon
        name='bars'
        size={32}
        color='#fff'
        containerStyle={styles.drawerButton}
        type='light'
        onPress={() => {
          props.navigation.openDrawer()
        }}
      />
      <H4 style={styles.drawerHeaderText}>{props.children}</H4>
    </View>
  )
}

export const DrawerHeaderForOverview = props => {
  return (
    <View style={styles.drawerHeaderContainer}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.openDrawer()
        }}
      >
        <Icon
          name='bars'
          size={32}
          color='#fff'
          containerStyle={styles.drawerButton}
          type='light'
        />
      </TouchableOpacity>
      <H4 style={styles.drawerHeaderTextForOverview}>{props.children}</H4>
    </View>
  )
}
