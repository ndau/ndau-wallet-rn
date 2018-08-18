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

    this.cardBackgrounds = [
      require('../../img/green-card.jpg'),
      require('../../img/blue-card.jpg'),
      require('../../img/dark-blue-card.jpg')
    ];

    this.state = {
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

    this.state.animation.setValue(initialValue);
    Animated.spring(this.state.animation, {
      toValue: finalValue
    }).start();
  }

  setMaxHeight = (event) => {
    if (event.nativeEvent.layout.height > this.state.maxHeight) {
      console.debug(`setting maxHeight for first time: ${event.nativeEvent.layout.height}`);
      this.setState({
        maxHeight: event.nativeEvent.layout.height
      });
    }
  };

  setMinHeight = (event) => {
    this.setState({
      minHeight: event.nativeEvent.layout.height
    });
  };

  render() {
    let icon = this.state.expanded ? this.icons.up : this.icons.down;

    return (
      <Animated.View style={[ styles.container, { height: this.state.animation } ]}>
        <ImageBackground
          source={this.cardBackgrounds[this.props.index % this.props.addressLength]}
          style={{ width: '100%' }}
        >
          <TouchableHighlight
            style={styles.button}
            onPress={this.toggle.bind(this)}
            underlayColor="transparent"
          >
            <View style={styles.titleContainer} onLayout={this.setMinHeight}>
              <Text style={styles.title}>{this.props.title}</Text>

              <Image style={styles.buttonImage} source={icon} />
            </View>
          </TouchableHighlight>

          <View style={styles.body} onLayout={this.setMaxHeight}>
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
    overflow: 'hidden',
    marginBottom: 5,
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
    fontSize: 18,
    fontFamily: 'TitilliumWeb-Bold'
  },
  button: {},
  buttonImage: {
    width: 30,
    height: 25,
    margin: 8,
    backgroundColor: 'transparent'
  },
  body: {
    padding: 10,
    paddingTop: 0
  }
});

export default CollapsiblePanel;
