import React from 'react'
import { StyleSheet, View, Platform, TouchableOpacity } from 'react-native'
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro'
import cssStyles from '../css/styles'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import AsyncStorageHelper from '../model/AsyncStorageHelper'
import styleConstants from '../css/styleConstants'

export const DrawerButton = async props => {
  const barsColor = (await AsyncStorageHelper.isMainNet())
    ? '#fff'
    : styleConstants.LINK_ORANGE
  return (
    <View style={cssStyles.darkBackgroundColor}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.openDrawer()
        }}
      >
        <FontAwesome5Pro
          name='bars'
          size={32}
          color={barsColor}
          style={styles.header}
          light
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    ...Platform.select({
      ios: {
        paddingTop: hp('6%')
      },
      android: {
        paddingTop: hp('1%')
      }
    }),
    paddingLeft: wp('2%')
  }
})
