import React, { Component } from 'react'

import {
  AccountLockDetailsPanel,
  AccountLockContainer,
  AccountLockButton,
  AccountLockLargerText
} from '../components/account'
import AccountStore from '../stores/AccountStore'
import WalletStore from '../stores/WalletStore'
import { RadioButton } from '../components/common'
import { ScrollView } from 'react-native'

class AccountLockChooseAccount extends Component {
  constructor (props) {
    super(props)
    this.state = {
      account: {},
      wallet: {},
      lockInformation: null,
      accountsCanRxEAI: {},
      accountAddressForEAI: null,
      accountNicknameForEAI: null
    }
  }

  componentWillMount = async () => {
    const accountsCanRxEAI = this.props.navigation.getParam(
      'accountsCanRxEAI',
      null
    )
    const account = AccountStore.getAccount()
    const wallet = WalletStore.getWallet()
    const lockInformation = this.props.navigation.getParam(
      'lockInformation',
      null
    )

    this.setState({
      account,
      wallet,
      accountsCanRxEAI,
      accountAddressForEAI: Object.values(this.state.accountsCanRxEAI)[0],
      accountNicknameForEAI: Object.keys(this.state.accountsCanRxEAI)[0],
      lockInformation
    })
  }

  _showLockConfirmation = () => {
    this.props.navigation.navigate('AccountLockConfirmation', {
      account: this.state.account,
      wallet: this.state.wallet,
      lockInformation: this.state.lockInformation,
      accountAddressForEAI: this.state.accountAddressForEAI,
      accountNicknameForEAI: this.state.accountNicknameForEAI
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
          <ScrollView>
            <AccountLockLargerText>
              Your available accounts:
            </AccountLockLargerText>
            <RadioButton
              options={Object.keys(this.state.accountsCanRxEAI)}
              values={Object.values(this.state.accountsCanRxEAI)}
              defaultSelected={Object.values(this.state.accountsCanRxEAI)[0]}
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
          </ScrollView>
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

export default AccountLockChooseAccount
