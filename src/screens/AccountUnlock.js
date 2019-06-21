import React, { Component } from 'react'

import {
  AccountUnlockContainer,
  AccountDetailPanel,
  AccountParagraphText
} from '../components/account'
import WaitingForBlockchainSpinner from '../components/common/WaitingForBlockchainSpinner'
import { LargeButton, TextLink } from '../components/common'
import FlashNotification from '../components/common/FlashNotification'
import AccountAPIHelper from '../helpers/AccountAPIHelper'
import DateHelper from '../helpers/DateHelper'
import { NotifyTransaction } from '../transactions/NotifyTransaction'
import { Transaction } from '../transactions/Transaction'
import AccountStore from '../stores/AccountStore'
import WalletStore from '../stores/WalletStore'
import AppConfig from '../AppConfig'

class AccountUnlock extends Component {
  constructor (props) {
    super(props)
    this.state = {
      accountHistory: {},
      account: {},
      wallet: {},
      spinner: false
    }
    props.navigation.addListener('didBlur', FlashNotification.hideMessage)
  }

  componentWillMount = async () => {
    const account = AccountStore.getAccount()
    const wallet = WalletStore.getWallet()

    this.setState({ account, wallet })
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
        wallet={this.state.wallet}
        account={this.state.account}
        {...this.props}
      >
        <WaitingForBlockchainSpinner spinner={this.state.spinner} />
        <AccountDetailPanel>
          <AccountParagraphText>
            Unlocking this account means you will be able to spend from it, but
            it will no longer accrue bonus incentive (
            <TextLink url={AppConfig.EAI_KNOWLEDGEBASE_URL}>EAI</TextLink>). Are
            you sure you want to unlock?
          </AccountParagraphText>
          <AccountParagraphText>
            Funds from this account will be available to you in{' '}
            {accountNoticePeriod} days, on{' '}
            {DateHelper.addDaysToToday(accountNoticePeriod)}. Until then, you
            will not be able to add new ndau to this account.
          </AccountParagraphText>
        </AccountDetailPanel>
        <LargeButton onPress={() => this._initiateUnlock()}>
          Start unlock countdown
        </LargeButton>
      </AccountUnlockContainer>
    )
  }
}

export default AccountUnlock
