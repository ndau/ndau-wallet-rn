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
          <AccountLockOption />
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
