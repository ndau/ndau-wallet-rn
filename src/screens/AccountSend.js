import React, { Component } from 'react'

import {
  AccountSendContainer,
  AccountDetailPanel,
  AccountHeaderText
} from '../components/account'
import WaitingForBlockchainSpinner from '../components/common/WaitingForBlockchainSpinner'
import {
  LargeButton,
  TextInput,
  Label,
  OrBorder,
  LargeBorderButton,
  QRCodeScanner
} from '../components/common'
import FlashNotification from '../components/common/FlashNotification'
import AccountAPIHelper from '../helpers/AccountAPIHelper'
import { TransferTransaction } from '../transactions/TransferTransaction'
import { Transaction } from '../transactions/Transaction'
import DataFormatHelper from '../helpers/DataFormatHelper'

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
      validAmount: false,
      validAddress: false,
      transactionFee: 0
    }
  }

  componentWillMount = async () => {
    this.setState({ spinner: true }, async () => {
      const account = this.props.navigation.getParam('account', null)
      const wallet = this.props.navigation.getParam('wallet', null)

      this.setState({ account, wallet, spinner: false })
    })
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
      account: this.state.account,
      wallet: this.state.wallet,
      address: this.state.address,
      amount: this.state.amount,
      transactionFee: this.state.transactionFee
    })
  }

  _haveAddress = () => {
    if (this.state.address.substr(0, 2) === 'nd') {
      this.setState({ spinner: true }, async () => {
        let transactionFee = 0
        try {
          Object.assign(TransferTransaction.prototype, Transaction)
          const transferTransaction = new TransferTransaction(
            this.state.wallet,
            this.state.account,
            this.state.address,
            !this.state.amount ? 0 : this.state.amount
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
            `Error occured while sending ndau: ${error.message}`
          )
        }

        this.setState({ spinner: false, transactionFee })
      })
    }
    this.setState({ requestingAmount: true })
  }

  _haveAmount = () => {
    this.setState({ requestingAmount: false })
  }

  _setAddress = async address => {
    const validAddress = this._validAddress(this.state.address)

    this.setState({ address, validAddress })
  }

  _setAmount = amount => {
    let { validAmount, transactionFee } = this.state
    const totalNdauForAccount = parseFloat(
      AccountAPIHelper.accountNdauAmount(this.state.account.addressData)
    )
    const amountFloat = parseFloat(amount)
    const transactionFeeFloat = parseFloat(transactionFee)
    const balance = totalNdauForAccount - amountFloat - transactionFeeFloat
    if (balance > 0) {
      validAmount = true
    } else {
      validAmount = false
    }
    this.setState({
      amount,
      validAmount
    })
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
      this.setState({ address: event.data })
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
          <Label>ndau amount</Label>
          <TextInput
            onChangeText={this._setAmount}
            value={this.state.amount}
            name='amount'
            placeholder='Enter amount...'
            autoCapitalize='none'
          />
        </AccountDetailPanel>
        <LargeButton
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
        <AccountDetailPanel>
          <QRCodeScanner
            onRead={e => this._scannedSuccessfully(e)}
            cameraType={this.state.cameraType}
          />
        </AccountDetailPanel>
        <LargeButton onPress={() => this._flipCamera()}>
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
        <AccountDetailPanel>
          <AccountHeaderText>Who are you sending to?</AccountHeaderText>
          <Label>Address</Label>
          <TextInput
            onChangeText={this._setAddress}
            value={this.state.address}
            name='address'
            placeholder='ndau address...'
            autoCapitalize='none'
          />
          <OrBorder />
          <LargeBorderButton onPress={this._scan}>
            Scan QR Code
          </LargeBorderButton>
        </AccountDetailPanel>
        <LargeButton
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
