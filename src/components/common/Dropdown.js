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

import { StyleSheet } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import ModalDropdown from 'react-native-modal-dropdown'

let full = false

class Dropdown extends Component {
  constructor (props) {
    super(props)

    if (this.props.full) {
      full = this.props.full
    }
  }
  onPress () {
    this.props.onPress()
  }
  render () {
    return (
      <ModalDropdown
        defaultValue={this.props.defaultValue}
        options={this.props.options}
        onSelect={this.props.onSelect}
        style={[styles.containerStyle, this.props.style]}
        textStyle={styles.text}
        dropdownStyle={styles.dropdownContainerStyle}
        dropdownTextStyle={styles.text}
      />
    )
  }
}

var styles = StyleSheet.create({
  text: {
    color: '#000000',
    fontSize: 18,
    fontFamily: 'TitilliumWeb-Regular'
  },
  containerStyle: {
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    height: hp('7%'),
    width: wp('96%'),
    backgroundColor: '#293e63',
    paddingLeft: wp('1%')
  },
  dropdownContainerStyle: {
    borderRadius: 3,
    width: wp('94%'),
    backgroundColor: '#293e63',
    marginTop: wp('3%')
  }
})

export default Dropdown
