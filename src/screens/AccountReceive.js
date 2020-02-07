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
  AccountSendContainer,
  AccountReceiveParagraphText,
  AddressSharePanel
} from '../components/account'
import FlashNotification from '../components/common/FlashNotification'
import { NdauQRCode, LoadingSpinner } from '../components/common'
import AccountStore from '../stores/AccountStore'
import WalletStore from '../stores/WalletStore'
import { FeeAlert } from '../components/alerts'

class AccountReceive extends Component {
  constructor (props) {
    super(props)
    this.state = {
      account: {},
      wallet: {},
      spinner: true,
      qrCode: {},
      showFeesModal: false
    }
    props.navigation.addListener('didBlur', FlashNotification.hideMessage)
  }

  componentWillMount = async () => {
    const account = AccountStore.getAccount()
    const wallet = WalletStore.getWallet()
    this.setState({ account, wallet })
  }

  componentDidMount () {
    this.setState({
      spinner: false,
      showFeesModal:
        !this.state.account.addressData ||
        !this.state.account.addressData.balance
    })
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
        <FeeAlert
          title='ndau receive fees'
          message='The first deposit received by a newly created account is subject to a small fee that supports the operation of the ndau network.'
          fees={['Delegate fee - 0.005 ndau', 'SetValidation fee - 0.005 ndau']}
          isVisible={this.state.showFeesModal}
          setVisibleHandler={visible => this.setState({ showFeesModal: visible })}
        />
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
