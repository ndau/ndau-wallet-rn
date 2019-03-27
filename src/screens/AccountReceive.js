import React, { Component } from 'react'
import { Share } from 'react-native'
import {
  AccountSendContainer,
  AccountDetailPanel,
  AccountReceiveParagraphText,
  AddressSharePanel
} from '../components/account'
import { QRCode } from '../components/common'
import AccountStore from '../stores/AccountStore'
import WalletStore from '../stores/WalletStore'

class AccountReceive extends Component {
  constructor (props) {
    super(props)
    this.state = {
      account: {},
      wallet: {}
    }
  }

  componentWillMount = async () => {
    const account = AccountStore.getAccount()
    const wallet = WalletStore.getWallet()
    this.setState({ account, wallet })
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
        <AddressSharePanel address={this.state.account.address} />
      </AccountSendContainer>
    )
  }
}

export default AccountReceive
