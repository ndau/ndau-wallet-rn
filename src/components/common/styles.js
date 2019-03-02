import { StyleSheet, Platform } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import AppConstants from '../../AppConstants'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  statusBarColor: {
    backgroundColor: '#000000'
  },
  appContainer: {
    flex: 1,
    width: wp('100%'),
    height: hp('100%'),
    marginTop: hp('1%')
  },
  closeForBar: {
    ...Platform.select({
      ios: {
        marginTop: hp('1.1%')
      },
      android: {
        marginTop: hp('1%')
      }
    }),
    marginRight: wp('4%')
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
  setupButtonContainerTop: {
    // Due to how we have to fill the LinearGradient we
    // unfortunately lose flexbox, so we have to resort to
    // absolute positioning
    position: 'absolute',
    bottom: hp('9%'),
    marginLeft: wp('4%')
  },
  largeButtonSecondary: {
    width: wp('91%'),
    height: hp('6%'),
    borderRadius: 4,
    backgroundColor: 'transparent'
  },
  largeButtonText: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Titillium Web',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.43
  },
  largeButton: {
    width: wp('92%'),
    height: hp('6%'),
    borderRadius: 4,
    backgroundColor: '#4e957a'
  },
  centeredLinkContainer: {
    position: 'absolute',
    bottom: 0
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
  linkContainer: {
    flex: 1
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
  progressBar: {
    marginTop: hp('2.9%'),
    marginLeft: wp('3%'),
    marginRight: wp('3%')
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
  labelText: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 16,
    letterSpacing: 0.34,
    lineHeight: 24,
    marginRight: wp('2%'),
    marginLeft: wp('4%'),
    paddingTop: 0
  },
  checkboxInScrollView: {
    backgroundColor: '#4E957A',
    borderColor: '#4E957A',
    marginTop: hp('3%'),
    marginRight: wp('3%')
  },
  checkboxLabel: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 16,
    letterSpacing: 0.34,
    lineHeight: 24,
    marginTop: hp('1.6%'),
    marginRight: wp('4%')
  },
  checkbox: {
    backgroundColor: '#4E957A',
    borderColor: '#4E957A',
    marginTop: hp('3%'),
    marginRight: wp('3%'),
    marginLeft: wp('4%')
  },
  legalText: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 18,
    letterSpacing: 0.39,
    lineHeight: 27
  },
  mainLegalTextHeading: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 20,
    letterSpacing: 0.39,
    lineHeight: 27,
    fontWeight: 'bold'
  },
  legalTextBold: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 18,
    letterSpacing: 0.39,
    lineHeight: 27,
    fontWeight: 'bold'
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
  setupContainerBackgroundImage: {
    height: '150%',
    width: '150%',
    bottom: 450,
    right: 80
  },
  opaqueOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.9
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
  appContainerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  collapsibleTextVerySmallWhite: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 12,
    fontWeight: '300',
    letterSpacing: 0.26,
    lineHeight: 18
  },
  dropdownDetailsTextPanel: {
    marginLeft: wp('4%'),
    marginRight: wp('4%')
  },

  dropdownDetailsTextPanelWithSmallText: {
    marginLeft: wp('4%'),
    marginRight: wp('4%'),
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  dropdownCheckmark: {
    marginTop: hp('1.4%'),
    marginRight: wp('3%')
  },
  dropdownPicker: {
    marginTop: 0,
    paddingTop: 0,
    color: AppConstants.TEXT_COLOR
  },
  dropdownPickerText: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontWeight: '200',
    letterSpacing: 0.34,
    lineHeight: 24,
    textAlign: 'left',
    paddingLeft: wp('4%')
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
    color: AppConstants.TEXT_COLOR,
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
  }
})
