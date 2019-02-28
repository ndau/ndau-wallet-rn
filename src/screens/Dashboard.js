import React, { Component } from 'react'
import { ScrollView, Text, RefreshControl, AppState } from 'react-native'
import DateHelper from '../helpers/DateHelper'
import AccountAPIHelper from '../helpers/AccountAPIHelper'
import UserData from '../model/UserData'
import FlashNotification from '../components/FlashNotification'
import OrderAPI from '../api/OrderAPI'
import DataFormatHelper from '../helpers/DataFormatHelper'
import AsyncStorageHelper from '../model/AsyncStorageHelper'
import MultiSafeHelper from '../helpers/MultiSafeHelper'
import LoggingService from '../services/LoggingService'
import CollapsiblePanel from '../components/CollapsiblePanel'
import { AppContainer, NdauTotal, Label } from '../components/common'
import { DrawerHeader } from '../components/drawer'
import {
  DashboardContainer,
  DashboardLabel,
  DashboardPanel
} from '../components/dashboard'
import componentStyles from '../css/componentStyles'

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
    let user = this.props.navigation.getParam('user', null)
    if (!user) {
      const password = await AsyncStorageHelper.getApplicationPassword()
      user = await MultiSafeHelper.getDefaultUser(password)
    }

    let marketPrice = this.state.marketPrice
    try {
      await UserData.loadUserData(user)
      marketPrice = await OrderAPI.getMarketPrice()
    } catch (error) {
      FlashNotification.showError(error.message, false, false)
    }

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

    this.setState({ refreshing: false, user, marketPrice })
  }

  _showWalletOverview = wallet => {
    this.props.navigation.push('WalletOverview', {
      wallet,
      marketPrice: this.state.marketPrice
    })
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
              <CollapsiblePanel
                title={currentPrice}
                titleRight='* at current price'
              >
                <Text style={componentStyles.dashboardTextVerySmallWhite}>
                  * The estimated value of ndau in US dollars can be calculated
                  using the Target Price at which new ndau have most recently
                  been issued. The value shown here is calculated using that
                  method as of the issue price on {DateHelper.getTodaysDate()}.
                  The Axiom Foundation, creator and issuer of ndau, bears no
                  responsibility or liability for the calculation of that
                  estimated value, or for decisions based on that estimated
                  value.
                </Text>
              </CollapsiblePanel>
              <DashboardLabel>Your wallets</DashboardLabel>
              {wallets.map((wallet, index) => {
                return (
                  <DashboardPanel
                    key={index}
                    walletName={wallet.walletId}
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
