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
  AccountLockConfirmBottomPanel
} from '../../components/account'
import { LockTransaction } from '../../transactions/LockTransaction'
import { Transaction } from '../../transactions/Transaction'
import { NotifyTransaction } from '../../transactions/NotifyTransaction'
import { SetRewardsDestinationTransaction } from '../../transactions/SetRewardsDestinationTransaction'
import AccountStore from '../../stores/AccountStore'
import WalletStore from '../../stores/WalletStore'
import AppConstants from '../../AppConstants'
import WaitingForBlockchainSpinner from '../../components/common/WaitingForBlockchainSpinner'
import FlashNotification from '../../components/common/FlashNotification'
import DataFormatHelper from '../../helpers/DataFormatHelper'
import { TextLink } from '../../components/common'
import AppConfig from '../../AppConfig'
import { KeyboardAvoidingView, Platform } from 'react-native'
import NdauNumber from '../../helpers/NdauNumber'
import BlockchainAPIError from '../../errors/BlockchainAPIError'

class AccountLockConfirmation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      account: AccountStore.getAccount(),
      wallet: WalletStore.getWallet(),
      lockInformation: props.navigation.getParam(
        'lockInformation',
        null
      ),
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

//   componentDidMount = () => {
//     const account = AccountStore.getAccount()
//     const wallet = WalletStore.getWallet()
//     const lockInformation = this.props.navigation.getParam(
//       'lockInformation',
//       null
//     )
//     const accountAddressForEAI = this.props.navigation.getParam(
//       'accountAddressForEAI',
//       null
//     )
//     const accountNicknameForEAI = this.props.navigation.getParam(
//       'accountNicknameForEAI',
//       null
//     )

//     this.setState({ spinner: true }, async () => {
//       let transactionFee = ''
//       try {
//         Object.assign(LockTransaction.prototype, Transaction)
//         this.lockTransaction = new LockTransaction(
//           this.state.wallet,
//           account,
//           `${this.state.lockInformation.lockISO}`
//         )
//         await this.lockTransaction.create()
//         await this.lockTransaction.sign()
//         const data = await this.lockTransaction.prevalidate()
//         transactionFee = new NdauNumber(data.fee_napu).toDetail()
//         this.setState({
//           spinner: false,
//           transactionFee
//         })
//       } catch (error) {
//         const err = new BlockchainAPIError(error)
//         FlashNotification.showError(err.message, false)
//         this.setState({
//           spinner: false,
//           transactionFee: '[error]'
//         })
//       }
//     })

//     this.setState({
//       account,
//       wallet,
//       lockInformation,
//       accountAddressForEAI,
//       accountNicknameForEAI
//     })
//   }

  componentDidMount () {
    Object.assign(NotifyTransaction.prototype, Transaction)
    this.notifyTransaction = new NotifyTransaction(
      this.state.wallet,
      this.state.account
    )

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
        Object.assign(LockTransaction.prototype, Transaction)
        this.lockTransaction = new LockTransaction(
          this.state.wallet,
          this.state.account,
          `${this.state.lockInformation.lockISO}`
        )
        await this.lockTransaction.create()
        await this.lockTransaction.sign()
        const data = await this.lockTransaction.prevalidate()
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

  _lock = async () => {
    this.setState({ spinner: true }, async () => {
      try {
        await this.lockTransaction.createSignPrevalidateSubmit()

        // Alright, we are locked...now send a Notify
        // This was done in version 2.0 to simplify the lock
        // process.
        await this.notifyTransaction.createSignPrevalidateSubmit()

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

  _checkWord = word => {
    let confirmed = false
    if (word === 'Lock') {
      confirmed = true
    }
    this.setState({ confirmed, word })
  }

  render () {
    return (
      <AccountLockContainer
        title='Lock account'
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
              Lock {this.state.account.addressData.nickname}
            </AccountIconText>
            <AccountIconText>
              Earn {this.state.lockInformation.bonus}%{' '}
              <TextLink url={AppConfig.EAI_KNOWLEDGEBASE_URL}>EAI</TextLink>{' '}
              bonus + {this.state.lockInformation.base}% base ={' '}
              {this.state.lockInformation.total}% total
            </AccountIconText>
            <AccountIconText>
              Sending{' '}
              <TextLink url={AppConfig.EAI_KNOWLEDGEBASE_URL}>EAI</TextLink> to{' '}
              {this.state.accountNicknameForEAI}
            </AccountIconText>
            <AccountIconText>
              Account will unlock in {this.state.lockInformation.lock}
            </AccountIconText>
            <AccountIconText iconColor={AppConstants.LIGHT_GREEN_COLOR} iconName='usd-circle'>
              {this.state.account.addressData.nickname} will be charged a{' '}
              <TextLink url={AppConfig.TRANSACTION_FEE_KNOWLEDGEBASE_URL}>
                fee
              </TextLink>{' '}
              of {this.state.transactionFee} ndau
            </AccountIconText>
            <AccountIconText
              iconColor={AppConstants.WARNING_ICON_COLOR}
              iconName='exclamation-circle'
            >
              You will not be able to deposit into, spend, transfer, or
              otherwise access the principal in this account while it is locked
            </AccountIconText>
          </AccountLockDetailsPanel>

          <AccountLockConfirmBottomPanel
            disabled={!this.state.confirmed}
            onPress={this._lock}
            onChangeText={this._checkWord}
            word={this.state.word}
          >
            Confirm
          </AccountLockConfirmBottomPanel>
        </KeyboardAvoidingView>
      </AccountLockContainer>
    )
  }
}

export default AccountLockConfirmation
