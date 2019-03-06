import React, { Component } from 'react'
import { Animated, View, Text, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5Pro'
import styles from './styles'

class BarCollapsible extends Component {
  constructor (props) {
    super(props)

    this.state = {
      fadeAnim: new Animated.Value(0),
      icon: props.icon,
      onPressed: null,
      title: '',
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
      title,
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
        onPressed,
        title
      })
    } else if (collapsible) {
      this.setState(
        {
          icon: showOnStart ? iconOpened : iconActive,
          iconCollapsed,
          iconOpened,
          title
        },
        Animated.timing(fadeAnim, { toValue: 1 }).start()
      )
    } else {
      this.setState({ title })
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
    const { titleStyle } = this.props
    const { title } = this.state

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
    const { icon, fadeAnim, title } = this.state

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
              style={[styles.icon, iconStyle]}
            />
          </View>
        </TouchableHighlight>

        {this.state.show && (
          <Animated.View style={{ opacity: fadeAnim }}>
            {upperBorder ? <View style={styles.barBorder} /> : null}
            {children}
          </Animated.View>
        )}
        {lowerBorder ? <View style={styles.barBorder} /> : null}
      </View>
    )
  }

  renderClickable = () => {
    const { style, titleStyle, iconStyle } = this.props
    const { icon, title, onPressed } = this.state

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
            style={[styles.icon, iconStyle]}
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

export default BarCollapsible
