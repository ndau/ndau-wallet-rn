import React, { Component } from 'react'
import {
  AccountSendContainer,
  AccountReceiveParagraphText,
  AddressSharePanel
} from '../components/account'
import FlashNotification from '../components/common/FlashNotification'
import { NdauQRCode, LoadingSpinner } from '../components/common'
import AccountStore from '../stores/AccountStore'
import WalletStore from '../stores/WalletStore'

class AccountReceive extends Component {
  constructor (props) {
    super(props)
    this.state = {
      account: {},
      wallet: {},
      spinner: true,
      qrCode: {}
    }
    props.navigation.addListener('didBlur', FlashNotification.hideMessage)
  }

  componentWillMount = async () => {
    const account = AccountStore.getAccount()
    const wallet = WalletStore.getWallet()
    this.setState({ account, wallet })
  }

  componentDidMount () {
    this.setState({ spinner: false })
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
        <LoadingSpinner spinner={this.state.spinner} />
        <AccountReceiveParagraphText>
          To receive ndau in your account, present this QR code or ndau address
          to the sender.
        </AccountReceiveParagraphText>
        <NdauQRCode value={this.state.account.address} />
        <AddressSharePanel scroll address={this.state.account.address} />
      </AccountSendContainer>
    )
  }
}

export default AccountReceive
