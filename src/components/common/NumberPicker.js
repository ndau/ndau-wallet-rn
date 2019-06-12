import React, { Component } from 'react'

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import Icon from 'react-native-fontawesome-pro'
import AppConstants from '../../AppConstants'

class NumberPicker extends Component {
  render () {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Icon
            name='minus-circle'
            color={AppConstants.NUMBER_PICKER_COLOR}
            size={32}
            onPress={this.props.subtractNumber}
            type='light'
          />
          <Text style={styles.text}>{this.props.number}</Text>
          <Icon
            name='plus-circle'
            color={AppConstants.NUMBER_PICKER_COLOR}
            size={32}
            onPress={this.props.addNumber}
            type='light'
          />
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },
  text: {
    marginLeft: wp('10%'),
    marginRight: wp('10%'),
    color: '#ffffff',
    fontSize: 32,
    fontFamily: 'TitilliumWeb-Regular'
  }
})

export default NumberPicker
