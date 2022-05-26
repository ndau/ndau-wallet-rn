/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import React, { Component } from 'react'

import {
  AccountHistoryContainer,
  AccountHistoryPanel,
  AccountHistoryPanels
} from '../../components/account'

import AccountHistoryHelper from '../../helpers/AccountHistoryHelper'
import LogStore from '../../stores/LogStore'
import FlashNotification from '../../components/common/FlashNotification'
import WaitingForBlockchainSpinner from '../../components/common/WaitingForBlockchainSpinner'
import AccountStore from '../../stores/AccountStore'
import OfflineError from '../../errors/OfflineError'

class AccountHistory extends Component {
  constructor (props) {
    super(props)
    this.state = {
      accountHistory: {},
      account: {},
      spinner: false
    }
    props.navigation.addListener('blur', FlashNotification.hideMessage)
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
        LogStore.log(error)
        FlashNotification.showError(
          new OfflineError('Problem occured while getting account history from the blockchain.')
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
