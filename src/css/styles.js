import { StyleSheet, Platform } from 'react-native';
import StyleConstants from './styleConstants';

export default StyleSheet.create({
  drawerText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'TitilliumWeb-Regular',
    paddingTop: 3
  },
  drawerTextImage: { width: 30, height: 30, marginRight: 10 },
  drawerLabels: {
    fontSize: 14,
    fontFamily: 'TitilliumWeb-Regular'
  },
  drawerContainer: {
    ...Platform.select({
      ios: {
        marginLeft: 20,
        paddingRight: 15,
        paddingTop: 15,
        paddingBottom: 15
      },
      android: {
        padding: 15
      }
    }),
    flex: 1,
    backgroundColor: StyleConstants.DRAWER_BACKGROUND_COLOR
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
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    backgroundColor: StyleConstants.APP_BACKGROUND_COLOR
  },
  text: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'TitilliumWeb-Regular'
  },
  textInput: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    marginTop: 20,
    paddingLeft: 10,
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
    margin: '0.5%',
    padding: '2px',
    borderRadius: 3
  },
  wizardText: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'TitilliumWeb-Regular'
  },
  progress: {
    paddingTop: 8,
    paddingBottom: 8
  },
  dashboardTextContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  dashboardRowContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row'
  },
  dashboardTextLarge: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffffff',
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 28,
    paddingBottom: 10
  },
  dashboardTextVeryLarge: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#4d9678',
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 48,
    paddingBottom: 10,
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
    textShadowRadius: 6,
    paddingLeft: 20
  },
  dashboardTextSmallWhiteMiddle: {
    color: '#ffffff',
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 20,
    paddingLeft: 3
  },
  dashboardTextSmallWhiteEnd: {
    color: '#ffffff',
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 20,
    paddingLeft: 25
  },
  checkbox: { flex: 1, paddingTop: 10, paddingBottom: 10 },
  contentContainer: {
    ...Platform.select({
      ios: {
        marginTop: 15
      }
    })
  },
  footer: {
    justifyContent: 'flex-end'
  },
  linkText: {
    color: StyleConstants.LINK_ORANGE,
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 18,
    textDecorationLine: 'underline'
  }
});
