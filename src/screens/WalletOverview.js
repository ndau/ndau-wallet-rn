import React, { Component } from 'react'
import { ScrollView, View, RefreshControl, AppState } from 'react-native'
import AccountAPIHelper from '../helpers/AccountAPIHelper'
import KeyMaster from '../helpers/KeyMaster'
import MultiSafeHelper from '../helpers/MultiSafeHelper'
import LogStore from '../stores/LogStore'
import FlashNotification from '../components/common/FlashNotification'
import { AppContainer, NdauTotal, TextLink } from '../components/common'
import { AccountPanel } from '../components/account'
import {
  DashboardContainer,
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
import { NavigationEvents } from 'react-navigation'
import AppConfig from '../AppConfig'

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

    if (this.props.navigation.getParam('refresh')) {
      this._onRefresh()
    } else {
      const wallet = this._loadMetricsAndSetState(this._getWallet())
      if (wallet) {
        WalletStore.setWallet(wallet)
      }
    }

    const error = this.props.navigation.getParam('error', null)
    if (error) {
      FlashNotification.showError(error)
    }
  }

  _loadMetricsAndSetState = wallet => {
    if (wallet) {
      // throw new Error(Object.prototype.toString.call(AccountAPIHelper.accountTotalNdauAmount(wallet.accounts)))
      totalNdau = new NdauNumber(
        AccountAPIHelper.accountTotalNdauAmount(wallet.accounts)
      ).toDetail()
      totalNdauNumber = new NdauNumber(
        AccountAPIHelper.accountTotalNdauAmount(wallet.accounts, false)
      ).toDetail()
      totalSpendable = new NdauNumber(
        AccountAPIHelper.totalSpendableNdau(wallet.accounts, totalNdauNumber)
      ).toSummary()
    } else {
      totalNdau = '0'
      totalNdauNumber = '0'
      totalSpendable = '0'
    }
    const currentPrice = AccountAPIHelper.currentPrice(
      NdauStore.getMarketPrice(),
      totalNdauNumber
    )

    this.setState({
      refreshing: false,
      wallet,
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

  stopSpinner = () => {
    this.setState({ spinner: false })
  }

  startSpinner = () => {
    this.setState({ spinner: true })
  }

  launchAddNewAccountDialog = () => {
    this._newAccountModal.showModal()
  }

  addNewAccount = async () => {
    try {
      const wallet = await AccountHelper.createAccounts(
        this._getWallet(),
        this.state.number
      )

      this.setState({ wallet })
    } catch (error) {
      FlashNotification.showError(
        `Problem adding new account: ${error.message}`
      )
    }
  }

  _onRefresh = async () => {
    FlashNotification.hideMessage()
    this.setState({ refreshing: true }, async () => {
      const password = await UserStore.getPassword()
      const user = await MultiSafeHelper.getDefaultUser(password)

      let wallet = this._getWallet()
      try {
        await UserData.loadUserData(user)

        wallet = KeyMaster.getWalletFromUser(user, wallet.walletId)
      } catch (error) {
        FlashNotification.showError(error.message)
      }

      if (wallet) WalletStore.setWallet(wallet)
      this._loadMetricsAndSetState(wallet)
    })
  }

  _showAccountDetails = (account, wallet) => {
    AccountStore.setAccount(account)
    WalletStore.setWallet(wallet)
    this.props.navigation.navigate('AccountDetails', {
      accountsCanRxEAI: this.accountsCanRxEAI
    })
  }

  _getWallet = () => {
    let { wallet } = this.state
    if (!wallet) {
      wallet = WalletStore.getWallet()
    }
    return wallet
  }

  render = () => {
    try {
      const wallet = this._getWallet()

      LogStore.log(`Rendering wallet: ${JSON.stringify(wallet)}`)

      const { totalNdau, totalSpendable, currentPrice } = this.state
      this.accountsCanRxEAI = {}

      const walletName = DataFormatHelper.getWalletName(wallet)

      return (
        <AppContainer>
          <NavigationEvents onWillFocus={payload => this._onRefresh()} />
          <NewAccountModalDialog
            number={this.state.number}
            subtractNumber={this.subtractNumber}
            addNumber={this.addNumber}
            addNewAccount={this.addNewAccount}
            ref={component => (this._newAccountModal = component)}
          />

          <DrawerHeader {...this.props}>
            {DataFormatHelper.truncateString(walletName)}
          </DrawerHeader>
          <NdauTotal>{totalNdau}</NdauTotal>
          <WalletOverviewHeaderActions>
            <DashboardLabelWithIcon
              greenFont
              style={{ flex: 1.5, justifyContent: 'flex-start' }}
            >
              {totalSpendable}{' '}
              <TextLink url={AppConfig.SPENDABLE_KNOWLEDGEBASE_URL}>
                spendable
              </TextLink>
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

export default WalletOverview
