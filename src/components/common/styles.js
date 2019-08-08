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
    backgroundColor: '#0A1724'
  },
  appContainer: {
    flex: 1,
    width: wp('100%'),
    height: hp('100%'),
    marginTop: hp('1%'),
    backgroundColor: '#0A1724'
  },
  closeForBar: {
    paddingTop: '1%',
    width: '10%'
  },
  setupButtonContainerBottom: {
    position: 'absolute',
    bottom: 0,
    borderRadius: 4,
    borderColor: AppConstants.SQUARE_BUTTON_COLOR,
    borderStyle: 'solid',
    borderWidth: 2,
    marginLeft: wp('4%')
  },
  booleanSettingPanel: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: wp('4%'),
    maxHeight: hp('7%')
  },
  setupButtonContainerBottomNoBorder: {
    position: 'absolute',
    bottom: hp('2%')
  },
  setupButtonContainerScrollView: {},
  setupButtonContainerTop: {
    // Due to how we have to fill the LinearGradient we
    // unfortunately lose flexbox, so we have to resort to
    // absolute positioning
    position: 'absolute',
    bottom: hp('9%'),
    marginLeft: wp('4%')
  },
  largeButtonSecondary: {
    zIndex: 100,
    width: wp('91%'),
    borderRadius: 4,
    backgroundColor: 'transparent',
    padding: 0
  },
  largeButtonText: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Titillium Web',
    fontSize: 20,
    fontWeight: '600'
  },
  largeButton: {
    zIndex: 100,
    width: wp('92%'),
    borderRadius: 4,
    backgroundColor: AppConstants.SQUARE_BUTTON_COLOR,
    padding: 0
  },
  largeButtonMargin: {
    marginLeft: wp('4%'),
    marginRight: wp('4%')
  },
  centeredLinkContainer: {
    alignSelf: 'flex-start',
    marginLeft: wp('4%')
  },
  centeredLinkText: {
    color: '#8DC84F',
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontWeight: '600',
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
    textAlign: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 0
  },
  greenLinkText: {
    color: '#4E957A',
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontWeight: '200',
    paddingBottom: 0,
    textAlign: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 0,
    textDecorationLine: 'underline',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 0,
    shadowOpacity: 0,
    textShadowColor: '#4E957A'
  },
  greenLinkTextForModal: {
    color: '#4E957A',
    paddingBottom: 0,
    textAlign: 'center',
    paddingVertical: '5%',
    textDecorationLine: 'underline',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 0,
    shadowOpacity: 0,
    textShadowColor: '#4E957A'
  },
  passwordLinkContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: wp('4%'),
    paddingVertical: 0,
    minHeight: hp('10%'),
    marginBottom: hp('3%')
  },
  authenticationLinkText: {
    width: '100%',
    textAlign: 'right'
  },
  ndauTotalContainer: {
    ...Platform.select({
      android: {
        marginTop: hp('4%'),
        marginBottom: hp('4%')
      }
    }),
    flexShrink: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('9%'),
    padding: 0,
    overflow: 'visible'
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
    textAlign: 'center',
    alignSelf: 'flex-start'
  },
  ndauLarge: {
    color: '#FFFFFF',
    fontFamily: AppConstants.NDAU_ICON_FONT,
    fontSize: 33,
    alignSelf: 'flex-start',
    paddingRight: 4,
    paddingVertical: 0,
    marginTop: hp('3%')
  },
  ndauSmall: {
    color: '#FFFFFF',
    fontFamily: AppConstants.NDAU_ICON_FONT,
    fontSize: 12
  },
  backArrow: {
    width: '6%'
  },
  progressBar: {
    marginTop: '4%',
    marginLeft: wp('3%'),
    marginRight: wp('10%')
  },
  progressBarContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    width: wp('100%'),
    backgroundColor: '#0A1724',
    color: '#000000'
  },
  progressNumber: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Titillium Web',
    fontSize: 22,
    paddingVertical: 0,
    marginLeft: '-10%'
  },
  labelWithIconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    maxHeight: hp('7%'),
    minHeight: hp('7%')
  },
  labelText: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 16,
    marginRight: wp('2%')
  },
  labelTextMarginRight: {
    marginLeft: wp('4%')
  },
  checkboxInScrollView: {
    backgroundColor: AppConstants.SQUARE_BUTTON_COLOR,
    borderColor: AppConstants.SQUARE_BUTTON_COLOR,
    marginTop: hp('3%'),
    marginRight: wp('3%'),
    marginBottom: hp('4%'),
    position: 'relative',
    width: 22,
    height: 22,
    minHeight: 22,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  radioButton: {
    borderColor: AppConstants.SQUARE_BUTTON_COLOR,
    color: AppConstants.SQUARE_BUTTON_COLOR,
    marginRight: wp('4%'),
    marginLeft: wp('4%'),
    paddingTop: hp('1%')
  },
  radioButtonText: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontWeight: '200',
    paddingTop: 0
  },
  checkboxLabel: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 16,
    marginTop: hp('1.6%'),
    marginRight: wp('4%')
  },
  checkbox: {
    backgroundColor: AppConstants.SQUARE_BUTTON_COLOR,
    borderColor: AppConstants.TEXT_COLOR,
    marginTop: hp('3%'),
    marginRight: wp('3%'),
    marginLeft: wp('4%'),
    marginBottom: hp('1%'),
    position: 'relative',
    width: 22,
    height: 22,
    minHeight: 22,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  legalText: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 18
  },
  mainLegalTextHeading: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 20,
    fontWeight: 'bold'
  },
  legalTextHeading: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 22
  },
  legalTextBold: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 18,
    fontWeight: 'bold'
  },
  input: {
    borderRadius: 1,
    borderStyle: 'solid',
    borderColor: '#BDC1CC',
    backgroundColor: '#EDEAEA',
    fontFamily: 'Open Sans',
    zIndex: 5,
    fontSize: 16
  },
  inputBottomMargin: {
    marginBottom: hp('2%')
  },
  inputSideMargins: {
    marginLeft: wp('4%'),
    marginRight: wp('4%')
  },
  inputErrorBorder: {
    borderStyle: 'solid',
    borderColor: AppConstants.ERROR_COLOR,
    borderWidth: 1
  },
  setupContainerBackgroundImage: {
    opacity: 0.1,
    width: '150%',
    height: '150%',
    overflow: 'visible',
    marginTop: -100,
    ...Platform.select({
      ios: {
        // iOS needs both left and marginLeft for some reason
        marginLeft: 50,
        left: 100
      },
      android: {
        left: 80
      }
    })
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
    height: hp('83%'),
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
    fontWeight: '300'
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
    fontFamily: 'TitilliumWeb-Light',
    textAlign: 'center'
  },
  collapsiblePanelTitleRight: {
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 18,
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
  bar: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    height: hp('8%'),
    backgroundColor: '#0A1724',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    overflow: 'hidden'
  },
  barWrapper: {
    alignSelf: 'stretch'
  },
  icon: {
    padding: 5,
    width: 40
  },
  barTextTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  barTextTitleContainerWithMiddle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: wp('4%'),
    marginRight: wp('4%')
  },
  title: {
    color: AppConstants.TEXT_COLOR,
    flex: 1,
    fontFamily: 'Open Sans',
    fontSize: 16,
    paddingLeft: wp('4%')
  },
  titleLeft: {
    color: AppConstants.TEXT_COLOR,
    flex: 1,
    fontFamily: 'Open Sans',
    fontSize: 16,
    paddingRight: wp('1%')
  },
  barBorder: {
    borderBottomColor: '#455B82',
    borderBottomWidth: 1,
    marginTop: hp('2%'),
    marginBottom: hp('2%')
  },
  collapsibleBarBorder: {
    borderBottomColor: '#455B82',
    borderBottomWidth: 1
  },
  fullBarBorder: {
    borderBottomColor: '#455B82',
    borderBottomWidth: 1,
    marginTop: hp('2%')
  },
  fullBarBorderBottomWidth: {
    marginBottom: hp('2%')
  },
  drawerBorder: {
    borderBottomColor: '#455B82',
    borderBottomWidth: 1,
    marginBottom: hp('3%'),
    ...Platform.select({
      android: {
        width: '68%'
      }
    })
  },
  barTitleLeft: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'TitilliumWeb-Light'
  },
  barTitleMiddle: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontFamily: 'TitilliumWeb-Light'
  },
  barTitleRight: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontFamily: 'TitilliumWeb-Light'
  },
  orBorder: {
    borderBottomColor: '#455B82',
    borderBottomWidth: 1,
    width: wp('40%'),
    height: hp('4%')
  },
  orBorderText: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 20,
    marginLeft: wp('2%'),
    marginRight: wp('2%')
  },
  largeBorderButton: {
    width: wp('92%'),
    height: hp('7%'),
    borderColor: AppConstants.SQUARE_BUTTON_COLOR,
    borderStyle: 'solid',
    borderRadius: 4,
    borderWidth: 2,
    backgroundColor: 'transparent',
    marginTop: wp('3%')
  },
  largeBorderButtonText: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Titillium Web',
    fontSize: 20,
    fontWeight: '600',
    padding: 0
  },
  orBorderPanel: {
    width: wp('92%'),
    height: hp('8%')
  },
  paragraphText: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 18,
    paddingLeft: wp('1%'),
    paddingRight: wp('1%'),
    marginRight: wp('4%'),
    marginLeft: wp('4%')
  },
  paragraphTextNoPaddingOrMargin: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 18,
    marginLeft: wp('4%'),
    padding: 0
  },
  fullWidthAndHeight: { width: wp('100%'), height: hp('100%') },
  qrCode: {
    marginTop: hp('10%'),
    marginBottom: hp('16%'),
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF'
  },
  smallButtonText: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
    marginLeft: wp('4%')
  },
  smallParagraphText: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'left',
    marginLeft: wp('4%')
  }
})
