import React, { Component } from 'react'
import { ScrollView, View, RefreshControl, AppState } from 'react-native'
import AccountAPIHelper from '../helpers/AccountAPIHelper'
import KeyMaster from '../helpers/KeyMaster'
import MultiSafeHelper from '../helpers/MultiSafeHelper'
import FlashNotification from '../components/common/FlashNotification'
import LoggingService from '../services/LoggingService'
import { AppContainer, NdauTotal } from '../components/common'
import { AccountPanel } from '../components/account'
import {
  DashboardContainer,
  DashboardLabelWithIcon
} from '../components/dashboard'
import { DrawerHeaderForOverview, DrawerHeader } from '../components/drawer'
import {
  DashboardTotalPanel,
  WalletOverviewHeaderActions
} from '../components/account'
import UserData from '../model/UserData'
import OrderAPI from '../api/OrderAPI'
import UserStore from '../stores/UserStore'
import NewAccountModalDialog from '../components/common/NewAccountModalDialog'
import WalletStore from '../stores/WalletStore'
import AccountStore from '../stores/AccountStore'
import NdauStore from '../stores/NdauStore'

class WalletOverview extends Component {
  constructor (props) {
    super(props)

    this.state = {
      number: 1,
      activeAddress: null,
      wallet: {},
      refreshing: false,
      marketPrice: 0,
      spinner: false,
      appState: AppState.currentState
    }

    this.isTestNet = false
    this.accountsCanRxEAI = []
  }

  _handleAppStateChange = async nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      this._onRefresh()
    }
    this.setState({ appState: nextAppState })
  }

  componentWillMount = async () => {
    AppState.addEventListener('change', this._handleAppStateChange)

    const wallet = WalletStore.getWallet()
    const marketPrice = NdauStore.getMarketPrice()

    this.setState({ wallet, marketPrice })

    const error = this.props.navigation.getParam('error', null)
    if (error) {
      FlashNotification.showError(error)
    }
  }

  subtractNumber = () => {
    if (this.state.number > 1) {
      this.setState({ number: (this.state.number -= 1) })
    }
  }

  addNumber = () => {
    this.setState({ number: (this.state.number += 1) })
  }

  stopSpinner = () => {
    this.setState({ spinner: false })
  }

  startSpinner = () => {
    this.setState({ spinner: true })
  }

  buy = () => {
    // TODO: if no code exists we have to verify identity
    this.props.navigation.navigate('IdentityVerificationIntro')
    // TODO: otherwise we can continue in the purchase of ndau
  }

  launchAddNewAccountDialog = () => {
    this._newAccountModal.showModal()
  }

  addNewAccount = async () => {
    try {
      const password = await UserStore.getPassword()
      const user = await MultiSafeHelper.getDefaultUser(password)
      const wallet = await KeyMaster.createNewAccount(
        this.state.wallet,
        this.state.number
      )

      KeyMaster.setWalletInUser(user, wallet)

      await MultiSafeHelper.saveUser(user, password)

      this.setState({ wallet })
    } catch (error) {
      FlashNotification.showError(
        `Problem adding new account: ${error.message}`
      )
    }
  }

  _onRefresh = async () => {
    FlashNotification.hideMessage()
    this.setState({ refreshing: true })
    const password = await UserStore.getPassword()
    const user = await MultiSafeHelper.getDefaultUser(password)

    let wallet = this.state.wallet
    let marketPrice = this.state.marketPrice
    try {
      await UserData.loadUserData(user)

      wallet = KeyMaster.getWalletFromUser(user, this.state.wallet.walletId)
      marketPrice = await OrderAPI.getMarketPrice()
    } catch (error) {
      FlashNotification.showError(error.message)
    }

    WalletStore.setWallet(wallet)
    NdauStore.setMarketPrice(marketPrice)

    this.setState({ refreshing: false, marketPrice, wallet })
  }

  _showAccountDetails = (account, wallet) => {
    AccountStore.setAccount(account)
    WalletStore.setWallet(wallet)
    this.props.navigation.push('AccountDetails', {
      accountsCanRxEAI: this.accountsCanRxEAI
    })
  }

  render = () => {
    try {
      let { wallet } = this.state
      if (!wallet) {
        wallet = WalletStore.getWallet()
      }
      const totalNdau = wallet
        ? AccountAPIHelper.accountTotalNdauAmount(wallet.accounts)
        : 0
      const totalSpendable = wallet
        ? AccountAPIHelper.totalSpendableNdau(wallet.accounts, totalNdau)
        : 0
      const currentPrice = AccountAPIHelper.currentPrice(
        this.state.marketPrice,
        totalNdau
      )
      this.accountsCanRxEAI = {}

      return (
        <AppContainer>
          <NewAccountModalDialog
            number={this.state.number}
            subtractNumber={this.subtractNumber}
            addNumber={this.addNumber}
            addNewAccount={this.addNewAccount}
            ref={component => (this._newAccountModal = component)}
          />

          <DrawerHeaderForOverview {...this.props}>
            {this.state.wallet ? this.state.wallet.walletName : ''}
          </DrawerHeaderForOverview>
          <NdauTotal>{totalNdau}</NdauTotal>
          <WalletOverviewHeaderActions>
            <DashboardLabelWithIcon
              greenFont
              style={{ justifyContent: 'flex-start' }}
            >
              {totalSpendable} spendable
            </DashboardLabelWithIcon>
            <DashboardLabelWithIcon
              onPress={() => this.launchAddNewAccountDialog()}
              fontAwesomeIconName='plus-circle'
              style={{ justifyContent: 'flex-end' }}
            >
              Add account
            </DashboardLabelWithIcon>
          </WalletOverviewHeaderActions>
          <DashboardContainer>
            <DashboardTotalPanel
              title={currentPrice}
              titleRight='* at current price'
            />

            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh}
                />
              }
            >
              <View>
                {wallet
                  ? Object.keys(wallet.accounts)
                    .sort((a, b) => {
                      if (
                        !wallet.accounts[a].addressData.nickname ||
                          !wallet.accounts[b].addressData.nickname
                      ) {
                        return 0
                      }

                      const accountNumberA = parseInt(
                        wallet.accounts[a].addressData.nickname.split(' ')[1]
                      )
                      const accountNumberB = parseInt(
                        wallet.accounts[b].addressData.nickname.split(' ')[1]
                      )
                      if (accountNumberA < accountNumberB) {
                        return -1
                      } else if (accountNumberA > accountNumberB) {
                        return 1
                      }
                      return 0
                    })
                    .map((accountKey, index) => {
                      const accountNotLocked = AccountAPIHelper.accountNotLocked(
                        wallet.accounts[accountKey].addressData
                      )
                      const accountLockedUntil = AccountAPIHelper.accountLockedUntil(
                        wallet.accounts[accountKey].addressData
                      )
                      const accountNoticePeriod = AccountAPIHelper.accountNoticePeriod(
                        wallet.accounts[accountKey].addressData
                      )
                      if (!wallet.accounts[accountKey].addressData.lock) {
                        const address = wallet.accounts[accountKey].address
                        const nickname =
                            wallet.accounts[accountKey].addressData.nickname
                        Object.assign(this.accountsCanRxEAI, {
                          [nickname]: address
                        })
                      }
                      return (
                        <AccountPanel
                          key={index}
                          onPress={() =>
                            this._showAccountDetails(
                              wallet.accounts[accountKey],
                              wallet
                            )
                          }
                          account={wallet.accounts[accountKey]}
                          icon={
                            accountLockedUntil || accountNoticePeriod
                              ? 'lock'
                              : 'lock-open'
                          }
                          accountLockedUntil={accountLockedUntil}
                          accountNoticePeriod={accountNoticePeriod}
                          {...this.props}
                        />
                      )
                    })
                  : null}
              </View>
            </ScrollView>
          </DashboardContainer>
        </AppContainer>
      )
    } catch (error) {
      LoggingService.debug(error)
      FlashNotification.showError(error.message)
    }

    return (
      <AppContainer>
        <DrawerHeader {...this.props}>Dashboard</DrawerHeader>
      </AppContainer>
    )
  }
}

export default WalletOverview
