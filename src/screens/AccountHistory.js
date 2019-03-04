import React, { Component } from 'react'

import { Text } from 'react-native'
import {
  AccountLockContainer,
  AccountHistoryMainPanel,
  AccountHistoryPanels
} from '../components/account'
import CollapsibleBar from '../components/common/CollapsibleBar'

class AccountHistory extends Component {
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
    return (
      <AccountLockContainer
        title='Lock account step 1'
        account={this.state.account}
        wallet={this.state.wallet}
        navigation={this.props.nav}
        {...this.props}
      >
        <AccountHistoryMainPanel>
          <AccountHistoryPanels />
        </AccountHistoryMainPanel>
      </AccountLockContainer>
    )
  }
}

export default AccountHistory
