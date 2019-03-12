import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import styles from './styles'
import { H4 } from 'nachos-ui'
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro'
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
          <DrawerEntryItem
            bottom
            onPress={props.logoutHandler}
            fontAwesomeIconName='user-circle'
          >
            Logout
          </DrawerEntryItem>
        </LinearGradient>
      </View>
    </MainContainer>
  )
}

export function DrawerExit (props) {
  return (
    <View style={styles.drawerExit}>
      <TouchableOpacity {...props}>
        <FontAwesome5Pro size={36} name='times' color='#ffffff' light />
      </TouchableOpacity>
    </View>
  )
}

export function DrawerEntryItem (props) {
  return (
    <View style={props.bottom ? styles.drawerEntryBottom : styles.drawerEntry}>
      <TouchableOpacity {...props}>
        <FontAwesome5Pro
          size={22}
          name={props.fontAwesomeIconName}
          color={AppConstants.ICON_BUTTON_COLOR}
          light
        />
      </TouchableOpacity>
      <TouchableOpacity {...props}>
        <H4 style={props.bottom ? styles.drawerTextBottom : styles.drawerText}>
          {props.children}
        </H4>
      </TouchableOpacity>
    </View>
  )
}

export const DrawerHeader = props => {
  return (
    <View style={styles.drawerHeaderContainer}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.openDrawer()
        }}
      >
        <FontAwesome5Pro
          name='bars'
          size={32}
          color='#fff'
          style={styles.drawerButton}
          light
        />
      </TouchableOpacity>
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
        <FontAwesome5Pro
          name='bars'
          size={32}
          color='#fff'
          style={styles.drawerButton}
          light
        />
      </TouchableOpacity>
      <H4 style={styles.drawerHeaderTextForOverview}>{props.children}</H4>
    </View>
  )
}
