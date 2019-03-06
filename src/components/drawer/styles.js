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
  drawerEntryBottom: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginLeft: wp('4%'),
    marginBottom: hp('2.5%')
  },
  drawerEntry: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: wp('4%'),
    marginBottom: hp('2.5%')
  },
  drawerTextBottom: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontWeight: '200',
    letterSpacing: 0.34,
    lineHeight: 24,
    marginLeft: wp('2%'),
    paddingBottom: 0
  },
  drawerText: {
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontWeight: '200',
    letterSpacing: 0.34,
    lineHeight: 24,
    marginLeft: wp('2%'),
    paddingTop: 0
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
  drawerHeaderText: {
    color: AppConstants.TEXT_COLOR,
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
    color: AppConstants.TEXT_COLOR,
    fontFamily: 'Titillium Web',
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: 0.51,
    lineHeight: 36,
    width: wp('86%'),
    height: hp('6%'),
    textAlign: 'right',
    alignSelf: 'flex-end',
    paddingTop: hp('.5%')
  }
})
