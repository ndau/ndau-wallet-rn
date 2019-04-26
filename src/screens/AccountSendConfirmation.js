import React, { Component } from 'react'

import {
  AccountSendContainer,
  AccountDetailPanel,
  AccountHeaderText,
  AccountConfirmationItem
} from '../components/account'
import WaitingForBlockchainSpinner from '../components/common/WaitingForBlockchainSpinner'
import { LargeButton, BarBorder } from '../components/common'
import FlashNotification from '../components/common/FlashNotification'
import AccountAPIHelper from '../helpers/AccountAPIHelper'
import { TransferTransaction } from '../transactions/TransferTransaction'
import { Transaction } from '../transactions/Transaction'
import ndaujs from 'ndaujs'
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
          wallet: this.state.wallet,
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
            title={'To:'}
            value={ndaujs.truncateAddress(this.state.address)}
          />
          <BarBorder />
          <AccountConfirmationItem
            title={'Amount to be sent:'}
            value={this.state.amount}
          />
          <BarBorder />
          <AccountConfirmationItem
            title={'Remaining balance:'}
            value={
              AccountAPIHelper.accountNdauAmount(
                this.state.account.addressData,
                false
              ) - this.state.amount
            }
          />
          <AccountHeaderText>Fees</AccountHeaderText>
          <BarBorder />
          <AccountConfirmationItem
            title={'Transaction fee:'}
            value={this.state.transactionFee}
          />
          <BarBorder />
          <AccountConfirmationItem title={'SIB:'} value={this.state.sibFee} />
          <BarBorder />
          <AccountConfirmationItem
            largerText
            title={'Total'}
            value={this.state.total}
          />
        </AccountDetailPanel>
        <LargeButton sideMargins onPress={() => this._confirm()}>
          Confirm {'&'} send
        </LargeButton>
      </AccountSendContainer>
    )
  }
}

export default AccountSendConfirmation
