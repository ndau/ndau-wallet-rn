import React, { Component } from 'react'
import { ScrollView, Text, RefreshControl, AppState } from 'react-native'
import AccountAPIHelper from '../helpers/AccountAPIHelper'
import UserData from '../model/UserData'
import FlashNotification from '../components/common/FlashNotification'
import OrderAPI from '../api/OrderAPI'
import DataFormatHelper from '../helpers/DataFormatHelper'
import AsyncStorageHelper from '../model/AsyncStorageHelper'
import MultiSafeHelper from '../helpers/MultiSafeHelper'
import LoggingService from '../services/LoggingService'
import { AppContainer, NdauTotal } from '../components/common'
import { DrawerHeader } from '../components/drawer'
import {
  DashboardContainer,
  DashboardLabel,
  DashboardPanel
} from '../components/dashboard'
import { DashboardTotalPanel } from '../components/account'
import UserStore from '../stores/UserStore'
import NdauStore from '../stores/NdauStore'
import WalletStore from '../stores/WalletStore'

class Dashboard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      user: {},
      refreshing: false,
      marketPrice: 0,
      spinner: false,
      appState: AppState.currentState
    }
  }

  componentWillUnmount () {
    AppState.removeEventListener('change', this._handleAppStateChange)
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

    const user = UserStore.getUser()
    const marketPrice = NdauStore.getMarketPrice()

    LoggingService.debug(`User to be drawn: ${JSON.stringify(user, null, 2)}`)

    this.setState({ user, marketPrice })

    const error = this.props.navigation.getParam('error', null)
    if (error) {
      FlashNotification.showError(error, false, true)
    }
  }

  stopSpinner = () => {
    this.setState({ spinner: false })
  }

  startSpinner = () => {
    this.setState({ spinner: true })
  }

  _onRefresh = async () => {
    FlashNotification.hideMessage()
    this.setState({ refreshing: true })

    const user = this.state.user
    let marketPrice = this.state.marketPrice
    try {
      await UserData.loadUserData(user)
      marketPrice = await OrderAPI.getMarketPrice()
    } catch (error) {
      FlashNotification.showError(error.message, false, false)
    }

    UserStore.setUser(user)
    NdauStore.setMarketPrice(marketPrice)

    this.setState({ refreshing: false, user, marketPrice })
  }

  _showWalletOverview = wallet => {
    WalletStore.setWallet(wallet)
    this.props.navigation.navigate('WalletOverview')
  }

  render = () => {
    try {
      const user = this.state.user
      if (!user.wallets) {
        return (
          <AppContainer>
            <DrawerHeader {...this.props}>Dashboard</DrawerHeader>
          </AppContainer>
        )
      }

      const wallets = Object.values(user.wallets)
      const accounts = DataFormatHelper.getObjectWithAllAccounts(user)

      const totalNdau = AccountAPIHelper.accountTotalNdauAmount(accounts)
      const totalNdauNumber = AccountAPIHelper.accountTotalNdauAmount(
        accounts,
        false
      )
      const currentPrice = AccountAPIHelper.currentPrice(
        this.state.marketPrice,
        totalNdauNumber
      )

      return (
        <AppContainer>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
          >
            <DrawerHeader {...this.props}>Dashboard</DrawerHeader>
            <NdauTotal>{totalNdau}</NdauTotal>
            <DashboardContainer>
              <DashboardTotalPanel
                title={currentPrice}
                titleRight='* at current price'
              />
              <DashboardLabel>Your wallets</DashboardLabel>
              {wallets.map((wallet, index) => {
                return (
                  <DashboardPanel
                    key={index}
                    walletName={wallet.walletName}
                    onPress={() => this._showWalletOverview(wallet)}
                  />
                )
              })}
            </DashboardContainer>
          </ScrollView>
        </AppContainer>
      )
    } catch (error) {
      LoggingService.debug(error)
      FlashNotification.showError(error.message, false)
    }

    return (
      <AppContainer>
        <DrawerHeader {...this.props}>Dashboard</DrawerHeader>
      </AppContainer>
    )
  }
}

export default Dashboard
