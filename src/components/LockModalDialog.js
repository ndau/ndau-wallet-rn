import React, { Component } from 'react';

import { StyleSheet, Text } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import ModalDialog from './ModalDialog';

class LockModalDialog extends Component {
  render() {
    return (
      <ModalDialog {...this.props}>
        <Text style={styles.text}>This is lock dialog</Text>
      </ModalDialog>
    );
  }
}

var styles = StyleSheet.create({
  text: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'TitilliumWeb-Regular',
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
    marginLeft: wp('1%'),
    marginRight: wp('1%')
  }
});

export default LockModalDialog;
