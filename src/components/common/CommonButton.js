/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import React, { Component } from 'react'

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import Button from 'react-native-button'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import Padding from './Padding'
import Icon from 'react-native-fontawesome-pro'

class CommonButton extends Component {
  onPress () {
    this.props.onPress()
  }
  render () {
    const { bottomPadding } = this.props

    return (
      <Padding
        bottom={bottomPadding === 0 ? 0 : bottomPadding || 1}
        {...this.props}
      >
        <View style={styles.containerStyle}>
          <TouchableOpacity  style={
          styles.containerStyle
          }
          onPress={this.props.onPress}
          {...this.props}
          >
        <Text style={styles.text}>
              {// "name" is required
                this.props.iconProps && this.props.iconProps.name && (
                  <Text>
                    <Icon {...this.props.iconProps} color='#fff' />
                    {'  '}
                  </Text>
                )}
              {this.props.title}
            </Text>

          </TouchableOpacity >
          
        </View>
     </Padding>
    )
  }
}

var styles = StyleSheet.create({
  text: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'TitilliumWeb-Regular',
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  disabledStyle: {
    backgroundColor: '#696969'
  },
  containerStyle: {
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    height: hp('6%'),
    backgroundColor: '#4e957a'
  }
})

export default CommonButton
