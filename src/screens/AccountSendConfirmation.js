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

import {
  AccountSendContainer,
  AccountDetailPanel,
  AccountHeaderText,
  AccountConfirmationItem,
  AccountSendButton
} from '../components/account'
import WaitingForBlockchainSpinner from '../components/common/WaitingForBlockchainSpinner'
import FlashNotification from '../components/common/FlashNotification'
import { BarBorder } from '../components/common'
import AccountAPIHelper from '../helpers/AccountAPIHelper'
import { TransferTransaction } from '../transactions/TransferTransaction'
import { Transaction } from '../transactions/Transaction'
import AppConfig from '../AppConfig'
import AccountStore from '../stores/AccountStore'
import WalletStore from '../stores/WalletStore'

class AccountSendConfirmation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      address: '',
      account: {},
      wallet: {},
      spinner: false,
      amount: 0,
      transactionFee: 0,
      sibFee: 0
    }
    props.navigation.addListener('didBlur', FlashNotification.hideMessage)
  }

  componentWillMount = async () => {
    const account = AccountStore.getAccount()
    const wallet = WalletStore.getWallet()
    const address = this.props.navigation.getParam('address', null)
    const amount = this.props.navigation.getParam('amount', null)
    const transactionFee = this.props.navigation.getParam(
      'transactionFee',
      null
    )
    const sibFee = this.props.navigation.getParam('sibFee', null)
    const total = this.props.navigation.getParam('total', null)

    this.setState({
      account,
      wallet,
      address,
      amount,
      transactionFee,
      sibFee,
      total,
      spinner: false
    })
  }

  componentDidMount () {
    Object.assign(TransferTransaction.prototype, Transaction)
    this.transferTransaction = new TransferTransaction(
      this.state.wallet,
      this.state.account,
      this.state.address,
      this.state.amount
    )
  }

  _confirm = () => {
    this.setState({ spinner: true }, async () => {
      try {
        await this.transferTransaction.createSignPrevalidateSubmit()

        this.props.navigation.navigate('WalletOverview', {
          refresh: true
        })
      } catch (error) {
        FlashNotification.showError(
          `An error occurred while attempting to send ndau ${error.message}`
        )
      }

      this.setState({ spinner: false })
    })
  }

  render () {
    return (
      <AccountSendContainer
        title='Send'
        navigation={this.props.nav}
        wallet={this.state.wallet}
        account={this.state.account}
        {...this.props}
      >
        <WaitingForBlockchainSpinner spinner={this.state.spinner} />
        <AccountDetailPanel>
          <AccountHeaderText>
            Please confirm the details below
          </AccountHeaderText>
          <AccountConfirmationItem
            style={{ marginRight: '3%' }}
            value={this.state.address}
          >
            To:
          </AccountConfirmationItem>
          <BarBorder />
          <AccountConfirmationItem value={this.state.amount}>
            Amount to be sent:
          </AccountConfirmationItem>
          <BarBorder />
          <AccountConfirmationItem
            value={
              AccountAPIHelper.remainingBalanceNdau(
                this.state.account.addressData,
                this.state.total,
                false,
                AppConfig.NDAU_DETAIL_PRECISION
              ) || 0
            }
          >
            Remaining balance:
          </AccountConfirmationItem>
          <AccountHeaderText>Fees</AccountHeaderText>
          <BarBorder />
          <AccountConfirmationItem value={this.state.transactionFee}>
            Transaction fee:
          </AccountConfirmationItem>
          <BarBorder />
          <AccountConfirmationItem value={this.state.sibFee}>
            SIB:
          </AccountConfirmationItem>
          <BarBorder />
          <AccountConfirmationItem largerText value={this.state.total}>
            Total
          </AccountConfirmationItem>
          <AccountSendButton sideMargins onPress={() => this._confirm()}>
            Confirm {'&'} send
          </AccountSendButton>
        </AccountDetailPanel>
      </AccountSendContainer>
    )
  }
}

export default AccountSendConfirmation
