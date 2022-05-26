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

import { StyleSheet, Text, View } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import ModalDialog from './ModalDialog'
import CommonButton from './CommonButton'
import cssStyles from '../../styles/styles'
import NumberPicker from './NumberPicker'

class NewAccountModalDialog extends Component {
  addNewAccount = () => {
    this.props.addNewAccount()
    this.closeModal()
  }

  showModal = () => {
    this._modalDialog.showModal()
  }

  closeModal = () => {
    this._modalDialog.closeModal()
  }

  render () {
    const innerViewStyle = {
      height: hp('40%')
    }
    return (
      <ModalDialog
        ref={component => (this._modalDialog = component)}
        innerViewStyle={innerViewStyle}
        {...this.props}
      >
        <Text style={styles.text}>
          How many new accounts would you like to add to your wallet?
        </Text>
        <NumberPicker {...this.props} />
        <View style={cssStyles.footer}>
          <CommonButton onPress={this.addNewAccount} title='Add new' />
        </View>
      </ModalDialog>
    )
  }
}

var styles = StyleSheet.create({
  text: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'OpenSans-Regular', 
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
    marginLeft: wp('1%'),
    marginRight: wp('1%')
  }
})

export default NewAccountModalDialog
