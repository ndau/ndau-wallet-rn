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
import { Text, View, TouchableHighlight, Animated } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import styles from './styles'

class CollapsiblePanel extends Component {
  constructor (props) {
    super(props)

    this.state = {
      expanded: false,
      animation: new Animated.Value(),
      maxHeight: 0,
      minHeight: 0,
      bodyData: null
    }
  }

  toggle = () => {
    this.setState({
      expanded: !this.state.expanded,
      bodyData: this.props.children
    })

    let initialValue = this.state.expanded
      ? this.state.maxHeight + this.state.minHeight
      : this.state.minHeight

    let finalValue = this.state.expanded
      ? this.state.minHeight
      : this.state.maxHeight + this.state.minHeight

    if (!this.state.animation) {
      this.setState({ animation: new Animated.Value() }, () => {
        this.state.animation.setValue(initialValue)
        Animated.spring(this.state.animation, {
          toValue: finalValue
        }).start()
      })
    } else {
      this.state.animation.setValue(initialValue)
      Animated.spring(this.state.animation, {
        toValue: finalValue
      }).start()
    }
  }

  setMaxHeight = event => {
    let adjustment = hp('1%')
    if (event.nativeEvent.layout.height > this.state.maxHeight) {
      this.setState({
        maxHeight: event.nativeEvent.layout.height + adjustment
      })
    }
  }

  setMinHeight = event => {
    if (!this.state.minHeight) {
      this.setState({
        minHeight: event.nativeEvent.layout.height
      })
    }
  }

  componentDidMount () {
    if (!this.state.expanded) {
      this.toggle()

      this.setState(state => ({
        animation: state.animation.setValue(state.minHeight || 10)
      }))
    }
  }

  render () {
    return (
      <Animated.View
        style={[
          styles.collapsiblePanelContainer,
          { height: this.state.animation }
        ]}
      >
        <TouchableHighlight
          onPress={() => this.toggle()}
          underlayColor='transparent'
        >
          <View
            style={styles.collapsiblePanelTitleContainer}
            onLayout={this.setMinHeight}
          >
            <View>
              <Text style={styles.collapsiblePanelTitleLeft}>
                {this.props.title}
              </Text>
            </View>
            <View>
              {this.props.titleRight !== undefined ? (
                <Text style={styles.collapsiblePanelTitleRight}>
                  {this.props.titleRight}
                </Text>
              ) : null}
            </View>
          </View>
        </TouchableHighlight>
        <View style={styles.collapsiblePanelBorder} />
        <View style={styles.collapsiblePanelBody} onLayout={this.setMaxHeight}>
          {this.state.bodyData}
        </View>
      </Animated.View>
    )
  }
}

export default CollapsiblePanel
