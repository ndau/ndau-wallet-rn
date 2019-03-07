import React, { Component } from 'react'

import { AccountSendContainer, AccountDetailPanel } from '../components/account'
import AccountHistoryHelper from '../helpers/AccountHistoryHelper'
import LoggingService from '../services/LoggingService'
import FlashNotification from '../components/common/FlashNotification'
import WaitingForBlockchainSpinner from '../components/common/WaitingForBlockchainSpinner'
import { LargeButton } from '../components/common'

class AccountSend extends Component {
  constructor (props) {
    super(props)
    this.state = {
      accountHistory: {},
      account: {},
      wallet: {},
      spinner: false
    }
  }

  componentWillMount = async () => {
    this.setState({ spinner: true }, async () => {
      const account = this.props.navigation.getParam('account', null)
      const wallet = this.props.navigation.getParam('wallet', null)

      this.setState({ account, wallet, spinner: false })
    })
  }

  _next = async () => {}

  render () {
    return (
      <AccountSendContainer
        title='Send'
        navigation={this.props.nav}
        wallet={this.state.wallet}
        account={this.state.wallet}
        {...this.props}
      >
        <WaitingForBlockchainSpinner spinner={this.state.spinner} />
        <AccountDetailPanel />
        <LargeButton onPress={() => _next()}>Next</LargeButton>
      </AccountSendContainer>
    )
  }
}

export default AccountSend
