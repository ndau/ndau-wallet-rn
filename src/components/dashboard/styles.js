/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import { StyleSheet, Platform } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import AppConstants from '../../AppConstants'

export default StyleSheet.create({
  opaqueOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.9
  },
  dashboardLabelTextWithIcon: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 16,
    marginRight: wp('2%'),
    marginLeft: wp('4%')
  },
  walletOverviewGreenFont: {
    color: AppConstants.LIGHT_GREEN_COLOR,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
    shadowOpacity: 0,
    textShadowColor: 'rgba(78,149,122,1)'
  },
  dashboardLabelText: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 18,
    marginTop: wp('2%'),
    marginBottom: wp('2%'),
    marginLeft: wp('4%')
  },
  dashboardLabelWithIconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: hp('6.5%'),
    maxHeight: hp('6.5%'),
    marginTop: wp('2%'),
    marginBottom: wp('2%')
  },
  dashboardButtonBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('4.5%'),
    maxHeight: hp('4.5%'),
    marginStart: wp('8%'),
    paddingHorizontal: 0,
    borderRadius: 4,
    padding: 0,
    backgroundColor: AppConstants.SQUARE_BUTTON_COLOR
  },
  dashboardButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Open Sans',
    fontSize: 12,
    justifyContent: "center",
    textAlign: "center"
  },
  dashboardContainer: {
    flex: 1,
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: '#0A1724'
  },
  dashboardPanel: {
    width: wp('100%'),
    height: hp('8.5%'),
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    marginBottom: hp('3%')
  },
  dashboardWalletName: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: hp('7%'),
    width: hp('30%'),
    overflow: 'hidden'
  },
  dashboardActionPanels: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: hp('7%'),
    overflow: 'hidden'
  },
  dashboardActionTextPanel: {
    color: AppConstants.TEXT_COLOR,
    fontSize: 21,
    fontFamily: 'Titillium Web',
    fontWeight: '600',
    textAlign: 'center',
    marginLeft: wp('4%')
  },
  dashboardActionPanel: {
    width: wp('18%'),
    height: hp('10%'),
    backgroundColor: '#0F2748',
    alignSelf: 'flex-end'
  },
  dashboardAngle: {
    alignSelf: 'center',
    ...Platform.select({
      ios: {
        paddingTop: hp('2.5%')
      },
      android: {
        paddingTop: hp('2%')
      }
    })
  },
  dashboardWallet: {
    alignSelf: 'center',
    paddingTop: hp('1%'),
    marginLeft: wp('4%')
  }
})
