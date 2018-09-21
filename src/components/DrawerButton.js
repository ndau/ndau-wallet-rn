import React from 'react';
import { StyleSheet, View, Platform, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import cssStyles from '../css/styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

export const DrawerButton = (props) => (
  <View style={cssStyles.darkBackgroundColor}>
    <TouchableOpacity
      onPress={() => {
        props.navigation.openDrawer();
      }}
    >
      <MaterialIcons name="menu" size={32} color="#fff" style={styles.header} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  header: {
    ...Platform.select({
      ios: {
        paddingTop: hp('4%')
      },
      android: {
        paddingTop: hp('1%')
      }
    }),
    paddingLeft: wp('2%')
  }
});
