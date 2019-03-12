import React, { Component } from 'react'
import { Clipboard } from 'react-native'
import {
  AccountSendContainer,
  AccountDetailPanel,
  AccountReceiveParagraphText,
  AddressCopyPanel
} from '../components/account'
import { QRCode } from '../components/common'

class AccountReceive extends Component {
  constructor (props) {
    super(props)
    this.state = {
      address: '',
      account: {},
      wallet: {}
    }
  }

  componentWillMount = async () => {
    this.setState({ spinner: true }, async () => {
      const account = this.props.navigation.getParam('account', null)
      const wallet = this.props.navigation.getParam('wallet', null)

      this.setState({ account, wallet })
    })
  }

  copyAddressToClipboard = () => {
    Clipboard.setString(this.state.account.address)
  }

  render () {
    return (
      <AccountSendContainer
        title='Receive'
        navigation={this.props.nav}
        wallet={this.state.wallet}
        account={this.state.account}
        {...this.props}
      >
        <AccountDetailPanel>
          <AccountReceiveParagraphText>
            To receive ndau in your account, present this QR code or ndau
            address to the sender.
          </AccountReceiveParagraphText>
          <QRCode value={this.state.account.address} />
        </AccountDetailPanel>
        <AddressCopyPanel
          onPress={this.copyAddressToClipboard}
          address={this.state.account.address}
        />
      </AccountSendContainer>
    )
  }
}

export default AccountReceive
