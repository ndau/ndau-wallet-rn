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
  AccountBorder,
  AccountIconText,
  AccountSetEAIConfirmBottomPanel,
} from '../../components/account'
import { Transaction } from '../../transactions/Transaction'
import { SetRewardsDestinationTransaction } from '../../transactions/SetRewardsDestinationTransaction'
import AccountStore from '../../stores/AccountStore'
import WalletStore from '../../stores/WalletStore'
import AppConstants from '../../AppConstants'
import WaitingForBlockchainSpinner from '../../components/common/WaitingForBlockchainSpinner'
import FlashNotification from '../../components/common/FlashNotification'
import { TextLink } from '../../components/common'
import AppConfig from '../../AppConfig'
import { KeyboardAvoidingView, Platform } from 'react-native'
import NdauNumber from '../../helpers/NdauNumber'
import BlockchainAPIError from '../../errors/BlockchainAPIError'
import LogStore from '../../stores/LogStore'

class AccountSetEAIConfirmation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      account: AccountStore.getAccount(),
      wallet: WalletStore.getWallet(),
      lockInformation: props.route.params?.lockInformation ?? null,
      accountAddressForEAI: props.route.params?.accountAddressForEAI ?? null,
      accountNicknameForEAI: props.route.params?.accountNicknameForEAI ?? null,
      confirmed: false,
      word: null,
      spinner: false,
      transactionFee: '(loading...)'
    }
    props.navigation.addListener('blur', FlashNotification.hideMessage)
  }

  componentDidMount () {
    Object.assign(SetRewardsDestinationTransaction.prototype, Transaction)
    this.setRewardsDestinationTransaction = new SetRewardsDestinationTransaction(
      this.state.wallet,
      this.state.account,
      this.state.accountAddressForEAI
    )

    this.setState({ spinner: false }, async () => {
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
        await this.setRewardsDestinationTransaction.createSignPrevalidateSubmit()

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

  render () {
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
            <AccountSetEAILargerText>Confirmation</AccountSetEAILargerText>
            <AccountBorder sideMargins />
            <AccountIconText iconColor={AppConstants.LIGHT_GREEN_COLOR} iconName='coins'>
              {this.state.account.addressData.nickname} will be charged a{' '}
              <TextLink url={AppConfig.TRANSACTION_FEE_KNOWLEDGEBASE_URL}>
                fee
              </TextLink>{' '}
              of {this.state.transactionFee} ndau
            </AccountIconText>
          </AccountSetEAIDetailsPanel>

          <AccountSetEAIConfirmBottomPanel
              onPress={this._setEAI}
            >
              Confirm
          </AccountSetEAIConfirmBottomPanel>
      </AccountSetEAIContainer>
    )
  }
}

export default AccountSetEAIConfirmation
