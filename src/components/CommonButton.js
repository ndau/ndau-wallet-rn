import React, { Component } from 'react';

import { StyleSheet } from 'react-native';
// import { TextButton } from 'react-native-material-buttons';
import Button from 'react-native-button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import cssStyles from '../css/styles';

class CommonButton extends Component {
  onPress() {
    this.props.onPress();
  }
  render() {
    return (
      // <TextButton
      //   titleStyle={styles.text}
      //   color="#4e957a"
      //   titleColor="#ffffff"
      //   disabledColor="#696969"
      //   onPress={this.props.onPress}
      //   {...this.props}
      // />
      <Button
        style={styles.text}
        disabledContainerStyle={styles.disabledStyle}
        containerStyle={styles.containerStyle}
        onPress={this.props.onPress}
        {...this.props}
      >
        {this.props.title}
      </Button>
    );
  }
}

var styles = StyleSheet.create({
  text: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'TitilliumWeb-Regular',
    color: '#fff'
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
