import React, { Component } from 'react'

import {
  AccountSendContainer,
  AccountDetailPanel,
  AccountHeaderText
} from '../components/account'
import WaitingForBlockchainSpinner from '../components/common/WaitingForBlockchainSpinner'
import { LargeButton, TextInput, Label } from '../components/common'

class AccountSend extends Component {
  constructor (props) {
    super(props)
    this.state = {
      address: {},
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

  _setAddress = address => {
    this.setState({
      address
    })
  }

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
        <AccountDetailPanel>
          <AccountHeaderText>Who are you sending to?</AccountHeaderText>
          <Label>Address</Label>
          <TextInput
            onChangeText={this._setAddress}
            value={this.state.address}
            placeholder='ndau address...'
            autoCapitalize='none'
          />
        </AccountDetailPanel>
        <LargeButton onPress={() => _next()}>Next</LargeButton>
      </AccountSendContainer>
    )
  }
}

export default AccountSend
