import React, { Component } from 'react'
import {
  AccountLockContainer,
  AccountLockDetailsPanel,
  AccountLockButton,
  AccountLockLargerText,
  AccountBorder,
  AccountCheckmarkText
} from '../components/account'
import AccountAPIHelper from '../helpers/AccountAPIHelper'
import { LockTransaction } from '../transactions/LockTransaction'
import { Transaction } from '../transactions/Transaction'

class AccountLockConfirmation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      account: {},
      wallet: {}
    }
  }

  componentWillMount = () => {
    const account = this.props.navigation.getParam('account', null)
    const wallet = this.props.navigation.getParam('wallet', null)

    const lockPercentage = this.props.navigation.getParam(
      'lockPercentage',
      null
    )
    const lockPeriod = this.props.navigation.getParam('lockPeriod', null)

    this.setState({ account, wallet, lockPercentage, lockPeriod })
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
    const { account } = this.state
    const eaiPercentage = AccountAPIHelper.eaiPercentage(account.addressData)
    const sendingEAITo = AccountAPIHelper.sendingEAITo(account.addressData)
    const receivingEAIFrom = AccountAPIHelper.receivingEAIFrom(
      account.addressData
    )
    const accountLockedUntil = AccountAPIHelper.accountLockedUntil(
      account.addressData
    )
    const accountNoticePeriod = AccountAPIHelper.accountNoticePeriod(
      account.addressData
    )
    const accountNotLocked = AccountAPIHelper.accountNotLocked(
      account.addressData
    )
    return (
      <AccountLockContainer
        title='Lock account step 2'
        account={this.state.account}
        wallet={this.state.wallet}
        {...this.props}
      >
        <AccountLockDetailsPanel
          eaiPercentage={eaiPercentage}
          sendingEAITo={sendingEAITo}
          receivingEAIFrom={receivingEAIFrom}
          accountLockedUntil={accountLockedUntil}
          accountNoticePeriod={accountNoticePeriod}
          accountNotLocked={accountNotLocked}
        >
          <AccountLockLargerText>Confirmation</AccountLockLargerText>
          <AccountBorder />
          <AccountCheckmarkText>
            Lock {this.state.account.addressData.nickname}
          </AccountCheckmarkText>
          <AccountCheckmarkText>
            Earn {this.state.lockPercentage}% EAI Incentive
          </AccountCheckmarkText>
          <AccountCheckmarkText>
            Account will unlock in {this.state.lockPeriod} months
          </AccountCheckmarkText>
        </AccountLockDetailsPanel>
        <AccountLockButton onPress={this._lock}>Confirm</AccountLockButton>
      </AccountLockContainer>
    )
  }
}

export default AccountLockConfirmation
