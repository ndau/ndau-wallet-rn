import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import styleConstants from '../css/styleConstants'

const WIDTH = wp('96%')
const HEIGHT = hp('4.5%')

class ProgressBar extends Component {
  render () {
    const progress = this.props.progress || 0
    const progressWidth = progress * WIDTH / 100
    const progressStyle = {
      backgroundColor: styleConstants.PRIMARY_GREEN,
      height: HEIGHT,
      minHeight: 35,
      width: progressWidth,
      borderRadius: progressWidth / 2,
      position: 'absolute',
      zIndex: 2,
      opacity: 0.9
    }

    const stepsStyle = {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: HEIGHT,
      minHeight: 35,
      backgroundColor: 'transparent'
    }

    const { numberOfSteps, currentStep } = this.props
    const Steps = []
    const width = WIDTH / numberOfSteps
    const height = HEIGHT
    const diameter = Math.min(width, height)

    const circleStyle = {
      width: diameter,
      height: diameter,
      borderRadius: diameter / 2,
      opacity: 0.7
    }

    for (let index = 1; index <= numberOfSteps; index++) {
      const backgroundColor = index <= currentStep
        ? '#000'
        : styleConstants.PROGRESS_GRAY
      Steps.push(
        <View
          style={circleStyle}
          key={index}
          order={index}
          backgroundColor={backgroundColor}
        />
      )
    }

    return (
      <View style={styles.container} height={HEIGHT}>
        {this.props.showSteps &&
          <View style={stepsStyle}>
            {Steps}
          </View>}
        <View style={progressStyle} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: styleConstants.PRIMARY_GRAY,
    width: WIDTH,
    borderRadius: WIDTH / 2
  }
})

export default ProgressBar
