import React, { Component } from 'react'

import {
  AccountLockDetailsPanel,
  AccountLockContainer,
  AccountLockButton,
  AccountLockLargerText,
  AccountLockSmallerText,
  AccountLockSlider
} from '../components/account'
import AccountAPIHelper from '../helpers/AccountAPIHelper'
import { Dropdown } from '../components/common'
import AccountStore from '../stores/AccountStore'
import WalletStore from '../stores/WalletStore'

class AccountLock extends Component {
  constructor (props) {
    super(props)
    this.state = {
      account: {},
      wallet: {},
      sliderValue: 0.5,
      lockPercentage: 3,
      lockPeriod: 12,
      allAccountNicknames: {}
    }
  }

  componentWillMount = () => {
    const account = AccountStore.getAccount()
    const wallet = WalletStore.getWallet()
    const allAccountNicknames = this.props.navigation.getParam(
      'allAccountNicknames',
      null
    )

    this.setState({ account, wallet, allAccountNicknames })
  }

  _showLockConfirmation = () => {
    this.props.navigation.navigate('AccountLockConfirmation', {
      account: this.state.account,
      wallet: this.state.wallet,
      lockPercentage: this.state.lockPercentage,
      lockPeriod: this.state.lockPeriod
    })
  }

  handleSliderChange = sliderValue => {
    let lockPeriod = 3
    if (sliderValue.toFixed(1) == 0.0) {
      lockPercentage = 1
      lockPeriod = 3
    } else if (sliderValue.toFixed(2) == 0.25) {
      lockPercentage = 2
      lockPeriod = 5
    } else if (sliderValue.toFixed(1) == 0.5) {
      lockPercentage = 3
      lockPeriod = 12
    } else if (sliderValue.toFixed(2) == 0.75) {
      lockPercentage = 4
      lockPeriod = 24
    } else if (sliderValue.toFixed(1) == 1.0) {
      lockPercentage = 5
      lockPeriod = 36
    }
    this.setState({ sliderValue, lockPercentage, lockPeriod })
  }

  render () {
    return (
      <AccountLockContainer
        title='Lock account step 1'
        account={this.state.account}
        wallet={this.state.wallet}
        navigation={this.props.nav}
        {...this.props}
      >
        <AccountLockDetailsPanel account={this.state.account}>
          <AccountLockLargerText>
            Locking your ndau with a withdrawal countdown period accrues bonus
            EAI.
          </AccountLockLargerText>
          <AccountLockLargerText>
            Lock the{' '}
            {AccountAPIHelper.accountNdauAmount(this.state.account.addressData)}{' '}
            ndau in{' '}
            {AccountAPIHelper.accountNickname(this.state.account.addressData)}{' '}
            for a bonus incentive of:
          </AccountLockLargerText>
          <AccountLockSmallerText>
            {this.state.lockPercentage}% ({this.state.lockPeriod} months to
            unlock)
          </AccountLockSmallerText>
          <AccountLockSlider
            value={this.state.sliderValue}
            onValueChange={this.handleSliderChange}
          />
          <AccountLockLargerText>
            Where do you want to send the incentive (EAI) from this lock?
          </AccountLockLargerText>
          <Dropdown
            selectedValue={this.state.language}
            onValueChange={itemValue => this.setState({ language: itemValue })}
            items={this.state.allAccountNicknames}
            nickname={this.state.account.addressData.nickname}
          />
        </AccountLockDetailsPanel>
        <AccountLockButton
          smallText='Note: You will not be able to spend, transfer or otherwise access the
          principal in this account while it is locked'
          onPress={this._showLockConfirmation}
        >
          Continue
        </AccountLockButton>
      </AccountLockContainer>
    )
  }
}

export default AccountLock
