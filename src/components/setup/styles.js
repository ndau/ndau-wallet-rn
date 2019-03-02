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
  outerDrawerContainer: {
    flex: 1,
    height: hp('100%')
  },
  setupContainerBackgroundImage: {
    height: '150%',
    width: '150%',
    bottom: 450,
    right: 80
  },
  outerDrawerContainer: {
    flex: 1,
    height: hp('100%')
  },
  setupWelcomeContainer: {
    flex: 1,
    width: wp('100%'),
    height: hp('100%'),
    marginRight: wp('4%'),
    marginTop: hp('10%'),
    marginBottom: hp('6%')
  },
  setupContainerOverlay: {
    position: 'absolute',
    top: hp('7%'),
    left: 0,
    right: 0,
    bottom: 0
  },
  setupContainer: {
    flex: 1,
    width: wp('100%'),
    height: hp('100%'),
    marginTop: hp('2%'),
    marginBottom: hp('2.5%')
  },
  setupContainerWithScrollView: {
    flex: 1,
    width: wp('92%'),
    height: hp('100%'),
    marginTop: hp('2%'),
    marginBottom: hp('2.5%'),
    marginRight: wp('4%'),
    marginLeft: wp('4%')
  },
  largeText: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Titillium Web',
    fontSize: 36,
    fontWeight: '600',
    letterSpacing: 0.77,
    lineHeight: 54,
    paddingLeft: wp('1%'),
    paddingRight: wp('1%'),
    marginLeft: wp('4%')
  },
  underline: {
    width: wp('15%'),
    height: hp('.1%'),
    borderColor: AppConstants.TEXT_COLOR,
    borderStyle: 'solid',
    borderWidth: 3,
    marginLeft: wp('5%'),
    marginRight: wp('1%'),
    marginBottom: wp('5%')
  },
  paragraphText: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 18,
    letterSpacing: 0.39,
    lineHeight: 27,
    paddingLeft: wp('1%'),
    paddingRight: wp('1%'),
    marginRight: wp('4%'),
    marginLeft: wp('4%')
  },
  smallParagraphText: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0.26,
    lineHeight: 18,
    textAlign: 'center',
    marginLeft: wp('4%')
  },
  recoveryConfirmationText: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Titillium Web',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.34,
    lineHeight: 24,
    textAlign: 'center'
  },
  recoveryConfirmationTextOnly: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.39,
    lineHeight: 27,
    textAlign: 'center'
  },
  recoveryConfirmationContainer: {
    position: 'absolute',
    top: hp('9%'),
    left: 0,
    right: 0,
    width: wp('100%'),
    height: hp('30%'),
    backgroundColor: '#293e63',
    paddingTop: hp('3%')
  },
  recoveryConfirmationRowView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  recoveryConfirmationBox: {
    width: wp('21%'),
    height: hp('5.5%'),
    borderRadius: 4,
    borderColor: '#4e957a',
    borderStyle: 'solid',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  recoveryConfirmationButtonBox: {
    width: wp('21%'),
    height: hp('5.5%'),
    borderRadius: 4,
    backgroundColor: '#4e957a',
    justifyContent: 'center',
    alignItems: 'center'
  },
  recoveryConfirmationButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: wp('100%'),
    height: hp('30%'),
    paddingTop: hp('3%')
  },
  recoveryConfirmationContainerTextOnly: {
    position: 'absolute',
    top: hp('15%'),
    left: 0,
    right: 0,
    width: wp('100%'),
    height: hp('30%'),
    backgroundColor: '#293e63',
    paddingTop: hp('3%')
  },

  recoveryConfirmationRowViewTextOnly: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  appContainerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
})
