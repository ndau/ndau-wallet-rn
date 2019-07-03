import React, { Component } from 'react'
import { ScrollView, RefreshControl, AppState, Text } from 'react-native'
import AccountAPIHelper from '../helpers/AccountAPIHelper'
import UserData from '../model/UserData'
import DataFormatHelper from '../helpers/DataFormatHelper'
import LogStore from '../stores/LogStore'
import FlashNotification from '../components/common/FlashNotification'
import { AppContainer, NdauTotal, TextLink } from '../components/common'
import { DrawerHeader } from '../components/drawer'
import {
  DashboardContainer,
  DashboardLabel,
  DashboardPanel,
  DashboardLabelWithIcon
} from '../components/dashboard'
import { DashboardTotalPanel } from '../components/account'
import UserStore from '../stores/UserStore'
import NdauStore from '../stores/NdauStore'
import WalletStore from '../stores/WalletStore'
import NdauNumber from '../helpers/NdauNumber'
import AppConfig from '../AppConfig'

class Dashboard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      user: {},
      refreshing: false,
      currentPrice: 0,
      totalNdau: 0,
      totalSpendableNdau: 0,
      spinner: false,
      appState: AppState.currentState
    }
    props.navigation.addListener('didBlur', FlashNotification.hideMessage)
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

    LogStore.log(`User to be drawn: ${JSON.stringify(user)}`)

    if (Object.keys(user.wallets).length <= 1) {
      WalletStore.setWallet(user.wallets[Object.keys(user.wallets)[0]])
      this.props.navigation.navigate('WalletOverview')
      return (
        <AppContainer>
          <DrawerHeader {...this.props}>Dashboard</DrawerHeader>
        </AppContainer>
      )
    }

    this._loadMetricsAndSetState(user)

    const error = this.props.navigation.getParam('error', null)
    if (error) {
      FlashNotification.showError(error)
    }
  }

  stopSpinner = () => {
    this.setState({ spinner: false })
  }

  startSpinner = () => {
    this.setState({ spinner: true })
  }

  _loadMetricsAndSetState = user => {
    const accounts = DataFormatHelper.getObjectWithAllAccounts(user)
    const totalNdau = new NdauNumber(
      AccountAPIHelper.accountTotalNdauAmount(accounts)
    ).toDetail()
    const totalNdauNumber = AccountAPIHelper.accountTotalNdauAmount(
      accounts,
      false
    )
    const totalSpendableNdau = new NdauNumber(
      AccountAPIHelper.totalSpendableNdau(accounts, totalNdauNumber)
    ).toSummary()
    const currentPrice = AccountAPIHelper.currentPrice(
      NdauStore.getMarketPrice(),
      totalNdauNumber
    )

    this.setState({
      refreshing: false,
      user,
      currentPrice,
      totalNdau,
      totalSpendableNdau
    })
  }

  _onRefresh = async () => {
    if (this.state.refreshing) return

    FlashNotification.hideMessage()
    this.setState({ refreshing: true }, async () => {
      const user = this.state.user
      try {
        await UserData.loadUserData(user)
      } catch (error) {
        FlashNotification.showError(error.message)
      }

      this._loadMetricsAndSetState(user)
    })
  }

  _showWalletOverview = wallet => {
    WalletStore.setWallet(wallet)
    this.props.navigation.navigate('WalletOverview')
  }

  render = () => {
    try {
      const user = UserStore.getUser()
      const { totalNdau, totalSpendableNdau, currentPrice } = this.state
      const wallets = Object.values(user.wallets)

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
            <DashboardLabelWithIcon greenFont style={{ textAlign: 'center' }}>
              <Text>{totalSpendableNdau} </Text>
              <TextLink url={AppConfig.SPENDABLE_KNOWLEDGEBASE_URL}>
                spendable
              </TextLink>
            </DashboardLabelWithIcon>
            <DashboardContainer>
              <DashboardTotalPanel
                title={currentPrice}
                titleRight='* at current price'
              />
              <DashboardLabel>Your wallets</DashboardLabel>
              {wallets.map((wallet, index) => {
                const walletName = DataFormatHelper.getWalletName(wallet)
                return (
                  <DashboardPanel
                    key={index}
                    walletName={DataFormatHelper.truncateString(walletName)}
                    onPress={() => this._showWalletOverview(wallet)}
                  />
                )
              })}
            </DashboardContainer>
          </ScrollView>
        </AppContainer>
      )
    } catch (error) {
      LogStore.log(error)
      FlashNotification.showError(error.message)
    }

    return (
      <AppContainer>
        <DrawerHeader {...this.props}>Dashboard</DrawerHeader>
      </AppContainer>
    )
  }
}

export default Dashboard
