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
  AccountSetEAIDetailsPanel,
  AccountSetEAIContainer,
  AccountSetEAIButton,
  AccountSetEAILargerText,
  AccountSetEAIOption,
  AccountSetEAIOptionHeader,
  AccountSetEAIOptionsPanel,
  AccountSetEAIGreenText
} from '../../components/account'
import { ScrollView } from 'react-native'
import AccountAPIHelper from '../../helpers/AccountAPIHelper'
import AccountStore from '../../stores/AccountStore'
import WalletStore from '../../stores/WalletStore'
import AccountAPI from '../../api/AccountAPI'
import AppConstants from '../../AppConstants'
import WaitingForBlockchainSpinner from '../../components/common/WaitingForBlockchainSpinner'
import FlashNotification from '../../components/common/FlashNotification'
import { TextLink } from '../../components/common'
import { FeeAlert } from '../../components/alerts'
import AppConfig from '../../AppConfig'

class AccountSetEAI extends Component {
  constructor (props) {
    super(props)
    this.state = {
      account: {},
      wallet: {},
      possibleLocks: [],
      selectedIndex: null,
      whereToSendEAI: null,
      lockType: null,
      chooseAccounts: false,
      spinner: false,
      accountsCanRxEAI: {},
      accountAddressForEAI: null,
      accountNicknameForEAI: null,
      baseEAI: 0,
      isModalVisible: false
    }
    props.navigation.addListener('blur', FlashNotification.hideMessage)
  }

  UNSAFE_componentWillMount = async () => {
    this.setState({ spinner: true }, async () => {
      const accountsCanRxEAI = this.props.route.params?.accountsCanRxEAI ?? null
      const baseEAI = this.props.route.params?.baseEAI ?? null
      const account = AccountStore.getAccount()
      const wallet = WalletStore.getWallet()

      const lockData = await AccountAPI.getLockRates(account)

      const possibleLocks = lockData.map((data, index) => {
        const total = AccountAPIHelper.eaiValueForDisplay({
          eaiValueForDisplay: data.eairate
        })
        const bonus = index + 1
        const base = total - bonus
        return {
          bonus,
          total,
          base,
          lock: AppConstants.LOCK_ACCOUNT_POSSIBLE_TIMEFRAMES[data.address],
          lockISO: data.address
        }
      })

      this.setState({
        spinner: false,
        account,
        wallet,
        possibleLocks,
        accountsCanRxEAI,
        baseEAI
      })
    })
  }

  componentDidMount = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible })
  }

  handleLockSelection = index => {
    this.setState({ selectedIndex: index })
  }

  _selectAccountToSendEAI = () => {
    this.props.navigation.navigate('AccountSetEAIType', {
      account: this.state.account,
      wallet: this.state.wallet,
      lockInformation: this.state.possibleLocks[this.state.selectedIndex],
      accountsCanRxEAI: this.state.accountsCanRxEAI
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
        <FeeAlert
          title='ndau Set EAI fees'
          message='Transactions are subject to a small fee that supports the operation of the ndau network.'
          fees={[
            'SetDestination fee - 0.005 ndau*'
          ]}
          isVisible={this.state.isModalVisible}
          setVisibleHandler={visible => this.setState({ isModalVisible: visible })}
        />
        <WaitingForBlockchainSpinner spinner={this.state.spinner} />
        <AccountSetEAIDetailsPanel account={this.state.account}>
          <AccountSetEAIButton
              onPress={this._selectAccountToSendEAI}
              disabled={this.state.selectedIndex === null}
>
              Continue
            </AccountSetEAIButton>
        </AccountSetEAIDetailsPanel>
      </AccountSetEAIContainer>
    )
  }
}

export default AccountSetEAI
