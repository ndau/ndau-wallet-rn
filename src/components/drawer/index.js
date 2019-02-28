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
import { H4 } from 'nachos-ui'
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro'
import LinearGradient from 'react-native-linear-gradient'

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

export const DrawerHeaderForOverview = props => {
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
      <H4 style={componentStyles.drawerHeaderTextForOverview}>
        {props.children}
      </H4>
    </View>
  )
}
