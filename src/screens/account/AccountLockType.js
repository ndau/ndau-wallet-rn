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
  AccountLockDetailsPanel,
  AccountLockContainer,
  AccountLockTypeButton,
  AccountLockLargerText
} from '../../components/account'
import AccountStore from '../../stores/AccountStore'
import WalletStore from '../../stores/WalletStore'
import { RadioButton, TextLink } from '../../components/common'
import AccountHelper from '../../helpers/AccountHelper'
import WaitingForBlockchainSpinner from '../../components/common/WaitingForBlockchainSpinner'
import FlashNotification from '../../components/common/FlashNotification'
import AppConfig from '../../AppConfig'
import LogStore from '../../stores/LogStore'


const COMPOUND_TO_THIS_ACCOUNT = '1'
const COMPOUND_TO_NEW_ACCOUNT = '2'
const CHOOSE_ON_NEXT_SCREEN = '3'

class AccountLockType extends Component {
  constructor (props) {
    super(props)
    const account = AccountStore.getAccount()
    this.state = {
      account: account,
      wallet: WalletStore.getWallet(),
      whereToSendEAI: null,
      lockType: COMPOUND_TO_THIS_ACCOUNT,
      accountsCanRxEAI: props.navigation.getParam(
        'accountsCanRxEAI',
        null
      ),
      accountAddressForEAI: account.address,
      accountNicknameForEAI: account.addressData.nickname,
      lockInformation: props.navigation.getParam(
        'lockInformation',
        null
      ),
      spinner: false
    }
    props.navigation.addListener('didBlur', FlashNotification.hideMessage)
  }

  _handleAccountSelection = () => {
    if (this.state.lockType === CHOOSE_ON_NEXT_SCREEN) {
      this.props.navigation.navigate('AccountLockChooseAccount', {
        account: this.state.account,
        wallet: this.state.wallet,
        lockInformation: this.state.lockInformation,
        accountsCanRxEAI: this.state.accountsCanRxEAI
      })
    } else if (this.state.lockType === COMPOUND_TO_NEW_ACCOUNT) {
      this._createNewAccount()
    } else {
      this._showLockConfirmation()
    }
  }

  _createNewAccount = async () => {
    this.setState({ spinner: true }, async () => {
      LogStore.log(
        `spinner 1 = ${this.state.spinner}`
      )
        
      const wallet = await AccountHelper.createAccounts(this.state.wallet)
      const newAccountIndex = Object.keys(wallet.accounts).length - 1
      this.setState(
        {
          accountAddressForEAI: Object.values(wallet.accounts)[newAccountIndex]
            .address,
          accountNicknameForEAI: Object.values(wallet.accounts)[newAccountIndex]
            .addressData.nickname,
          spinner: false
        },
        () => {
          LogStore.log(
            `spinner 2 = ${this.state.spinner}`
          )
        
          this._showLockConfirmation()
          LogStore.log(
            `spinner 3 = ${this.state.spinner}`
          )
        }
      )
      LogStore.log(
        `spinner 4 = ${this.state.spinner}`
      )
    })
  }

  _showLockConfirmation = () => {
    this.props.navigation.navigate('AccountLockConfirmation', {
      account: this.state.account,
      wallet: this.state.wallet,
      lockInformation: this.state.lockInformation,
      accountAddressForEAI: this.state.accountAddressForEAI,
      accountNicknameForEAI: this.state.accountNicknameForEAI
    })
  }

  render () {
    const showChoose = Object.keys(this.state.wallet.accounts).length > 1
    const opts = [
      `Compound to this account (${this.state.account.addressData.nickname})`,
      `Create new account`
    ]
    const vals = [COMPOUND_TO_THIS_ACCOUNT, COMPOUND_TO_NEW_ACCOUNT]

    if (showChoose) {
      opts.push('Choose account on the next screen')
      vals.push(CHOOSE_ON_NEXT_SCREEN)
    }
    return (
      <AccountLockContainer
        title='Lock account'
        account={this.state.account}
        wallet={this.state.wallet}
        navigation={this.props.nav}
        {...this.props}
      >
        <WaitingForBlockchainSpinner spinner={this.state.spinner} />
        <AccountLockDetailsPanel account={this.state.account}>
          <AccountLockLargerText>
            Where do you want to send the{' '}
            <TextLink url={AppConfig.EAI_KNOWLEDGEBASE_URL}>EAI</TextLink> from
            this account?
          </AccountLockLargerText>
          <RadioButton
            options={opts}
            values={vals}
            defaultSelected={COMPOUND_TO_THIS_ACCOUNT}
            onChange={value => {
              this.setState({ lockType: value })
            }}
          />
        </AccountLockDetailsPanel>

        <AccountLockTypeButton
          smallText={
            'Note: You will not be able to deposit into, spend, transfer, or otherwise access the principal in this account while it is locked.'
          }
          onPress={this._handleAccountSelection}
        >
          Continue
        </AccountLockTypeButton>
      </AccountLockContainer>
    )
  }
}

export default AccountLockType
