import React, { Component } from 'react'
import { SafeAreaView } from 'react-navigation'
import {
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  RefreshControl,
  TouchableOpacity,
  AppState,
  Platform
} from 'react-native'
import cssStyles from '../css/styles'
import DateHelper from '../helpers/DateHelper'
import AccountAPIHelper from '../helpers/AccountAPIHelper'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import AccountCard from '../components/AccountCard'
import UnlockModalDialog from '../components/UnlockModalDialog'
import LockModalDialog from '../components/LockModalDialog'
import NewAccountModalDialog from '../components/NewAccountModalDialog'
import TransactionModalDialog from '../components/TransactionModalDialog'
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro'
import styleConstants from '../css/styleConstants'
import KeyMaster from '../helpers/KeyMaster'
import MultiSafeHelper from '../helpers/MultiSafeHelper'
import UserData from '../model/UserData'
import FlashNotification from '../components/FlashNotification'
import Padding from '../components/Padding'
import OrderAPI from '../api/OrderAPI'
import DataFormatHelper from '../helpers/DataFormatHelper'
import AsyncStorageHelper from '../model/AsyncStorageHelper'
import CommonButton from '../components/CommonButton'
import WaitingForBlockchainSpinner from '../components/WaitingForBlockchainSpinner'
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

const NDAU_GREEN = require('img/ndau-icon-green.png')

class Dashboard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      number: 1,
      activeAddress: null,
      user: {},
      refreshing: false,
      marketPrice: 0,
      spinner: false,
      appState: AppState.currentState,
      queue: null
    }

    this.isTestNet = false
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
    const user = this.props.navigation.getParam('user', {})

    const marketPrice = this.props.navigation.getParam('marketPrice', 0)
    this.setState({ user, marketPrice })
    this.isTestNet = await AsyncStorageHelper.isTestNet()
  }

  componentDidMount = async () => {
    AppState.addEventListener('change', this._handleAppStateChange)
    let user = this.props.navigation.getParam('user', null)
    if (!user) {
      const password = await AsyncStorageHelper.getApplicationPassword()
      user = await MultiSafeHelper.getDefaultUser(password)
    }
    LoggingService.debug(`User to be drawn: ${JSON.stringify(user, null, 2)}`)

    this.setState({ user })

    const error = this.props.navigation.getParam('error', null)
    if (error) {
      FlashNotification.showError(error, false, true)
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

  unlock = (wallet, account) => {
    this._unlockModalDialog.setWallet(wallet)
    this._unlockModalDialog.setAccount(account)
    this._unlockModalDialog.showModal()
  }

  lock = (wallet, account) => {
    this._lockModalDialog.setWallet(wallet)
    this._lockModalDialog.setAccount(account)
    this._lockModalDialog.showModal()
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
      const user = await KeyMaster.createNewAccount(
        this.state.user,
        this.state.number
      )

      await MultiSafeHelper.saveUser(
        user,
        this.props.navigation.getParam('encryptionPassword', null)
      )

      this.setState({ user })
    } catch (error) {
      FlashNotification.showError(
        `Problem adding new account: ${error.message}`
      )
    }
  }

  _onRefresh = async () => {
    FlashNotification.hideMessage()
    this.setState({ refreshing: true })

    const user = this.state.user
    let marketPrice = this.state.marketPrice
    try {
      await UserData.loadData(user)
      marketPrice = await OrderAPI.getMarketPrice()
    } catch (error) {
      FlashNotification.showError(error.message, false, false)
    }

    this.setState({ refreshing: false, user, marketPrice })
  }

  _showWalletOverview = wallet => {
    this.props.navigation.push('WalletOverview', { wallet })
  }

  render = () => {
    try {
      const user = this.state.user
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

      // const numberOfAccounts = Object.keys(accounts).length

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
