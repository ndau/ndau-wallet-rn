import React, { Component } from 'react'
import { Animated, Keyboard, Platform } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import LoggingService from '../../services/LoggingService'

class KeyboardView extends Component {
  constructor (props) {
    super(props)

    this.keyboardHeight = new Animated.Value(0)
    this.eventDuration = 0
  }

  componentWillMount () {
    if (Platform.OS === 'ios') {
      this.keyboardWillShowSub = Keyboard.addListener(
        'keyboardWillShow',
        this.keyboardWillShow
      )
      this.keyboardWillHideSub = Keyboard.addListener(
        'keyboardWillHide',
        this.keyboardWillHide
      )
    } else {
      this.keyboardDidShowSub = Keyboard.addListener(
        'keyboardDidShow',
        this.keyboardDidShow
      )
      this.keyboardDidHideSub = Keyboard.addListener(
        'keyboardDidHide',
        this.keyboardDidHide
      )
    }
  }

  componentWillUnmount () {
    if (Platform.OS === 'ios') {
      this.keyboardWillShowSub.remove()
      this.keyboardWillHideSub.remove()
    } else {
      this.keyboardDidShowSub.remove()
      this.keyboardDidHideSub.remove()
    }
  }

  _getDuration = event => {
    if (event) {
      this.eventDuration = event.duration
    }
    return event ? event.duration : this.eventDuration
  }

  // This one is for iOS
  keyboardWillShow = event => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: this._getDuration(event),
        toValue: event.endCoordinates.height + hp('20%')
      })
    ]).start()
  }

  // This one is for iOS
  keyboardWillHide = event => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: this._getDuration(event),
        toValue: 0
      })
    ]).start()
  }

  // This one is for Android
  keyboardDidShow = event => {
    LoggingService.debug(`event is `, event)
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: this._getDuration(event),
        toValue: event.endCoordinates.height + hp('40%')
      })
    ]).start()
  }

  // This one is for Android
  keyboardDidHide = event => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: this._getDuration(event),
        toValue: 0
      })
    ]).start()
  }

  render () {
    return (
      <Animated.View
        style={[
          this.props.style,
          {
            flex: 1,
            paddingBottom: this.keyboardHeight
          }
        ]}
        {...this.props}
      >
        {this.props.children}
      </Animated.View>
    )
  }
}

export default KeyboardView
