import React, { Component } from 'react'

import { StyleSheet, Text, View } from 'react-native'
import Button from 'react-native-button'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import Padding from './Padding'
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro'

class CommonButton extends Component {
  onPress () {
    this.props.onPress()
  }
  render () {
    return (
      <Padding bottom={1}>
        <View style={styles.containerStyle}>
          <Button
            style={styles.text}
            disabledContainerStyle={styles.disabledStyle}
            containerStyle={styles.containerStyle}
            onPress={this.props.onPress}
            {...this.props}
          >
            <Text style={styles.text}>
              { // "name" is required
                this.props.iconProps && this.props.iconProps.name &&
                <Text>
                  <FontAwesome5Pro
                    {...this.props.iconProps}
                    color='#fff'
                  />
                  {'  '}
                </Text>
              }
              {this.props.title}
            </Text>
          </Button>
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
    height: hp('7%'),
    backgroundColor: '#4e957a',
  }
})

export default CommonButton
