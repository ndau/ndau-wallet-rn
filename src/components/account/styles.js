import { StyleSheet, Platform } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import AppConstants from '../../AppConstants'

export default StyleSheet.create({
  accountMainPanel: {
    width: wp('100%'),
    height: hp('23%'),
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    marginBottom: hp('3%')
  },
  accountPanels: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  accountTitlePanel: {
    width: wp('100%'),
    ...Platform.select({
      ios: {
        height: hp('8%')
      },
      android: {
        height: hp('9%')
      }
    })
  },
  accountButtonPanel: {
    width: wp('94%'),
    ...Platform.select({
      ios: {
        height: hp('8%')
      },
      android: {
        height: hp('9%')
      }
    }),
    marginLeft: wp('4%'),
    marginTop: hp('1%')
  },
  largeAccountButton: {
    height: hp('4.95%'),
    width: wp('43.86%'),
    borderRadius: 22,
    borderColor: AppConstants.SQUARE_BUTTON_COLOR,
    borderStyle: 'solid',
    borderWidth: 2,
    backgroundColor: 'transparent',
    ...Platform.select({
      android: {
        marginTop: hp('1%')
      }
    })
  },
  accountButton: {
    width: wp('28.97%'),
    height: hp('4.95%'),
    borderRadius: 22,
    borderColor: AppConstants.SQUARE_BUTTON_COLOR,
    borderStyle: 'solid',
    borderWidth: 2,
    backgroundColor: 'transparent',
    ...Platform.select({
      android: {
        marginTop: hp('1%')
      }
    })
  },
  accountActionPanel: {
    width: wp('100%'),
    ...Platform.select({
      ios: {
        height: hp('6%')
      },
      android: {
        height: hp('7%')
      }
    }),

    backgroundColor: '#0F2748'
  },
  accountActionTextPanel: {
    color: AppConstants.TEXT_COLOR,
    fontSize: 16,
    fontFamily: 'Titillium Web',
    letterSpacing: 0.34,
    lineHeight: 24,
    textAlign: 'left',
    marginLeft: wp('4%')
  },
  accountTitleTextPanel: {
    color: AppConstants.TEXT_COLOR,
    fontSize: 21,
    fontFamily: 'Titillium Web',
    letterSpacing: 0.45,
    lineHeight: 32,
    textAlign: 'left',
    ...Platform.select({
      ios: {
        paddingTop: 5
      }
    }),
    marginLeft: wp('4%')
  },
  accountPanelBorder: {
    borderBottomColor: '#455B82',
    borderBottomWidth: 1,
    marginLeft: wp('4%'),
    marginRight: wp('4%')
  },
  accountPanelTotal: {
    marginRight: wp('4%'),
    color: '#8CC74F',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
    shadowOpacity: 0,
    textShadowColor: 'rgba(78,149,122,1)',
    fontSize: 18,
    fontWeight: '300',
    letterSpacing: 0.39,
    lineHeight: 27,
    fontFamily: 'Titillium Web',
    textAlign: 'center'
  },
  accountTotalPanelText: {
    color: '#8CC74F',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
    shadowOpacity: 0,
    textShadowColor: 'rgba(78,149,122,1)',
    fontSize: 24,
    fontWeight: '300',
    letterSpacing: 0.51,
    lineHeight: 27,
    fontFamily: 'Titillium Web',
    textAlign: 'center',
    alignSelf: 'center'
  },
  historyAccountPanelText: {
    color: AppConstants.TEXT_COLOR,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
    shadowOpacity: 0,
    textShadowColor: 'rgba(78,149,122,1)',
    fontSize: 16,
    fontWeight: '300',
    letterSpacing: 0.34,
    lineHeight: 24,
    fontFamily: 'Titillium Web',
    textAlign: 'center',
    alignSelf: 'center',
    paddingTop: 5,
    marginRight: wp('2%')
  },
  accountTotalPanel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('100%'),
    height: hp('5%'),
    backgroundColor: '#293E63',
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    paddingLeft: wp('4%'),
    paddingRight: wp('4%')
  },
  accountDetailsPanel: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: '#0A1724'
  },
  accountTitlePanel: {
    width: wp('100%'),
    height: hp('5%')
  },
  accountContentPanel: {
    marginBottom: wp('2.5%')
  },
  accountDetailsTextPanel: {
    marginLeft: wp('4%'),
    marginRight: wp('4%')
  },
  accountAngle: {
    ...Platform.select({
      ios: {
        paddingTop: hp('1%')
      },
      android: {
        paddingTop: hp('.5%')
      }
    }),
    paddingRight: wp('4%')
  },
  viewHistoryAngle: {
    ...Platform.select({
      ios: {
        paddingTop: hp('1%')
      },
      android: {
        paddingTop: hp('.5%')
      }
    })
  },
  accountNicknameIcon: {
    paddingLeft: wp('3%')
  },
  progressNumber: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Titillium Web',
    fontSize: 22,
    letterSpacing: 0.39,
    lineHeight: 27,
    paddingLeft: wp('1%'),
    paddingRight: wp('1%'),
    ...Platform.select({
      ios: {
        marginTop: hp('.6%')
      }
    }),
    marginRight: wp('4%')
  },
  accountDetailsBarText: {
    width: wp('70%'),
    height: hp('6%'),
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontWeight: '200',
    letterSpacing: 0.34,
    lineHeight: 24,
    paddingLeft: wp('1%'),
    paddingRight: wp('1%'),
    ...Platform.select({
      ios: {
        marginTop: hp('.6%')
      }
    }),
    marginRight: wp('4%'),
    textAlign: 'center'
  },
  accountButtonText: {
    width: wp('30%'),
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Titillium Web',
    fontSize: 16,
    letterSpacing: 0.34,
    lineHeight: 24,
    textAlign: 'center',
    ...Platform.select({
      ios: {
        marginBottom: -2,
        marginTop: -5
      }
    })
  },
  accountDetailsTextPanelWithButton: {
    margin: wp('4%'),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  accountDetailsTextPanelWithSmallText: {
    marginLeft: wp('4%'),
    marginRight: wp('4%'),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  lockAccountTextPanelWithSmallText: {
    marginLeft: wp('4%'),
    marginRight: wp('4%'),
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  accountDetailsLargerText: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontWeight: '200',
    letterSpacing: 0.34,
    lineHeight: 24,
    marginLeft: wp('4%'),
    marginRight: wp('4%')
  },
  accountDetailsSmallerText: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 12,
    fontWeight: '200',
    letterSpacing: 0.26,
    lineHeight: 18,
    paddingBottom: 0
  },
  accountDetailsSmallerTextBold: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0.26,
    lineHeight: 18,
    paddingBottom: 0
  },
  accountDetailsPanelBorder: {
    borderBottomColor: '#455B82',
    borderBottomWidth: 1,
    marginLeft: wp('4%'),
    marginRight: wp('4%')
  },
  accountDetailsBarContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    width: wp('100%'),
    height: hp('6%'),
    backgroundColor: 'transparent',
    color: '#000000'
  },
  accountLockButtonContainer: {
    position: 'absolute',
    bottom: 0,
    marginLeft: wp('4%'),
    marginBottom: hp('2.5%')
  },
  accountButtonLargeButton: {
    width: wp('92%'),
    height: hp('6%'),
    borderRadius: 22,
    backgroundColor: AppConstants.SQUARE_BUTTON_COLOR,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginLeft: wp('4%')
  },
  accountLargeButton: {
    width: wp('92%'),
    height: hp('6%'),
    borderRadius: 4,
    backgroundColor: AppConstants.SQUARE_BUTTON_COLOR
  },
  accountLargeButtonText: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Titillium Web',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.43
  },
  outerDrawerContainer: {
    flex: 1,
    height: hp('100%')
  },
  opaqueOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.9
  },
  appContainerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  backArrow: {
    ...Platform.select({
      ios: {
        marginTop: hp('1.2%')
      },
      android: {
        marginTop: hp('.8%')
      }
    }),
    marginLeft: wp('3%')
  },
  backArrowForHistory: {
    ...Platform.select({
      ios: {
        marginTop: hp('1.2%')
      },
      android: {
        marginTop: hp('.8%')
      }
    }),
    marginLeft: 0
  },
  detailsBarCog: {
    ...Platform.select({
      ios: {
        marginTop: hp('2%')
      },
      android: {
        marginTop: hp('1.6%')
      }
    }),
    marginRight: wp('4%')
  },
  accountLockDetailsTextPanel: {
    marginLeft: wp('4%'),
    marginRight: wp('4%')
  },
  lockAccountCheckmark: {
    marginTop: hp('1.4%'),
    marginRight: wp('3%')
  },
  lockSmallerTextBold: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 12,
    fontWeight: '400',
    marginTop: hp('2%'),
    textAlign: 'center'
  },
  lockSliderContainer: {
    margin: wp('4%'),
    marginBottom: hp('7%')
  },
  lockSlider: {
    width: wp('92%'),
    height: hp('1%'),
    color: '#0A1724'
  },
  lockSmallerText: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 12,
    textAlign: 'left'
  },
  accountHistoryTextPanelWithSmallText: {
    marginLeft: wp('4%'),
    marginRight: wp('4%'),
    marginBottom: hp('3%'),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  accountHistorySmallerText: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 12,
    fontWeight: '200',
    letterSpacing: 0.26,
    lineHeight: 18,
    paddingBottom: 0
  },
  accountHistorySmallerTextBold: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0.26,
    lineHeight: 18,
    paddingBottom: 0
  },
  dashboardTotalPanel: {
    backgroundColor: '#293E63',
    height: hp('5%'),
    justifyContent: 'center'
  },
  dashboardTotalTitleLeft: {
    color: '#8CC74F',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
    shadowOpacity: 0,
    textShadowColor: 'rgba(78,149,122,1)',
    fontSize: 18,
    fontWeight: '300',
    letterSpacing: 0.39,
    lineHeight: 27,
    fontFamily: 'TitilliumWeb-Light'
  },
  totalAsterickTextVerySmallWhite: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 12,
    fontWeight: '300',
    letterSpacing: 0.26,
    lineHeight: 18,
    marginLeft: wp('4%'),
    marginRight: wp('4%')
  },
  dashboardTotalPanelTextContainer: {
    backgroundColor: '#293E63'
  }
})
