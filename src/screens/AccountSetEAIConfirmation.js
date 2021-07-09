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
  AccountLockContainer,
  AccountLockDetailsPanel,
  AccountLockLargerText,
  AccountBorder,
  AccountIconText,
  AccountSetEAIConfirmBottomPanel
} from '../components/account'
import { LockTransaction } from '../transactions/LockTransaction'
import { Transaction } from '../transactions/Transaction'
import { SetRewardsDestinationTransaction } from '../transactions/SetRewardsDestinationTransaction'
import AccountStore from '../stores/AccountStore'
import WalletStore from '../stores/WalletStore'
import AppConstants from '../AppConstants'
import WaitingForBlockchainSpinner from '../components/common/WaitingForBlockchainSpinner'
import FlashNotification from '../components/common/FlashNotification'
import DataFormatHelper from '../helpers/DataFormatHelper'
import { TextLink } from '../components/common'
import AppConfig from '../AppConfig'
import { KeyboardAvoidingView, Platform } from 'react-native'
import NdauNumber from '../helpers/NdauNumber'
import BlockchainAPIError from '../errors/BlockchainAPIError'

class AccountSetEAIConfirmation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      account: AccountStore.getAccount(),
      wallet: WalletStore.getWallet(),
      accountAddressForEAI: props.navigation.getParam(
        'accountAddressForEAI',
        null
      ),
      accountNicknameForEAI: props.navigation.getParam(
        'accountNicknameForEAI',
        null
      ),
      confirmed: false,
      word: null,
      spinner: false,
      transactionFee: '(loading...)'
    }
    props.navigation.addListener('didBlur', FlashNotification.hideMessage)
  }

  componentDidMount () {
    // Now make sure we send the EAI where it belongs
    Object.assign(SetRewardsDestinationTransaction.prototype, Transaction)
    this.setRewardsDestinationTransaction = new SetRewardsDestinationTransaction(
      this.state.wallet,
      this.state.account,
      this.state.accountAddressForEAI
    )

    this.setState({ spinner: true }, async () => {
      let transactionFee = ''
      try {
        Object.assign(SetRewardsDestinationTransaction.prototype, Transaction)
        this.setRewardsDestinationTransaction = new SetRewardsDestinationTransaction(
          this.state.wallet,
          this.state.account,
          this.state.accountAddressForEAI
        )
        await this.setRewardsDestinationTransaction.create()
        await this.setRewardsDestinationTransaction.sign()
        const data = await this.setRewardsDestinationTransaction.prevalidate()
        transactionFee = new NdauNumber(data.fee_napu).toDetail()
        this.setState({
          spinner: false,
          transactionFee
        })
      } catch (error) {
        const err = new BlockchainAPIError(error)
        FlashNotification.showError(err.message, false)
        this.setState({
          spinner: false,
          transactionFee: '[error]'
        })
      }
    })
  }

  _setEAI = async () => {
    this.setState({ spinner: true }, async () => {
      try {
        // Now make sure we send the EAI where it belongs if it is different
        // than the account address
        if (this.state.account.address !== this.state.accountAddressForEAI) {
          await this.setRewardsDestinationTransaction.createSignPrevalidateSubmit()
        }

        this.props.navigation.navigate('WalletOverview', {
          refresh: true
        })
      } catch (error) {
        this.setState({ spinner: false })
        throw error
      }
      this.setState({ spinner: false })
    })
  }

  _goBack = () => {
    this.props.navigation.goBack()
  }

  _checkWord = word => {
    let confirmed = false
    if (word === 'SetEAI') {
      confirmed = true
    }
    this.setState({ confirmed, word })
  }

  render () {
    return (
      <AccountLockContainer
        title='Set EAI Destination'
        account={this.state.account}
        wallet={this.state.wallet}
        navigation={this.props.nav}
        {...this.props}
      >
        <WaitingForBlockchainSpinner spinner={this.state.spinner} />
        <KeyboardAvoidingView
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 100}
          behavior={Platform.OS === 'ios' ? 'height' : 'position'}
        >
          <AccountLockDetailsPanel account={this.state.account}>
            <AccountLockLargerText>Confirmation</AccountLockLargerText>
            <AccountBorder sideMargins />
            <AccountIconText>
              Sending{' '}
              <TextLink url={AppConfig.EAI_KNOWLEDGEBASE_URL}>EAI</TextLink> to{' '}
              {this.state.accountNicknameForEAI}
            </AccountIconText>
            <AccountIconText iconColor='#8CC74F' iconName='usd-circle'>
              {this.state.account.addressData.nickname} will be charged a{' '}
              <TextLink url={AppConfig.TRANSACTION_FEE_KNOWLEDGEBASE_URL}>
                fee
              </TextLink>{' '}
              of {this.state.transactionFee} ndau
            </AccountIconText>
          </AccountLockDetailsPanel>

          <AccountSetEAIConfirmBottomPanel
            disabled={!this.state.confirmed}
            onPress={this._setEAI}
            onChangeText={this._checkWord}
            word={this.state.word}
          >
            Confirm
          </AccountSetEAIConfirmBottomPanel>
        </KeyboardAvoidingView>
      </AccountLockContainer>
    )
  }
}

export default AccountSetEAIConfirmation
