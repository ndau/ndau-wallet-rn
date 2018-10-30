import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import ModalDialog from './ModalDialog';
import TransactionTabs from '../components/TransactionTabs';

class TransactionModalDialog extends Component {
  render() {
    return (
      <ModalDialog {...this.props}>
        <TransactionTabs {...this.props} />
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

export default TransactionModalDialog;