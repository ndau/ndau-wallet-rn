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
import { Animated, View, Text, TouchableHighlight } from 'react-native'
import Icon from 'react-native-fontawesome-pro'
import styles from './styles'
import { CollapsibleBarBorder } from '.'

class CollapsibleBar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      fadeAnim: new Animated.Value(0),
      icon: props.icon,
      onPressed: null,
      children: null,
      show: props.showOnStart
    }
  }

  static defaultProps = {
    showOnStart: false,
    icon: 'angle-right',
    iconOpened: 'minus',
    iconActive: 'plus',
    iconCollapsed: 'plus',
    tintColor: '#FFFFFF',
    iconSize: 32
  }

  componentWillMount () {
    const {
      collapsible,
      clickable,
      icon,
      iconOpened,
      iconActive,
      iconCollapsed,
      showOnStart,
      onPressed
    } = this.props
    const { fadeAnim } = this.state

    if (clickable) {
      this.setState({
        icon,
        onPressed
      })
    } else if (collapsible) {
      this.setState(
        {
          icon: showOnStart ? iconOpened : iconActive,
          iconCollapsed,
          iconOpened
        },
        Animated.timing(fadeAnim, { toValue: 1 }).start()
      )
    }
  }

  toggleView = () => {
    const { show, iconCollapsed, iconOpened } = this.state

    this.setState({
      show: !show,
      icon: show ? iconCollapsed : iconOpened
    })
  }

  renderDefault = () => {
    const { title, titleStyle } = this.props

    return (
      <View style={styles.bar}>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      </View>
    )
  }

  renderCollapsible = () => {
    const {
      style,
      iconStyle,
      title,
      titleStyle,
      titleStyleLeft,
      titleStyleMiddle,
      titleStyleRight,
      titleMiddle,
      titleRight,
      children,
      lowerBorder,
      upperBorder
    } = this.props
    const { icon, fadeAnim } = this.state

    return (
      <View>
        <TouchableHighlight
          style={styles.barWrapper}
          underlayColor='transparent'
          onPress={this.toggleView}
        >
          <View style={[styles.bar, style]}>
            {this.props.titleRight !== undefined ? (
              this.props.titleMiddle ? (
                <View style={styles.barTextTitleContainerWithMiddle}>
                  <View>
                    <Text style={[styles.barTitleLeft, titleStyleLeft]}>
                      {title}
                    </Text>
                  </View>
                  <View>
                    <Text style={[styles.barTitleMiddle, titleStyleMiddle]}>
                      {titleMiddle}
                    </Text>
                  </View>
                  <View>
                    <Text style={[styles.barTitleRight, titleStyleRight]}>
                      <Text style={styles.ndauSmall}>n</Text>
                      {titleRight}
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={styles.barTextTitleContainer}>
                  <View>
                    <Text style={[styles.titleLeft, titleStyle]}>{title}</Text>
                  </View>

                  <View>
                    <Text style={styles.barTitleRight}>{titleRight}</Text>
                  </View>
                </View>
              )
            ) : (
              <Text style={[styles.title, titleStyle]}>{title}</Text>
            )}
            <Icon
              name={icon}
              size={this.props.iconSize || iconSize}
              color={this.props.tintColor || tintColor}
              containerStyle={[styles.icon, iconStyle]}
              type='light'
            />
          </View>
        </TouchableHighlight>

        {this.state.show && (
          <Animated.View style={{ opacity: fadeAnim }}>
            {upperBorder ? <CollapsibleBarBorder /> : null}
            {children}
          </Animated.View>
        )}
        {lowerBorder ? <CollapsibleBarBorder /> : null}
      </View>
    )
  }

  renderClickable = () => {
    const { style, titleStyle, iconStyle, title } = this.props
    const { icon, onPressed } = this.state

    return (
      <TouchableHighlight
        style={styles.barWrapper}
        underlayColor='transparent'
        onPress={onPressed}
      >
        <View style={[styles.bar, style]}>
          <Text style={[styles.title, titleStyle]}>{title}</Text>
          <Icon
            name={icon}
            size={this.props.iconSize || iconSize}
            color={this.props.tintColor || tintColor}
            containerStyle={[styles.icon, iconStyle]}
            type='light'
          />
        </View>
      </TouchableHighlight>
    )
  }

  render () {
    const { clickable, collapsible } = this.props

    if (clickable) {
      return this.renderClickable()
    } else if (collapsible) {
      return this.renderCollapsible()
    } else {
      return this.renderDefault()
    }
  }
}

export default CollapsibleBar
