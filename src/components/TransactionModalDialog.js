import React, { Component } from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import ModalDialog from './ModalDialog'
import TransactionTabs from '../components/TransactionTabs'

class TransactionModalDialog extends Component {
  render () {
    return (
      <ModalDialog {...this.props}>
        <TransactionTabs {...this.props} />
      </ModalDialog>
    )
  }
}

export default TransactionModalDialog
