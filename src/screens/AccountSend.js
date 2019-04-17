import React, { Component } from 'react'

import {
  AccountSendContainer,
  AccountDetailPanel,
  AccountScanPanel,
  AccountHeaderText,
  AccountConfirmationItem,
  AccountSendErrorText,
  AccountSendPanel
} from '../components/account'
import WaitingForBlockchainSpinner from '../components/common/WaitingForBlockchainSpinner'
import {
  LargeButton,
  TextInput,
  Label,
  OrBorder,
  LargeBorderButton,
  NdauQRCodeScanner,
  BarBorder
} from '../components/common'
import FlashNotification from '../components/common/FlashNotification'
import AccountAPIHelper from '../helpers/AccountAPIHelper'
import { TransferTransaction } from '../transactions/TransferTransaction'
import { Transaction } from '../transactions/Transaction'
import DataFormatHelper from '../helpers/DataFormatHelper'
import AccountStore from '../stores/AccountStore'
import WalletStore from '../stores/WalletStore'
import { Text, TouchableOpacity } from 'react-native'

const _ = require('lodash')

class AccountSend extends Component {
  constructor (props) {
    super(props)
    this.state = {
      address: '',
      account: {},
      wallet: {},
      spinner: false,
      scanning: false,
      cameraType: 'back',
      requestingAmount: false,
      amount: 0,
      validAmount: false,
      validAddress: false,
      transactionFee: 0,
      sib: 0,
      total: 0
    }

    this.debounceRequestTransactionFee = _.debounce(
      this._requestTransactionFee,
      2000
    )
  }

  componentWillMount = async () => {
    const account = AccountStore.getAccount()
    const wallet = WalletStore.getWallet()

    this.setState({ account, wallet })
  }

  // TODO: we will be getting a better version of this that
  // TODO: we will have to get out of keyaddr (oneiro-ndev/ndaumath#71)
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
      sib: this.state.sib,
      total: this.state.total
    })
  }

  _haveAddress = () => {
    this.setState({ requestingAmount: true })
  }

  _haveAmount = async () => {
    this.setState({ requestingAmount: false })
  }

  _requestTransactionFee = () => {
    this.setState({ spinner: true }, async () => {
      let transactionFee = 0
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
            prevalidateData.fee_napu
          )
        }
      } catch (error) {
        FlashNotification.showError(
          `Error occurred while sending ndau: ${error.message}`
        )
      }

      this.setState({ spinner: false, transactionFee })
    })
  }

  _setAddress = async address => {
    const validAddress = this._validAddress(address)

    this.setState({ address, validAddress })
  }

  _setAmount = amount => {
    let { validAmount, transactionFee } = this.state

    const totalNdau = AccountAPIHelper.getTotalNdauForSend(
      amount,
      this.state.account.addressData,
      transactionFee
    )

    if (
      AccountAPIHelper.getTotalNdauForSend(
        amount,
        this.state.account.addressData,
        transactionFee,
        false
      ) > 0
    ) {
      validAmount = true
    } else {
      validAmount = false
    }

    this.setState(
      {
        amount,
        validAmount,
        total: totalNdau
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
            onSubmitEditing={this._next}
            error={!this.state.validAmount && this.state.amount}
          />
          {!this.state.validAmount && this.state.amount ? (
            <AccountSendErrorText>
              You do not have the much ndau to send.
            </AccountSendErrorText>
          ) : null}
          <AccountConfirmationItem
            title='Remaining balance:'
            value={
              AccountAPIHelper.accountNdauAmount(
                this.state.account.addressData,
                false
              ) - this.state.amount
            }
          />
          <AccountHeaderText>Fees</AccountHeaderText>
          <BarBorder />
          <AccountConfirmationItem
            title={'Transaction fee:'}
            value={this.state.transactionFee}
          />
          <BarBorder />
          <AccountConfirmationItem title={'SIB:'} value={this.state.sib} />
          <BarBorder />
          <AccountConfirmationItem
            largerText
            title={'Total'}
            value={this.state.total}
          />
        </AccountDetailPanel>
        <LargeButton
          sideMargins
          disabled={!this.state.validAmount}
          onPress={() => this._next()}
        >
          Next
        </LargeButton>
      </AccountSendContainer>
    )
  }

  _renderScanning () {
    return (
      <AccountSendContainer
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
      </AccountSendContainer>
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
            onSubmitEditing={this._haveAddress}
          />
          <OrBorder />
          <LargeBorderButton onPress={() => this._scan()}>
            Scan QR Code
          </LargeBorderButton>
        </AccountSendPanel>
        <LargeButton
          sideMargins
          disabled={!this.state.validAddress}
          onPress={() => this._haveAddress()}
        >
          Next
        </LargeButton>
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
