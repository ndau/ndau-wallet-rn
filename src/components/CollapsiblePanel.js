import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableHighlight,
  Animated
} from 'react-native';

class CollapsiblePanel extends Component {
  constructor(props) {
    super(props);

    this.icons = {
      up: require('../../img/Arrowhead-01-128.png'),
      down: require('../../img/Arrowhead-Down-01-128.png')
    };

    this.state = {
      title: props.title,
      expanded: true,
      animation: new Animated.Value(),
      maxHeight: 0,
      minHeight: 0
    };
  }

  toggle() {
    this.setState({
      expanded: !this.state.expanded
    });

    let initialValue = this.state.expanded
        ? this.state.maxHeight + this.state.minHeight
        : this.state.minHeight,
      finalValue = this.state.expanded
        ? this.state.minHeight
        : this.state.maxHeight + this.state.minHeight;

    console.log(`initialValue: ${initialValue}`);
    console.log(`finalValue: ${finalValue}`);
    console.log(`minHeight: ${this.state.minHeight}`);
    console.log(`maxHeight: ${this.state.maxHeight}`);

    this.state.animation.setValue(initialValue);
    Animated.spring(this.state.animation, {
      toValue: finalValue
    }).start();
  }

  _setMaxHeight(event) {
    if (event.nativeEvent.layout.height > this.state.maxHeight) {
      console.log(`setting maxHeight for first time: ${event.nativeEvent.layout.height}`);
      this.setState({
        maxHeight: event.nativeEvent.layout.height
      });
    }
  }

  _setMinHeight(event) {
    this.setState({
      minHeight: event.nativeEvent.layout.height
    });
  }

  render() {
    let icon = this.icons['down'];

    if (this.state.expanded) {
      icon = this.icons['up'];
    }

    return (
      <Animated.View style={[ styles.container, { height: this.state.animation } ]}>
        <ImageBackground source={require('../../img/gecko-green.jpg')} style={{ width: '100%' }}>
          <TouchableHighlight
            style={styles.button}
            onPress={this.toggle.bind(this)}
            underlayColor="transparent"
          >
            <View style={styles.titleContainer} onLayout={this._setMinHeight.bind(this)}>
              <Text style={styles.title}>{this.state.title}</Text>

              <Image style={styles.buttonImage} source={icon} />
            </View>
          </TouchableHighlight>

          <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>
            {this.props.children}
          </View>
        </ImageBackground>
      </Animated.View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    margin: 5,
    overflow: 'hidden',
    borderRadius: 5,
    borderColor: '#4d9678',
    borderWidth: 2
  },
  titleContainer: {
    flexDirection: 'row'
  },
  title: {
    flex: 1,
    padding: 10,
    color: '#fff',
    fontWeight: 'bold'
  },
  button: {},
  buttonImage: {
    width: 30,
    height: 25,
    backgroundColor: 'transparent'
  },
  body: {
    padding: 10,
    paddingTop: 0
  }
});

export default CollapsiblePanel;
