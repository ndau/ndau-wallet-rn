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
  AccountDetailPanel,
  AccountSendButton,
  AccountHeaderText,
  AccountConfirmationItem,
  AccountSendErrorText,
  AccountSendPanel,
  AccountScanContainer
} from '../../components/account'
import WaitingForBlockchainSpinner from '../../components/common/WaitingForBlockchainSpinner'
import FlashNotification from '../../components/common/FlashNotification'
import {
  LargeButton,
  TextInput,
  Label,
  OrBorder,
  LargeBorderButton,
  NdauQRCodeScanner,
  BarBorder
} from '../../components/common'
import AccountAPIHelper from '../../helpers/AccountAPIHelper'
import { TransferTransaction } from '../../transactions/TransferTransaction'
import { Transaction } from '../../transactions/Transaction'
import DataFormatHelper from '../../helpers/DataFormatHelper'
import AccountStore from '../../stores/AccountStore'
import WalletStore from '../../stores/WalletStore'
import {
  KeyboardAvoidingView,
  View,
  Platform,
  Button,
  Text
} from 'react-native'
import AppConfig from '../../AppConfig'
import { FeeAlert } from '../../components/alerts'

const _ = require('lodash')

class AccountSend extends Component {
  constructor (props) {
    super(props)
    this.state = {
      address: '',
      account: AccountStore.getAccount(),
      wallet: WalletStore.getWallet(),
      spinner: false,
      scanning: false,
      cameraType: 'back',
      requestingAmount: false,
      amount: '',
      canProceedFromAmount: false,
      validAddress: false,
      transactionFee: 0,
      sibFee: 0,
      transactionFeeNapu: 0,
      sibFeeNapu: 0,
      total: 0,
      isModalVisible: false
    }

    this.debounceRequestTransactionFee = _.debounce(
      this._requestTransactionFee,
      2000
    )
    props.navigation.addListener('blur', FlashNotification.hideMessage)
  }

  componentDidMount = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible })
  }

  // TODO: we will be getting a better version of this that
  // TODO: we will have to get out of keyaddr (ndau/ndaumath#71)
  _validAddress = address => {
    if (address.substr(0, 2) === 'nd') {
      return true
    } else {
      return false
    }
  }

  _next = () => {
    this.props.navigation.navigate('AccountSendConfirmation', {
      address: this.state.address,
      amount: this.state.amount,
      transactionFee: this.state.transactionFee,
      sibFee: this.state.sibFee,
      total: this.state.total
    })
  }

  _haveAddress = () => {
    this.setState({ requestingAmount: true })
  }

  _requestTransactionFee = () => {
    // If we don't have a number or if the amount is zero then
    // we should short circuit here as there is nothing to
    // calculate
    if (isNaN(this.state.amount) || this.state.amount == 0) return

    this.setState({ spinner: true }, async () => {
      let transactionFee = 0
      let sibFee = 0
      let transactionFeeNapu = 0
      let sibFeeNapu = 0
      let total = this.state.total
      let canProceedFromAmount = this.state.canProceedFromAmount

      try {
        Object.assign(TransferTransaction.prototype, Transaction)
        const transferTransaction = new TransferTransaction(
          this.state.wallet,
          this.state.account,
          this.state.address,
          this.state.amount
        )

        await transferTransaction.create()
        await transferTransaction.sign()
        const prevalidateData = await transferTransaction.prevalidate()

        if (prevalidateData.fee_napu) {
          transactionFee = DataFormatHelper.getNdauFromNapu(
            prevalidateData.fee_napu,
            AppConfig.NDAU_DETAIL_PRECISION
          )
          transactionFeeNapu = prevalidateData.fee_napu
        }
        if (prevalidateData.sib_napu) {
          sibFee = DataFormatHelper.getNdauFromNapu(
            prevalidateData.sib_napu,
            AppConfig.NDAU_DETAIL_PRECISION
          )
          sibFeeNapu = prevalidateData.sib_napu
        }

        total = AccountAPIHelper.getTotalNdauForSend(
          this.state.amount,
          prevalidateData.fee_napu,
          prevalidateData.sib_napu
        )
        canProceedFromAmount = true
      } catch (error) {
        // Check to see if fee and sib info are passed back so they can be displayed.
        if (error.error.response && error.error.response.data) {
          const resp = error.error.response.data
          if (resp.sib_napu) {
            sibFee = DataFormatHelper.getNdauFromNapu(resp.sib_napu)
            sibFeeNapu = resp.sib_napu
          }
          if (resp.fee_napu) {
            transactionFee = DataFormatHelper.getNdauFromNapu(resp.fee_napu)
            transactionFeeNapu = resp.fee_napu
          }
          if (resp.sib_napu && resp.fee_napu) {
            total = AccountAPIHelper.getTotalNdauForSend(
              this.state.amount,
              resp.fee_napu,
              resp.sib_napu
            )
            sibFeeNapu = resp.sib_napu
            transactionFeeNapu = resp.fee_napu
          }
        }
        canProceedFromAmount = false
        FlashNotification.showError(
          `Error occurred while sending ndau: ${error.message}`
        )
      }

      this.setState({
        spinner: false,
        transactionFee,
        sibFee,
        transactionFeeNapu,
        sibFeeNapu,
        total,
        canProceedFromAmount
      })
    })
  }

  _setAddress = async address => {
    const validAddress = this._validAddress(address)

    this.setState({ address, validAddress })
  }

  _setAmount = amount => {
    let totalNdau = 0
    // If the amount passed in is not a number then we do not
    // have to do any math
    if (!isNaN(amount)) {
      totalNdau = this._getTotalNdau(amount)
    }

    this.setState(
      {
        amount,
        total: totalNdau,
        canProceedFromAmount: false
      },
      this.debounceRequestTransactionFee
    )
  }

  _scan = () => {
    this.setState({ scanning: true })
  }

  _flipCamera = () => {
    if (this.state.cameraType === 'back') {
      this.setState({ cameraType: 'front' })
    } else {
      this.setState({ cameraType: 'back' })
    }
  }

  _getTotalNdau (amount) {
    let { transactionFeeNapu, sibFeeNapu } = this.state
    const totalNdau = AccountAPIHelper.getTotalNdauForSend(
      amount,
      transactionFeeNapu,
      sibFeeNapu
    )
    return totalNdau
  }

  _scannedSuccessfully (event) {
    if (event.data.substr(0, 2) === 'nd') {
      this.setState({
        address: event.data,
        scanning: false,
        validAddress: true
      })
    } else {
      FlashNotification.showError('QR code is not a valid ndau address')
    }
  }

  _renderRequestAmount () {
    const remainingBalance =
      AccountAPIHelper.remainingBalanceNdau(
        this.state.account.addressData,
        this.state.total,
        false,
        AppConfig.NDAU_DETAIL_PRECISION
      ) || 0

    return (
      <AccountSendContainer
        title='Send'
        navigation={this.props.nav}
        wallet={this.state.wallet}
        account={this.state.account}
        {...this.props}
      >
        <WaitingForBlockchainSpinner spinner={this.state.spinner} />
        <AccountDetailPanel>
          <AccountHeaderText>How much are you sending?</AccountHeaderText>
          <Label noMargin>ndau amount</Label>
          <TextInput
            onChangeText={this._setAmount}
            value={this.state.amount}
            name='amount'
            placeholder='Enter amount...'
            autoCapitalize='none'
            noBottomMargin
            noSideMargins
            error={remainingBalance <= 0}
          />
          {remainingBalance <= 0 ? (
            <AccountSendErrorText>
              You do not have enough ndau in this account.
            </AccountSendErrorText>
          ) : null}
          <AccountConfirmationItem value={remainingBalance}>
            Remaining balance:
          </AccountConfirmationItem>
          <AccountHeaderText>Fees</AccountHeaderText>
          <BarBorder />
          <AccountConfirmationItem
            value={this.state.transactionFee}
            url={AppConfig.TRANSACTION_FEE_KNOWLEDGEBASE_URL}
          >
            Transaction fee:
          </AccountConfirmationItem>
          <BarBorder />
          <AccountConfirmationItem
            value={this.state.sibFee}
            url={AppConfig.SIB_FEE_KNOWLEDGEBASE_URL}
          >
            SIB:
          </AccountConfirmationItem>
          <BarBorder />
          <AccountConfirmationItem largerText value={this.state.total}>
            Total
          </AccountConfirmationItem>
          <AccountSendButton
            sideMargins
            disabled={!this.state.canProceedFromAmount}
            onPress={() => this._next()}
          >
            Next
          </AccountSendButton>
        </AccountDetailPanel>
      </AccountSendContainer>
    )
  }

  _renderScanning () {
    return (
      <AccountScanContainer
        title='Send'
        navigation={this.props.nav}
        wallet={this.state.wallet}
        account={this.state.account}
        {...this.props}
      >
        <NdauQRCodeScanner
          onBarCodeRead={e => this._scannedSuccessfully(e)}
          type={this.state.cameraType}
        />
        <LargeButton sideMargins onPress={() => this._flipCamera()}>
          Flip camera
        </LargeButton>
      </AccountScanContainer>
    )
  }

  _renderSend () {
    return (
      <AccountSendContainer
        title='Send'
        navigation={this.props.nav}
        wallet={this.state.wallet}
        account={this.state.account}
        {...this.props}
      >
        <WaitingForBlockchainSpinner spinner={this.state.spinner} />
        <FeeAlert
          title='ndau send fees'
          message='Transactions are subject to a small fee that supports the operation of the ndau network.'
          fees={['Transfer fee - 0.005 ndau']}
          isVisible={this.state.isModalVisible}
          setVisibleHandler={visible =>
            this.setState({ isModalVisible: visible })
          }
        />
        <KeyboardAvoidingView
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : -110}
          behavior={Platform.OS === 'ios' ? 'height' : 'position'}
        >
          <AccountSendPanel>
            <AccountHeaderText>Who are you sending to?</AccountHeaderText>
            <Label noMargin>Address</Label>
            <TextInput
              onChangeText={this._setAddress}
              value={this.state.address}
              name='address'
              placeholder='ndau address...'
              autoCapitalize='none'
              noSideMargins
            />
            <OrBorder />
            <LargeBorderButton onPress={() => this._scan()}>
              Scan QR Code
            </LargeBorderButton>
            <View
              style={{
                flexGrow: 1,
                flexDirection: 'column',
                justifyContent: 'flex-end',
                marginBottom: '4%'
              }}
            >
              <AccountSendButton
                sideMargins
                disabled={!this.state.validAddress}
                onPress={() => this._haveAddress()}
              >
                Next
              </AccountSendButton>
            </View>
          </AccountSendPanel>
        </KeyboardAvoidingView>
      </AccountSendContainer>
    )
  }

  render () {
    if (this.state.scanning) {
      return this._renderScanning()
    } else if (this.state.requestingAmount) {
      return this._renderRequestAmount()
    } else {
      return this._renderSend()
    }
  }
}

export default AccountSend
