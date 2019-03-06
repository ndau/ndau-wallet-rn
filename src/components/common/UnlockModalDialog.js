import React, { Component } from 'react'

import { StyleSheet, Text, View } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import ModalDialog from './ModalDialog'
import CommonButton from './CommonButton'
import cssStyles from '../../css/styles'
import { NotifyTransaction } from '../../transactions/NotifyTransaction'
import { Transaction } from '../../transactions/Transaction'
import LoggingService from '../../services/LoggingService'

class UnlockModalDialog extends Component {
  _unlock = async () => {
    this.props.startSpinner()
    this.closeModal()

    try {
      if (!this._wallet && !this._account) {
        LoggingService.debug(
          'wallet and account are falsey in unlock and should not be'
        )
      } else {
        Object.assign(NotifyTransaction.prototype, Transaction)
        const notifyTransaction = new NotifyTransaction(
          this._wallet,
          this._account
        )
        await notifyTransaction.createSignPrevalidateSubmit()
      }
    } catch (error) {
      LoggingService.debug(error)
    }

    this.props.stopSpinner()
    this.props.refresh()
  }

  setWallet = wallet => {
    this._wallet = wallet
  }

  setAccount = account => {
    this._account = account
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
        <Text style={styles.text}>
          Unlocking this account means you will be able to spend from it, but it
          will no longer accrue an incentive (EAI). Are you sure you want to
          unlock?
        </Text>
        <Text style={styles.text}>
          Funds from this account till be available to you in 90 days. Until 90
          days are up you will not be able to add new ndau to this account.
        </Text>
        <View style={cssStyles.footer}>
          <CommonButton onPress={this._unlock} title='Start unlock countdown' />
        </View>
      </ModalDialog>
    )
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
})

export default UnlockModalDialog
