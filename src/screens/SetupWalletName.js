import React, { Component } from 'react'
import SetupStore from '../model/SetupStore'
import DataFormatHelper from '../helpers/DataFormatHelper'
import AsyncStorageHelper from '../model/AsyncStorageHelper'
import FlashNotification from '../components/common/FlashNotification'
import { SetupContainer } from '../components/setup'
import { LargeButtons, TextInput, ParagraphText } from '../components/common'

class SetupEncryptionPassword extends Component {
  constructor (props) {
    super(props)

    this.state = { value: null }

    this.walletCount = 1
    this.defaultWalletId = 'Wallet 1'
  }

  componentWillMount = () => {
    const user = this.props.navigation.getParam('user', null)
    if (user) {
      this.walletCount = Object.keys(user.wallets).length
    }
    this.defaultWalletId = `Wallet ${this.walletCount}`
    SetupStore.walletId = this.defaultWalletId
  }

  checkIfWalletAlreadyExists = user => {
    if (
      DataFormatHelper.checkIfWalletAlreadyExists(user, SetupStore.walletId)
    ) {
      FlashNotification.showError(
        `There is already a wallet named "${
          SetupStore.walletId
        }". Please choose another name.`
      )
      return true
    }

    return false
  }

  showNextSetup = async () => {
    const { navigation } = this.props
    const user = navigation.getParam('user', null)

    if (this.checkIfWalletAlreadyExists(user)) {
      return
    }

    if (user) {
      // get it out of AppConstants.TEMP_ID if we have to
      // and into the new walletId
      DataFormatHelper.moveTempUserToWalletName(user, SetupStore.walletId)
    }

    // if we have an application password in
    // AsyncStorage then there is no need to show
    // this screen, so go to terms & conditions
    const password = await AsyncStorageHelper.getApplicationPassword()
    if (password) {
      SetupStore.encryptionPassword = password
      this.props.navigation.navigate('SetupTermsOfService', {
        user,
        walletSetupType:
          this.props.navigation.state.params &&
          this.props.navigation.state.params.walletSetupType
      })
    } else {
      if (user) {
        if (!user.userId) {
          user.userId = SetupStore.walletId
        }
        if (!user.wallets) {
          user.wallets = [{ walletId: SetupStore.walletId }]
        }
      }

      navigation.navigate('SetupEncryptionPassword', {
        user,
        walletSetupType:
          navigation.state.params && navigation.state.params.walletSetupType
      })
    }
  }

  render () {
    return (
      <SetupContainer {...this.props} pageNumber={16}>
        <ParagraphText>Give this wallet a name.</ParagraphText>
        <TextInput
          value={this.state.value}
          onChangeText={value => {
            if (value) {
              SetupStore.walletId = value
            } else {
              SetupStore.walletId = this.defaultWalletId
            }
            this.setState({ value })
          }}
          placeholder={`${SetupStore.walletId}`}
        />
        <LargeButtons bottom onPress={() => this.showNextSetup()}>
          Next
        </LargeButtons>
      </SetupContainer>
    )
  }
}

export default SetupEncryptionPassword
