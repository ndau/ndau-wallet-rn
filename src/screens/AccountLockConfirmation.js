import React, { Component } from 'react'
import {
  AccountLockContainer,
  AccountLockDetailsPanel,
  AccountMediumButtons
} from '../components/account'
import AccountAPIHelper from '../helpers/AccountAPIHelper'
import { View } from 'react-native'
import { H4 } from 'nachos-ui'
import componentStyles from '../css/componentStyles'
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro'
import { LockTransaction } from '../transactions/LockTransaction'
import { Transaction } from '../transactions/Transaction'

class AccountLockConfirmation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      account: {},
      wallet: {}
    }
  }

  componentWillMount = () => {
    const account = this.props.navigation.getParam('account', null)
    const wallet = this.props.navigation.getParam('wallet', null)
    const lockPercentage = this.props.navigation.getParam(
      'lockPercentage',
      null
    )
    const lockPeriod = this.props.navigation.getParam('lockPeriod', null)

    this.setState({ account, wallet, lockPercentage, lockPeriod })
  }

  _showLockConfirmation = async () => {
    Object.assign(LockTransaction.prototype, Transaction)
    const lockTransaction = new LockTransaction(
      this.state.wallet,
      this.state.account,
      `${this.state.lockPeriod}m`
    )
    // await lockTransaction.createSignPrevalidateSubmit()

    this.props.navigation.navigate('WalletOverview', {
      wallet: this.state.wallet
    })
  }

  _goBack = () => {
    this.props.navigation.goBack()
  }

  render () {
    const { account } = this.state
    const eaiPercentage = AccountAPIHelper.eaiPercentage(account.addressData)
    const sendingEAITo = AccountAPIHelper.sendingEAITo(account.addressData)
    const receivingEAIFrom = AccountAPIHelper.receivingEAIFrom(
      account.addressData
    )
    const accountLockedUntil = AccountAPIHelper.accountLockedUntil(
      account.addressData
    )
    const accountNoticePeriod = AccountAPIHelper.accountNoticePeriod(
      account.addressData
    )
    const accountNotLocked = AccountAPIHelper.accountNotLocked(
      account.addressData
    )
    return (
      <AccountLockContainer
        title='Lock account step 2'
        account={this.state.account}
        {...this.props}
      >
        <AccountLockDetailsPanel
          eaiPercentage={eaiPercentage}
          sendingEAITo={sendingEAITo}
          receivingEAIFrom={receivingEAIFrom}
          accountLockedUntil={accountLockedUntil}
          accountNoticePeriod={accountNoticePeriod}
          accountNotLocked={accountNotLocked}
        >
          <View style={componentStyles.lockAccountDetailsTextPanel}>
            <H4 style={componentStyles.accountDetailsLargerText}>
              Confirmation
            </H4>
          </View>
          <View style={componentStyles.accountDetailsPanelBorder} />
          <View
            style={componentStyles.lockAccountDetailsTextPanelWithSmallText}
          >
            <View style={componentStyles.lockAccountCheckmark}>
              <FontAwesome5Pro size={18} name='check' color='#85BE4D' light />
            </View>
            <View>
              <H4 style={componentStyles.accountDetailsSmallerText}>
                Lock {this.state.account.addressData.nickname}
              </H4>
            </View>
          </View>
          <View
            style={componentStyles.lockAccountDetailsTextPanelWithSmallText}
          >
            <View style={componentStyles.lockAccountCheckmark}>
              <FontAwesome5Pro size={18} name='check' color='#85BE4D' light />
            </View>
            <View>
              <H4 style={componentStyles.accountDetailsSmallerText}>
                Earn {this.state.lockPercentage}% EAI Incentive
              </H4>
            </View>
          </View>
          <View
            style={componentStyles.lockAccountDetailsTextPanelWithSmallText}
          >
            <View style={componentStyles.lockAccountCheckmark}>
              <FontAwesome5Pro size={18} name='check' color='#85BE4D' light />
            </View>
            <View>
              <H4 style={componentStyles.accountDetailsSmallerText}>
                Account will unlock in {this.state.lockPeriod} months
              </H4>
            </View>
          </View>
        </AccountLockDetailsPanel>
        <AccountMediumButtons
          onPressSecondary={() => this._goBack()}
          onPressPrimary={() => this._showLockConfirmation()}
          primary='Lock'
          secondary='Back'
        />
      </AccountLockContainer>
    )
  }
}

export default AccountLockConfirmation
