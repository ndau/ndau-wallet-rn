import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableHighlight,
  Animated,
  Image,
  PixelRatio
} from 'react-native'
import NdauNodeAPIHelper from '../helpers/NdauNodeAPIHelper'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import cssStyles from '../css/styles'

class CollapsiblePanel extends Component {
  constructor (props) {
    super(props)

    this.cardBackgrounds = [
      require('img/green-card.png'),
      require('img/light-blue-card.png'),
      require('img/dark-blue-card.png'),
      require('img/green-locked-card.png'),
      require('img/light-blue-locked-card.png'),
      require('img/dark-blue-locked-card.png'),
      require('img/grey-notified-card.png')
    ]

    this.state = {
      expanded: true,
      animation: new Animated.Value(),
      maxHeight: 0,
      minHeight: 0
    }
  }

  toggle () {
    this.setState({
      expanded: !this.state.expanded
    })

    let initialValue = this.state.expanded
      ? this.state.maxHeight + this.state.minHeight
      : this.state.minHeight,
      finalValue = this.state.expanded
        ? this.state.minHeight
        : this.state.maxHeight + this.state.minHeight

    this.state.animation.setValue(initialValue)
    Animated.spring(this.state.animation, {
      toValue: finalValue
    }).start()
  }

  setMaxHeight = event => {
    let adjustment = hp('1.2%')
    if (event.nativeEvent.layout.height > this.state.maxHeight) {
      console.debug(
        `setting maxHeight for first time: ${event.nativeEvent.layout.height}`
      )
      this.setState({
        maxHeight: event.nativeEvent.layout.height + adjustment
      })
    }
  }

  setMinHeight = event => {
    this.setState({
      minHeight: event.nativeEvent.layout.height
    })
  }

  render () {
    const lockAdder = this.props.lockAdder ? this.props.lockAdder : 0
    return (
      <Animated.View
        style={[styles.container, { height: this.state.animation }]}
      >
        <ImageBackground
          source={
            this.cardBackgrounds[
              this.props.onNotice ? 6 : this.props.index % 3 + lockAdder
            ]
          }
          style={{ width: '100%' }}
        >
          <TouchableHighlight
            onPress={this.toggle.bind(this)}
            underlayColor='transparent'
          >
            <View style={styles.titleContainer} onLayout={this.setMinHeight}>
              <Text style={styles.titleLeft}>{this.props.title}</Text>
              {this.props.titleRight !== undefined
                ? <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  >
                  <Image
                    style={{
                      width: wp('3%'),
                      height: hp('2%'),
                      marginRight: wp('.1%')
                    }}
                    resizeMode='contain'
                    source={require('img/ndau-icon-white.png')}
                    />
                  <Text style={styles.titleRight}>
                    {this.props.titleRight}
                  </Text>
                </View>
                : null}
            </View>
          </TouchableHighlight>
          <View style={styles.border} />
          <View style={styles.body} onLayout={this.setMaxHeight}>
            {this.props.children}
          </View>
        </ImageBackground>
      </Animated.View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
    marginBottom: hp('.5%'),
    borderRadius: 3,
    borderWidth: 0.5
  },
  titleContainer: {
    flexDirection: 'row'
  },
  titleLeft: {
    flex: 1,
    marginTop: hp('.5%'),
    marginLeft: wp('1%'),
    marginRight: wp('1%'),
    marginBottom: hp('.5%'),
    color: '#fff',
    fontSize: 18,
    fontFamily: 'TitilliumWeb-Bold',
    textAlign: 'left'
  },
  titleRight: {
    flexDirection: 'row',
    marginTop: hp('.5%'),
    marginLeft: wp('1%'),
    marginRight: wp('1%'),
    marginBottom: hp('.5%'),
    color: '#fff',
    fontSize: 18,
    fontFamily: 'TitilliumWeb-Bold',
    textAlign: 'right'
  },
  body: {
    padding: hp('1%'),
    paddingTop: 0
  },
  border: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    marginLeft: wp('1%'),
    marginRight: wp('1%'),
    marginBottom: hp('1%')
  }
})

export default CollapsiblePanel
