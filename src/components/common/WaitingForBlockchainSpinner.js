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
import Spinner from 'react-native-loading-spinner-overlay'

class WaitingForBlockchainSpinner extends Component {
  render () {
    return (
      <Spinner
        visible={this.props.spinner}
        textContent={this.props.label || 'Talking to blockchain...'}
        textStyle={{
          color: '#ffffff',
          fontSize: 20,
          fontFamily: 'TitilliumWeb-Light'
        }}
        animation='fade'
        overlayColor='rgba(0, 0, 0, 0.7)'
      />
    )
  }
}

export default WaitingForBlockchainSpinner
