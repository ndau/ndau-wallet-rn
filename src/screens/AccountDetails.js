import React, { Component } from 'react'

import {
  AccountDetailsContainer,
  AccountTotalPanel,
  AccountDetailsPanel,
  AccountDetailsButtonPanel,
  AccountDetailsLargerText,
  AccountBorder,
  AccountParagraphText,
  AccountConfirmationItem
} from '../components/account'
import FlashNotification from '../components/common/FlashNotification'
import { LoadingSpinner, TextLink, LargeButton } from '../components/common'
import { View, ScrollView, Alert } from 'react-native'
import AccountAPIHelper from '../helpers/AccountAPIHelper'
import WalletStore from '../stores/WalletStore'
import AccountStore from '../stores/AccountStore'
import AppConstants from '../AppConstants'
import AppConfig from '../AppConfig'
import DateHelper from '../helpers/DateHelper'
import NdauNumber from '../helpers/NdauNumber'
import UserStore from '../stores/UserStore'
import KeyMaster from '../helpers/KeyMaster'
import { Transaction } from '../transactions/Transaction'
import { NotifyTransaction } from '../transactions/NotifyTransaction'
import UserData from '../model/UserData'

class AccountDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      account: {},
      wallet: {},
      accountsCanRxEAI: {},
      spinner: false
    }

    this.baseEAI = 0
    props.navigation.addListener('didBlur', FlashNotification.hideMessage)
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

  lock = (account, wallet) => {
    AccountStore.setAccount(account)
    WalletStore.setWallet(wallet)
    this.props.navigation.navigate('AccountLock', {
      nav: this.props.navigation,
      accountsCanRxEAI: this.state.accountsCanRxEAI,
      baseEAI: this.baseEAI
    })
  }

  _notify = async (account, wallet) => {
    Alert.alert(
      'Unlock countdown',
      'The unlock countdown will be started. The account will not be able to send or receive ndau until the countdown ends.',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => {
            this.setState({ spinner: true }, async () => {
              // First send out the Notify
              Object.assign(NotifyTransaction.prototype, Transaction)
              const notifyTransaction = new NotifyTransaction(wallet, account)
              await notifyTransaction.createSignPrevalidateSubmit()

              try {
                // Ok now we have to refresh data on this page
                // So get the user from the store and load
                const user = UserStore.getUser()

                await UserData.loadUserData(user)

                const theWallet = KeyMaster.getWalletFromUser(
                  user,
                  wallet.walletId
                )
                const theAccount = KeyMaster.getAccountFromWallet(
                  wallet,
                  account.address
                )
                WalletStore.setWallet(theWallet)
                AccountStore.setAccount(theAccount)

                this.setState({
                  spinner: false,
                  account: theAccount,
                  wallet: theWallet
                })
              } catch (error) {
                FlashNotification.showError(error.message)
                this.setState({
                  spinner: false
                })
              }
            })
          }
        }
      ],
      { cancelable: false }
    )
  }

  showHistory = account => {
    AccountStore.setAccount(account)
    this.props.navigation.navigate('AccountHistory')
  }

  send = (account, wallet) => {
    AccountStore.setAccount(account)
    WalletStore.setWallet(wallet)
    this.props.navigation.navigate('AccountSend')
  }

  receive = (account, wallet) => {
    AccountStore.setAccount(account)
    WalletStore.setWallet(wallet)
    this.props.navigation.navigate('AccountReceive')
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
    const isAccountLocked = AccountAPIHelper.isAccountLocked(
      account.addressData
    )
    const accountLockedUntil = AccountAPIHelper.accountLockedUntil(
      account.addressData
    )
    const weightedAverageAgeInDays = AccountAPIHelper.weightedAverageAgeInDays(
      account.addressData
    )
    const lockBonusEAI = AccountAPIHelper.lockBonusEAI(
      DateHelper.getDaysFromISODate(
        account.addressData.lock ? account.addressData.lock.noticePeriod : 0
      )
    )
    this.baseEAI = eaiValueForDisplay - lockBonusEAI
    let spendableNdau = 0
    if (!isAccountLocked) {
      spendableNdau = AccountAPIHelper.spendableNdau(
        account.addressData,
        true,
        AppConfig.NDAU_DETAIL_PRECISION
      )
    }
    const showAllAcctButtons = !isAccountLocked && spendableNdau > 0
    const spendableNdauDisplayed = new NdauNumber(spendableNdau).toDetail()
    return (
      <AccountDetailsContainer
        goBack={this.goBack}
        account={this.state.account}
        {...this.props}
      >
        <LoadingSpinner spinner={this.state.spinner} />
        <AccountTotalPanel
          account={this.state.account}
          onPress={() => this.showHistory(this.state.account)}
          {...this.props}
        />
        <AccountDetailsButtonPanel
          lock={this.lock}
          send={this.send}
          receive={this.receive}
          account={this.state.account}
          wallet={this.state.wallet}
          disableLock={!showAllAcctButtons}
          disableSend={!showAllAcctButtons}
        />
        <ScrollView>
          <AccountDetailsPanel firstPanel>
            <AccountDetailsLargerText>Account status</AccountDetailsLargerText>
            <AccountBorder />
            {isAccountLocked ? (
              <AccountParagraphText customIconName='lock'>
                Locked
              </AccountParagraphText>
            ) : (
              <AccountParagraphText customIconName='lock-open'>
                Unlocked
              </AccountParagraphText>
            )}
            {isAccountLocked ? (
              <View>
                {accountLockedUntil ? (
                  <AccountParagraphText customIconName='clock'>
                    Will unlock on {accountLockedUntil}
                  </AccountParagraphText>
                ) : null}
                <AccountParagraphText
                  customIconColor={AppConstants.WARNING_ICON_COLOR}
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
              {spendableNdauDisplayed}{' '}
              <TextLink url={AppConfig.SPENDABLE_KNOWLEDGEBASE_URL}>
                spendable
              </TextLink>
            </AccountParagraphText>
            {isAccountLocked && accountLockedUntil === null ? (
              <LargeButton
                onPress={() =>
                  this._notify(this.state.account, this.state.wallet)
                }
                scroll
                buttonStyle={{ marginTop: '3%' }}
              >
                Start countdown timer
              </LargeButton>
            ) : null}
          </AccountDetailsPanel>
          <AccountDetailsPanel secondPanel>
            <AccountDetailsLargerText>
              {eaiValueForDisplay}% annualized incentive (EAI)
            </AccountDetailsLargerText>
            <AccountBorder />
            <AccountConfirmationItem value={`${weightedAverageAgeInDays} days`}>
              Weighted average age (WAA):
            </AccountConfirmationItem>
            <AccountConfirmationItem value={`${this.baseEAI}%`}>
              Current{' '}
              <TextLink url={AppConfig.EAI_KNOWLEDGEBASE_URL}>EAI</TextLink>{' '}
              based on WAA:
            </AccountConfirmationItem>
            <AccountConfirmationItem value={`${lockBonusEAI}%`}>
              Lock bonus{' '}
              <TextLink url={AppConfig.EAI_KNOWLEDGEBASE_URL}>EAI</TextLink>:
            </AccountConfirmationItem>
            {sendingEAITo ? (
              <AccountConfirmationItem value={sendingEAITo}>
                <TextLink url={AppConfig.EAI_KNOWLEDGEBASE_URL}>EAI</TextLink>{' '}
                being sent to:
              </AccountConfirmationItem>
            ) : null}
          </AccountDetailsPanel>
        </ScrollView>
      </AccountDetailsContainer>
    )
  }
}

export default AccountDetails
