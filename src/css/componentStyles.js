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
    paddingBottom: 0
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
    marginTop: hp('2%'),
    marginBottom: hp('2.5%')
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
  largeButtonSecondary: {
    width: wp('91%'),
    height: hp('6%'),
    borderRadius: 4,
    backgroundColor: 'transparent'
  },
  largeButtonText: {
    color: '#ffffff',
    fontFamily: 'Titillium Web',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.43
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
  drawerHeaderContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    width: wp('100%'),
    height: hp('5%'),
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
        marginTop: hp('1.6%')
      },
      android: {
        marginTop: hp('1.4%')
      }
    }),
    marginLeft: wp('4%')
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
    alignSelf: 'flex-start'
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
    marginRight: wp('4%')
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
    top: hp('12%'),
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
  }
})
