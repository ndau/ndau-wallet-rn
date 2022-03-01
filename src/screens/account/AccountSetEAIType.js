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
  AccountSetEAIContainer,
  AccountSetEAIDetailsPanel,
  AccountSetEAILargerText,
  AccountSetEAITypeButton
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

class AccountSetEAIType extends Component {
  constructor (props) {
    super(props)
    const account = AccountStore.getAccount()
    this.state = {
      account: account,
      wallet: WalletStore.getWallet(),
      whereToSendEAI: null,
      lockType: COMPOUND_TO_THIS_ACCOUNT,
      accountsCanRxEAI: props.route.params?.accountsCanRxEAI ?? null,
      accountAddressForEAI: account.address,
      accountNicknameForEAI: account.addressData.nickname,
      lockInformation: props.route.params?.lockInformation ?? null,
      spinner: false
    }
    props.navigation.addListener('blur', FlashNotification.hideMessage)
  }

  _handleAccountSelection = () => {
    if (this.state.lockType === CHOOSE_ON_NEXT_SCREEN) {
      this.props.navigation.navigate('AccountSetEAIChooseAccount', {
        account: this.state.account,
        wallet: this.state.wallet,
        lockInformation: this.state.lockInformation,
        accountsCanRxEAI: this.state.accountsCanRxEAI
      })
    } else if (this.state.lockType === COMPOUND_TO_NEW_ACCOUNT) {
      this._createNewAccount()
    } else {
      this._showSetEAIConfirmation()
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
        
          this._showSetEAIConfirmation()
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

  _showSetEAIConfirmation = () => {
    this.props.navigation.navigate('AccountSetEAIConfirmation', {
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
      <AccountSetEAIContainer
        title='Set EAI destination'
        account={this.state.account}
        wallet={this.state.wallet}
        navigation={this.props.nav}
        {...this.props}
      >
        <WaitingForBlockchainSpinner spinner={this.state.spinner} />
        <AccountSetEAIDetailsPanel account={this.state.account}>
          <AccountSetEAILargerText>
            Where do you want to send the{' '}
            <TextLink url={AppConfig.EAI_KNOWLEDGEBASE_URL}>EAI</TextLink> from
            this account?
          </AccountSetEAILargerText>
          <RadioButton
            options={opts}
            values={vals}
            defaultSelected={COMPOUND_TO_THIS_ACCOUNT}
            onChange={value => {
              this.setState({ lockType: value })
            }}
          />
        </AccountSetEAIDetailsPanel>

        <AccountSetEAITypeButton
          onPress={this._handleAccountSelection}
        >
          Continue
        </AccountSetEAITypeButton>
      </AccountSetEAIContainer>
    )
  }
}

export default AccountSetEAIType
