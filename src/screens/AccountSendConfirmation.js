import React, { Component } from 'react'

import {
  AccountSendContainer,
  AccountDetailPanel,
  AccountHeaderText,
  AccountSendConfirmationItem
} from '../components/account'
import WaitingForBlockchainSpinner from '../components/common/WaitingForBlockchainSpinner'
import { LargeButton, BarBorder } from '../components/common'
import FlashNotification from '../components/common/FlashNotification'
import AccountAPIHelper from '../helpers/AccountAPIHelper'
import { TransferTransaction } from '../transactions/TransferTransaction'
import { Transaction } from '../transactions/Transaction'

class AccountSendConfirmation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      address: '',
      account: {},
      wallet: {},
      spinner: false,
      amount: 0,
      transactionFee: 0
    }
    this.sibBurn = 0
  }

  componentWillMount = async () => {
    this.setState({ spinner: true }, async () => {
      const account = this.props.navigation.getParam('account', null)
      const wallet = this.props.navigation.getParam('wallet', null)
      const address = this.props.navigation.getParam('address', null)
      const amount = this.props.navigation.getParam('amount', null)
      const transactionFee = this.props.navigation.getParam(
        'transactionFee',
        null
      )

      this.setState({
        account,
        wallet,
        address,
        amount,
        transactionFee,
        spinner: false
      })
    })
  }

  _confirm = () => {
    this.setState({ spinner: true }, async () => {
      try {
        Object.assign(TransferTransaction.prototype, Transaction)
        const transferTransaction = new TransferTransaction(
          this.state.wallet,
          this.state.account,
          this.state.address,
          this.state.amount
        )
        await transferTransaction.createSignPrevalidateSubmit()

        this.props.navigation.push('WalletOverview', {
          wallet: this.state.wallet
        })
      } catch (error) {
        FlashNotification.showError(
          'An error occured while attempting to send ndau'
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
          <AccountSendConfirmationItem
            title={'To:'}
            value={this.state.address}
          />
          <BarBorder />
          <AccountSendConfirmationItem
            title={'Transaction fee:'}
            value={this.state.transactionFee}
          />
          <BarBorder />
          <AccountSendConfirmationItem
            title={'SIB burn:'}
            value={this.sibBurn}
          />
          <BarBorder />
          <AccountSendConfirmationItem
            title={'Amount to be sent:'}
            value={this.state.amount}
          />
          <BarBorder />
          <AccountSendConfirmationItem
            largerText
            title={'TOTAL'}
            value={this.state.transactionFee + this.sibBurn + this.state.amount}
          />
          <BarBorder />
          <AccountSendConfirmationItem
            title={'Remaining balance:'}
            value={
              AccountAPIHelper.accountNdauAmount(
                this.state.account.addressData
              ) - this.state.amount
            }
          />
        </AccountDetailPanel>
        <LargeButton onPress={() => this._confirm()}>Confirm</LargeButton>
      </AccountSendContainer>
    )
  }
}

export default AccountSendConfirmation
