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
import SetupStore from '../../stores/SetupStore'
import DataFormatHelper from '../../helpers/DataFormatHelper'
import UserStore from '../../stores/UserStore'
import { SetupContainer } from '../../components/setup'
import { LargeButtons, TextInput, ParagraphText } from '../../components/common'
import FlashNotification from '../../components/common/FlashNotification'
import { KeyboardAvoidingView, View, Platform } from 'react-native'

class SetupWalletName extends Component {
  constructor (props) {
    super(props)

    this.state = { value: null }

    this.walletCount = 1
    this.defaultWalletId = 'Wallet 1'
    props.navigation.addListener('blur', FlashNotification.hideMessage)
  }

  componentDidMount = () => {
    const user = UserStore.getUser()
    if (user) {
      this.walletCount = Object.keys(user.wallets).length
    }
    this.defaultWalletId = `Wallet ${this.walletCount}`
    SetupStore.walletId = this.defaultWalletId
  }

  checkIfWalletAlreadyExists = async () => {
    try {
      const password = await UserStore.getPassword()
      const user = await MultiSafeHelper.getDefaultUser(password)

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
    } catch (error) {}

    return false
  }

  showNextSetup = async () => {
    const { navigation } = this.props
    const user = UserStore.getUser()

    if (await this.checkIfWalletAlreadyExists()) {
      return
    }

    if (user) {
      // get it out of AppConstants.TEMP_ID if we have to
      // and into the new walletId
      DataFormatHelper.moveTempUserToWalletName(user, SetupStore.walletId)
    }

    UserStore.setUser(user)
    // if we have an application password in
    // cache then there is no need to show
    // this screen, so go to terms & conditions
    const password = await UserStore.getPassword()
    if (password) {
      SetupStore.encryptionPassword = password
      this.props.navigation.navigate('SetupTermsOfService', {
        user
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

      this.props.navigation.navigate('SetupEncryptionPassword', {
        user
      })
    }
  }

  render () {
    return (
      <SetupContainer {...this.props} pageNumber={16}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 0}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
        >
          <View style={{ height: '90%' }}>
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
              onSubmitEditing={this.showNextSetup}
            />
          </View>
          <View style={{ height: '10%' }}>
            <LargeButtons
              sideMargins
              bottom
              onPress={() => this.showNextSetup()}
            >
              Next
            </LargeButtons>
          </View>
        </KeyboardAvoidingView>
      </SetupContainer>
    )
  }
}

export default SetupWalletName
