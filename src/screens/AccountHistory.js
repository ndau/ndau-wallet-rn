import React, { Component } from 'react'

import {
  AccountHistoryContainer,
  AccountDetailPanel,
  AccountHistoryPanels
} from '../components/account'

import AccountHistoryHelper from '../helpers/AccountHistoryHelper'
import LoggingService from '../services/LoggingService'
import FlashNotification from '../components/common/FlashNotification'
import WaitingForBlockchainSpinner from '../components/common/WaitingForBlockchainSpinner'

class AccountHistory extends Component {
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
        <WaitingForBlockchainSpinner spinner={this.state.spinner} />
        <AccountDetailPanel>
          <AccountHistoryPanels accountHistory={this.state.accountHistory} />
        </AccountDetailPanel>
      </AccountHistoryContainer>
    )
  }
}

export default AccountHistory
