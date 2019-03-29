import React, { Component } from 'react'

import {
  AccountLockDetailsPanel,
  AccountLockContainer,
  AccountLockButton,
  AccountLockLargerText,
  AccountLockSmallerText,
  AccountLockSlider,
  AccountLockOption,
  AccountLockOptionHeader
} from '../components/account'
import AccountAPIHelper from '../helpers/AccountAPIHelper'
import AccountStore from '../stores/AccountStore'
import WalletStore from '../stores/WalletStore'
import AccountAPI from '../api/AccountAPI'
import DataFormatHelper from '../helpers/DataFormatHelper'
import AppConstants from '../AppConstants'

class AccountLock extends Component {
  constructor (props) {
    super(props)
    this.state = {
      account: {},
      wallet: {},
      sliderValue: 0.5,
      lockPercentage: 3,
      lockPeriod: 12,
      possibleLocks: [
        { base: 10, bonus: 1, lock: 3 },
        { base: 10, bonus: 2, lock: 6 },
        { base: 10, bonus: 3, lock: 12 }
      ],
      selectedIndex: null
    }
  }

  componentWillMount = async () => {
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

    console.log(`TESTING ${JSON.stringify(possibleLocks)}`)

    this.setState({ account, wallet, possibleLocks })
  }

  _showLockConfirmation = () => {
    this.props.navigation.navigate('AccountLockConfirmation', {
      account: this.state.account,
      wallet: this.state.wallet,
      lockPercentage: this.state.lockPercentage,
      lockPeriod: this.state.lockPeriod
    })
  }

  handleLockSelection = index => {
    this.setState({ selectedIndex: index })
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
          onPress={this._showLockConfirmation}
        >
          Continue
        </AccountLockButton>
      </AccountLockContainer>
    )
  }
}

export default AccountLock
