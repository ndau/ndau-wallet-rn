import React, { Component } from 'react'
import {
  AccountLockContainer,
  AccountLockDetailsPanel,
  AccountLockButton,
  AccountLockLargerText,
  AccountBorder,
  AccountCheckmarkText,
  AccountLockNoteText
} from '../components/account'
import AccountAPIHelper from '../helpers/AccountAPIHelper'
import { LockTransaction } from '../transactions/LockTransaction'
import { Transaction } from '../transactions/Transaction'
import AccountStore from '../stores/AccountStore'
import WalletStore from '../stores/WalletStore'
import { H4 } from 'nachos-ui'
import { View } from 'react-native'

class AccountLockConfirmation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      account: {},
      wallet: {},
      lockInformation: {},
      accountAddressForEAI: null,
      accountNicknameForEAI: null
    }
  }

  componentWillMount = () => {
    const account = AccountStore.getAccount()
    const wallet = WalletStore.getWallet()
    const lockInformation = this.props.navigation.getParam(
      'lockInformation',
      null
    )
    const accountAddressForEAI = this.props.navigation.getParam(
      'accountAddressForEAI',
      null
    )
    const accountNicknameForEAI = this.props.navigation.getParam(
      'accountNicknameForEAI',
      null
    )

    this.setState({
      account,
      wallet,
      lockInformation,
      accountAddressForEAI,
      accountNicknameForEAI
    })
  }

  _lock = async () => {
    Object.assign(LockTransaction.prototype, Transaction)
    const lockTransaction = new LockTransaction(
      this.state.wallet,
      this.state.account,
      `${this.state.lockPeriod}m`
    )
    await lockTransaction.createSignPrevalidateSubmit()

    this.props.navigation.navigate('WalletOverview', {
      wallet: this.state.wallet
    })
  }

  _goBack = () => {
    this.props.navigation.goBack()
  }

  render () {
    return (
      <AccountLockContainer
        title='Lock account'
        account={this.state.account}
        wallet={this.state.wallet}
        navigation={this.props.nav}
        {...this.props}
      >
        <AccountLockDetailsPanel account={this.state.account}>
          <AccountLockLargerText>Confirmation</AccountLockLargerText>
          <AccountBorder />
          <AccountCheckmarkText>
            Lock {this.state.account.addressData.nickname}
          </AccountCheckmarkText>
          <AccountCheckmarkText>
            Earn {this.state.lockInformation.bonus}% EAI bonus +{' '}
            {this.state.lockInformation.base}% base ={' '}
            {this.state.lockInformation.total}% total
          </AccountCheckmarkText>
          <AccountCheckmarkText>
            Sending EAI to {this.state.accountNicknameForEAI}
          </AccountCheckmarkText>
          <AccountCheckmarkText>
            Account will unlock in {this.state.lockPeriod} months
          </AccountCheckmarkText>
          <AccountLockNoteText>
            Note: You will not be able to deposit into, spend, transfer, or
            otherwise access the principal inthis account while it is locked
          </AccountLockNoteText>
        </AccountLockDetailsPanel>
        <AccountLockButton onPress={this._lock}>Confirm</AccountLockButton>
      </AccountLockContainer>
    )
  }
}

export default AccountLockConfirmation
