import React, { Component } from 'react'

import {
  AccountUnlockContainer,
  AccountUnlockMainPanel,
  AccountLargeText
} from '../components/account'
import { P } from 'nachos-ui'
import AccountHistoryHelper from '../helpers/AccountHistoryHelper'
import LoggingService from '../services/LoggingService'
import FlashNotification from '../components/common/FlashNotification'
import WaitingForBlockchainSpinner from '../components/common/WaitingForBlockchainSpinner'
import { LargeButton } from '../components/common'
import AccountAPIHelper from '../helpers/AccountAPIHelper'
import DateHelper from '../helpers/DateHelper'
import { NotifyTransaction } from '../transactions/NotifyTransaction'
import { Transaction } from '../transactions/Transaction'

class AccountUnlock extends Component {
  constructor (props) {
    super(props)
    this.state = {
      accountHistory: {},
      account: {},
      spinner: false
    }
  }

  componentWillMount = async () => {
    this.setState({ spinner: true }, async () => {
      const account = this.props.navigation.getParam('account', null)

      try {
        const accountHistory = await AccountHistoryHelper.getAccountHistory(
          account.address
        )
        this.setState({ accountHistory })
      } catch (error) {
        LoggingService.debug(error)
        FlashNotification.showError(
          'Problem occured while getting account history from the blockchain.'
        )
      }

      this.setState({ account, spinner: false })
    })
  }

  _initiateUnlock = async () => {
    Object.assign(NotifyTransaction.prototype, Transaction)
    const notifyTransaction = new NotifyTransaction(
      this.state.wallet,
      this.state.account
    )
    await notifyTransaction.createSignPrevalidateSubmit()

    this.props.navigation.navigate('WalletOverview', {
      wallet: this.state.wallet
    })
  }

  render () {
    const accountNoticePeriod = AccountAPIHelper.accountNoticePeriod(
      this.state.account.addressData
    )

    return (
      <AccountUnlockContainer
        title='Unlock account'
        navigation={this.props.nav}
        {...this.props}
      >
        <WaitingForBlockchainSpinner spinner={this.state.spinner} />
        <AccountUnlockMainPanel>
          <AccountLargeText>
            Unlocking this account means you will be able to spend from it, but
            it will no longer accrue bonus inscentive (EAI). Are you sure you
            want to unlock?
          </AccountLargeText>
          <AccountLargeText>
            Funds from this account will be available to you in{' '}
            {accountNoticePeriod} days, on{' '}
            {DateHelper.addDaysToToday(accountNoticePeriod)}. Until then, you
            will not be able to add new ndau to this account.
          </AccountLargeText>
        </AccountUnlockMainPanel>
        <LargeButton onPress={() => _initiateUnlock()}>
          Start unlock countdown
        </LargeButton>
      </AccountUnlockContainer>
    )
  }
}

export default AccountUnlock
