/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import { StyleSheet } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import AppConstants from '../../AppConstants'

export default (styles = StyleSheet.create({
  outerDrawerContainer: {
    flex: 1,
    height: hp('100%')
  },
  drawerContainerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  drawerContainer: {
    flex: 1,
    flexDirection: 'row',
    width: wp('100%'),
    height: hp('100%'),
    marginTop: hp('2%'),
    marginBottom: hp('2.5%')
  },
  drawerExit: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: wp('4%'),
    marginBottom: hp('3%')
  },
  drawerButton: {
    paddingLeft: wp('4%')
  },
  drawerEntry: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: wp('4%'),
    marginBottom: hp('2.5%')
  },
  drawerVersionEntry: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: wp('4%'),
    marginBottom: hp('2.5%')
  },
  drawerText: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 18,
    fontWeight: '200',
    marginLeft: wp('2%'),
    paddingTop: 0
  },
  drawerHeaderContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    width: wp('100%'),
    maxHeight: hp('6%'),
    color: '#000000'
  },
  drawerHeaderText: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 18,
    fontWeight: '200',
    width: wp('76%'),
    height: hp('6%'),
    textAlign: 'center',
    paddingTop: 4
  }
}))
