import React, { Component } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import ModalDialog from './ModalDialog';
import CommonButton from '../components/CommonButton';
import cssStyles from '../css/styles';
import NumberPicker from './NumberPicker';

class NewAccountModalDialog extends Component {
  addNewAccount = () => {
    this.props.setModalVisible(false);
    this.props.addNewAccount();
  };

  render() {
    return (
      <ModalDialog {...this.props}>
        <Text style={styles.text}>How many new accounts would you like to add to your wallet?</Text>
        <NumberPicker {...this.props} />
        <View style={cssStyles.footer}>
          <CommonButton onPress={this.addNewAccount} title="Add new" />
        </View>
      </ModalDialog>
    );
  }
}

var styles = StyleSheet.create({
  text: {
    color: '#000000',
    fontSize: 20,
    fontFamily: 'TitilliumWeb-Regular',
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
    marginLeft: wp('1%'),
    marginRight: wp('1%')
  }
});

export default NewAccountModalDialog;
