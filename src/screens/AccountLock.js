import React, { Component } from 'react'

import {
  AccountLockDetailsPanel,
  AccountLockContainer,
  AccountLockButton,
  AccountLockLargerText,
  AccountLockOption,
  AccountLockOptionHeader,
  AccountLockOptionsPanel,
  AccountLockGreenText
} from '../components/account'
import { ScrollView } from 'react-native'
import AccountAPIHelper from '../helpers/AccountAPIHelper'
import AccountStore from '../stores/AccountStore'
import WalletStore from '../stores/WalletStore'
import AccountAPI from '../api/AccountAPI'
import AppConstants from '../AppConstants'
import WaitingForBlockchainSpinner from '../components/common/WaitingForBlockchainSpinner'
import FlashNotification from '../components/common/FlashNotification'
import { TextLink } from '../components/common'
import { FeeAlert } from '../components/alerts'
import AppConfig from '../AppConfig'

class AccountLock extends Component {
  constructor (props) {
    super(props)
    this.state = {
      account: {},
      wallet: {},
      possibleLocks: [],
      selectedIndex: null,
      whereToSendEAI: null,
      lockType: null,
      chooseAccounts: false,
      spinner: false,
      accountsCanRxEAI: {},
      accountAddressForEAI: null,
      accountNicknameForEAI: null,
      baseEAI: 0,
      isModalVisible: false
    }
    props.navigation.addListener('didBlur', FlashNotification.hideMessage)
  }

  componentWillMount = async () => {
    this.setState({ spinner: true }, async () => {
      const accountsCanRxEAI = this.props.navigation.getParam(
        'accountsCanRxEAI',
        null
      )
      const baseEAI = this.props.navigation.getParam('baseEAI', null)
      const account = AccountStore.getAccount()
      const wallet = WalletStore.getWallet()

      const lockData = await AccountAPI.getLockRates(account)

      possibleLocks = lockData.map((data, index) => {
        const total = AccountAPIHelper.eaiValueForDisplay({
          eaiValueForDisplay: data.eairate
        })
        const bonus = index + 1
        const base = total - bonus
        return {
          bonus,
          total,
          base,
          lock: AppConstants.LOCK_ACCOUNT_POSSIBLE_TIMEFRAMES[data.address],
          lockISO: data.address
        }
      })

      this.setState({
        spinner: false,
        account,
        wallet,
        possibleLocks,
        accountsCanRxEAI,
        baseEAI
      })
    })
  }

  componentDidMount = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible })
  }

  handleLockSelection = index => {
    this.setState({ selectedIndex: index })
  }

  _selectAccountToSendEAI = () => {
    this.props.navigation.navigate('AccountLockType', {
      account: this.state.account,
      wallet: this.state.wallet,
      lockInformation: this.state.possibleLocks[this.state.selectedIndex],
      accountsCanRxEAI: this.state.accountsCanRxEAI
    })
  }

  render () {
    return (
      <AccountLockContainer
        title='Lock account'
        account={this.state.account}
        wallet={this.state.wallet}
        navigation={this.props.nav}
        {...this.props}
      >
        <FeeAlert
          title='ndau lock fees'
          message='Transactions are subject to a small fee that supports the operation of the ndau network.'
          fees={[
            'Lock fee - 0.005 ndau',
            'Notify fee - 0.005 ndau',
            'SetDestination fee - 0.005 ndau*'
          ]}
          postMessage='* Only if the user chooses to have earned EAI sent to a different account'
          isVisible={this.state.isModalVisible}
          setVisible={visible => this.setState({ isModalVisible: visible })}
        />
        <WaitingForBlockchainSpinner spinner={this.state.spinner} />
        <AccountLockDetailsPanel account={this.state.account}>
          <ScrollView>
            <AccountLockLargerText>
              Locking your ndau accrues{' '}
              <TextLink url={AppConfig.EAI_KNOWLEDGEBASE_URL}>EAI</TextLink> at
              a higher rate.
            </AccountLockLargerText>
            <AccountLockLargerText>
              Based on your account's weighted average age of{' '}
              <AccountLockGreenText>
                {AccountAPIHelper.weightedAverageAgeInDays(
                  this.state.account.addressData
                )}{' '}
                days
              </AccountLockGreenText>
              , you are currently earning a base rate of{' '}
              <AccountLockGreenText>
                {this.state.baseEAI}%{' '}
                <TextLink url={AppConfig.EAI_KNOWLEDGEBASE_URL}>EAI</TextLink>
              </AccountLockGreenText>
              .
            </AccountLockLargerText>
            <AccountLockLargerText>
              Choose your lock time and bonus rate:
            </AccountLockLargerText>
            <AccountLockOptionHeader />
            <AccountLockOptionsPanel>
              {this.state.possibleLocks.map((possibleLock, index) => {
                return (
                  <AccountLockOption
                    key={index}
                    base={possibleLock.base}
                    bonus={possibleLock.bonus}
                    lock={possibleLock.lock}
                    total={possibleLock.total}
                    onPress={() => this.handleLockSelection(index)}
                    selected={index === this.state.selectedIndex}
                  />
                )
              })}
            </AccountLockOptionsPanel>
            <AccountLockButton
              smallText={
                'Note: You will not be able to deposit into, spend, transfer, or otherwise access the principal in this account while it is locked'
              }
              onPress={this._selectAccountToSendEAI}
              disabled={this.state.selectedIndex === null}
            >
              Continue
            </AccountLockButton>
          </ScrollView>
        </AccountLockDetailsPanel>
      </AccountLockContainer>
    )
  }
}

export default AccountLock
