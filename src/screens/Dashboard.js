/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import React, { Component } from 'react'
import { AppState, Text } from 'react-native'
import AccountAPIHelper from '../helpers/AccountAPIHelper'
import UserData from '../model/UserData'
import DataFormatHelper from '../helpers/DataFormatHelper'
import LogStore from '../stores/LogStore'
import FlashNotification from '../components/common/FlashNotification'
import { AppContainer, NdauTotal, LabelWithTextLink, RefreshScrollView } from '../components/common'
import { DrawerHeader } from '../components/drawer'
import {
  DashboardLabel,
  DashboardPanel
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
    this.appStateSubscription.remove()
  }

  _handleAppStateChange = async nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      await this._onRefresh()
    }
    this.setState({ appState: nextAppState })
  }

  UNSAFE_componentWillMount () {
    const user = UserStore.getUser()

    LogStore.log(`User to be drawn: ${JSON.stringify(user)}`)

    if (Object.keys(user.wallets).length <= 1) {
      WalletStore.setWallet(user.wallets[Object.keys(user.wallets)[0]])
      this.props.navigation.navigate('WalletOverview', { drawerEnabled: true })
    } else {
      this._loadMetricsAndSetState(user)

      const error = this.props.route.params?.error ?? null
      if (error) {
        FlashNotification.showError(error)
      }
    }
    this.appStateSubscription = AppState.addEventListener('change', this._handleAppStateChange)
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
      currentPrice,
      totalNdau,
      totalSpendableNdau
    })
  }

  _onRefresh = async () => {
    if (this.state.refreshing) return

    FlashNotification.hideMessage()
    this.setState({ refreshing: true }, async () => {
      const user = UserStore.getUser()
      try {
        await UserData.loadUserData(user)
      } catch (error) {
        FlashNotification.showError(error)
      }

      this._loadMetricsAndSetState(user)

      this.setState({ refreshing: false })
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
          <DrawerHeader {...this.props}>Dashboard</DrawerHeader>
          <RefreshScrollView
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          >
            <NdauTotal>{totalNdau}</NdauTotal>
            <LabelWithTextLink 
              label={`${totalSpendableNdau} `}
              linkText='spendable'
              url={AppConfig.SPENDABLE_KNOWLEDGEBASE_URL}
            />
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
          </RefreshScrollView>
        </AppContainer>
      )
    } catch (error) {
      FlashNotification.showError(error)
    }

    return (
      <AppContainer>
        <DrawerHeader {...this.props}>Dashboard</DrawerHeader>
      </AppContainer>
    )
  }
}

export default Dashboard
