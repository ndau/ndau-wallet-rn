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
import AppConfig from '../AppConfig'

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
      amount: '',
      canProceedFromAmount: false,
      validAddress: false,
      transactionFee: 0,
      sibFee: 0,
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
      sibFee: this.state.sibFee,
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
      let sibFee = 0
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
            prevalidateData.fee_napu
          )
        }
        if (prevalidateData.sib_napu) {
          sibFee = DataFormatHelper.getNdauFromNapu(prevalidateData.sib_napu)
        }

        total = AccountAPIHelper.getTotalNdauForSend(
          this.state.amount,
          transactionFee,
          sibFee
        )
        canProceedFromAmount = true
      } catch (error) {
        canProceedFromAmount = false
        FlashNotification.showError(
          `Error occurred while sending ndau: ${error.message}`
        )
      }

      this.setState({
        spinner: false,
        transactionFee,
        sibFee,
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
    // If the amount passed in is not a number then we do not
    // have to do any math here
    if (isNaN(amount)) return

    const totalNdau = this._getTotalNdau(amount)

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
    let { transactionFee, sibFee } = this.state
    const totalNdau = AccountAPIHelper.getTotalNdauForSend(
      amount,
      transactionFee,
      sibFee
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
          <AccountConfirmationItem
            title='Remaining balance:'
            value={remainingBalance}
          />
          <AccountHeaderText>Fees</AccountHeaderText>
          <BarBorder />
          <AccountConfirmationItem
            title={'Transaction fee:'}
            value={this.state.transactionFee}
          />
          <BarBorder />
          <AccountConfirmationItem title={'SIB:'} value={this.state.sibFee} />
          <BarBorder />
          <AccountConfirmationItem
            largerText
            title={'Total'}
            value={this.state.total}
          />
        </AccountDetailPanel>
        <LargeButton
          sideMargins
          disabled={!this.state.canProceedFromAmount}
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
