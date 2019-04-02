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
import WaitingForBlockchainSpinner from '../components/common/WaitingForBlockchainSpinner'

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

  handleLockSelection = index => {
    this.setState({ selectedIndex: index })
  }

  _selectAccountToSendEAI = () => {
    this.props.navigation.navigate('AccountLockType', {
      account: this.state.account,
      wallet: this.state.wallet,
      lockInformation: this.state.possibleLocks[this.state.selectedIndex],
      accountsCanRxEAI: this.state.accountsCanRxEAI
    })
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
          disabled={this.state.selectedIndex === null}
        >
          Continue
        </AccountLockButton>
      </AccountLockContainer>
    )
  }
}

export default AccountLock
