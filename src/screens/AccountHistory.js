import React, { Component } from 'react'

import {
  AccountHistoryContainer,
  AccountHistoryPanel,
  AccountHistoryPanels
} from '../components/account'

import AccountHistoryHelper from '../helpers/AccountHistoryHelper'
import LoggingService from '../services/LoggingService'
import FlashNotification from '../components/common/FlashNotification'
import WaitingForBlockchainSpinner from '../components/common/WaitingForBlockchainSpinner'
import AccountStore from '../stores/AccountStore'

class AccountHistory extends Component {
  constructor (props) {
    super(props)
    this.state = {
      accountHistory: {},
      account: {},
      spinner: false
    }
    navigation.addListener('didBlur', FlashNotification.hideMessage)
  }

  componentWillMount = async () => {
    this.setState({ spinner: true }, async () => {
      const account = AccountStore.getAccount()

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
        <AccountHistoryPanel>
          <AccountHistoryPanels
            address={this.state.account.address}
            accountHistory={this.state.accountHistory}
          />
        </AccountHistoryPanel>
      </AccountHistoryContainer>
    )
  }
}

export default AccountHistory
