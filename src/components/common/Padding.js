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
import { View } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

class Padding extends Component {
  constructor(props) {
    super(props);
    this.lineHeight = hp('3%');
    this.style = {
      paddingTop: this.getPadding(props.top, 1),
      paddingBottom: this.getPadding(props.bottom, 0),
    }
  }

  getPadding = (value, defaultValue) => {
    const numberOfLines = value === 0 ? 0 : (value || defaultValue)
    return this.lineHeight * numberOfLines
  }

  render() {
    return (
      <View style={this.style}>
        {this.props.children}
      </View>
    )
  }
};

export default Padding
