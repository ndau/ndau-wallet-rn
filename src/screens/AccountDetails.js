import React, { Component } from 'react'

import {
  AccountDetailsContainer,
  AccountTotalPanel,
  AccountDetailsPanel
} from '../components/account'
import AccountAPIHelper from '../helpers/AccountAPIHelper'

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
    const account = this.props.navigation.getParam('account', null)
    const wallet = this.props.navigation.getParam('wallet', null)
    const allAccountNicknames = this.props.navigation.getParam(
      'allAccountNicknames',
      null
    )

    this.setState({ account, wallet, allAccountNicknames })
  }

  showLock = (account, wallet) => {
    this.props.navigation.navigate('AccountLock', {
      account: account,
      wallet: wallet,
      nav: this.props.navigation,
      allAccountNicknames: this.state.allAccountNicknames
    })
  }

  showUnlock = (account, wallet) => {
    this.props.navigation.navigate('AccountUnlock', {
      account: account,
      wallet: wallet,
      nav: this.props.navigation
    })
  }

  showHistory = account => {
    this.props.navigation.navigate('AccountHistory', {
      account: account
    })
  }

  goBack = () => {
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
          eaiPercentage={eaiPercentage}
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
