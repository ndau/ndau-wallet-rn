import React, { Component } from 'react';

import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import ModalDropdown from 'react-native-modal-dropdown';

class CommonButton extends Component {
  onPress() {
    this.props.onPress();
  }
  render() {
    return (
      <ModalDropdown
        defaultValue={this.props.defaultValue}
        // defaultIndex={0}
        options={this.props.options}
        onSelect={this.props.onSelect}
        style={styles.containerStyle}
        textStyle={styles.text}
        dropdownStyle={styles.dropdownContainerStyle}
        dropdownTextStyle={styles.text}
      />
    );
  }
}

var styles = StyleSheet.create({
  text: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'TitilliumWeb-Regular'
  },
  containerStyle: {
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    height: hp('7%'),
    width: wp('90%'),
    backgroundColor: '#ffffff',
    paddingLeft: wp('1%')
  },
  dropdownContainerStyle: {
    // alignContent: 'center',
    // justifyContent: 'center',
    borderRadius: 3,
    // height: hp('7%'),
    width: wp('88%'),
    backgroundColor: '#ffffff',
    // marginRight: wp('30%'),
    marginTop: wp('3%')
  }
});

export default CommonButton;
