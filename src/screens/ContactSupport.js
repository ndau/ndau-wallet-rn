/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import {
  AppContainer,
  ParagraphText,
  SmallParagraphText,
  CheckBox,
  TextInput,
  LargeButton
} from '../components/common'
import { DrawerHeader } from '../components/drawer'
import axios from 'axios'
import React, { Component } from 'react'
import { View, Text } from 'react-native'
import FlashNotification from '../components/common/FlashNotification'
import LogStore from '../stores/LogStore'
import DeviceStore from '../stores/DeviceStore'
import AppConfig from '../AppConfig'
import WaitingForBlockchainSpinner from '../components/common/WaitingForBlockchainSpinner'
import OfflineError from '../errors/OfflineError'

class ContactSupport extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      description: '',
      includeLogs: true,
      sent: false,
      emailStatus: 'normal',
      sending: false
    }
    props.navigation.addListener('blur', FlashNotification.hideMessage)
  }

  validate () {
    const msgs = []
    if (!this.state.email.match(/.@.*\.../) || this.state.email.length < 6) {
      msgs.push('enter a valid email address')
    }
    if (
      this.state.description.length < 10 ||
      this.state.description.length > 1000
    ) {
      msgs.push('provide a description between 10 and 1024 characters')
    }
    return msgs
  }

  onSubmit () {
    // do this last
    const defered = () => this.setState({ sending: false })

    // bounce if we're already sending, if not set flag
    if (this.state.sending) {
      defered()
      return
    } else {
      this.setState({ sending: true })
    }

    // validate the fields
    const validateResult = this.validate()
    if (validateResult.length) {
      defered()
      FlashNotification.showError(
        `Please correct the following: ${validateResult.join(', ')}`
      )
      return
    }
    
    if (!DeviceStore.online()) {
      FlashNotification.showOfflineError()
      defered()
      return
    }

    const logs = this.state.includeLogs ? LogStore.getLogData() : []
    const ax = axios.create({
      headers: { 'x-api-key': AppConfig.FRESHDESK_INTEGRATION_API_KEY }
    })
    ax.post(AppConfig.FRESHDESK_TICKET_ENDPOINT, {
      email: this.state.email,
      description: this.state.description,
      logs: logs._array
    })
      .then(response => {
        this.setState({ sent: true })
        LogStore.log('support message sent')
      })
      .catch(error => {
        let msg = error.message
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          msg = error.response.data.message
        }
        FlashNotification.showError(new OfflineError(`Message could not be sent: ${msg}`))
        LogStore.log(error)
      })
      .finally(defered)
  }

  render () {
    const { includeLogs, sent, description, email, sending } = this.state
    const sendDisabled = sending // don't let'em press send when already sending
    const drawerDisabled = this.props.route.params?.drawerDisabled
    return (
      <AppContainer>
        <WaitingForBlockchainSpinner
          spinner={this.state.sending}
          label='Sending...'
        />
        <DrawerHeader navBack={drawerDisabled} {...this.props}>Contact Support</DrawerHeader>
        <Text style={{ marginTop: '4%' }} />
        {sent ? (
          <ParagraphText>
            Your message was sent. Thank you for contacting support.
          </ParagraphText>
        ) : (
          <View>
            <TextInput
              onChangeText={value => {
                this.setState({ email: value })
              }}
              value={email}
              placeholder='Email'
            />
            <TextInput
              multiline
              height={92}
              numberOfLines={4}
              onChangeText={value => this.setState({ description: value })}
              value={description}
              placeholder='Description (between 10-1000 characters)'
            />
            <LargeButton
              sideMargins
              disabled={sendDisabled}
              scroll
              onPress={() => {
                this.onSubmit()
              }}
            >
              Send message
            </LargeButton>
            <Text style={{ marginTop: '4%' }} />
            <CheckBox
              onValueChange={value => this.setState({ includeLogs: value })}
              checked={includeLogs}
              label='Attach diagnostic data *'
            />
            <SmallParagraphText>
              * The attached data does NOT contain any private keys and contains
              NO secret information (e.g., your wallet passwords or recovery
              phrase). The data contains basic state information about your
              wallet and accounts, and is by default, included in your support
              request to help us debug any issues you might be having with your
              wallet app.
            </SmallParagraphText>
          </View>
        )}
      </AppContainer>
    )
  }
}

export default ContactSupport
