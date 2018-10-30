import React, { Component } from 'react';

import { StyleSheet, Text } from 'react-native';
import Button from 'react-native-button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import cssStyles from '../css/styles';

class CommonButton extends Component {
  onPress() {
    this.props.onPress();
  }
  render() {
    return (
      <Button
        style={styles.text}
        disabledContainerStyle={styles.disabledStyle}
        containerStyle={styles.containerStyle}
        onPress={this.props.onPress}
        {...this.props}
      > 
        <Text style={styles.text}>
          {
            this.props.iconProps && this.props.iconProps.name && // "name" is required
            <FontAwesome {...this.props.iconProps} style={{
              color: "#fff",
              paddingRight: 50,
            }} />
          }
          {this.props.title} 
        </Text>
      </Button>
    );
  }
}

var styles = StyleSheet.create({
  text: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'TitilliumWeb-Regular',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  disabledStyle: {
    backgroundColor: '#696969'
  },
  containerStyle: {
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    height: hp('7%'),
    backgroundColor: '#4e957a'
  }
});

export default CommonButton;
