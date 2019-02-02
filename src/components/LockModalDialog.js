import React, { Component } from 'react'

import { StyleSheet, Text } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import ModalDialog from './ModalDialog'
import CommonButton from '../components/CommonButton'
import { LockTransaction } from '../transactions/LockTransaction'
import { Transaction } from '../transactions/Transaction'

class LockModalDialog extends Component {
  constructor (props) {
    super(props)

    this.state = {
      period: '3m'
    }
  }

  setWallet = wallet => {
    this._wallet = wallet
  }

  setAccount = account => {
    this._account = account
  }

  _lock = async () => {
    this.props.startSpinner()
    this.closeModal()

    try {
      if (!this._wallet && !this._account) {
        console.warn('wallet and account are falsey in lock and should not be')
      } else {
        Object.assign(LockTransaction.prototype, Transaction)
        const lockTransaction = new LockTransaction(
          this._wallet,
          this._account,
          this.state.period
        )
        await lockTransaction.create()
        await lockTransaction.sign()
        await lockTransaction.prevalidate()
        await lockTransaction.submit()
      }
    } catch (error) {
      console.warn(error)
    }

    this.props.stopSpinner()
    this.props.refresh()
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
        <Text style={styles.text}>This is lock dialog</Text>
        <CommonButton title='Lock' onPress={this._lock} />
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

export default LockModalDialog
