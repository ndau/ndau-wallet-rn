import React, { Component } from 'react'

import {
  AccountDetailsContainer,
  AccountTotalPanel,
  AccountDetailsPanel,
  AccountDetailsButtonPanel,
  AccountDetailsLargerText,
  AccountBorder,
  AccountParagraphText,
  AddressSharePanel,
  AccountConfirmationItem
} from '../components/account'
import { View } from 'react-native'
import AccountAPIHelper from '../helpers/AccountAPIHelper'
import WalletStore from '../stores/WalletStore'
import AccountStore from '../stores/AccountStore'

class AccountDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      account: {},
      wallet: {},
      accountsCanRxEAI: {}
    }
  }

  componentWillMount = () => {
    const account = AccountStore.getAccount()
    const wallet = WalletStore.getWallet()
    const accountsCanRxEAI = this.props.navigation.getParam(
      'accountsCanRxEAI',
      null
    )

    this.setState({ account, wallet, accountsCanRxEAI })
  }

  showLock = (account, wallet) => {
    AccountStore.setAccount(account)
    WalletStore.setWallet(wallet)
    this.props.navigation.push('AccountLock', {
      nav: this.props.navigation,
      accountsCanRxEAI: this.state.accountsCanRxEAI
    })
  }

  showHistory = account => {
    AccountStore.setAccount(account)
    this.props.navigation.navigate('AccountHistory')
  }

  send = (account, wallet) => {
    AccountStore.setAccount(account)
    WalletStore.setWallet(wallet)
    this.props.navigation.push('AccountSend')
  }

  receive = (account, wallet) => {
    AccountStore.setAccount(account)
    WalletStore.setWallet(wallet)
    this.props.navigation.push('AccountReceive')
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  render () {
    const { account } = this.state
    const eaiValueForDisplay = AccountAPIHelper.eaiValueForDisplay(
      account.addressData
    )
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
    const weightedAverageAgeInDays = AccountAPIHelper.weightedAverageAgeInDays(
      account.addressData
    )
    const lockBonusEAI = AccountAPIHelper.lockBonusEAI(weightedAverageAgeInDays)
    const baseEAI = eaiValueForDisplay - lockBonusEAI
    let spendableNdau = 0
    if (accountNotLocked) {
      spendableNdau = AccountAPIHelper.spendableNdau(account.addressData)
    }

    return (
      <AccountDetailsContainer
        goBack={this.goBack}
        account={this.state.account}
        {...this.props}
      >
        <AccountTotalPanel
          account={this.state.account}
          onPress={() => this.showHistory(this.state.account)}
          {...this.props}
        />
        {!accountLockedUntil ? (
          <AccountDetailsButtonPanel
            showLock={this.showLock}
            send={this.send}
            receive={this.receive}
            account={this.state.account}
            wallet={this.state.wallet}
          />
        ) : null}
        <AccountDetailsPanel firstPanel>
          <AccountDetailsLargerText>Account status</AccountDetailsLargerText>
          <AccountBorder />
          {accountLockedUntil ? (
            <AccountParagraphText customIconName='lock'>
              Locked
            </AccountParagraphText>
          ) : (
            <AccountParagraphText customIconName='lock-open'>
              Unlocked
            </AccountParagraphText>
          )}
          {accountLockedUntil ? (
            <View>
              <AccountParagraphText customIconName='clock'>
                Will unlock on {accountLockedUntil}
              </AccountParagraphText>
              <AccountParagraphText
                customIconColor='#F05123'
                customIconName='exclamation-circle'
              >
                You cannot send or receive
              </AccountParagraphText>
            </View>
          ) : null}
          {receivingEAIFrom ? (
            <AccountParagraphText
              customIconColor='#8CC74F'
              customIconName='arrow-alt-down'
            >
              Receiving incentive from {receivingEAIFrom}
            </AccountParagraphText>
          ) : null}
          <AccountParagraphText customIconName='usd-circle'>
            {spendableNdau} spendable
          </AccountParagraphText>
        </AccountDetailsPanel>
        <AccountDetailsPanel>
          <AccountDetailsLargerText>
            {eaiValueForDisplay}% annualized incentive (EAI)
          </AccountDetailsLargerText>
          <AccountBorder />
          <AccountConfirmationItem
            title={'Weighted average age (WAA):'}
            value={`${weightedAverageAgeInDays} days`}
          />
          <AccountConfirmationItem
            title={'Current EAI based on WAA:'}
            value={`${baseEAI}%`}
          />
          <AccountConfirmationItem
            title={'Lock bonus EAI:'}
            value={`${lockBonusEAI}%`}
          />
          {sendingEAITo ? (
            <AccountConfirmationItem
              title={'EAI being sent to:'}
              value={sendingEAITo}
            />
          ) : null}
        </AccountDetailsPanel>
        <AccountDetailsPanel>
          <AccountDetailsLargerText>Address</AccountDetailsLargerText>
          <AccountBorder />
          <AddressSharePanel
            transparent
            scroll
            noPadding
            address={this.state.account.address}
          />
        </AccountDetailsPanel>
      </AccountDetailsContainer>
    )
  }
}

export default AccountDetails
