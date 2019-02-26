import React, { Component } from 'react'

import LoggingService from '../services/LoggingService'
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
      account: {}
    }
  }
  componentWillMount = () => {
    const account = this.props.navigation.getParam('account', null)
    this.setState({ account })
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
      <AccountDetailsContainer account={this.state.account} {...this.props}>
        <AccountTotalPanel account={this.state.account} {...this.props} />
        <AccountDetailsPanel
          eaiPercentage={eaiPercentage}
          sendingEAITo={sendingEAITo}
          receivingEAIFrom={receivingEAIFrom}
          accountLockedUntil={accountLockedUntil}
          accountNoticePeriod={accountNoticePeriod}
          accountNotLocked={accountNotLocked}
        />
      </AccountDetailsContainer>
    )
  }
}

export default AccountDetails
