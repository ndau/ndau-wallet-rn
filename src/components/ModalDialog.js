import React, { Component } from 'react';

import { StyleSheet, Modal, View, TouchableHighlight, Text } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class ModalDialog extends Component {
  render() {
    return (
      <Modal animationType="slide" transparent={true} {...this.props}>
        <View style={styles.outerView}>
          <View style={styles.innerView}>
            <TouchableHighlight
              onPress={() => {
                this.props.setModalVisible(false);
              }}
            >
              <FontAwesome style={styles.closeButton} name="close" color="#A9A9A9" size={20} />
            </TouchableHighlight>
            {this.props.children}
          </View>
        </View>
      </Modal>
    );
  }
}

var styles = StyleSheet.create({
  outerView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerView: {
    backgroundColor: 'white',
    borderRadius: 6,
    width: wp('90%'),
    height: hp('70%')
  },
  closeButton: {
    marginTop: hp('.5%'),
    marginLeft: wp('1%')
  }
});

export default ModalDialog;
