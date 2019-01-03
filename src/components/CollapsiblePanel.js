import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableHighlight,
  Animated,
  Image,
  Platform,
  PixelRatio
} from 'react-native'
import AccountAPIHelper from '../helpers/AccountAPIHelper'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import cssStyles from '../css/styles'

const GREEN_CARD = require('img/green-card.png')
const BLUE_CARD = require('img/light-blue-card.png')
const DARK_BLUE_CARD = require('img/dark-blue-card.png')
const GREEN_LOCKED_CARD = require('img/green-locked-card.png')
const BLUE_LOCKED_CARD = require('img/light-blue-locked-card.png')
const DARK_BLUE_LOCKED_CARD = require('img/dark-blue-locked-card.png')
const GREY_NOTIFIED_CARD = require('img/grey-notified-card.png')
const WHITE_NDAU = require('img/ndau-icon-white.png')

const PADDING = wp('4%')

class CollapsiblePanel extends Component {
  constructor (props) {
    super(props)

    this.cardBackgrounds = [
      GREEN_CARD,
      BLUE_CARD,
      DARK_BLUE_CARD,
      GREEN_LOCKED_CARD,
      BLUE_LOCKED_CARD,
      DARK_BLUE_LOCKED_CARD,
      GREY_NOTIFIED_CARD
    ]

    this.state = {
      expanded: true,
      animation: new Animated.Value(),
      maxHeight: 0,
      minHeight: 0
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle () {
    this.setState({
      expanded: !this.state.expanded
    })

    let initialValue = this.state.expanded
      ? this.state.maxHeight + this.state.minHeight
      : this.state.minHeight

    let finalValue = this.state.expanded
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

  // componentDidMount() {
  //   if (!this.state.expanded) {
  //     this.toggle()

  //     this.setState((state) => ({
  //         animation: state.animation.setValue(state.minHeight || 10)
  //       })
  //     )
  //   }
  // }

  render () {
    const lockAdder = this.props.lockAdder ? this.props.lockAdder : 0
    return (
      <Animated.View
        style={[styles.container, { height: this.state.animation }]}
      >
        <ImageBackground
          source={
            this.cardBackgrounds[
              this.props.onNotice ? 6 : (this.props.index % 3) + lockAdder
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
              {this.props.titleRight !== undefined ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Text style={styles.titleRight}>
                    <Image
                      style={{
                        width: 10,
                        height: 15,
                        ...Platform.select({
                          ios: {
                            marginBottom: wp('0.5%')
                          }
                        })
                      }}
                      resizeMode='contain'
                      source={WHITE_NDAU}
                    />
                    {'  '}
                    {this.props.titleRight}
                  </Text>
                </View>
              ) : null}
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
    borderRadius: 5,
    borderWidth: 0.5
  },
  titleContainer: {
    flexDirection: 'row'
  },
  titleLeft: {
    flex: 1,
    padding: PADDING,
    color: '#fff',
    fontSize: 18,
    fontFamily: 'TitilliumWeb-Light',
    textAlign: 'left'
  },
  titleRight: {
    flexDirection: 'row',
    margin: PADDING,
    color: '#fff',
    fontSize: 18,
    fontFamily: 'TitilliumWeb-Light',
    textAlign: 'right'
  },
  body: {
    padding: PADDING,
    paddingTop: wp('1%')
  },
  border: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    marginLeft: PADDING,
    marginRight: PADDING,
    opacity: 0.2
  }
})

export default CollapsiblePanel
