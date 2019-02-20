import { StyleSheet, Platform } from 'react-native'
import StyleConstants from './styleConstants'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

export default StyleSheet.create({
  drawerText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'TitilliumWeb-Regular'
  },
  drawerTextImage: {
    width: 36,
    height: 36,
    marginRight: wp('2%'),
    marginLeft: wp('2%')
  },
  drawerTextImageDashboard: {
    width: 40,
    height: 35,
    marginRight: wp('2%'),
    marginLeft: wp('2%')
  },
  drawerLabels: {
    fontSize: 14,
    fontFamily: 'TitilliumWeb-Regular'
  },
  drawerContainer: {
    ...Platform.select({
      ios: {
        marginLeft: wp('3%'),
        paddingRight: wp('3%')
      },
      android: {
        paddingRight: wp('3%'),
        paddingLeft: wp('3%')
      }
    }),
    flex: 1
  },
  darkBackgroundColor: {
    backgroundColor: StyleConstants.APP_BACKGROUND_COLOR
  },
  safeContainer: {
    flex: 1,
    backgroundColor: StyleConstants.APP_BACKGROUND_COLOR
  },
  container: {
    flex: 1,
    backgroundColor: StyleConstants.APP_BACKGROUND_COLOR
  },
  text: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'TitilliumWeb-Regular'
  },
  smallWhiteText: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'TitilliumWeb-Regular'
  },
  textInput: {
    height: hp('7%'),
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 3,
    paddingLeft: wp('1%'),
    color: '#000000',
    backgroundColor: '#ffffff',
    fontSize: 18,
    fontFamily: 'TitilliumWeb-Regular'
  },
  button: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#4d9678',
    backgroundColor: '#4d9678',
    borderRadius: 3,
    fontFamily: 'TitilliumWeb-Light',
    marginLeft: wp('0.5%'),
    marginRight: wp('0.5%'),
    paddingLeft: wp('.2%'),
    paddingRight: wp('.2%'),
    borderRadius: 3
  },
  wizardText: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'TitilliumWeb-Regular'
  },
  progress: {},
  dashboardTextContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  dashboardOuterRowContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  dashboardSmallTextContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  dashboardRowContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row'
  },
  dashboardRowContainerCenter: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginRight: wp('1%')
  },
  dashboardTextLarge: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffffff',
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 28
  },
  dashboardTextVeryLarge: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#4d9678',
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 48,
    textShadowColor: 'rgba(77, 150, 120, .5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 6
  },
  dashboardTextSmallGreen: {
    color: '#4d9678',
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 20,
    textShadowColor: 'rgba(77, 150, 120, .5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 6
  },
  dashboardTextSmallWhiteMiddle: {
    color: '#ffffff',
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 20,
    flex: 1,
    alignSelf: 'stretch'
  },
  dashboardTextSmallWhiteEnd: {
    color: '#ffffff',
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 20
  },
  dashboardTextVerySmallWhite: {
    color: '#ffffff',
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 12
  },
  checkbox: {
    flex: 1
  },
  contentContainer: {
    ...Platform.select({
      ios: {
        marginTop: hp('1.5%')
      }
    }),

    marginLeft: wp('6%'),
    marginRight: wp('6%')
  },
  footer: {
    justifyContent: 'flex-end',
    paddingLeft: wp('6%'),
    paddingRight: wp('6%')
  },
  linkText: {
    color: StyleConstants.LINK_ORANGE,
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 18,
    textDecorationLine: 'underline'
  },
  blueLinkText: {
    color: 'blue',
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 18,
    textDecorationLine: 'underline'
  },
  blackDialogText: {
    color: 'black',
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 18
  },
  asterisks: {
    color: StyleConstants.ASTERISKS_RED,
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 20
  },
  buttonContainer: {},
  rowView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  carouselArrows: {
    color: '#ffffff',
    fontFamily: 'TitilliumWeb-Bold',
    fontSize: 24
  },
  recoveryPageView: {
    flexDirection: 'row',
    backgroundColor: StyleConstants.APP_BACKGROUND_COLOR,
    justifyContent: 'center'
  },
  navButtonWrapper: {
    justifyContent: 'space-between'
  },
  accountCardImageView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginLeft: wp('1%')
  }
})
