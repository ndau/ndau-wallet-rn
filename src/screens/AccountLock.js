import React, { Component } from 'react'

import {
  AccountLockDetailsPanel,
  AccountLockContainer,
  AccountLockButton
} from '../components/account'
import AccountAPIHelper from '../helpers/AccountAPIHelper'
import { H4 } from 'nachos-ui'
import { View, Picker, Slider } from 'react-native'
import componentStyles from '../css/componentStyles'
import { Dropdown } from '../components/common'

class AccountLock extends Component {
  constructor (props) {
    super(props)
    this.state = {
      account: {},
      wallet: {},
      sliderValue: 0.5,
      lockPercentage: 3,
      lockPeriod: 12
    }
  }

  componentWillMount = () => {
    const account = this.props.navigation.getParam('account', null)
    const wallet = this.props.navigation.getParam('wallet', null)

    this.setState({ account, wallet })
  }

  _showLockConfirmation = () => {
    this.props.navigation.navigate('AccountLockConfirmation', {
      account: this.state.account,
      wallet: this.state.wallet,
      lockPercentage: this.state.lockPercentage,
      lockPeriod: this.state.lockPeriod
    })
  }

  handleSliderChange = sliderValue => {
    console.log(sliderValue.toFixed(1))
    let lockPeriod = 3
    if (sliderValue.toFixed(1) == 0.0) {
      lockPercentage = 1
      lockPeriod = 3
    } else if (sliderValue.toFixed(2) == 0.25) {
      lockPercentage = 2
      lockPeriod = 5
    } else if (sliderValue.toFixed(1) == 0.5) {
      lockPercentage = 3
      lockPeriod = 12
    } else if (sliderValue.toFixed(2) == 0.75) {
      lockPercentage = 4
      lockPeriod = 24
    } else if (sliderValue.toFixed(1) == 1.0) {
      lockPercentage = 5
      lockPeriod = 36
    }
    console.log(lockPeriod)
    this.setState({ sliderValue, lockPercentage, lockPeriod })
  }

  render () {
    return (
      <AccountLockContainer
        title='Lock account step 1'
        account={this.state.account}
        wallet={this.state.wallet}
        {...this.props}
      >
        <AccountLockDetailsPanel account={this.state.account}>
          <View style={componentStyles.accountDetailsTextPanel}>
            <H4 style={componentStyles.accountDetailsLargerText}>
              Locking your ndau with a withdrawel countdown period accrues bonus
              EAI.
            </H4>
          </View>
          <View style={componentStyles.accountDetailsTextPanel}>
            <H4 style={componentStyles.accountDetailsLargerText}>
              Lock the{' '}
              {AccountAPIHelper.accountNdauAmount(
                this.state.account.addressData
              )}{' '}
              ndau in{' '}
              {AccountAPIHelper.accountNickname(this.state.account.addressData)}{' '}
              for a bonus incentive of:
            </H4>
          </View>
          <View>
            <H4 style={componentStyles.lockSmallerTextBold}>
              {this.state.lockPercentage}% ({this.state.lockPeriod} months to
              unlock)
            </H4>
          </View>
          <View style={componentStyles.lockSliderContainer}>
            <Slider
              maximumTrackTintColor='#4E957A'
              minimumTrackTintColor='#4E957A'
              step={0.25}
              style={componentStyles.lockSlider}
              value={this.state.sliderValue}
              onValueChange={this.handleSliderChange}
            />
          </View>
          <View style={componentStyles.accountDetailsTextPanel}>
            <H4 style={componentStyles.accountDetailsLargerText}>
              Where do you want to send the incentive (EAI) from this lock?
            </H4>
          </View>
          <Dropdown
            containerStyle={componentStyles.lockAccountDetailsTextPanel}
            itemStyle={componentStyles.lockAccountPickerText}
            style={componentStyles.lockAccountPicker}
            selectedValue={this.state.language}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ language: itemValue })
            }
          />
        </AccountLockDetailsPanel>
        <AccountLockButton onPress={this._showLockConfirmation}>
          Continue
        </AccountLockButton>
      </AccountLockContainer>
    )
  }
}

export default AccountLock
