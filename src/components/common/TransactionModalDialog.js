import React, { Component } from 'react'
import { StyleSheet, Text, View, Share } from 'react-native'
import QRCode from 'react-native-qrcode'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import ModalDialog from './ModalDialog'
import CommonButton from './CommonButton'
import Padding from './Padding'

class TransactionModalDialog extends Component {
  shareAddress = () => {
    Share.share(
      {
        message: this.props.address,
        title: 'Share your public address',
        url: '/'
      },
      {
        dialogTitle: 'Share your public address'
      }
    )
  }

  showModal = () => {
    this._modalDialog.showModal()
  }

  closeModal = () => {
    this._modalDialog.closeModal()
  }

  render () {
    return (
      <ModalDialog
        ref={component => (this._modalDialog = component)}
        {...this.props}
      >
        <View style={styles.container}>
          <Padding>
            <View style={{ alignSelf: 'center' }}>
              <QRCode
                value={this.props.address}
                size={wp('55%')}
                color='black'
                backgroundColor='white'
              />
            </View>
            <Padding>
              <Text style={styles.address}>{this.props.address}</Text>
            </Padding>
          </Padding>

          <View styles={{ flex: 1 }}>
            <CommonButton
              title='Share address'
              onPress={this.shareAddress}
              iconProps={{
                name: 'share',
                color: '#000',
                size: 20
              }}
            />
          </View>
        </View>
      </ModalDialog>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: wp('2%'),
    marginRight: wp('2%')
  },
  address: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'TitilliumWeb-Regular',
    alignSelf: 'center'
  }
})

export default TransactionModalDialog
