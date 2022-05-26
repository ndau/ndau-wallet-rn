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
import { StyleSheet, Modal, View, TouchableHighlight, Text } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import Icon from 'react-native-fontawesome-pro'
import Padding from './Padding'
import styleConstants from '../../styles/styleConstants'

class ModalDialog extends Component {
  constructor (props) {
    super(props)

    this.state = {
      visible: false
    }
  }

  showModal = () => {
    this.setState({ visible: true })
  }

  closeModal = () => {
    this.setState({ visible: false })
  }

  render () {
    return (
      <Modal
        animationType='slide'
        transparent
        onRequestClose={() => {}}
        visible={this.state.visible}
        {...this.props}
      >
        <View style={[styles.outerView, this.props.outerViewStyle]}>
          <View style={[styles.innerView, this.props.innerViewStyle]}>
            <Padding top={0.5}>
              <Icon
                containerStyle={styles.closeButton}
                name='times'
                color={styleConstants.ICON_GRAY}
                size={20}
                onPress={this.closeModal}
                type='light'
              />
            </Padding>
            {this.props.children}
          </View>
        </View>
      </Modal>
    )
  }
}

var styles = StyleSheet.create({
  outerView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  innerView: {
    backgroundColor: '#0F2748',
    borderRadius: 3,
    width: wp('90%'),
    height: hp('60%'),
    paddingLeft: wp('3%'),
    paddingRight: wp('3%'),
    marginTop: hp('20%')
  },
  closeButton: {}
})

export default ModalDialog
