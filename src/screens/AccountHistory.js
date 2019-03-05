import React, { Component } from 'react'

import {
  AccountHistoryContainer,
  AccountHistoryMainPanel,
  AccountHistoryPanels
} from '../components/account'

import AccountHistoryHelper from '../helpers/AccountHistoryHelper'

class AccountHistory extends Component {
  constructor (props) {
    super(props)
    this.state = {
      accountHistory: {},
      account: {}
    }
  }

  componentWillMount = async () => {
    const account = this.props.navigation.getParam('account', null)

    const accountHistory = await AccountHistoryHelper.getAccountHistory(
      account.address
    )

    this.setState({ accountHistory, account })
  }

  render () {
    const title = this.state.account.addressData
      ? this.state.account.addressData.nickname + ' history'
      : 'Account history'
    return (
      <AccountHistoryContainer
        title={title}
        navigation={this.props.nav}
        {...this.props}
      >
        <AccountHistoryMainPanel>
          <AccountHistoryPanels accountHistory={this.state.accountHistory} />
        </AccountHistoryMainPanel>
      </AccountHistoryContainer>
    )
  }
}

export default AccountHistory
