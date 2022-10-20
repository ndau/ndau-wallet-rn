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

import EntropyHelper from '../../helpers/EntropyHelper'
import { SetupContainer } from '../../components/setup'
import FlashNotification from '../../components/common/FlashNotification'
import { LargeButtons, ParagraphText } from '../../components/common'

class SetupYourWallet extends Component {
  constructor (props) {
    super()
    props.navigation.addListener('blur', FlashNotification.hideMessage)
  }
  showNextSetup = async () => {
    console.log(3);
    await EntropyHelper.generateEntropy()
    this.props.navigation.navigate('SetupRecoveryPhrase')
  }

  componentDidMount = () => {
    this.fromHamburger = this.props.route.params?.fromHamburger ?? null
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  render () {
    return (
      <SetupContainer
        {...this.props}
        goBack={this.fromHamburger ? this.goBack : null}
        pageNumber={2}
      >
        <ParagraphText>
          Next we will give you a recovery phrase. This is critical to restoring
          your wallet. You risk losing access to your funds if you do not WRITE
          IT DOWN and store it in a secure location. Do not save this phrase on
          your device or in the cloud. Do not do this step in a public place
          where someone looking over your shoulder could see this phrase.
        </ParagraphText>
        <LargeButtons
          scroll
          sideMargins
          bottom
          onPress={() => this.showNextSetup()}
        >
          Get my recovery phrase
        </LargeButtons>
      </SetupContainer>
    )
  }
}

export default SetupYourWallet
