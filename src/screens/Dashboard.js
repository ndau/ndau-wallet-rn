import React, { Component } from 'react'
import { SafeAreaView } from 'react-navigation'
import {
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  RefreshControl,
  TouchableOpacity
} from 'react-native'
import cssStyles from '../css/styles'
import styles from '../css/styles'
import DateHelper from '../helpers/DateHelper'
import NdauNodeAPIHelper from '../helpers/NdauNodeAPIHelper'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import AccountCard from '../components/AccountCard'
import UnlockModalDialog from '../components/UnlockModalDialog'
import LockModalDialog from '../components/LockModalDialog'
import NewAccountModalDialog from '../components/NewAccountModalDialog'
import TransactionModalDialog from '../components/TransactionModalDialog'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import styleConstants from '../css/styleConstants'
import KeyAddrGenManager from '../keyaddrgen/KeyAddrGenManager'
import MultiSafeHelper from '../helpers/MultiSafeHelper'
import UserData from '../model/UserData'

const LOCK_MODAL_ID = 'lock'
const UNLOCK_MODAL_ID = 'unlock'
const NEW_ACCOUNT_MODAL_ID = 'newAccount'
const TRANSACTION_MODAL_ID = 'transaction'

class Dashboard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      modalId: null,
      number: 1,
      activeAddress: null,
      user: {},
      refreshing: false
    }
  }

  componentWillMount () {
    const user = this.props.navigation.getParam('user', {})
    this.setState({ user })
  }

  showModal = modalId => {
    this.setState({ modalId })
  }

  closeModal = () => {
    this.setState({ modalId: null })
  }

  subtractNumber = () => {
    if (this.state.number > 1) {
      this.setState({ number: (this.state.number -= 1) })
    }
  }

  addNumber = () => {
    this.setState({ number: (this.state.number += 1) })
  }

  unlock = () => {
    // TODO: This is for issue #28 and #29 for MVP
    // This is being commented out for now as we want the
    // icons, but don't want the actual implementation yet
    // this.setState({ unlockModalVisible: true });
  }

  lock = () => {
    // TODO: This is for issue #28 and #29 for MVP
    // This is being commented out for now as we want the
    // icons, but don't want the actual implementation yet
    // this.setState({ lockModalVisible: true });
  }

  launchAddNewAccountDialog = () => {
    this.showModal(NEW_ACCOUNT_MODAL_ID)
  }

  addNewAccount = async () => {
    const user = await KeyAddrGenManager.createNewAccount(this.state.user, this.state.number)

    await MultiSafeHelper.saveUser(user, this.props.navigation.getParam('encryptionPassword', null))

    this.setState({ user })
  }

  _onRefresh = async () => {
    this.setState({ refreshing: true })

    const user = this.state.user

    await UserData.loadData(user)

    console.debug(`user is NOW after refresh: ${JSON.stringify(user, null, 2)}`)

    this.setState({ refreshing: false, user })
  }

  render = () => {
    console.debug(`user out of state: ${JSON.stringify(this.state.user, null, 2)}`)

    // TODO: this is ONLY temporary as we need to enumerate the wallets
    const { accounts, marketPrice } = this.state.user.wallets[this.state.user.userId]
    if (!accounts) {
      return <SafeAreaView style={cssStyles.safeContainer} />
    }

    const totalNdau = NdauNodeAPIHelper.accountTotalNdauAmount(accounts)
    const totalNdauNumber = NdauNodeAPIHelper.accountTotalNdauAmount(accounts, false)
    // TODO: move marketPrice to the top level as it does not correspond to a user
    const currentPrice = NdauNodeAPIHelper.currentPrice(marketPrice, totalNdauNumber)

    console.log('active address is: ', this.state.activeAddress)

    return (
      <SafeAreaView style={cssStyles.safeContainer}>
        <UnlockModalDialog
          visible={this.state.modalId === UNLOCK_MODAL_ID}
          setModalVisible={() => this.showModal(UNLOCK_MODAL_ID)}
          closeModal={this.closeModal}
        />
        <LockModalDialog
          visible={this.state.modalId === LOCK_MODAL_ID}
          setModalVisible={() => this.showModal(LOCK_MODAL_ID)}
          closeModal={this.closeModal}
        />
        <NewAccountModalDialog
          number={this.state.number}
          subtractNumber={this.subtractNumber}
          addNumber={this.addNumber}
          addNewAccount={this.addNewAccount}
          visible={this.state.modalId === NEW_ACCOUNT_MODAL_ID}
          setModalVisible={() => this.showModal(NEW_ACCOUNT_MODAL_ID)}
          closeModal={this.closeModal}
        />
        <TransactionModalDialog
          visible={this.state.modalId === TRANSACTION_MODAL_ID}
          setModalVisible={() => this.showModal(TRANSACTION_MODAL_ID)}
          closeModal={this.closeModal}
          address={this.state.activeAddress || this.props.activeAddress}
        />

        <StatusBar barStyle='light-content' backgroundColor='#1c2227' />

        <ScrollView
          style={cssStyles.container}
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />
          }
        >
          <View style={cssStyles.dashboardTextContainer}>
            <Text style={cssStyles.dashboardTextLarge}>Wallets</Text>
          </View>
          <View style={cssStyles.dashboardTextContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Image
                style={{
                  width: wp('7%'),
                  height: hp('6%'),
                  marginRight: wp('1%')
                }}
                resizeMode='contain'
                source={require('img/ndau-icon-green.png')}
              />
              <Text style={cssStyles.dashboardTextVeryLarge}>{totalNdau}</Text>
            </View>
          </View>
          <View style={cssStyles.dashboardSmallTextContainer}>
            <Text style={cssStyles.dashboardTextSmallGreen}>
              {currentPrice}
              <Text style={styles.asterisks}>**</Text>
              <Text style={cssStyles.dashboardTextSmallWhiteEnd}> at current price</Text>
            </Text>
            <View style={cssStyles.dashboardSmallTextContainer}>
              <View
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
              >
                <Text style={cssStyles.dashboardTextSmallGreen}>
                  {Object.keys(accounts).length} addresses
                </Text>
                <TouchableOpacity
                  style={{ marginLeft: wp('1.5%'), marginTop: hp('.3%') }}
                  onPress={this.launchAddNewAccountDialog}
                >
                  <FontAwesome name='plus-circle' color={styleConstants.ICON_GRAY} size={20} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {Object.keys(accounts).map((accountKey, index) => {
            const account = accounts[accountKey]
            const eaiPercentage = NdauNodeAPIHelper.eaiPercentage(account.addressData)
            const sendingEAITo = NdauNodeAPIHelper.sendingEAITo(account.addressData)
            const receivingEAIFrom = NdauNodeAPIHelper.receivingEAIFrom(account.addressData)
            const accountLockedUntil = NdauNodeAPIHelper.accountLockedUntil(account.addressData)
            const accountNoticePeriod = NdauNodeAPIHelper.accountNoticePeriod(account.addressData)
            const accountNotLocked = NdauNodeAPIHelper.accountNotLocked(account.addressData)
            const nickname = NdauNodeAPIHelper.accountNickname(account.addressData)
            const accountBalance = NdauNodeAPIHelper.accountNdauAmount(account.addressData)

            return (
              <AccountCard
                key={index}
                index={index}
                nickname={nickname}
                address={account.address}
                eaiPercentage={eaiPercentage}
                sendingEAITo={sendingEAITo}
                receivingEAIFrom={receivingEAIFrom}
                accountBalance={accountBalance}
                accountLockedUntil={accountLockedUntil}
                accountNoticePeriod={accountNoticePeriod}
                accountNotLocked={accountNotLocked}
                totalNdau={totalNdau}
                lock={this.lock}
                unlock={this.unlock}
                startTransaction={address => {
                  console.log('state before transaction started', this.state)
                  this.setState({
                    activeAddress: address,
                    modalId: TRANSACTION_MODAL_ID
                  })
                }}
              />
            )
          })}
          <View style={cssStyles.dashboardRowContainerCenter}>
            <Text style={styles.asterisks}>**</Text>
            <Text style={cssStyles.dashboardTextVerySmallWhite}>
              The estimated value of ndau in US dollars can be calculated using the Target Price at
              which new ndau have most recently been issued. The value shown here is calculated
              using that method as of the issue price on {DateHelper.getTodaysDate()}. The Axiom
              Foundation bears no responsibility or liability for the calculation of that estimated
              value, or for decisions based on that estimated value.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export default Dashboard
