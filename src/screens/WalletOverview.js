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
import { Alert, ScrollView, View, RefreshControl, AppState, Linking } from 'react-native'
import AccountAPIHelper from '../helpers/AccountAPIHelper'
import LogStore from '../stores/LogStore'
import FlashNotification from '../components/common/FlashNotification'
import { AppContainer, NdauTotal, TextLink } from '../components/common'
import { AccountPanel } from '../components/account'
import {
  DashboardContainer,
  DashboardButton,
  DashboardLabelWithIcon
} from '../components/dashboard'
import { DrawerHeader } from '../components/drawer'
import {
  DashboardTotalPanel,
  WalletOverviewHeaderActions
} from '../components/account'
import UserData from '../model/UserData'
import UserStore from '../stores/UserStore'
import NewAccountModalDialog from '../components/common/NewAccountModalDialog'
import WalletStore from '../stores/WalletStore'
import AccountStore from '../stores/AccountStore'
import NdauStore from '../stores/NdauStore'
import AccountHelper from '../helpers/AccountHelper'
import DataFormatHelper from '../helpers/DataFormatHelper'
import NdauNumber from '../helpers/NdauNumber'
import AppConfig from '../AppConfig'
import { FeeAlert } from '../components/alerts'
import OfflineError from '../errors/OfflineError'

class WalletOverview extends Component {
  constructor (props) {
    super(props)

    this.state = {
      number: 1,
      activeAddress: null,
      refreshing: false,
      currentPrice: 0,
      totalNdau: 0,
      totalSpendable: 0,
      spinner: false,
      appState: AppState.currentState
    }

    this.isTestNet = false
    this.accountsCanRxEAI = []
    props.navigation.addListener('didBlur', FlashNotification.hideMessage)
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => this._onRefresh())
  }

  componentWillUnmount() {
    this.unsubscribe()
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

  UNSAFE_componentWillMount = async () => {
    this.appStateSubscription = AppState.addEventListener('change', this._handleAppStateChange)

    if (this.props.route.params?.refresh) {
      await this._onRefresh()
    } else {
      this._loadMetricsAndSetState(WalletStore.getWallet())
    }

    const error = this.props.route.params?.error ?? null
    if (error) {
      FlashNotification.showError(error)
    }
  }

  _loadMetricsAndSetState = wallet => {
    let totalNdau = '0'
    let totalNdauNumber = '0'
    let totalSpendable = '0'
    if (wallet) {
      totalNdau = new NdauNumber(
        AccountAPIHelper.accountTotalNdauAmount(wallet.accounts)
      ).toDetail()
      totalNdauNumber = new NdauNumber(
        AccountAPIHelper.accountTotalNdauAmount(wallet.accounts, false)
      ).toDetail()
      totalSpendable = new NdauNumber(
        AccountAPIHelper.totalSpendableNdau(wallet.accounts, totalNdauNumber)
      ).toSummary()
    }
    const currentPrice = AccountAPIHelper.currentPrice(
      NdauStore.getMarketPrice(),
      totalNdauNumber
    )

    this.setState({
      refreshing: false,
      currentPrice,
      totalNdau,
      totalSpendable
    })
  }

  subtractNumber = () => {
    if (this.state.number > 1) {
      this.setState({ number: (this.state.number -= 1) })
    }
  }

  addNumber = () => {
    this.setState({ number: (this.state.number += 1) })
  }

  launchBuyNdauInBrowser = async () => {
    const url = "https://ndau.io/buy"

    const supported = await Linking.canOpenURL(url);

    if (supported) { 
      await Linking.openURL(url)
    } else {
      Alert.alert(
        'Error',
        `Don't know how to open this URL: ${url}`,
        [{ text: 'OK', onPress: () => {} }],
        { cancelable: false }
      )
    }
  }

  launchAddNewAccountDialog = () => {
    this._newAccountModal.showModal()
  }

  addNewAccount = async () => {
    try {
      const wallet = await AccountHelper.createAccounts(
        WalletStore.getWallet(),
        this.state.number
      )

      this.setState({ wallet, showFeesModal: true })
    } catch (error) {
      FlashNotification.showError(
        new OfflineError(`Problem adding new account: ${error.message}`)
      )
    }
  }

  _onRefresh = async () => {
    if (this.state.refreshing) return

    FlashNotification.hideMessage()
    this.setState({ refreshing: true }, async () => {
      const user = UserStore.getUser()

      let wallet = WalletStore.getWallet()
      try {
        await UserData.loadUserData(user)
        WalletStore.setWallet(
          user.wallets[DataFormatHelper.create8CharHash(wallet.walletId)]
        )
        this._loadMetricsAndSetState(WalletStore.getWallet())
      } catch (error) {
        FlashNotification.showError(error)
      }

      this.setState({ refreshing: false })
    })
  }

  _showAccountDetails = (account, wallet) => {
    AccountStore.setAccount(account)
    WalletStore.setWallet(wallet)
    this.props.navigation.navigate('AccountDetails', {
      accountsCanRxEAI: this.accountsCanRxEAI
    })
  }

  render = () => {
    try {
      const wallet = WalletStore.getWallet()

      LogStore.log(`Rendering wallet: ${JSON.stringify(wallet)}`)

      const { totalNdau, totalSpendable, currentPrice } = this.state
      this.accountsCanRxEAI = {}

      const walletName = DataFormatHelper.getWalletName(wallet)

      return (
        <AppContainer>
          <FeeAlert
            title='ndau new account fees'
            message='The first deposit received by a newly created account is subject to a small fee that supports the operation of the ndau network.'
            fees={[
              'Delegate fee - 0.005 ndau',
              'SetValidation fee - 0.005 ndau'
            ]}
            isVisible={this.state.showFeesModal}
            setVisibleHandler={visible => {
              this.setState({ showFeesModal: visible })
            }}
          />
          <NewAccountModalDialog
            number={this.state.number}
            subtractNumber={this.subtractNumber}
            addNumber={this.addNumber}
            addNewAccount={this.addNewAccount}
            ref={component => (this._newAccountModal = component)}
          />

          <DrawerHeader navBack={!this.props.route.params?.drawerEnabled} {...this.props}>
            {DataFormatHelper.truncateString(walletName)}
          </DrawerHeader>
          <NdauTotal>{totalNdau}</NdauTotal>
          <WalletOverviewHeaderActions>
            <DashboardLabelWithIcon
              greenFont
              style={{ justifyContent: 'flex-start' }}
              textStyle={{ fontSize: 12 }}
            >
              {totalSpendable}{' '}
              <TextLink url={AppConfig.SPENDABLE_KNOWLEDGEBASE_URL} textStyle={{ fontSize: 12 }}>
                spendable
              </TextLink>
            </DashboardLabelWithIcon>
            <DashboardLabelWithIcon
              onPress={() => this.launchAddNewAccountDialog()}
              fontAwesomeIconName='plus-circle'
              style={{ justifyContent: 'center' }}
              textStyle={{ fontSize: 12 }}
            >
              Add account
            </DashboardLabelWithIcon>

            <DashboardButton onPress={() => this.launchBuyNdauInBrowser()}>
              Buy ndau
            </DashboardButton>   
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
              <View style={{ flex: 1 }}>
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
                      const accountLockedUntil = AccountAPIHelper.accountLockedUntil(
                        wallet.accounts[accountKey].addressData
                      )
                      const isAccountLocked = AccountAPIHelper.isAccountLocked(
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
                          icon={isAccountLocked ? 'lock' : 'lock-open'}
                          accountLockedUntil={accountLockedUntil}
                          accountNoticePeriod={accountNoticePeriod}
                          isAccountLocked={isAccountLocked}
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
      FlashNotification.showError(error)
    }

    return (
      <AppContainer>
        <DrawerHeader {...this.props}>Dashboard</DrawerHeader>
      </AppContainer>
    )
  }
}

export default WalletOverview
