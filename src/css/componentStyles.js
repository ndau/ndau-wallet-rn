import { StyleSheet, Platform } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  statusBarColor: {
    backgroundColor: '#000000'
  },
  opaqueOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.9
  },
  setupContainerOverlay: {
    position: 'absolute',
    top: hp('7%'),
    left: 0,
    right: 0,
    bottom: 0
  },
  appContainerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  drawerContainerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  setupContainerBackgroundImage: {
    height: '150%',
    width: '150%',
    bottom: 450,
    right: 80
  },
  largeText: {
    color: '#FFFFFF',
    fontFamily: 'Titillium Web',
    fontSize: 36,
    fontWeight: '600',
    letterSpacing: 0.77,
    lineHeight: 54,
    paddingLeft: wp('1%'),
    paddingRight: wp('1%'),
    marginLeft: wp('4%')
  },
  drawerText: {
    color: '#FFFFFF',
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontWeight: '200',
    letterSpacing: 0.34,
    lineHeight: 24,
    marginLeft: wp('2%'),
    paddingTop: 0
  },
  drawerHeaderText: {
    color: '#FFFFFF',
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontWeight: '200',
    letterSpacing: 0.34,
    lineHeight: 24,
    width: wp('76%'),
    height: hp('5%'),
    textAlign: 'center',
    paddingTop: 0
  },
  drawerHeaderTextForOverview: {
    color: '#FFFFFF',
    fontFamily: 'Titillium Web',
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: 0.51,
    lineHeight: 36,
    width: wp('86%'),
    height: hp('6%'),
    textAlign: 'right',
    alignSelf: 'flex-end',
    paddingTop: 0
  },
  drawerTextBottom: {
    color: '#FFFFFF',
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontWeight: '200',
    letterSpacing: 0.34,
    lineHeight: 24,
    marginLeft: wp('2%'),
    paddingBottom: 0
  },
  drawerEntry: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: wp('4%'),
    marginBottom: hp('2.5%')
  },
  labelEntry: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: hp('5%'),
    marginLeft: wp('4%')
  },
  drawerEntryBottom: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginLeft: wp('4%'),
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
  accountNicknameIcon: {
    paddingLeft: wp('3%')
  },
  progressNumber: {
    color: '#FFFFFF',
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
    color: '#FFFFFF',
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
  paragraphText: {
    color: '#FFFFFF',
    fontFamily: 'Open Sans',
    fontSize: 18,
    letterSpacing: 0.39,
    lineHeight: 27,
    paddingLeft: wp('1%'),
    paddingRight: wp('1%'),
    marginRight: wp('4%'),
    marginLeft: wp('4%')
  },
  labelText: {
    color: '#FFFFFF',
    fontFamily: 'Open Sans',
    fontSize: 16,
    letterSpacing: 0.34,
    lineHeight: 24,
    marginRight: wp('2%'),
    marginLeft: wp('4%'),
    paddingTop: 0
  },
  dashboardLabelTextWithIcon: {
    color: '#FFFFFF',
    fontFamily: 'Open Sans',
    fontSize: 16,
    letterSpacing: 0.34,
    lineHeight: 24,
    marginRight: wp('2%'),
    marginLeft: wp('4%')
  },
  dashboardLabelText: {
    color: '#FFFFFF',
    fontFamily: 'Open Sans',
    fontSize: 16,
    letterSpacing: 0.34,
    lineHeight: 24,
    marginTop: wp('2%'),
    marginBottom: wp('2%'),
    marginLeft: wp('4%')
  },
  labelWithIconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    ...Platform.select({
      ios: {
        maxHeight: hp('4%')
      },
      android: {
        maxHeight: hp('5%')
      }
    })
  },
  dashboardLabelWithIconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        maxHeight: hp('5%')
      },
      android: {
        maxHeight: hp('5%')
      }
    }),
    marginTop: wp('2%'),
    marginBottom: wp('2%')
  },
  checkbox: {
    backgroundColor: '#4E957A',
    borderColor: '#4E957A',
    marginTop: hp('3%'),
    marginRight: wp('3%'),
    marginLeft: wp('4%')
  },
  checkboxInScrollView: {
    backgroundColor: '#4E957A',
    borderColor: '#4E957A',
    marginTop: hp('3%'),
    marginRight: wp('3%')
  },
  checkboxLabel: {
    color: '#FFFFFF',
    fontFamily: 'Open Sans',
    fontSize: 16,
    letterSpacing: 0.34,
    lineHeight: 24,
    marginTop: hp('1.6%'),
    marginRight: wp('4%')
  },
  smallParagraphText: {
    color: '#ffffff',
    fontFamily: 'Open Sans',
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0.26,
    lineHeight: 18,
    textAlign: 'center',
    marginLeft: wp('4%')
  },
  setupWelcomeContainer: {
    flex: 1,
    width: wp('100%'),
    height: hp('100%'),
    marginRight: wp('4%'),
    marginTop: hp('10%'),
    marginBottom: hp('6%')
  },
  loginContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: wp('100%'),
    height: hp('100%'),
    marginRight: wp('4%'),
    marginTop: hp('5%'),
    marginBottom: hp('6%')
  },
  setupContainer: {
    flex: 1,
    width: wp('100%'),
    height: hp('100%'),
    marginTop: hp('2%'),
    marginBottom: hp('2.5%')
  },
  drawerContainer: {
    flex: 1,
    flexDirection: 'row',
    width: wp('100%'),
    height: hp('100%'),
    marginTop: hp('2%'),
    marginBottom: hp('2.5%')
  },
  appContainer: {
    flex: 1,
    width: wp('100%'),
    height: hp('100%'),
    marginTop: hp('1%')
  },
  dashboardContainer: {
    flex: 1,
    width: wp('100%'),
    height: hp('100%'),
    ...Platform.select({
      ios: {
        marginTop: hp('3%')
      },
      android: {
        marginTop: hp('4%')
      }
    }),
    backgroundColor: '#0A1724'
  },
  outerDrawerContainer: {
    flex: 1,
    height: hp('100%')
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
  setupButtonContainerTop: {
    // Due to how we have to fill the LinearGradient we
    // unfortunately lose flexbox, so we have to resort to
    // absolute positioning
    position: 'absolute',
    bottom: hp('9%'),
    marginLeft: wp('4%')
  },
  setupButtonContainerBottom: {
    position: 'absolute',
    bottom: 0,
    borderRadius: 4,
    borderColor: '#4e957a',
    borderStyle: 'solid',
    borderWidth: 2,
    marginLeft: wp('4%')
  },
  setupButtonContainerBottomNoBorder: {
    position: 'absolute',
    bottom: 0,
    marginLeft: wp('4%')
  },
  accountLockButtonContainer: {
    position: 'absolute',
    bottom: 0,
    marginLeft: wp('4%'),
    marginBottom: hp('2.5%')
  },
  accountMediumButtonContainer: {
    position: 'absolute',
    bottom: 0,
    width: wp('96%'),
    marginBottom: hp('2.5%')
  },
  accountButtonLargeButton: {
    width: wp('92%'),
    height: hp('6%'),
    borderRadius: 22,
    backgroundColor: '#4e957a',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginLeft: wp('4%')
  },
  setupButtonContainerScrollView: {
    marginTop: hp('1%')
  },
  underline: {
    width: wp('15%'),
    height: hp('.1%'),
    borderColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 3,
    marginLeft: wp('5%'),
    marginRight: wp('1%'),
    marginBottom: wp('5%')
  },
  largeButton: {
    width: wp('92%'),
    height: hp('6%'),
    borderRadius: 4,
    backgroundColor: '#4e957a'
  },
  mediumButton: {
    width: wp('40%'),
    height: hp('6%'),
    borderRadius: 22,
    backgroundColor: '#4e957a'
  },
  mediumButtonSecondary: {
    width: wp('40%'),
    height: hp('6%'),
    borderRadius: 22,
    borderColor: '#4e957a',
    borderStyle: 'solid',
    borderWidth: 2,
    backgroundColor: 'transparent',
    marginLeft: wp('4%')
  },
  largeButtonSecondary: {
    width: wp('91%'),
    height: hp('6%'),
    borderRadius: 4,
    backgroundColor: 'transparent'
  },
  accountButton: {
    width: wp('42%'),
    height: hp('5%'),
    borderRadius: 22,
    borderColor: '#4e957a',
    borderStyle: 'solid',
    borderWidth: 2,
    backgroundColor: 'transparent',
    ...Platform.select({
      android: {
        marginTop: hp('1%')
      }
    })
  },
  largeButtonText: {
    color: '#ffffff',
    fontFamily: 'Titillium Web',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.43
  },
  accountButtonText: {
    width: wp('30%'),
    color: '#ffffff',
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
  progressBarContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    width: wp('100%'),
    height: hp('5%'),
    backgroundColor: '#0A1724',
    color: '#000000'
  },
  accountDetailsBarContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    width: wp('100%'),
    height: hp('5%'),
    backgroundColor: 'transparent',
    color: '#000000'
  },
  drawerHeaderContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    width: wp('100%'),
    maxHeight: hp('5%'),
    color: '#000000'
  },
  progressBar: {
    marginTop: hp('2.9%'),
    marginLeft: wp('3%'),
    marginRight: wp('3%')
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
    marginRight: wp('4%')
  },
  centeredLinkText: {
    color: '#8DC84F',
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.34,
    lineHeight: 24,
    textAlign: 'center'
  },
  linkText: {
    color: '#8DC84F',
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.34,
    lineHeight: 24,
    textAlign: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 0
  },
  ndauTotalText: {
    color: '#8CC74F',
    fontFamily: 'Titillium Web',
    fontSize: 36,
    fontWeight: '300',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
    shadowOpacity: 0,
    textShadowColor: 'rgba(78, 149, 122, 1)',
    letterSpacing: 0.77,
    lineHeight: 54,
    textAlign: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 0
  },
  centeredLinkContainer: {
    position: 'absolute',
    bottom: 0
  },
  linkContainer: {
    flex: 1
  },
  passwordLinkContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: wp('4%'),
    paddingVertical: 0
  },
  ndauTotalContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        marginTop: hp('1.5%')
      },
      android: {
        marginTop: hp('2%')
      }
    })
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
  recoveryConfirmationText: {
    color: '#ffffff',
    fontFamily: 'Titillium Web',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.34,
    lineHeight: 24,
    textAlign: 'center'
  },
  recoveryConfirmationTextOnly: {
    color: '#ffffff',
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
  recoveryConfirmationRowView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  recoveryConfirmationRowViewTextOnly: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  input: {
    borderRadius: 1,
    borderStyle: 'solid',
    borderColor: '#BDC1CC',
    backgroundColor: '#EDEAEA',
    fontFamily: 'Open Sans',
    fontSize: 16,
    letterSpacing: 0.34,
    lineHeight: 24,
    marginRight: wp('4%'),
    marginLeft: wp('4%'),
    marginBottom: hp('2%')
  },
  legalText: {
    color: '#FFFFFF',
    fontFamily: 'Open Sans',
    fontSize: 18,
    letterSpacing: 0.39,
    lineHeight: 27
  },
  legalTextHeading: {
    color: '#FFFFFF',
    fontFamily: 'Open Sans',
    fontSize: 18,
    letterSpacing: 0.39,
    lineHeight: 27,
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  legalTextBold: {
    color: '#FFFFFF',
    fontFamily: 'Open Sans',
    fontSize: 18,
    letterSpacing: 0.39,
    lineHeight: 27,
    fontWeight: 'bold'
  },
  mainLegalTextHeading: {
    color: '#FFFFFF',
    fontFamily: 'Open Sans',
    fontSize: 20,
    letterSpacing: 0.39,
    lineHeight: 27,
    fontWeight: 'bold'
  },
  loginImageView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginImage: {
    width: wp('40%'),
    height: hp('35%')
  },
  collapsiblePanelContainer: {
    backgroundColor: '#293E63',
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0,
    shadowColor: 'rgba(0, 0, 0, 0.5)'
  },
  collapsiblePanelTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  collapsiblePanelTitleLeft: {
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
    color: '#8CC74F',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
    shadowOpacity: 0,
    textShadowColor: 'rgba(78,149,122,1)',
    fontSize: 18,
    fontWeight: '300',
    letterSpacing: 0.39,
    lineHeight: 27,
    fontFamily: 'TitilliumWeb-Light',
    textAlign: 'center'
  },
  collapsiblePanelTitleRight: {
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
    color: '#fff',
    fontFamily: 'Open Sans',
    fontSize: 18,
    letterSpacing: 0.39,
    lineHeight: 27,
    fontFamily: 'TitilliumWeb-Light'
  },
  collapsiblePanelBody: {
    padding: wp('2%'),
    marginLeft: wp('2%'),
    marginRight: wp('2%')
  },
  collapsiblePanelBorder: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    marginLeft: wp('4%'),
    marginRight: wp('4%'),
    opacity: 0.2
  },
  dashboardTextVerySmallWhite: {
    color: '#ffffff',
    fontFamily: 'Open Sans',
    fontSize: 12,
    fontWeight: '300',
    letterSpacing: 0.26,
    lineHeight: 18
  },
  dashboardPanel: {
    width: wp('100%'),
    height: hp('9%'),
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0,
    shadowColor: 'rgba(0, 0, 0, 0.5)'
  },
  accountMainPanel: {
    width: wp('100%'),
    height: hp('23%'),
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    marginBottom: hp('3%')
  },
  dashboardActionPanels: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden'
  },
  accountPanels: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
    // overflow: 'hidden'
  },
  dashboardActionPanel: {
    width: wp('18%'),
    height: hp('10%'),
    backgroundColor: '#0F2748',
    alignSelf: 'flex-end'
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

    // alignSelf: 'flex-start'
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
    // alignSelf: 'flex-end'
  },
  dashboardActionTextPanel: {
    color: '#FFFFFF',
    fontSize: 21,
    fontFamily: 'Titillium Web',
    fontWeight: '600',
    letterSpacing: 0.45,
    lineHeight: 32,
    textAlign: 'center',
    alignSelf: 'flex-start',
    ...Platform.select({
      ios: {
        marginTop: hp('1%')
      },
      android: {
        marginTop: hp('.5%')
      }
    }),
    marginLeft: wp('4%')
  },
  accountActionTextPanel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Titillium Web',
    letterSpacing: 0.34,
    lineHeight: 24,
    textAlign: 'left',
    // ...Platform.select({
    //   ios: {
    //     marginTop: hp('1%')
    //   },
    //   android: {
    //     marginTop: hp('.5%')
    //   }
    // }),
    marginLeft: wp('4%')
  },
  accountTitleTextPanel: {
    color: '#FFFFFF',
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
    fontSize: 18,
    fontWeight: '300',
    letterSpacing: 0.39,
    lineHeight: 27,
    fontFamily: 'Titillium Web',
    textAlign: 'center',
    alignSelf: 'center',
    paddingTop: 5
  },
  accountTotalPanel: {
    width: wp('100%'),
    height: hp('5%'),
    backgroundColor: '#293E63',
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0,
    shadowColor: 'rgba(0, 0, 0, 0.5)'
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
  accountDetailsTextPanel: {
    marginLeft: wp('4%'),
    marginRight: wp('4%')
  },
  lockAccountDetailsTextPanel: {
    marginLeft: wp('4%'),
    marginRight: wp('4%')
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
  lockAccountDetailsTextPanelWithSmallText: {
    marginLeft: wp('4%'),
    marginRight: wp('4%'),
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  lockAccountCheckmark: {
    marginTop: hp('1.4%'),
    marginRight: wp('3%')
  },
  accountDetailsLargerText: {
    color: '#FFFFFF',
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontWeight: '200',
    letterSpacing: 0.34,
    lineHeight: 24
  },
  accountDetailsSmallerText: {
    color: '#FFFFFF',
    fontFamily: 'Open Sans',
    fontSize: 12,
    fontWeight: '200',
    letterSpacing: 0.26,
    lineHeight: 18,
    paddingBottom: 0
  },
  accountDetailsSmallerTextBold: {
    color: '#FFFFFF',
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
  lockSliderContainer: {
    margin: wp('4%'),
    marginBottom: hp('7%')
  },
  lockSlider: {
    width: wp('92%'),
    height: hp('1%'),
    color: '#0A1724'
  },
  lockSmallerTextBold: {
    color: '#FFFFFF',
    fontFamily: 'Open Sans',
    fontSize: 12,
    fontWeight: '400',
    marginTop: hp('2%'),
    textAlign: 'center'
  },
  lockSmallerText: {
    color: '#FFFFFF',
    fontFamily: 'Open Sans',
    fontSize: 12,
    textAlign: 'left'
  },
  lockLargerText: {
    color: '#FFFFFF',
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontWeight: '200',
    letterSpacing: 0.34,
    lineHeight: 24
  },
  lockAccountPicker: {
    marginTop: 0,
    paddingTop: 0,
    color: '#FFFFFF'
  },
  lockAccountPickerText: {
    color: '#FFFFFF',
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontWeight: '200',
    letterSpacing: 0.34,
    lineHeight: 24,
    textAlign: 'left',
    paddingLeft: wp('4%')
  }
})
