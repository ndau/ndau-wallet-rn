import { StyleSheet, Platform } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import AppConstants from '../../AppConstants'

export default StyleSheet.create({
  accountMainPanel: {
    width: wp('100%'),
    height: 100,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    marginTop: hp('3%')
  },
  accountPanels: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  accountTitlePanel: {
    width: wp('100%'),
    height: hp('2%'),
    padding: 0
  },
  accountDetailsTitlePanel: {
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
    width: wp('30%'),
    ...Platform.select({
      ios: {
        height: hp('4.95%')
      },
      android: {
        height: hp('5.5%'),
        marginTop: hp('1%')
      }
    }),

    borderRadius: 22,
    borderColor: AppConstants.SQUARE_BUTTON_COLOR,
    borderStyle: 'solid',
    borderWidth: 2,
    backgroundColor: 'transparent'
  },
  accountActionPanel: {
    width: wp('100%'),
    height: 46,
    backgroundColor: '#0F2748'
  },
  walletOverviewHeaderActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: wp('4%')
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
  ndauTotalContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  ndauTotalContainerMedium: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  ndauSmall: {
    color: '#FFFFFF',
    fontFamily: AppConstants.NDAU_ICON_FONT,
    fontSize: 17,
    letterSpacing: 0.51,
    lineHeight: 36,
    paddingRight: 4
  },
  ndauMedium: {
    color: '#FFFFFF',
    fontFamily: AppConstants.NDAU_ICON_FONT,
    fontSize: 18,
    letterSpacing: 0.51,
    lineHeight: 27
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
    textAlign: 'center'
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
    paddingBottom: hp('1%'),
    marginRight: wp('2%')
  },
  accountTotalPanel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('100%'),
    height: hp('6%'),
    backgroundColor: 'transparent',
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    paddingLeft: wp('4%'),
    paddingRight: wp('4%')
  },
  accountDetailsItemPanel: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: wp('100%'),
    ...Platform.select({
      ios: {
        height: hp('5%')
      },
      android: {
        height: hp('5%')
      }
    }),
    backgroundColor: 'transparent',
    overflow: 'hidden'
  },
  accountDetailsButtonPanel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('100%'),
    height: 70,
    backgroundColor: '#293E63',
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    padding: wp('4%'),
    ...Platform.select({
      android: {
        paddingTop: hp('2%')
      }
    })
  },
  accountHistoryPanel: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: '#0A1724',
    paddingHorizontal: wp('4%')
  },
  accountDetailsPanel: {
    width: wp('100%'),
    backgroundColor: '#0A1724',
    paddingHorizontal: wp('4%'),
    paddingTop: 0,
    marginBottom: 32
  },
  secondAccountDetailsPanel: {
    width: wp('100%'),
    backgroundColor: '#0A1724',
    paddingHorizontal: wp('4%'),
    paddingTop: 0
  },
  accountReceivePanel: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: '#0A1724',
    paddingHorizontal: wp('4%'),
    paddingTop: 0
  },
  accountSendPanel: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: '#0A1724',
    paddingHorizontal: wp('4%'),
    paddingTop: 0
  },
  accountLockPanel: {
    width: wp('100%'),
    backgroundColor: '#0A1724',
    paddingTop: 0
  },
  accountLockOptionsPanel: {
    width: wp('100%'),
    height: hp('58%'),
    backgroundColor: '#0A1724',
    paddingTop: 0
  },
  accountScan: {
    width: wp('100%'),
    height: hp('26%'),
    backgroundColor: '#0A1724',
    paddingTop: 0
  },
  firstAccountDetailsPanel: {
    width: wp('100%'),
    backgroundColor: '#0A1724',
    paddingHorizontal: wp('4%'),
    paddingTop: 0,
    ...Platform.select({
      android: {
        paddingBottom: 6
      }
    })
  },
  accountTitlePanel: {
    width: wp('100%'),
    height: hp('6%')
  },
  accountContentPanel: {
    // marginBottom: wp('2.5%'),
    backgroundColor: '#0A1724',
    height: hp('100%')
  },
  accountDetailsTextPanel: {
    marginLeft: wp('4%'),
    marginRight: wp('4%')
  },
  accountDetailsTextPanelTopMargin: {
    marginTop: hp('1%')
  },
  accountAngle: {
    ...Platform.select({
      ios: {
        paddingTop: hp('.5%')
      },
      android: {
        paddingTop: hp('.5%')
      }
    }),
    paddingRight: wp('4%')
  },
  accountDetailsIcons: {
    paddingTop: hp('1.5%'),
    paddingRight: wp('2%')
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
  accountDetailsBarText: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 18,
    fontWeight: '200',
    letterSpacing: 0.34,
    lineHeight: 24,
    height: hp('8%'),
    textAlign: 'center',
    marginTop: 4,
    marginLeft: -20,
    ...Platform.select({
      ios: {
        marginTop: 4
      }
    })
  },
  accountClosingBarText: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 18,
    fontWeight: '200',
    letterSpacing: 0.34,
    lineHeight: 24,
    height: hp('8%'),
    marginTop: 4,
    width: hp('20%')
  },
  testText: {
    display: 'none'
  },
  accountButtonText: {
    width: wp('30%'),
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Titillium Web',
    fontSize: 16,
    letterSpacing: 0.34,
    lineHeight: 24,
    textAlign: 'center'
  },
  accountButtonInnerPanel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: hp('.6%')
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
    marginRight: wp('8%'),
    marginBottom: hp('1%'),
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  accountDetailsParagraphText: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.34,
    lineHeight: 24,
    ...Platform.select({
      android: {
        lineHeight: 20
      }
    })
  },
  accountLockGreenText: {
    color: AppConstants.GREEN_TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.34,
    lineHeight: 24
  },
  accountReceiveParagraphText: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontWeight: '200',
    letterSpacing: 0.34,
    lineHeight: 24,
    marginLeft: wp('4%')
  },
  accountDetailsLargerText: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Titillium Web',
    fontSize: 21,
    fontWeight: '600',
    letterSpacing: 0.45,
    lineHeight: 32
  },
  accountDetailsSmallerText: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 14,
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
    borderBottomWidth: 1
  },
  accountClosingBarContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: hp('6%'),
    color: '#000000'
  },
  accountDetailsBarContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('100%'),
    height: hp('6%'),
    backgroundColor: 'transparent',
    color: '#000000',
    marginLeft: wp('4%'),
    marginRight: wp('4%')
  },
  accountLockButtonContainer: {
    bottom: 0,
    marginLeft: wp('4%'),
    marginBottom: hp('2.5%'),
    backgroundColor: '#0A1724'
  },
  accountSendButtonContainer: {
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
    width: wp('33%')
  },
  closeIcon: {
    ...Platform.select({
      ios: {
        marginTop: hp('1.2%'),
        marginLeft: 300
      },
      android: {
        marginTop: hp('.8%')
      }
    }),
    width: wp('33%')
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
  backArrowForLock: {
    ...Platform.select({
      ios: {
        marginTop: hp('1.2%')
      },
      android: {
        marginTop: hp('.8%')
      }
    }),
    marginLeft: wp('4%')
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
    marginRight: wp('4%'),
    width: wp('40%')
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
  lockSmallerText: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 12,
    textAlign: 'left',
    marginTop: hp('2%')
  },
  accountHistoryTextPanelWithSmallText: {
    marginLeft: wp('4%'),
    marginRight: wp('4%'),
    marginBottom: hp('3%'),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  accountSendTextPanelWithSmallText: {
    marginBottom: hp('1%'),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  accountSideMargins: {
    marginLeft: wp('4%'),
    marginRight: wp('4%')
  },
  accountHistorySmallerText: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 14,
    fontWeight: '200',
    letterSpacing: 0.26,
    lineHeight: 18,
    paddingBottom: 0
  },
  accountHistorySmallerTextBold: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0.26,
    lineHeight: 18,
    paddingBottom: 0
  },
  accountSendErrorColor: {
    color: AppConstants.ERROR_COLOR
  },
  accountHistoryLargerTextBold: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.26,
    lineHeight: 18,
    paddingBottom: 0
  },
  accountHistoryLinkText: {
    color: '#4E957A',
    textDecorationLine: 'underline',
    fontFamily: 'Open Sans',
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0.26,
    lineHeight: 18,
    paddingBottom: 0
  },
  dashboardTotalPanel: {
    backgroundColor: '#293E63',
    height: 40,
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
    backgroundColor: '#293E63',
    marginTop: 0
  },
  addressCopyPanelContainerBottomNoBorder: {
    bottom: 0,
    marginLeft: wp('4%')
  },
  addressCopyPanelContainerScrollView: {
    marginTop: hp('1%')
  },
  addressCopyPanel: {
    width: wp('92%'),
    height: hp('6%'),
    marginRight: wp('4%'),
    marginLeft: wp('4%'),
    borderRadius: 4,
    backgroundColor: '#293E63',
    paddingHorizontal: wp('4%')
  },
  accountLockOption: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: wp('92%'),
    height: hp('6%'),
    borderRadius: 4,
    backgroundColor: '#0F2748',
    paddingHorizontal: wp('4%'),
    marginLeft: wp('4%'),
    marginRight: wp('4%'),
    marginBottom: hp('2%')
  },
  accountLockOptionSelected: {
    backgroundColor: '#293E63',
    borderRadius: 4,
    borderColor: AppConstants.SQUARE_BUTTON_COLOR,
    borderStyle: 'solid',
    borderWidth: 2
  },
  accountLockOptionHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: wp('92%'),
    height: hp('6%'),
    borderRadius: 4,
    backgroundColor: 'transparent',
    paddingHorizontal: wp('4%'),
    marginLeft: wp('4%'),
    marginRight: wp('4%')
  },
  accountLockOptionHeaderText: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Titillium Web',
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0.34,
    lineHeight: 20,
    width: wp('16%')
  },
  accountLockCheckbox: {
    paddingTop: hp('1.5%'),
    paddingLeft: wp('1$')
  },
  accountLockOptionText: {
    ...Platform.select({
      ios: {
        lineHeight: 24
      },
      android: {
        lineHeight: 17
      }
    }),
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Titillium Web',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.34,
    width: wp('8%')
  },
  accountLockOptionTextWithBorder: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Titillium Web',
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0.34,
    lineHeight: 24,
    width: wp('16%'),
    borderRadius: 4,
    borderColor: AppConstants.SQUARE_BUTTON_COLOR,
    borderStyle: 'solid',
    borderWidth: 2,
    textAlign: 'center',
    paddingTop: 0,
    marginTop: hp('1%'),
    marginBottom: hp('1%')
  },
  addressCopyPanelText: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 14,
    fontWeight: '200',
    letterSpacing: 0.34,
    lineHeight: 24
  },
  addressShareButton: {
    alignSelf: 'center',
    width: wp('20%'),
    height: hp('4%'),
    borderRadius: 4,
    borderColor: AppConstants.SQUARE_BUTTON_COLOR,
    borderStyle: 'solid',
    borderWidth: 2,
    backgroundColor: 'transparent',
    marginTop: hp('1%'),
    padding: 0
  },
  addressButtonText: {
    width: wp('12%'),
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Titillium Web',
    fontSize: 14,
    fontWeight: '200',
    letterSpacing: 0.34,
    lineHeight: 24,
    paddingHorizontal: 0
  }
})
