/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import { Platform, StyleSheet } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import StyleConstants from './styleConstants'


export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleConstants.APP_BACKGROUND_COLOR
  },
  wizardText: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'TitilliumWeb-Regular'
  },
  footer: {
    justifyContent: 'flex-end',
    paddingLeft: wp('6%'),
    paddingRight: wp('6%')
  },
  networkContainer: {
    backgroundColor: 'transparent',
    ...Platform.select({ios:{paddingTop: 27}}),
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    zIndex: 9005
  },
  netBarText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold'
  }
})
