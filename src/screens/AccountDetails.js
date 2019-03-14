import React, { Component } from 'react'

import {
  AccountDetailsContainer,
  AccountTotalPanel,
  AccountDetailsPanel
} from '../components/account'
import AccountAPIHelper from '../helpers/AccountAPIHelper'
import WalletStore from '../stores/WalletStore'
import AccountStore from '../stores/AccountStore'

class AccountDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      account: {},
      wallet: {},
      allAccountNicknames: {}
    }
  }

  componentWillMount = () => {
    const account = AccountStore.getAccount()
    const wallet = WalletStore.getWallet()
    const allAccountNicknames = this.props.navigation.getParam(
      'allAccountNicknames',
      null
    )

    this.setState({ account, wallet, allAccountNicknames })
  }

  showLock = (account, wallet) => {
    AccountStore.setAccount(account)
    WalletStore.setWallet(wallet)
    this.props.navigation.navigate('AccountLock', {
      nav: this.props.navigation,
      allAccountNicknames: this.state.allAccountNicknames
    })
  }

  showUnlock = (account, wallet) => {
    AccountStore.setAccount(account)
    WalletStore.setWallet(wallet)
    this.props.navigation.navigate('AccountUnlock', {
      nav: this.props.navigation
    })
  }

  showHistory = account => {
    AccountStore.setAccount(account)
    this.props.navigation.navigate('AccountHistory')
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  render () {
    const { account } = this.state
    const eaiValueForDisplay = AccountAPIHelper.eaiValueForDisplay(
      account.addressData
    )
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
      <AccountDetailsContainer
        goBack={this.goBack}
        account={this.state.account}
        {...this.props}
      >
        <AccountTotalPanel
          account={this.state.account}
          onPress={() => this.showHistory(this.state.account)}
          {...this.props}
        />
        <AccountDetailsPanel
          eaiValueForDisplay={eaiValueForDisplay}
          sendingEAITo={sendingEAITo}
          receivingEAIFrom={receivingEAIFrom}
          accountLockedUntil={accountLockedUntil}
          accountNoticePeriod={accountNoticePeriod}
          accountNotLocked={accountNotLocked}
          showLock={this.showLock}
          showUnlock={this.showUnlock}
          account={this.state.account}
          wallet={this.state.wallet}
        />
      </AccountDetailsContainer>
    )
  }
}

export default AccountDetails
