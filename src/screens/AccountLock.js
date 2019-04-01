import React, { Component } from 'react'

import {
  AccountLockDetailsPanel,
  AccountLockContainer,
  AccountLockButton,
  AccountLockLargerText,
  AccountLockOption,
  AccountLockOptionHeader
} from '../components/account'
import AccountAPIHelper from '../helpers/AccountAPIHelper'
import AccountStore from '../stores/AccountStore'
import WalletStore from '../stores/WalletStore'
import AccountAPI from '../api/AccountAPI'
import AppConstants from '../AppConstants'
import { RadioButton } from '../components/common'
import WaitingForBlockchainSpinner from '../components/common/WaitingForBlockchainSpinner'

const COMPOUND_TO_THIS_ACCOUNT = '1'
const COMPOUNT_TO_NEW_ACCOUNT = '2'
const CHOOSE_ON_NEXT_SCREEN = '3'

class AccountLock extends Component {
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
      accountNicknameForEAI: null
    }
  }

  componentWillMount = async () => {
    this.setState({ spinner: true }, async () => {
      const accountsCanRxEAI = this.props.navigation.getParam(
        'accountsCanRxEAI',
        null
      )
      const account = AccountStore.getAccount()
      const wallet = WalletStore.getWallet()

      const lockData = await AccountAPI.getLockRates(account)

      possibleLocks = lockData.map((data, index) => {
        const total = AccountAPIHelper.eaiValueForDisplay({
          eaiValueForDisplay: data.eairate
        })
        const bonus = index + 1
        const base = total - bonus
        return {
          bonus,
          total,
          base,
          lock: AppConstants.LOCK_ACCOUNT_POSSIBLE_TIMEFRAMES_IN_MONTHS[index]
        }
      })

      this.setState({
        spinner: false,
        account,
        wallet,
        possibleLocks,
        accountsCanRxEAI
      })
    })
  }

  _selectAccountToSendEAI = () => {
    this.setState({ whereToSendEAI: true })
  }

  _handleAccountSelection = () => {
    if (this.state.lockType === CHOOSE_ON_NEXT_SCREEN) {
      this.setState({ chooseAccounts: true })
    } else if (this.state.lockType === COMPOUNT_TO_NEW_ACCOUNT) {
      this._createNewAccount()
    }
  }

  _createNewAccount = async () => {
    this._showLockConfirmation()
  }

  _showLockConfirmation = () => {
    this.props.navigation.navigate('AccountLockConfirmation', {
      account: this.state.account,
      wallet: this.state.wallet,
      lockInformation: this.state.possibleLocks[this.state.selectedIndex],
      accountAddressForEAI: this.state.accountAddressForEAI,
      accountNicknameForEAI: this.state.accountNicknameForEAI
    })
  }

  handleLockSelection = index => {
    this.setState({ selectedIndex: index })
  }

  _renderGetAccount () {
    return (
      <AccountLockContainer
        title='Lock account'
        account={this.state.account}
        wallet={this.state.wallet}
        navigation={this.props.nav}
        {...this.props}
      >
        <AccountLockDetailsPanel account={this.state.account}>
          <AccountLockLargerText>
            Your available accounts:
          </AccountLockLargerText>
          <RadioButton
            options={Object.keys(this.state.accountsCanRxEAI)}
            values={Object.values(this.state.accountsCanRxEAI)}
            defaultSelected={Object.keys(this.state.accountsCanRxEAI)[0]}
            onChange={value => {
              let accountNicknameForEAI
              for (const key in this.state.accountsCanRxEAI) {
                if (this.state.accountsCanRxEAI[key] === value) {
                  accountNicknameForEAI = key
                  break
                }
              }
              this.setState({
                accountAddressForEAI: value,
                accountNicknameForEAI
              })
            }}
          />
        </AccountLockDetailsPanel>

        <AccountLockButton
          smallText={
            'Note: You will not be able to deposit into, spend, transfer, or otherwise access the principal inthis account while it is locked'
          }
          onPress={this._showLockConfirmation}
        >
          Continue
        </AccountLockButton>
      </AccountLockContainer>
    )
  }

  render () {
    if (this.state.whereToSendEAI) {
      return this.state.chooseAccounts
        ? this._renderGetAccount()
        : this._renderWhereToSendEAI()
    } else {
      return this._renderGetPeriod()
    }
  }

  _renderWhereToSendEAI () {
    return (
      <AccountLockContainer
        title='Lock account'
        account={this.state.account}
        wallet={this.state.wallet}
        navigation={this.props.nav}
        {...this.props}
      >
        <AccountLockDetailsPanel account={this.state.account}>
          <AccountLockLargerText>
            Where do you want to send the EAI from this account?
          </AccountLockLargerText>
          <RadioButton
            options={[
              `Compound to this account (${
                this.state.account.addressData.nickname
              })`,
              `Create new account`,
              `Choose account on the next screen`
            ]}
            values={[
              COMPOUND_TO_THIS_ACCOUNT,
              COMPOUNT_TO_NEW_ACCOUNT,
              CHOOSE_ON_NEXT_SCREEN
            ]}
            defaultSelected={COMPOUND_TO_THIS_ACCOUNT}
            onChange={value => {
              this.setState({ lockType: value })
            }}
          />
        </AccountLockDetailsPanel>

        <AccountLockButton
          smallText={
            'Note: You will not be able to deposit into, spend, transfer, or otherwise access the principal inthis account while it is locked'
          }
          onPress={this._handleAccountSelection}
        >
          Continue
        </AccountLockButton>
      </AccountLockContainer>
    )
  }

  _renderGetPeriod () {
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
            Locking your ndau accrues EAI at a higher rate.
          </AccountLockLargerText>
          <AccountLockLargerText>
            Please choose your bonus and hold period:
          </AccountLockLargerText>
          <AccountLockOptionHeader />
          {this.state.possibleLocks.map((possibleLock, index) => {
            return (
              <AccountLockOption
                key={index}
                base={possibleLock.base}
                bonus={possibleLock.bonus}
                lock={possibleLock.lock}
                total={possibleLock.total}
                onPress={() => this.handleLockSelection(index)}
                selected={index === this.state.selectedIndex}
              />
            )
          })}
        </AccountLockDetailsPanel>
        <AccountLockButton
          smallText={
            'Note: You will not be able to deposit into, spend, transfer, or otherwise access the principal inthis account while it is locked'
          }
          onPress={this._selectAccountToSendEAI}
        >
          Continue
        </AccountLockButton>
      </AccountLockContainer>
    )
  }
}

export default AccountLock
